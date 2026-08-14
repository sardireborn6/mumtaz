"use client";

import { useTransition } from "react";
import Link from "next/link";
import { Edit, Trash2, MapPin, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteBranch } from "@/app/admin/(dashboard)/cabang/actions";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

interface BranchItem {
  id: string;
  name: string;
  address: string;
  hours: string;
  whatsappNumber: string;
  mapsUrl: string;
  order: number;
}

export function BranchTable({ branches }: { branches: BranchItem[] }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus cabang "${name}"?`)) {
      startTransition(async () => {
        await deleteBranch(id);
      });
    }
  };

  if (branches.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-12 text-center">
        <MapPin className="mx-auto size-8 text-muted-foreground" />
        <p className="mt-3 font-medium text-foreground">Belum ada cabang terdaftar.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Klik &quot;Tambah Cabang&quot; untuk menambahkan cabang baru toko Anda.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {branches.map((branch) => (
        <div
          key={branch.id}
          className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md"
        >
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-foreground">{branch.name}</h3>
              <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                Urutan #{branch.order}
              </span>
            </div>

            <p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
              <MapPin className="mt-0.5 size-3.5 shrink-0 text-brand-700" />
              <span className="line-clamp-2">{branch.address}</span>
            </p>

            <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="size-3.5 shrink-0 text-brand-700" />
              <span>{branch.hours}</span>
            </p>

            <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <WhatsAppIcon className="size-3.5 shrink-0 fill-emerald-600 text-emerald-600" />
              <span>+{branch.whatsappNumber}</span>
            </p>

            {branch.mapsUrl && (
              <a
                href={branch.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs text-brand-700 hover:underline"
              >
                <ExternalLink className="size-3" />
                Buka di Google Maps
              </a>
            )}
          </div>

          <div className="mt-5 flex items-center justify-end gap-2 border-t border-border pt-4">
            <Button asChild variant="outline" size="sm">
              <Link href={`/admin/cabang/${branch.id}`}>
                <Edit className="size-3.5" />
                Edit
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              disabled={isPending}
              onClick={() => handleDelete(branch.id, branch.name)}
            >
              <Trash2 className="size-3.5" />
              Hapus
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
