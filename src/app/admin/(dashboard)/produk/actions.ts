"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/auth/session";
import { uniqueProductSlug } from "@/lib/slugify";
import { saveUploadedImages, deleteUploadedImage } from "@/lib/upload";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_CONDITIONS,
  CONDITION_GRADES,
} from "@/lib/data/products";

const productSchema = z
  .object({
    name: z.string().min(2, "Nama produk minimal 2 karakter."),
    category: z.enum(PRODUCT_CATEGORIES as [string, ...string[]]),
    variant: z.string().min(1, "Varian wajib diisi."),
    condition: z.enum(PRODUCT_CONDITIONS as [string, ...string[]]),
    conditionGrade: z.union([z.enum(CONDITION_GRADES as [string, ...string[]]), z.literal("")]),
    chip: z.string().min(1, "Chip wajib diisi."),
    ram: z.string().min(1, "RAM wajib diisi."),
    storage: z.string().min(1, "Storage wajib diisi."),
    price: z.coerce.number().int().positive("Harga harus lebih dari 0."),
    originalPrice: z
      .string()
      .optional()
      .transform((v) => (v && v.trim() !== "" ? Number(v) : null))
      .refine(
        (v) => v === null || (Number.isInteger(v) && v > 0),
        "Harga coret harus lebih dari 0."
      ),
    stock: z.coerce.number().int().min(0),
    warrantyMonths: z.coerce.number().int().min(0),
    description: z.string().min(1, "Deskripsi wajib diisi."),
    active: z.union([z.literal("on"), z.null()]).optional(),
    branchIds: z.array(z.string()).default([]),
    existingImages: z.string().default("[]"),
  })
  .refine((data) => data.originalPrice === null || data.originalPrice > data.price, {
    message: "Harga coret harus lebih besar dari harga jual.",
    path: ["originalPrice"],
  });

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
