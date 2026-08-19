"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit, MessageSquareQuote, Star, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  deleteTestimonial,
  toggleTestimonialActive,
} from "@/app/admin/(dashboard)/testimoni/actions";

interface TestimonialItem {
  id: string;
  name: string;
  city: string;
  rating: number;
  comment: string;
  order: number;
  active: boolean;
}

export function TestimonialTable({ testimonials }: { testimonials: TestimonialItem[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleToggleActive(id: string, active: boolean) {
    startTransition(async () => {
      await toggleTestimonialActive(id, active);
      router.refresh();
    });
  }

  function handleDelete(id: string, name: string) {
    if (confirm(`Apakah Anda yakin ingin menghapus testimoni "${name}"?`)) {
      startTransition(async () => {
        await deleteTestimonial(id);
        router.refresh();
      });
    }
  }

  if (testimonials.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-12 text-center">
        <MessageSquareQuote className="mx-auto size-8 text-muted-foreground" />
        <p className="mt-3 font-medium text-foreground">Belum ada testimoni terdaftar.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Klik &quot;Tambah Testimoni&quot; untuk menambahkan testimoni pelanggan baru.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Testimoni</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Urutan</TableHead>
            <TableHead>Tampil</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testimonials.map((t) => (
            <TableRow key={t.id}>
              <TableCell>
                <p className="font-medium text-foreground">
                  {t.name} <span className="font-normal text-muted-foreground">· {t.city}</span>
                </p>
                <p className="mt-1 line-clamp-2 max-w-md text-xs text-muted-foreground">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </TableCell>
              <TableCell>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`size-3.5 ${
                        idx < t.rating ? "fill-accent-gold-500 text-accent-gold-500" : "text-border"
                      }`}
                    />
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                  #{t.order}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={t.active}
                    disabled={isPending}
                    onCheckedChange={(checked) => handleToggleActive(t.id, checked)}
                  />
                  {!t.active && (
                    <Badge variant="secondary" className="text-muted-foreground">
                      Nonaktif
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/admin/testimoni/${t.id}`}>
                      <Edit className="size-3.5" />
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:text-destructive"
                    disabled={isPending}
                    onClick={() => handleDelete(t.id, t.name)}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
