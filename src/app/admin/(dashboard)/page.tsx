import { Package, PackageX, PackageCheck } from "lucide-react";
import { verifySession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const { username } = await verifySession();

  const [totalActive, outOfStock, totalAll] = await Promise.all([
    prisma.product.count({ where: { active: true } }),
    prisma.product.count({ where: { active: true, stock: 0 } }),
    prisma.product.count(),
  ]);

  const stats = [
    { label: "Produk Aktif", value: totalActive, icon: PackageCheck },
    { label: "Stok Habis", value: outOfStock, icon: PackageX },
    { label: "Total Produk", value: totalAll, icon: Package },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Halo, {username}</h1>
      <p className="mt-1 text-sm text-muted-foreground">Ringkasan produk toko saat ini.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex size-10 items-center justify-center rounded-xl bg-brand-50">
              <s.icon className="size-5 text-brand-700" />
            </div>
            <p className="mt-4 text-2xl font-semibold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
