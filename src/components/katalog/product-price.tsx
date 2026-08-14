import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

const priceSizeClasses = {
  sm: "text-sm font-bold",
  md: "text-xl font-bold",
  lg: "text-3xl font-extrabold font-heading",
} as const;

const originalPriceSizeClasses = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const;

export function ProductPrice({
  price,
  originalPrice,
  size = "md",
  className,
}: {
  price: number;
  originalPrice?: number;
  size?: keyof typeof priceSizeClasses;
  className?: string;
}) {
  const hasPromo = typeof originalPrice === "number" && originalPrice > price;

  if (!hasPromo) {
    return (
      <p className={cn(priceSizeClasses[size], "tracking-tight text-brand-700", className)}>
        {formatRupiah(price)}
      </p>
    );
  }

  const discountPercent = Math.round((1 - price / originalPrice) * 100);

  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-0.5", className)}>
      <p className={cn(priceSizeClasses[size], "tracking-tight text-brand-700")}>
        {formatRupiah(price)}
      </p>
      <p className={cn(originalPriceSizeClasses[size], "text-muted-foreground line-through")}>
        {formatRupiah(originalPrice)}
      </p>
      <span className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-1.5 py-0.5 text-[10px] font-bold text-rose-600">
        -{discountPercent}%
      </span>
    </div>
  );
}
