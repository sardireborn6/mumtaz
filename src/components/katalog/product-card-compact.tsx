"use client";

import { useState } from "react";
import Link from "next/link";
import { Cpu, HardDrive, Layers, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { BranchSelectorDialog } from "@/components/landing/branch-selector-dialog";
import { branches } from "@/lib/config/site";
import { type Product } from "@/lib/data/products";
import { ProductPrice } from "./product-price";
import { ProductVisual } from "./product-visual";

export function ProductCardCompact({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const inStock = product.stock > 0;
  const productBranches = branches.filter((b) => product.branchIds.includes(b.id));
  const branchNames = product.branchIds
    .map((id) => branches.find((b) => b.id === id)?.name.split("— ")[1])
    .filter(Boolean);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button type="button" className="block w-full text-left">
          <ProductVisual
            product={product}
            className="aspect-square w-full"
            sizes="33vw"
          />
          <div className="mt-2 px-0.5">
            <p className="line-clamp-2 text-xs font-semibold leading-snug text-foreground">
              {product.name}
            </p>
            <ProductPrice
              price={product.price}
              originalPrice={product.originalPrice}
              size="sm"
              className="mt-1"
            />
          </div>
        </button>
      </SheetTrigger>

      <SheetContent side="bottom" className="max-h-[88vh] overflow-y-auto rounded-t-3xl">
        <div className="px-4 pb-6">
          <ProductVisual product={product} className="aspect-[4/3] w-full" sizes="90vw" />

          <div className="mt-4 flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold tracking-tight text-foreground">{product.name}</h3>
              <p className="text-sm font-medium text-muted-foreground">{product.variant}</p>
            </div>
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

          <ProductPrice
            price={product.price}
            originalPrice={product.originalPrice}
            size="lg"
            className="mt-3"
          />

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-secondary/40 p-3 text-center">
              <Cpu className="size-4 text-brand-700 mb-1" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Chip</span>
              <span className="mt-0.5 text-xs font-bold text-foreground">{product.specs.chip}</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-secondary/40 p-3 text-center">
              <Layers className="size-4 text-brand-700 mb-1" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">RAM</span>
              <span className="mt-0.5 text-xs font-bold text-foreground">{product.specs.ram}</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-secondary/40 p-3 text-center">
              <HardDrive className="size-4 text-brand-700 mb-1" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Storage</span>
              <span className="mt-0.5 text-xs font-bold text-foreground">{product.specs.storage}</span>
            </div>
          </div>

          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-foreground/80">
            {product.description}
          </p>

          {branchNames.length > 0 && (
            <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="size-3.5 shrink-0 text-brand-700" />
              Tersedia di {branchNames.join(", ")}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-2">
            <BranchSelectorDialog
              branches={productBranches}
              customMessage={`Halo, saya tertarik dengan ${product.name} (${product.variant}) yang tersedia di katalog. Apakah masih ready?`}
            >
              <Button className="w-full bg-gradient-to-r from-brand-700 to-brand-600 hover:from-brand-600 hover:to-brand-500 text-white rounded-full transition-all duration-300 shadow-md shadow-brand-900/10 shimmer-button">
                <WhatsAppIcon className="size-4" />
                {inStock ? "Chat Sekarang" : "Tanya Ketersediaan"}
              </Button>
            </BranchSelectorDialog>
            <Button asChild variant="outline" className="w-full rounded-full border-border">
              <Link href={`/katalog/${product.id}`}>Lihat Detail Lengkap</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
