import Link from "next/link";
import { Plus, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BranchTable } from "@/components/admin/branch-table";
import { getAllBranchesForAdmin } from "@/lib/data/get-branches";

export const metadata = {
  title: "Kelola Cabang — Admin Mumtaz MacBook Store",
};

export default async function AdminCabangPage() {
  const branches = await getAllBranchesForAdmin();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Kelola Cabang</h1>
          <p className="text-sm text-muted-foreground">
            Kelola nama cabang, alamat, jam operasional, dan nomor WhatsApp cabang.
          </p>
        </div>
        <Button asChild className="bg-brand-700 hover:bg-brand-600">
          <Link href="/admin/cabang/baru">
            <Plus className="size-4" />
            Tambah Cabang
          </Link>
        </Button>
      </div>

      <BranchTable branches={branches} />
    </div>
  );
}
