import Link from "next/link";
import { ProductCard } from "@/components/katalog/product-card";
import type { Product } from "@/lib/data/products";
import { Reveal } from "./reveal";

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-brand-700">Produk Unggulan</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
              Unit pilihan yang sedang tersedia
            </h2>
          </div>
          <Link
            href="/katalog"
            className="text-sm font-medium text-brand-700 hover:text-brand-600"
          >
            Lihat semua produk →
          </Link>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.05}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
