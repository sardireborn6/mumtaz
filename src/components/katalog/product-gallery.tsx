import type { Product } from "@/lib/data/products";
import { ProductVisual } from "./product-visual";

export function ProductGallery({ product }: { product: Product }) {
  return (
    <div className="relative">
      <ProductVisual product={product} className="aspect-square w-full" />
      {product.images.length === 0 && (
        <p className="mt-3 text-center text-xs text-muted-foreground">
          hubungi kami untuk foto/video unit selengkapnya.
        </p>
      )}
    </div>
  );
}
