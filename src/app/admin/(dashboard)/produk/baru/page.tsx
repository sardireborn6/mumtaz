import { verifySession } from "@/lib/auth/session";
import { ProductForm } from "@/components/admin/product-form";
import { createProduct } from "@/app/admin/(dashboard)/produk/actions";

export default async function NewProductPage() {
  await verifySession();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Tambah Produk</h1>
      <div className="mt-6 max-w-3xl rounded-2xl border border-border bg-card p-6">
        <ProductForm action={createProduct} />
      </div>
    </div>
  );
}
