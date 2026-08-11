import type { Metadata } from "next";
import { CatalogView } from "@/components/katalog/catalog-view";
import { getProducts } from "@/lib/data/get-products";

export const metadata: Metadata = {
  title: "Katalog Produk",
  description:
    "Jelajahi katalog MacBook, iMac, Mac Mini, dan iPad baru & second dari Mumtaz MacBook Store — filter kategori, kondisi, harga, dan cabang.",
};

export default async function KatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>;
}) {
  const { kategori } = await searchParams;
  const products = await getProducts();

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-brand-700">Katalog Produk</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Temukan unit Apple yang sesuai kebutuhan Anda
        </h1>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          Semua unit sudah dicek fisik & fungsi, bergaransi resmi dari toko.
        </p>

        <div className="mt-8">
          <CatalogView products={products} initialCategory={kategori} />
        </div>
      </div>
    </main>
  );
}
