import Link from "next/link";
import { Download, Plus } from "lucide-react";
import { verifySession } from "@/lib/auth/session";
import { getAllProductsForAdmin } from "@/lib/data/get-products";
import { Button } from "@/components/ui/button";
import { ProductTable } from "@/components/admin/product-table";
import { ProductImportDialog } from "@/components/admin/product-import-dialog";

export default async function AdminProductsPage() {
  await verifySession();
  const products = await getAllProductsForAdmin();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Produk</h1>
          <p className="mt-1 text-sm text-muted-foreground">{products.length} produk total.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button asChild variant="outline">
            {/* Route handler yang men-download file CSV, bukan halaman — sengaja pakai <a> biasa. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/admin/produk/export">
              <Download className="size-4" />
              Export CSV
            </a>
          </Button>
          <ProductImportDialog />
          <Button asChild className="bg-brand-700 text-white hover:bg-brand-600">
            <Link href="/admin/produk/baru">
              <Plus className="size-4" />
              Tambah Produk
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <ProductTable products={products} />
      </div>
    </div>
  );
}
