import { prisma } from "@/lib/prisma";
import { branches as defaultBranches, type Branch } from "@/lib/config/site";

/**
 * Mengambil semua cabang dari database.
 * Jika tabel belum ada atau kosong, mengembalikan fallback cabang default dari siteConfig.
 */
export async function getBranches(): Promise<Branch[]> {
  try {
    const rows = await prisma.branch.findMany({
      orderBy: { order: "asc" },
    });

    if (rows.length === 0) {
      return defaultBranches;
    }

    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      address: r.address,
      hours: r.hours,
      whatsappNumber: r.whatsappNumber,
      mapsUrl: r.mapsUrl,
    }));
  } catch (error) {
    console.error("Error fetching branches from DB, using fallback:", error);
    return defaultBranches;
  }
}

/**
 * Mengambil cabang spesifik berdasarkan ID.
 */
export async function getBranchById(id: string): Promise<Branch | null> {
  const branches = await getBranches();
  return branches.find((b) => b.id === id) ?? null;
}

/**
 * Mengambil semua cabang untuk halaman Admin (termasuk urutan order).
 */
export async function getAllBranchesForAdmin() {
  try {
    const rows = await prisma.branch.findMany({
      orderBy: { order: "asc" },
    });
    if (rows.length === 0) {
      return defaultBranches.map((b, i) => ({ ...b, order: i + 1 }));
    }
    return rows;
  } catch (error) {
    console.error("Error fetching admin branches:", error);
    return defaultBranches.map((b, i) => ({ ...b, order: i + 1 }));
  }
}

/**
 * Mengambil satu cabang untuk halaman Edit Admin.
 */
export async function getBranchByIdForAdmin(id: string) {
  try {
    const row = await prisma.branch.findUnique({
      where: { id },
    });
    if (row) return row;
    const defaultB = defaultBranches.find((b) => b.id === id);
    if (defaultB) {
      return { ...defaultB, order: 1 };
    }
    return null;
  } catch (error) {
    console.error("Error fetching admin branch by id:", error);
    return null;
  }
}
