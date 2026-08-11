import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MapPin, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { ProductGallery } from "@/components/katalog/product-gallery";
import { branches, buildWhatsAppLink } from "@/lib/config/site";
import { getProductById } from "@/lib/data/get-products";
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
    <main className="flex-1">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
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

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <ProductGallery product={product} />

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                className={
                  product.condition === "Baru"
                    ? "bg-brand-50 text-brand-700"
                    : "bg-secondary text-muted-foreground"
                }
              >
                {product.condition}
                {product.conditionGrade ? ` · ${product.conditionGrade}` : ""}
              </Badge>
              <Badge variant="outline" className="gap-1">
                <ShieldCheck className="size-3.5 text-brand-700" />
                Garansi {product.warrantyMonths} bulan
              </Badge>
              {!inStock && <Badge variant="destructive">Stok Habis</Badge>}
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
              {product.name}
            </h1>
            <p className="mt-1 text-muted-foreground">{product.variant}</p>

            <p className="mt-5 text-3xl font-semibold tracking-tight text-brand-700">
              {formatRupiah(product.price)}
            </p>

            <dl className="mt-6 grid grid-cols-3 gap-4 rounded-2xl border border-border bg-card p-5">
              <div>
                <dt className="text-xs text-muted-foreground">Chip</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">{product.specs.chip}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">RAM</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">{product.specs.ram}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Storage</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">
                  {product.specs.storage}
                </dd>
              </div>
            </dl>

            <p className="mt-6 leading-relaxed text-foreground/90">{product.description}</p>

            {availableBranches.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-medium text-foreground">Tersedia di cabang</p>
                <ul className="mt-2 space-y-1.5">
                  {availableBranches.map((b) => (
                    <li
                      key={b.id}
                      className="flex items-center gap-1.5 text-sm text-muted-foreground"
                    >
                      <MapPin className="size-3.5 shrink-0 text-brand-700" />
                      {b.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-brand-700 text-white hover:bg-brand-600">
                <a href={waLink} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-4" />
                  {inStock ? "Tanya via WhatsApp" : "Tanya Ketersediaan"}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/katalog">Kembali ke Katalog</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
