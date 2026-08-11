"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { branches } from "@/lib/config/site";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_CONDITIONS,
  CONDITION_GRADES,
  type Product,
} from "@/lib/data/products";
import type { ProductFormState } from "@/app/admin/(dashboard)/produk/actions";

export function ProductForm({
  product,
  action,
}: {
  product?: Product;
  action: (prevState: ProductFormState, formData: FormData) => Promise<ProductFormState>;
}) {
  const [state, formAction, pending] = useActionState<ProductFormState, FormData>(
    action,
    undefined
  );
  const [existingImages, setExistingImages] = useState(product?.images ?? []);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [condition, setCondition] = useState(product?.condition ?? "Baru");

  function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setNewPreviews(files.map((f) => URL.createObjectURL(f)));
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="existingImages" value={JSON.stringify(existingImages)} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="name">Nama Produk</Label>
          <Input id="name" name="name" defaultValue={product?.name} required />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="category">Kategori</Label>
          <Select name="category" defaultValue={product?.category ?? PRODUCT_CATEGORIES[0]}>
            <SelectTrigger id="category" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="variant">Varian</Label>
          <Input
            id="variant"
            name="variant"
            placeholder='mis. "M3 Pro, 18GB/512GB"'
            defaultValue={product?.variant}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="condition">Kondisi</Label>
          <Select
            name="condition"
            defaultValue={product?.condition ?? "Baru"}
            onValueChange={(value) => setCondition(value as Product["condition"])}
          >
            <SelectTrigger id="condition" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_CONDITIONS.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="conditionGrade">Grade Kondisi (khusus Second)</Label>
          <Select name="conditionGrade" defaultValue={product?.conditionGrade ?? ""}>
            <SelectTrigger id="conditionGrade" className="w-full" disabled={condition !== "Second"}>
              <SelectValue placeholder="—" />
            </SelectTrigger>
            <SelectContent>
              {CONDITION_GRADES.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="price">Harga (Rp)</Label>
          <Input id="price" name="price" type="number" min={0} defaultValue={product?.price} required />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="stock">Stok</Label>
          <Input id="stock" name="stock" type="number" min={0} defaultValue={product?.stock ?? 0} required />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="chip">Chip</Label>
          <Input id="chip" name="chip" placeholder="Apple M3 Pro" defaultValue={product?.specs.chip} required />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ram">RAM</Label>
          <Input id="ram" name="ram" placeholder="18GB" defaultValue={product?.specs.ram} required />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="storage">Storage</Label>
          <Input
            id="storage"
            name="storage"
            placeholder="512GB SSD"
            defaultValue={product?.specs.storage}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="warrantyMonths">Garansi (bulan)</Label>
          <Input
            id="warrantyMonths"
            name="warrantyMonths"
            type="number"
            min={0}
            defaultValue={product?.warrantyMonths ?? 12}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="description">Deskripsi</Label>
          <Textarea id="description" name="description" rows={4} defaultValue={product?.description} required />
        </div>
      </div>

      <div>
        <Label>Tersedia di Cabang</Label>
        <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {branches.map((b) => (
            <label key={b.id} className="flex items-center gap-2 text-sm text-foreground">
              <Checkbox
                name="branchIds"
                value={b.id}
                defaultChecked={product?.branchIds.includes(b.id)}
              />
              {b.name.split("— ")[1]}
            </label>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-foreground">
        <Checkbox name="active" defaultChecked={product?.active ?? true} />
        Tampilkan di katalog (aktif)
      </label>

      <div>
        <Label>Foto Produk</Label>

        {existingImages.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-3">
            {existingImages.map((url) => (
              <div key={url} className="relative size-24 overflow-hidden rounded-lg border border-border">
                <Image src={url} alt="" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => setExistingImages((imgs) => imgs.filter((u) => u !== url))}
                  className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-black/60 text-white"
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <Input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleFilesChange}
          className="mt-3"
        />
        {newPreviews.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {newPreviews.map((src, i) => (
              <div key={i} className="relative size-24 overflow-hidden rounded-lg border border-border">
                <Image src={src} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={pending} className="bg-brand-700 text-white hover:bg-brand-600">
          {pending ? "Menyimpan…" : "Simpan Produk"}
        </Button>
      </div>
    </form>
  );
}
