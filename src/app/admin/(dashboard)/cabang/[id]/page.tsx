import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BranchForm } from "@/components/admin/branch-form";
import { getBranchByIdForAdmin } from "@/lib/data/get-branches";

export const metadata = {
  title: "Edit Cabang — Admin Mumtaz MacBook Store",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditCabangPage({ params }: PageProps) {
  const { id } = await params;
  const branch = await getBranchByIdForAdmin(id);

  if (!branch) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/cabang">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Edit Cabang</h1>
          <p className="text-sm text-muted-foreground">
            Perbarui data cabang {branch.name}.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <BranchForm branch={branch} />
      </div>
    </div>
  );
}
