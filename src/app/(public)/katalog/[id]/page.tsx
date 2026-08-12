import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MapPin, ShieldCheck, Cpu, Layers, HardDrive } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { ProductGallery } from "@/components/katalog/product-gallery";
import { ProductCard } from "@/components/katalog/product-card";
import { branches, buildWhatsAppLink } from "@/lib/config/site";
import { getProductById, getProducts } from "@/lib/data/get-products";
import { formatRupiah } from "@/lib/format";

// Produk sekarang dinamis dari database (bisa berubah kapan saja lewat admin
// panel) — tidak lagi di-generate statis saat build seperti sebelumnya.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return {};

  return {
    title: product.name,
    description: `${product.name} (${product.variant}) — ${product.condition}, ${formatRupiah(
      product.price
    )}. ${product.description}`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const inStock = product.stock > 0;
  const availableBranches = branches.filter((b) => product.branchIds.includes(b.id));
  const waLink = buildWhatsAppLink(
    `Halo, saya ingin tanya lebih lanjut soal ${product.name} (${product.variant}) yang saya lihat di katalog.`
  );

  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      price: product.price,
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition:
        product.condition === "Baru"
          ? "https://schema.org/NewCondition"
          : "https://schema.org/UsedCondition",
    },
  };

  return (
    <main className="flex-1 bg-[#FAFAF9]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Beranda
          </Link>
          <ChevronRight className="size-3.5" />
          <Link href="/katalog" className="hover:text-foreground">
            Katalog
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <ProductGallery product={product} />

          <div className="flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  className={
                    product.condition === "Baru"
                      ? "bg-accent-gold-100 text-accent-gold-700 border-accent-gold-500/20"
                      : "bg-secondary text-muted-foreground border-transparent"
                  }
                >
                  {product.condition}
                  {product.conditionGrade ? ` · ${product.conditionGrade}` : ""}
                </Badge>
                <Badge variant="outline" className="gap-1 border-border/60">
                  <ShieldCheck className="size-3.5 text-brand-700" />
                  Garansi {product.warrantyMonths} bulan
                </Badge>
                {!inStock && <Badge variant="destructive">Stok Habis</Badge>}
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl font-heading">
                {product.name}
              </h1>
              <p className="mt-1 text-base text-muted-foreground">{product.variant}</p>

              <p className="mt-6 text-3xl font-extrabold tracking-tight text-brand-700 font-heading">
                {formatRupiah(product.price)}
              </p>

              {/* Advanced visual spec badges */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center justify-center rounded-2xl border border-white/50 bg-white/60 p-4 text-center backdrop-blur-sm shadow-sm">
                  <Cpu className="size-5 text-brand-700 mb-1" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Chip</span>
                  <span className="mt-1 text-sm font-bold text-foreground">{product.specs.chip}</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl border border-white/50 bg-white/60 p-4 text-center backdrop-blur-sm shadow-sm">
                  <Layers className="size-5 text-brand-700 mb-1" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">RAM</span>
                  <span className="mt-1 text-sm font-bold text-foreground">{product.specs.ram}</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl border border-white/50 bg-white/60 p-4 text-center backdrop-blur-sm shadow-sm">
                  <HardDrive className="size-5 text-brand-700 mb-1" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Storage</span>
                  <span className="mt-1 text-sm font-bold text-foreground">{product.specs.storage}</span>
                </div>
              </div>

              <p className="mt-8 leading-relaxed text-foreground/80 text-sm sm:text-base border-t border-border/40 pt-6">
                {product.description}
              </p>

              {availableBranches.length > 0 && (
                <div className="mt-8 border-t border-border/40 pt-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground">Tersedia di cabang</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {availableBranches.map((b) => (
                      <span
                        key={b.id}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-white/80 px-3.5 py-1 text-xs font-semibold text-muted-foreground shadow-sm"
                      >
                        <MapPin className="size-3.5 text-brand-700" />
                        {b.name.split("— ")[1] || b.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row border-t border-border/40 pt-6">
              <Button asChild size="lg" className="bg-gradient-to-r from-brand-700 to-brand-600 hover:from-brand-600 hover:to-brand-500 text-white rounded-full px-8 py-7 text-base font-semibold shadow-lg shadow-brand-900/10 hover:shadow-xl hover:shadow-brand-900/20 transition-all duration-300 shimmer-button">
                <a href={waLink} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-4" />
                  {inStock ? "Tanya via WhatsApp" : "Tanya Ketersediaan"}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 py-7 text-base font-semibold border-border hover:bg-secondary/60 transition-all duration-300 bg-white/40">
                <Link href="/katalog">Kembali ke Katalog</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-border/40 pt-16">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl font-heading">
              Unit Sejenis Lainnya
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Rekomendasi MacBook atau unit Apple sejenis yang mungkin menarik bagi Anda.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
