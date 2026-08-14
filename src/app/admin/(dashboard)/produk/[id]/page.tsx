import { notFound } from "next/navigation";
import { verifySession } from "@/lib/auth/session";
import { getProductByIdForAdmin } from "@/lib/data/get-products";
import { getBranches } from "@/lib/data/get-branches";
import { ProductForm } from "@/components/admin/product-form";
import { updateProduct } from "@/app/admin/(dashboard)/produk/actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await verifySession();
  const { id } = await params;
  const [product, branches] = await Promise.all([
    getProductByIdForAdmin(id),
    getBranches(),
  ]);
  if (!product) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Edit Produk</h1>
      <div className="mt-6 max-w-3xl rounded-2xl border border-border bg-card p-6">
        <ProductForm product={product} action={updateProduct.bind(null, product.id)} branches={branches} />
      </div>
    </div>
  );
}
