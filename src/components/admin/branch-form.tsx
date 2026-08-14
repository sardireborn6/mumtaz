"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBranch, updateBranch, type BranchFormState } from "@/app/admin/(dashboard)/cabang/actions";

interface BranchFormProps {
  branch?: {
    id: string;
    name: string;
    address: string;
    hours: string;
    whatsappNumber: string;
    mapsUrl: string;
    order: number;
  };
}

export function BranchForm({ branch }: BranchFormProps) {
  const isEditing = Boolean(branch);

  const action = isEditing
    ? updateBranch.bind(null, branch!.id)
    : createBranch;

  const [state, formAction, pending] = useActionState<BranchFormState, FormData>(
    action,
    undefined
  );

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm font-medium text-destructive">
          {state.error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Nama Cabang</Label>
        <Input
          id="name"
          name="name"
          placeholder="mis. Mumtaz MacBook Store Jogja"
          defaultValue={branch?.name ?? ""}
          required
        />
        <p className="text-xs text-muted-foreground">
          Nama cabang yang akan muncul di landing page dan pop-up WhatsApp.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Alamat Lengkap</Label>
        <Textarea
          id="address"
          name="address"
          placeholder="Jl. Anggajaya 2 No.110, Sanggrahan, Condongcatur..."
          defaultValue={branch?.address ?? ""}
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="hours">Jam Operasional</Label>
          <Input
            id="hours"
            name="hours"
            placeholder="mis. Senin–Minggu, 09.00–21.00 WIB"
            defaultValue={branch?.hours ?? "Senin–Minggu, 09.00–21.00 WIB"}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsappNumber">Nomor WhatsApp Cabang</Label>
          <Input
            id="whatsappNumber"
            name="whatsappNumber"
            placeholder="mis. 6285177153913"
            defaultValue={branch?.whatsappNumber ?? "628"}
            required
          />
          <p className="text-xs text-muted-foreground">
            Gunakan format 62 (contoh: 6285177153913, tanpa tanda + atau 0 di depan).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="mapsUrl">Link Google Maps (Opsional)</Label>
          <Input
            id="mapsUrl"
            name="mapsUrl"
            type="url"
            placeholder="https://maps.app.goo.gl/..."
            defaultValue={branch?.mapsUrl ?? ""}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="order">Urutan Tampilan (Order)</Label>
          <Input
            id="order"
            name="order"
            type="number"
            placeholder="1"
            defaultValue={branch?.order ?? 1}
          />
          <p className="text-xs text-muted-foreground">
            Angka lebih kecil akan muncul lebih awal di daftar.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-border pt-6">
        <Button asChild variant="outline" type="button">
          <Link href="/admin/cabang">Batal</Link>
        </Button>
        <Button type="submit" disabled={pending} className="bg-brand-700 hover:bg-brand-600">
          {pending ? "Menyimpan..." : isEditing ? "Simpan Perubahan" : "Tambah Cabang"}
        </Button>
      </div>
    </form>
  );
}
