import Link from "next/link";
import { Plus } from "lucide-react";
import { verifySession } from "@/lib/auth/session";
import { getAllProductsForAdmin } from "@/lib/data/get-products";
import { Button } from "@/components/ui/button";
import { ProductTable } from "@/components/admin/product-table";

export default async function AdminProductsPage() {
  await verifySession();
  const products = await getAllProductsForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Produk</h1>
          <p className="mt-1 text-sm text-muted-foreground">{products.length} produk total.</p>
        </div>
        <Button asChild className="bg-brand-700 text-white hover:bg-brand-600">
          <Link href="/admin/produk/baru">
            <Plus className="size-4" />
            Tambah Produk
          </Link>
        </Button>
      </div>

      <div className="mt-6">
        <ProductTable products={products} />
      </div>
    </div>
  );
}
