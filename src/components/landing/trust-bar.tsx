import { branches, siteConfig } from "@/lib/config/site";
import { Reveal } from "./reveal";

const currentYear = new Date().getFullYear();

// TODO: ganti angka berikut dengan data asli — jangan tampilkan klaim yang belum bisa dibuktikan.
const stats = [
  { value: `${branches.length}`, label: "Cabang di Jawa" },
  { value: `${Math.max(currentYear - siteConfig.foundedYear, 1)}+`, label: "Tahun beroperasi" },
  { value: siteConfig.unitsSold, label: "Unit terjual" },
  { value: "100%", label: "Unit dicek fisik & fungsi" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border bg-secondary/40">
      <Reveal className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {s.value}
              </dd>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
