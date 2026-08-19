import { prisma } from "@/lib/prisma";
import { testimonials as defaultTestimonials, type Testimonial } from "@/lib/config/site";

/**
 * Mengambil testimoni aktif dari database untuk ditampilkan di landing page.
 * Jika tabel belum ada atau kosong, mengembalikan fallback testimoni default dari siteConfig.
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const rows = await prisma.testimonial.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    });

    if (rows.length === 0) {
      return defaultTestimonials;
    }

    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      city: r.city,
      rating: r.rating,
      comment: r.comment,
    }));
  } catch (error) {
    console.error("Error fetching testimonials from DB, using fallback:", error);
    return defaultTestimonials;
  }
}

/**
 * Mengambil semua testimoni (termasuk nonaktif) untuk halaman Admin.
 */
export async function getAllTestimonialsForAdmin() {
  try {
    const rows = await prisma.testimonial.findMany({
      orderBy: { order: "asc" },
    });
    if (rows.length === 0) {
      return defaultTestimonials.map((t, i) => ({ ...t, active: true, order: i + 1 }));
    }
    return rows;
  } catch (error) {
    console.error("Error fetching admin testimonials:", error);
    return defaultTestimonials.map((t, i) => ({ ...t, active: true, order: i + 1 }));
  }
}

/**
 * Mengambil satu testimoni untuk halaman Edit Admin.
 */
export async function getTestimonialByIdForAdmin(id: string) {
  try {
    const row = await prisma.testimonial.findUnique({
      where: { id },
    });
    if (row) return row;
    const defaultT = defaultTestimonials.find((t) => t.id === id);
    if (defaultT) {
      return { ...defaultT, active: true, order: 1 };
    }
    return null;
  } catch (error) {
    console.error("Error fetching admin testimonial by id:", error);
    return null;
  }
}
