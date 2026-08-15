import { z } from "zod";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_CONDITIONS,
  CONDITION_GRADES,
} from "@/lib/data/products";

export const productBaseFields = {
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
};

function checkOriginalPrice(data: { price: number; originalPrice: number | null }) {
  return data.originalPrice === null || data.originalPrice > data.price;
}

export const originalPriceRefinement = {
  message: "Harga coret harus lebih besar dari harga jual.",
  path: ["originalPrice"],
};

/** Terapkan aturan "harga coret harus lebih besar dari harga jual" ke schema apa pun yang punya field price & originalPrice. */
export function refineOriginalPrice<T extends { price: number; originalPrice: number | null }>(
  schema: z.ZodType<T>
) {
  return schema.refine(checkOriginalPrice, originalPriceRefinement);
}
