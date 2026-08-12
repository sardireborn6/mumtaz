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
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory ?? "Semua");
  const [selectedCondition, setSelectedCondition] = useState("Semua");
  const [sortBy, setSortBy] = useState("Terbaru");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const categories = ["Semua", "MacBook", "iMac", "Mac Mini", "iPad"];
  const conditions = ["Semua", "Baru", "Second"];

  const filtered = useMemo(() => {
    let result = products;

    // Filter by category
    if (selectedCategory !== "Semua") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by condition
    if (selectedCondition !== "Semua") {
      result = result.filter((p) => p.condition === selectedCondition);
    }

    // Filter by search query
    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter((p) =>
        `${p.name} ${p.variant} ${p.category} ${p.condition}`.toLowerCase().includes(q)
      );
    }

    // Sorting
    return [...result].sort((a, b) => {
      if (sortBy === "HargaTerendah") {
        return a.price - b.price;
      }
      if (sortBy === "HargaTertinggi") {
        return b.price - a.price;
      }
      // default: Terbaru
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [products, search, selectedCategory, selectedCondition, sortBy]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="space-y-8">
      {/* Search & Sort Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cari nama produk, model, atau spesifikasi (mis. M3, 16GB)…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            className="h-13 pl-12 pr-4 rounded-full bg-white/70 border-white/50 shadow-sm focus:bg-white transition-all duration-300"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Urutkan:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-13 px-4 rounded-full border border-white/50 bg-white/70 text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-600 cursor-pointer"
          >
            <option value="Terbaru">Terbaru</option>
            <option value="HargaTerendah">Harga Terendah</option>
            <option value="HargaTertinggi">Harga Tertinggi</option>
          </select>
        </div>
      </div>

      {/* Filter Chips Container */}
      <div className="flex flex-col gap-4 border-y border-border/40 py-5">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground w-20">Kategori:</span>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setVisibleCount(PAGE_SIZE);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-brand-700 border-brand-700 text-white shadow-sm"
                    : "bg-white/60 border-white/50 hover:bg-white text-foreground/80 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Condition */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground w-20">Kondisi:</span>
          <div className="flex flex-wrap gap-1.5">
            {conditions.map((cond) => (
              <button
                key={cond}
                onClick={() => {
                  setSelectedCondition(cond);
                  setVisibleCount(PAGE_SIZE);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 ${
                  selectedCondition === cond
                    ? "bg-brand-700 border-brand-700 text-white shadow-sm"
                    : "bg-white/60 border-white/50 hover:bg-white text-foreground/80 hover:text-foreground"
                }`}
              >
                {cond === "Semua" ? "Semua Kondisi" : cond}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-muted-foreground">
          Menampilkan {visible.length} dari {filtered.length} produk
        </p>
        {(selectedCategory !== "Semua" || selectedCondition !== "Semua" || search !== "") && (
          <button
            onClick={() => {
              setSelectedCategory("Semua");
              setSelectedCondition("Semua");
              setSearch("");
              setVisibleCount(PAGE_SIZE);
            }}
            className="text-xs font-bold text-brand-700 hover:text-brand-600 transition-colors"
          >
            Bersihkan Filter
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center rounded-3xl border border-dashed border-border/60 bg-white/50 py-20 text-center backdrop-blur-sm">
          <PackageSearch className="size-12 text-muted-foreground" strokeWidth={1.5} />
          <p className="mt-4 text-lg font-bold text-foreground">Produk tidak ditemukan</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground leading-relaxed">
            Coba kata kunci lain, bersihkan filter Anda, atau hubungi kami langsung — unit yang Anda cari mungkin belum tercantum di katalog online kami.
          </p>
          <Button
            onClick={() => {
              setSelectedCategory("Semua");
              setSelectedCondition("Semua");
              setSearch("");
              setVisibleCount(PAGE_SIZE);
            }}
            variant="outline"
            className="mt-6 rounded-full border-border hover:bg-secondary"
          >
            Reset Pencarian
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-12 flex justify-center">
              <Button
                variant="outline"
                className="rounded-full border-border bg-white/60 hover:bg-secondary/80 px-8 py-6 transition-all duration-300"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              >
                Muat Lebih Banyak
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
