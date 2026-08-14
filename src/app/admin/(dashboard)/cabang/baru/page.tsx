import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BranchForm } from "@/components/admin/branch-form";

export const metadata = {
  title: "Tambah Cabang Baru — Admin Mumtaz MacBook Store",
};

export default function AdminTambahCabangPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/cabang">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Tambah Cabang Baru</h1>
          <p className="text-sm text-muted-foreground">
            Isi formulir di bawah untuk menambahkan lokasi cabang baru.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <BranchForm />
      </div>
    </div>
  );
}
