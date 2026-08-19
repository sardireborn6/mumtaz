import Link from "next/link";
import { Plus, MessageSquareQuote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestimonialTable } from "@/components/admin/testimonial-table";
import { getAllTestimonialsForAdmin } from "@/lib/data/get-testimonials";

export const metadata = {
  title: "Kelola Testimoni — Admin Mumtaz MacBook Store",
};

export default async function AdminTestimoniPage() {
  const testimonials = await getAllTestimonialsForAdmin();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
            <MessageSquareQuote className="size-6 text-brand-700" />
            Kelola Testimoni
          </h1>
          <p className="text-sm text-muted-foreground">
            Kelola testimoni pelanggan yang ditampilkan sebagai slider di landing page.
          </p>
        </div>
        <Button asChild className="bg-brand-700 hover:bg-brand-600">
          <Link href="/admin/testimoni/baru">
            <Plus className="size-4" />
            Tambah Testimoni
          </Link>
        </Button>
      </div>

      <TestimonialTable testimonials={testimonials} />
    </div>
  );
}
