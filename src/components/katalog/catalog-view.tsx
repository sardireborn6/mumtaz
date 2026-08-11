"use client";

import { useMemo, useState } from "react";
import { PackageSearch, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Product } from "@/lib/data/products";
import { ProductCard } from "./product-card";

const PAGE_SIZE = 6;

export function CatalogView({
  products,
  initialCategory,
}: {
  products: Product[];
  initialCategory?: string;
}) {
  const [search, setSearch] = useState(initialCategory ?? "");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const result: Product[] = products.filter((p) => {
      if (!q) return true;
      return `${p.name} ${p.variant} ${p.category} ${p.condition}`.toLowerCase().includes(q);
    });

    return [...result].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [products, search]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari nama produk, model, atau kategori (mis. MacBook, iPad)…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
          className="h-12 pl-11"
        />
      </div>

      <p className="mt-5 text-sm text-muted-foreground">
        Menampilkan {visible.length} dari {filtered.length} produk
      </p>

      {filtered.length === 0 ? (
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-border py-20 text-center">
          <PackageSearch className="size-10 text-muted-foreground" strokeWidth={1.5} />
          <p className="mt-4 font-semibold text-foreground">Produk tidak ditemukan</p>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Coba kata kunci lain, atau hubungi kami langsung — unit yang Anda cari mungkin
            belum tercantum di katalog online.
          </p>
          <Button onClick={() => setSearch("")} variant="outline" className="mt-5">
            Reset Pencarian
          </Button>
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-10 flex justify-center">
              <Button variant="outline" onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>
                Muat Lebih Banyak
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
