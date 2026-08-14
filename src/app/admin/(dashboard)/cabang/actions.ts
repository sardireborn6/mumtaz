"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/auth/session";

const branchSchema = z.object({
  name: z.string().min(2, "Nama cabang minimal 2 karakter."),
  address: z.string().min(5, "Alamat cabang minimal 5 karakter."),
  hours: z.string().min(2, "Jam operasional wajib diisi."),
  whatsappNumber: z
    .string()
    .min(10, "Nomor WhatsApp minimal 10 digit.")
    .regex(/^62\d+$/, "Nomor WhatsApp harus diawali kode negara 62 (contoh: 6281234567890)."),
  mapsUrl: z.string().url("Link Google Maps harus berupa URL valid.").or(z.literal("")),
  order: z.coerce.number().int().default(0),
});

export type BranchFormState = { error?: string } | undefined;

function parseFormData(formData: FormData) {
  return branchSchema.safeParse({
    name: formData.get("name"),
    address: formData.get("address"),
    hours: formData.get("hours"),
    whatsappNumber: formData.get("whatsappNumber"),
    mapsUrl: formData.get("mapsUrl") || "",
    order: formData.get("order") || 0,
  });
}

export async function createBranch(
  _prevState: BranchFormState,
  formData: FormData
): Promise<BranchFormState> {
  await verifySession();

  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  const data = parsed.data;

  await prisma.branch.create({
    data: {
      name: data.name,
      address: data.address,
      hours: data.hours,
      whatsappNumber: data.whatsappNumber,
      mapsUrl: data.mapsUrl,
      order: data.order,
    },
  });

  revalidatePath("/");
  revalidatePath("/katalog");
  revalidatePath("/admin/cabang");
  revalidatePath("/admin/produk");
  redirect("/admin/cabang");
}

export async function updateBranch(
  id: string,
  _prevState: BranchFormState,
  formData: FormData
): Promise<BranchFormState> {
  await verifySession();

  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  const data = parsed.data;

  await prisma.branch.update({
    where: { id },
    data: {
      name: data.name,
      address: data.address,
      hours: data.hours,
      whatsappNumber: data.whatsappNumber,
      mapsUrl: data.mapsUrl,
      order: data.order,
    },
  });

  revalidatePath("/");
  revalidatePath("/katalog");
  revalidatePath("/admin/cabang");
  revalidatePath("/admin/produk");
  redirect("/admin/cabang");
}

export async function deleteBranch(id: string) {
  await verifySession();

  await prisma.branch.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/katalog");
  revalidatePath("/admin/cabang");
  revalidatePath("/admin/produk");
}
