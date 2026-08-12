import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { branches, buildWhatsAppLink } from "@/lib/config/site";
import { type Product } from "@/lib/data/products";
import { formatRupiah } from "@/lib/format";
import { ProductVisual } from "./product-visual";

export function ProductCard({ product }: { product: Product }) {
  const inStock = product.stock > 0;
  const branchNames = product.branchIds
    .map((id) => branches.find((b) => b.id === id)?.name.split("— ")[1])
    .filter(Boolean);
  const waLink = buildWhatsAppLink(
    `Halo, saya tertarik dengan ${product.name} (${product.variant}) yang tersedia di katalog. Apakah masih ready?`
  );

  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/50 bg-white/70 p-4 shadow-sm backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-brand-300/60 hover:shadow-[0_22px_40px_-15px_rgba(15,118,110,0.12)] group">
      <Link href={`/katalog/${product.id}`} className="block overflow-hidden rounded-2xl">
        <ProductVisual product={product} className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-[1.04]" />
      </Link>

      <div className="flex flex-1 flex-col p-2 pt-4">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/katalog/${product.id}`} className="group/title">
            <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover/title:text-brand-700">{product.name}</h3>
          </Link>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
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
            {!inStock && <Badge variant="destructive">Stok Habis</Badge>}
          </div>
        </div>
        <p className="text-sm font-medium text-muted-foreground">{product.variant}</p>

        <p className="mt-3 text-xl font-bold tracking-tight text-foreground">
          {formatRupiah(product.price)}
        </p>

        {branchNames.length > 0 && (
          <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-brand-500 inline-block animate-pulse"></span>
            Tersedia di {branchNames.join(", ")}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-2">
          <Button asChild variant="outline" className="w-full rounded-full border-border hover:bg-secondary/80 transition-all duration-300">
            <Link href={`/katalog/${product.id}`}>Lihat Detail</Link>
          </Button>
          <Button asChild className="w-full bg-gradient-to-r from-brand-700 to-brand-600 hover:from-brand-600 hover:to-brand-500 text-white rounded-full transition-all duration-300 shadow-md shadow-brand-900/10 hover:shadow-lg hover:shadow-brand-900/20 shimmer-button">
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" />
              {inStock ? "Chat Sekarang" : "Tanya Ketersediaan"}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
