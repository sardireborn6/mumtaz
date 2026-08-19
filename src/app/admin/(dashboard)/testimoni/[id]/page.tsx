import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { getTestimonialByIdForAdmin } from "@/lib/data/get-testimonials";

export const metadata = {
  title: "Edit Testimoni — Admin Mumtaz MacBook Store",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditTestimoniPage({ params }: PageProps) {
  const { id } = await params;
  const testimonial = await getTestimonialByIdForAdmin(id);

  if (!testimonial) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/testimoni">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Edit Testimoni</h1>
          <p className="text-sm text-muted-foreground">
            Perbarui testimoni dari {testimonial.name}.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <TestimonialForm testimonial={testimonial} />
      </div>
    </div>
  );
}
