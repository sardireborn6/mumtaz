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
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <Link href={`/katalog/${product.id}`} className="block">
        <ProductVisual product={product} className="aspect-[4/3] w-full" />
      </Link>

      <div className="flex flex-1 flex-col p-2 pt-4">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/katalog/${product.id}`} className="hover:underline">
            <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
          </Link>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
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
            {!inStock && <Badge variant="destructive">Stok Habis</Badge>}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{product.variant}</p>

        <p className="mt-3 text-xl font-semibold tracking-tight text-foreground">
          {formatRupiah(product.price)}
        </p>

        {branchNames.length > 0 && (
          <p className="mt-1 text-xs text-muted-foreground">
            Tersedia di {branchNames.join(", ")}
          </p>
        )}

        <div className="mt-5 flex flex-col gap-2">
          <Button asChild variant="outline" className="w-full">
            <Link href={`/katalog/${product.id}`}>Lihat Detail</Link>
          </Button>
          <Button asChild className="w-full bg-brand-700 text-white hover:bg-brand-600">
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
