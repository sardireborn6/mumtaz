// Tipe produk yang dipakai di seluruh app (landing, katalog, admin). Data
// aslinya sekarang di database (Prisma) — lihat lib/data/get-products.ts
// untuk query & mapping baris DB ke bentuk tipe ini, dan prisma/seed.ts
// untuk data awal.

export type ProductCategory = "MacBook" | "iMac" | "Mac Mini" | "iPad";
export type ProductCondition = "Baru" | "Second";
export type ConditionGrade = "Mulus" | "Good" | "Fair";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  variant: string;
  condition: ProductCondition;
  conditionGrade?: ConditionGrade;
  specs: {
    chip: string;
    ram: string;
    storage: string;
  };
  price: number;
  originalPrice?: number;
  stock: number;
  branchIds: string[];
  warrantyMonths: number;
  description: string;
  images: string[];
  active: boolean;
  createdAt: string;
};

export const PRODUCT_CATEGORIES: ProductCategory[] = ["MacBook", "iMac", "Mac Mini", "iPad"];
export const PRODUCT_CONDITIONS: ProductCondition[] = ["Baru", "Second"];
export const CONDITION_GRADES: ConditionGrade[] = ["Mulus", "Good", "Fair"];
