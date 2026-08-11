import { prisma } from "@/lib/prisma";

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/"/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Slug unik untuk produk baru, dicek ke DB — tambah suffix -2, -3, dst kalau bentrok. */
export async function uniqueProductSlug(name: string, excludeId?: string) {
  const base = slugify(name) || "produk";
  let slug = base;
  let counter = 2;

  while (true) {
    const existing = await prisma.product.findUnique({ where: { id: slug } });
    if (!existing || existing.id === excludeId) return slug;
    slug = `${base}-${counter}`;
    counter += 1;
  }
}
