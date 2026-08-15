import Papa from "papaparse";
import { verifySession } from "@/lib/auth/session";
import { getAllProductsForAdmin } from "@/lib/data/get-products";
import { branches } from "@/lib/config/site";
import { CSV_EXPORT_COLUMNS, productToCsvRow } from "@/lib/import-export/product-csv";

export async function GET() {
  await verifySession();

  const products = await getAllProductsForAdmin();
  const rows = products.map((p) => productToCsvRow(p, branches));
  const csv = Papa.unparse({ fields: CSV_EXPORT_COLUMNS as unknown as string[], data: rows });

  const filename = `produk-${new Date().toISOString().slice(0, 10)}.csv`;
  const BOM = String.fromCharCode(0xfeff);

  return new Response(BOM + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
