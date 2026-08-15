"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import Papa from "papaparse";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/auth/session";
import { uniqueProductSlug } from "@/lib/slugify";
import { saveUploadedImages, deleteUploadedImage } from "@/lib/upload";
import { productBaseFields, refineOriginalPrice } from "@/lib/validation/product-schema";
import { branches } from "@/lib/config/site";
import { CSV_COLUMNS, parseCsvRecord } from "@/lib/import-export/product-csv";

const productSchema = refineOriginalPrice(
  z.object({
    ...productBaseFields,
    active: z.union([z.literal("on"), z.null()]).optional(),
    branchIds: z.array(z.string()).default([]),
    existingImages: z.string().default("[]"),
  })
);

export type ProductFormState = { error?: string } | undefined;

function parseFormData(formData: FormData) {
  return productSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    variant: formData.get("variant"),
    condition: formData.get("condition"),
    conditionGrade: formData.get("conditionGrade") ?? "",
    chip: formData.get("chip"),
    ram: formData.get("ram"),
    storage: formData.get("storage"),
    price: formData.get("price"),
    originalPrice: formData.get("originalPrice") ?? "",
    stock: formData.get("stock"),
    warrantyMonths: formData.get("warrantyMonths"),
    description: formData.get("description"),
    active: formData.get("active"),
    branchIds: formData.getAll("branchIds"),
    existingImages: formData.get("existingImages") ?? "[]",
  });
}

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await verifySession();

  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  const data = parsed.data;
  const files = formData.getAll("images").filter((f): f is File => f instanceof File);

  let uploadedUrls: string[];
  try {
    uploadedUrls = await saveUploadedImages(files);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Gagal upload foto." };
  }

  const id = await uniqueProductSlug(data.name);

  await prisma.product.create({
    data: {
      id,
      name: data.name,
      category: data.category,
      variant: data.variant,
      condition: data.condition,
      conditionGrade: data.conditionGrade || null,
      chip: data.chip,
      ram: data.ram,
      storage: data.storage,
      price: data.price,
      originalPrice: data.originalPrice,
      stock: data.stock,
      branchIds: JSON.stringify(data.branchIds),
      warrantyMonths: data.warrantyMonths,
      description: data.description,
      active: data.active === "on",
      images: {
        create: uploadedUrls.map((url, i) => ({ url, order: i })),
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/katalog");
  revalidatePath("/admin/produk");
  redirect("/admin/produk");
}

export async function updateProduct(
  id: string,
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await verifySession();

  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  const data = parsed.data;
  const files = formData.getAll("images").filter((f): f is File => f instanceof File);
  const keepUrls: string[] = JSON.parse(data.existingImages);

  const existing = await prisma.product.findUnique({
    where: { id },
    include: { images: true },
  });
  if (!existing) {
    return { error: "Produk tidak ditemukan." };
  }

  let uploadedUrls: string[];
  try {
    uploadedUrls = await saveUploadedImages(files);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Gagal upload foto." };
  }

  const removedImages = existing.images.filter((img) => !keepUrls.includes(img.url));
  await Promise.all(removedImages.map((img) => deleteUploadedImage(img.url)));

  const finalUrls = [...keepUrls, ...uploadedUrls];

  await prisma.$transaction([
    prisma.productImage.deleteMany({ where: { productId: id } }),
    prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        category: data.category,
        variant: data.variant,
        condition: data.condition,
        conditionGrade: data.conditionGrade || null,
        chip: data.chip,
        ram: data.ram,
        storage: data.storage,
        price: data.price,
        originalPrice: data.originalPrice,
        stock: data.stock,
        branchIds: JSON.stringify(data.branchIds),
        warrantyMonths: data.warrantyMonths,
        description: data.description,
        active: data.active === "on",
        images: {
          create: finalUrls.map((url, i) => ({ url, order: i })),
        },
      },
    }),
  ]);

  revalidatePath("/");
  revalidatePath("/katalog");
  revalidatePath(`/katalog/${id}`);
  revalidatePath("/admin/produk");
  redirect("/admin/produk");
}

export async function deleteProduct(id: string) {
  await verifySession();

  const product = await prisma.product.findUnique({ where: { id }, include: { images: true } });
  if (!product) return;

  await Promise.all(product.images.map((img) => deleteUploadedImage(img.url)));
  await prisma.product.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/katalog");
  revalidatePath("/admin/produk");
}

export async function toggleProductActive(id: string, active: boolean) {
  await verifySession();
  await prisma.product.update({ where: { id }, data: { active } });

  revalidatePath("/");
  revalidatePath("/katalog");
  revalidatePath("/admin/produk");
}

export async function updateProductStock(id: string, stock: number) {
  await verifySession();
  if (!Number.isInteger(stock) || stock < 0) return;
  await prisma.product.update({ where: { id }, data: { stock } });

  revalidatePath("/");
  revalidatePath("/katalog");
  revalidatePath("/admin/produk");
}

export type ImportProductsState =
  | {
      done: true;
      created: number;
      updated: number;
      failed: number;
      errors: { row: number; message: string }[];
    }
  | undefined;

const MAX_IMPORT_ROWS = 5000;

function matchKey(name: string, variant: string) {
  return `${name.trim().toLowerCase()}||${variant.trim().toLowerCase()}`;
}

export async function importProducts(
  _prevState: ImportProductsState,
  formData: FormData
): Promise<ImportProductsState> {
  await verifySession();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return {
      done: true,
      created: 0,
      updated: 0,
      failed: 0,
      errors: [{ row: 0, message: "Pilih file CSV terlebih dahulu." }],
    };
  }

  const rawText = await file.text();
  const text = rawText.startsWith(String.fromCharCode(0xfeff)) ? rawText.slice(1) : rawText;
  const parsed = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
  });

  const headers = parsed.meta.fields ?? [];
  const missingColumns = CSV_COLUMNS.filter((col) => !headers.includes(col));
  if (missingColumns.length > 0) {
    return {
      done: true,
      created: 0,
      updated: 0,
      failed: 0,
      errors: [{ row: 0, message: `Kolom wajib hilang di CSV: ${missingColumns.join(", ")}.` }],
    };
  }

  const rows = parsed.data;
  if (rows.length === 0) {
    return {
      done: true,
      created: 0,
      updated: 0,
      failed: 0,
      errors: [{ row: 0, message: "File CSV tidak berisi data." }],
    };
  }
  if (rows.length > MAX_IMPORT_ROWS) {
    return {
      done: true,
      created: 0,
      updated: 0,
      failed: 0,
      errors: [{ row: 0, message: `Maksimal ${MAX_IMPORT_ROWS} baris per impor.` }],
    };
  }

  const existingProducts = await prisma.product.findMany({
    select: { id: true, name: true, variant: true },
  });
  const idByKey = new Map(existingProducts.map((p) => [matchKey(p.name, p.variant), p.id]));

  let created = 0;
  let updated = 0;
  let failed = 0;
  const errors: { row: number; message: string }[] = [];

  for (let i = 0; i < rows.length; i++) {
    const rowNumber = i + 2; // baris 1 = header
    const result = parseCsvRecord(rows[i], branches);
    if (!result.ok) {
      failed++;
      errors.push({ row: rowNumber, message: result.error });
      continue;
    }

    const { data } = result;
    const productData = {
      name: data.name,
      category: data.category,
      variant: data.variant,
      condition: data.condition,
      conditionGrade: data.conditionGrade,
      chip: data.chip,
      ram: data.ram,
      storage: data.storage,
      price: data.price,
      originalPrice: data.originalPrice,
      stock: data.stock,
      branchIds: JSON.stringify(data.branchIds),
      warrantyMonths: data.warrantyMonths,
      description: data.description,
      active: data.active,
    };

    try {
      const key = matchKey(data.name, data.variant);
      const existingId = idByKey.get(key);

      if (existingId) {
        // images tidak disentuh sama sekali di sini — foto yang sudah ada tetap.
        await prisma.product.update({ where: { id: existingId }, data: productData });
        updated++;
      } else {
        const id = await uniqueProductSlug(data.name);
        await prisma.product.create({ data: { id, ...productData } });
        idByKey.set(key, id);
        created++;
      }
    } catch (e) {
      failed++;
      errors.push({
        row: rowNumber,
        message: e instanceof Error ? e.message : "Gagal menyimpan baris ini.",
      });
    }
  }

  revalidatePath("/");
  revalidatePath("/katalog");
  revalidatePath("/admin/produk");

  return { done: true, created, updated, failed, errors };
}
