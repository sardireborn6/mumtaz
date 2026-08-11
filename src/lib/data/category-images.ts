import type { Product, ProductCategory } from "./products";

// Foto studio generik per kategori (bukan foto unit fisik spesifik) —
// dipakai sebagai fallback selama admin belum upload foto unit asli.
const categoryImages: Record<ProductCategory, string> = {
  MacBook: "/macbook-pro.png",
  iMac: "/imac.png",
  "Mac Mini": "/mac-mini.png",
  iPad: "/ipad.png",
};

export function getCategoryImage(product: Pick<Product, "category" | "variant">) {
  if (product.category === "MacBook" && product.variant.toLowerCase().includes("air")) {
    return "/macbook-air.png";
  }
  return categoryImages[product.category];
}
