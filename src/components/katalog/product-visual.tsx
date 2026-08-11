import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/data/products";
import { getCategoryImage } from "@/lib/data/category-images";

// Prioritas tampilan: (1) foto unit asli — nanti di-upload lewat Admin Panel
// di Phase 4, (2) foto studio generik per kategori sebagai placeholder yang
// jauh lebih hidup daripada ikon kosong. Untuk unit "Second" yang masih
// pakai foto generik, diberi label "Foto ilustrasi" — foto studio bukan foto
// unit fisik yang sebenarnya, jadi jangan sampai terkesan itu foto asli unit
// bekas yang dijual.
export function ProductVisual({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const realPhoto = product.images[0];
  const photo = realPhoto ?? getCategoryImage(product);
  const isIllustrative = !realPhoto && product.condition === "Second";

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-secondary/40 ${className ?? ""}`}>
      <Image
        src={photo}
        alt={product.name}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />
      {isIllustrative && (
        <Badge
          variant="secondary"
          className="absolute bottom-2.5 left-2.5 bg-background/85 text-muted-foreground backdrop-blur"
        >
          Foto ilustrasi
        </Badge>
      )}
    </div>
  );
}
