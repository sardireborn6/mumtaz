"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { importProducts, type ImportProductsState } from "@/app/admin/(dashboard)/produk/actions";

export function ProductImportDialog() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<ImportProductsState, FormData>(
    importProducts,
    undefined
  );

  useEffect(() => {
    if (state?.done) {
      router.refresh();
    }
  }, [state, router]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="size-4" />
          Impor CSV
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Impor Produk dari CSV</DialogTitle>
          <DialogDescription>
            Kolomnya harus sama seperti hasil{" "}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- route handler unduhan file, bukan halaman */}
            <a href="/admin/produk/export" className="font-medium text-brand-700 underline">
              Export CSV
            </a>
            . Produk dengan Nama + Varian yang sama persis akan diperbarui datanya (foto yang sudah
            ada tidak berubah); yang belum ada akan dibuat sebagai produk baru tanpa foto.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="import-file">File CSV</Label>
            <Input id="import-file" name="file" type="file" accept=".csv,text/csv" required />
          </div>

          <Button
            type="submit"
            disabled={pending}
            className="bg-brand-700 text-white hover:bg-brand-600"
          >
            {pending ? "Mengimpor…" : "Impor"}
          </Button>
        </form>

        {state?.done && (
          <div className="rounded-xl border border-border bg-secondary/40 p-4 text-sm">
            <p className="font-medium text-foreground">
              {state.created} dibuat · {state.updated} diperbarui · {state.failed} gagal
            </p>
            {state.errors.length > 0 && (
              <ul className="mt-2 max-h-40 space-y-1 overflow-y-auto text-xs text-destructive">
                {state.errors.map((e, i) => (
                  <li key={i}>
                    {e.row > 0 ? `Baris ${e.row}: ` : ""}
                    {e.message}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
