import Link from "next/link";
import { ProductCard } from "@/components/katalog/product-card";
import type { Product } from "@/lib/data/products";
import { Reveal } from "./reveal";

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="bg-gradient-to-b from-transparent to-secondary/35">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end border-b border-border/40 pb-6">
          <div>
            <p className="text-xs uppercase font-bold tracking-[0.2em] text-brand-700">Produk Unggulan</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Unit pilihan yang sedang tersedia
            </h2>
          </div>
          <Link
            href="/katalog"
            className="text-sm font-bold text-brand-700 hover:text-brand-600 flex items-center gap-1 transition-colors group"
          >
            Lihat semua produk <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
