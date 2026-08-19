"use client";

import { useActionState } from "react";
import Link from "next/link";
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
import {
  createTestimonial,
  updateTestimonial,
  type TestimonialFormState,
} from "@/app/admin/(dashboard)/testimoni/actions";

interface TestimonialFormProps {
  testimonial?: {
    id: string;
    name: string;
    city: string;
    rating: number;
    comment: string;
    order: number;
    active: boolean;
  };
}

export function TestimonialForm({ testimonial }: TestimonialFormProps) {
  const isEditing = Boolean(testimonial);

  const action = isEditing
    ? updateTestimonial.bind(null, testimonial!.id)
    : createTestimonial;

  const [state, formAction, pending] = useActionState<TestimonialFormState, FormData>(
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nama Pelanggan</Label>
          <Input
            id="name"
            name="name"
            placeholder="mis. Rizal"
            defaultValue={testimonial?.name ?? ""}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Kota</Label>
          <Input
            id="city"
            name="city"
            placeholder="mis. Surabaya"
            defaultValue={testimonial?.city ?? ""}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Komentar</Label>
        <Textarea
          id="comment"
          name="comment"
          placeholder="Testimoni pelanggan tentang pengalaman belanja..."
          defaultValue={testimonial?.comment ?? ""}
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="rating">Rating</Label>
          <Select name="rating" defaultValue={String(testimonial?.rating ?? 5)}>
            <SelectTrigger id="rating" className="w-full">
              <SelectValue placeholder="Pilih rating" />
            </SelectTrigger>
            <SelectContent>
              {[5, 4, 3, 2, 1].map((r) => (
                <SelectItem key={r} value={String(r)}>
                  {r} Bintang
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="order">Urutan Tampilan (Order)</Label>
          <Input
            id="order"
            name="order"
            type="number"
            placeholder="1"
            defaultValue={testimonial?.order ?? 1}
          />
          <p className="text-xs text-muted-foreground">
            Angka lebih kecil akan muncul lebih awal di slider.
          </p>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-foreground">
        <Checkbox name="active" defaultChecked={testimonial?.active ?? true} />
        Tampilkan di landing page
      </label>

      <div className="flex items-center justify-end gap-3 border-t border-border pt-6">
        <Button asChild variant="outline" type="button">
          <Link href="/admin/testimoni">Batal</Link>
        </Button>
        <Button type="submit" disabled={pending} className="bg-brand-700 hover:bg-brand-600">
          {pending ? "Menyimpan..." : isEditing ? "Simpan Perubahan" : "Tambah Testimoni"}
        </Button>
      </div>
    </form>
  );
}
