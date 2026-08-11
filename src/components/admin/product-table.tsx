"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Search, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatRupiah } from "@/lib/format";
import type { Product } from "@/lib/data/products";
import { deleteProduct, toggleProductActive, updateProductStock } from "@/app/admin/(dashboard)/produk/actions";

export function ProductTable({ products }: { products: Product[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => `${p.name} ${p.variant} ${p.category}`.toLowerCase().includes(q));
  }, [products, search]);

  function handleToggleActive(id: string, active: boolean) {
    startTransition(async () => {
      await toggleProductActive(id, active);
      router.refresh();
    });
  }

  function handleStockChange(id: string, value: string) {
    const stock = Number.parseInt(value, 10);
    if (Number.isNaN(stock) || stock < 0) return;
    startTransition(async () => {
      await updateProductStock(id, stock);
      router.refresh();
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteProduct(id);
      router.refresh();
    });
  }

  return (
    <div>
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari produk…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produk</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Stok</TableHead>
              <TableHead>Aktif</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <p className="font-medium text-foreground">{product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {product.category} · {product.condition}
                  </p>
                </TableCell>
                <TableCell>{formatRupiah(product.price)}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min={0}
                    defaultValue={product.stock}
                    disabled={isPending}
                    onBlur={(e) => handleStockChange(product.id, e.target.value)}
                    className="h-9 w-20"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={product.active}
                      disabled={isPending}
                      onCheckedChange={(checked) => handleToggleActive(product.id, checked)}
                    />
                    {!product.active && (
                      <Badge variant="secondary" className="text-muted-foreground">
                        Nonaktif
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/produk/${product.id}`}>
                        <Pencil className="size-3.5" />
                      </Link>
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                          <Trash2 className="size-3.5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Hapus {product.name}?</DialogTitle>
                          <DialogDescription>
                            Produk dan semua fotonya akan dihapus permanen. Tindakan ini tidak bisa
                            dibatalkan.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            variant="destructive"
                            disabled={isPending}
                            onClick={() => handleDelete(product.id)}
                          >
                            Hapus Permanen
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">Tidak ada produk.</p>
        )}
      </div>
    </div>
  );
}
