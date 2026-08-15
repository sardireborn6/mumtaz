import { z } from "zod";
import { productBaseFields, refineOriginalPrice } from "@/lib/validation/product-schema";
import type { Branch } from "@/lib/config/site";
import type { Product } from "@/lib/data/products";

export const CSV_COLUMNS = [
  "Nama Produk",
  "Kategori",
  "Varian",
  "Kondisi",
  "Grade Kondisi",
  "Chip",
  "RAM",
  "Storage",
  "Harga Jual",
  "Harga Coret",
  "Stok",
  "Garansi (Bulan)",
  "Deskripsi",
  "Tersedia di Cabang",
  "Aktif",
] as const;

export const CSV_EXPORT_COLUMNS = [...CSV_COLUMNS, "ID Produk"] as const;

const INACTIVE_VALUES = new Set(["tidak", "no", "false", "0", "nonaktif", "n"]);

export type ImportedProductData = {
  name: string;
  category: string;
  variant: string;
  condition: string;
  conditionGrade: string | null;
  chip: string;
  ram: string;
  storage: string;
  price: number;
  originalPrice: number | null;
  stock: number;
  warrantyMonths: number;
  description: string;
  branchIds: string[];
  active: boolean;
};

export type ParsedCsvRow =
  | { ok: true; data: ImportedProductData }
  | { ok: false; error: string };

function branchShortName(branch: Branch): string {
  return branch.name.includes("— ") ? branch.name.split("— ")[1] : branch.name;
}

function normalizeNumberString(raw: string | undefined): string {
  if (!raw) return "";
  return raw.replace(/[^0-9]/g, "");
}

function parseActive(raw: string | undefined): boolean {
  const value = (raw ?? "").trim().toLowerCase();
  return !INACTIVE_VALUES.has(value);
}

function resolveBranchIds(
  raw: string | undefined,
  branches: Branch[]
): { ok: true; ids: string[] } | { ok: false; error: string } {
  const trimmed = (raw ?? "").trim();
  if (!trimmed) return { ok: true, ids: [] };

  const tokens = trimmed
    .split(/[,;|]/)
    .map((t) => t.trim())
    .filter(Boolean);

  const ids: string[] = [];
  for (const token of tokens) {
    const match = branches.find((b) => branchShortName(b).toLowerCase() === token.toLowerCase());
    if (!match) {
      return { ok: false, error: `Cabang "${token}" tidak dikenal.` };
    }
    ids.push(match.id);
  }
  return { ok: true, ids };
}

/** Ubah satu produk jadi baris CSV siap-export (urutan kolom lihat CSV_EXPORT_COLUMNS). */
export function productToCsvRow(product: Product, branches: Branch[]): Record<string, string> {
  const branchNames = product.branchIds
    .map((id) => branches.find((b) => b.id === id))
    .filter((b): b is Branch => Boolean(b))
    .map(branchShortName);

  return {
    "Nama Produk": product.name,
    Kategori: product.category,
    Varian: product.variant,
    Kondisi: product.condition,
    "Grade Kondisi": product.conditionGrade ?? "",
    Chip: product.specs.chip,
    RAM: product.specs.ram,
    Storage: product.specs.storage,
    "Harga Jual": String(product.price),
    "Harga Coret": product.originalPrice != null ? String(product.originalPrice) : "",
    Stok: String(product.stock),
    "Garansi (Bulan)": String(product.warrantyMonths),
    Deskripsi: product.description,
    "Tersedia di Cabang": branchNames.join(", "),
    Aktif: product.active ? "Ya" : "Tidak",
    "ID Produk": product.id,
  };
}

const csvBaseSchema = refineOriginalPrice(z.object(productBaseFields));

/** Validasi + parse satu baris CSV (hasil Papa.parse header:true) jadi data produk, atau pesan error. */
export function parseCsvRecord(record: Record<string, string>, branches: Branch[]): ParsedCsvRow {
  const parsed = csvBaseSchema.safeParse({
    name: record["Nama Produk"] ?? "",
    category: record["Kategori"] ?? "",
    variant: record["Varian"] ?? "",
    condition: record["Kondisi"] ?? "",
    conditionGrade: record["Grade Kondisi"] ?? "",
    chip: record["Chip"] ?? "",
    ram: record["RAM"] ?? "",
    storage: record["Storage"] ?? "",
    price: normalizeNumberString(record["Harga Jual"]),
    originalPrice: normalizeNumberString(record["Harga Coret"]),
    stock: normalizeNumberString(record["Stok"]),
    warrantyMonths: normalizeNumberString(record["Garansi (Bulan)"]),
    description: record["Deskripsi"] ?? "",
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  const branchResult = resolveBranchIds(record["Tersedia di Cabang"], branches);
  if (!branchResult.ok) return branchResult;

  return {
    ok: true,
    data: {
      ...parsed.data,
      conditionGrade: parsed.data.conditionGrade || null,
      branchIds: branchResult.ids,
      active: parseActive(record["Aktif"]),
    },
  };
}
