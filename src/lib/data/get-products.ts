import { prisma } from "@/lib/prisma";
import type {
  Product,
  ProductCategory,
  ProductCondition,
  ConditionGrade,
} from "@/lib/data/products";
import type { Product as ProductRow, ProductImage } from "@/generated/prisma/client";

type ProductRowWithImages = ProductRow & { images: ProductImage[] };

function mapProduct(row: ProductRowWithImages): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category as ProductCategory,
    variant: row.variant,
    condition: row.condition as ProductCondition,
    conditionGrade: (row.conditionGrade as ConditionGrade | null) ?? undefined,
    specs: { chip: row.chip, ram: row.ram, storage: row.storage },
    price: row.price,
    originalPrice: row.originalPrice ?? undefined,
    stock: row.stock,
    branchIds: JSON.parse(row.branchIds) as string[],
    warrantyMonths: row.warrantyMonths,
    description: row.description,
    images: [...row.images].sort((a, b) => a.order - b.order).map((img) => img.url),
    active: row.active,
    createdAt: row.createdAt.toISOString(),
  };
}

/** Semua produk aktif, dipakai halaman katalog publik. */
export async function getProducts(): Promise<Product[]> {
  try {
    const rows = await prisma.product.findMany({
      where: { active: true },
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });
    return rows.map(mapProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

/** Produk aktif & stok tersedia, dipakai section "Produk Unggulan" di landing page. */
export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  try {
    const rows = await prisma.product.findMany({
      where: { active: true, stock: { gt: 0 } },
      include: { images: true },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return rows.map(mapProduct);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

/** Satu produk aktif berdasar id/slug, dipakai halaman detail produk publik. */
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const row = await prisma.product.findFirst({
      where: { id, active: true },
      include: { images: true },
    });
    return row ? mapProduct(row) : null;
  } catch (error) {
    console.error("Error fetching product by id:", error);
    return null;
  }
}

/** Semua produk (termasuk nonaktif), dipakai tabel admin. */
export async function getAllProductsForAdmin(): Promise<Product[]> {
  try {
    const rows = await prisma.product.findMany({
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });
    return rows.map(mapProduct);
  } catch (error) {
    console.error("Error fetching admin products:", error);
    return [];
  }
}

/** Satu produk apa pun status aktifnya, dipakai form edit admin. */
export async function getProductByIdForAdmin(id: string): Promise<Product | null> {
  try {
    const row = await prisma.product.findUnique({
      where: { id },
      include: { images: true },
    });
    return row ? mapProduct(row) : null;
  } catch (error) {
    console.error("Error fetching product by id for admin:", error);
    return null;
  }
}
