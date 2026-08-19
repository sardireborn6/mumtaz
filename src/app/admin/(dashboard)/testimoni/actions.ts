"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/auth/session";

const testimonialSchema = z.object({
  name: z.string().min(2, "Nama pelanggan minimal 2 karakter."),
  city: z.string().min(2, "Kota minimal 2 karakter."),
  rating: z.coerce.number().int().min(1, "Rating minimal 1.").max(5, "Rating maksimal 5."),
  comment: z.string().min(10, "Komentar minimal 10 karakter."),
  order: z.coerce.number().int().default(0),
  active: z.boolean().default(true),
});

export type TestimonialFormState = { error?: string } | undefined;

function parseFormData(formData: FormData) {
  return testimonialSchema.safeParse({
    name: formData.get("name"),
    city: formData.get("city"),
    rating: formData.get("rating") || 5,
    comment: formData.get("comment"),
    order: formData.get("order") || 0,
    active: formData.get("active") === "on",
  });
}

export async function createTestimonial(
  _prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  await verifySession();

  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  await prisma.testimonial.create({ data: parsed.data });

  revalidatePath("/");
  revalidatePath("/admin/testimoni");
  redirect("/admin/testimoni");
}

export async function updateTestimonial(
  id: string,
  _prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  await verifySession();

  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  await prisma.testimonial.update({ where: { id }, data: parsed.data });

  revalidatePath("/");
  revalidatePath("/admin/testimoni");
  redirect("/admin/testimoni");
}

export async function deleteTestimonial(id: string) {
  await verifySession();

  await prisma.testimonial.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/testimoni");
}

export async function toggleTestimonialActive(id: string, active: boolean) {
  await verifySession();

  await prisma.testimonial.update({ where: { id }, data: { active } });

  revalidatePath("/");
  revalidatePath("/admin/testimoni");
}
