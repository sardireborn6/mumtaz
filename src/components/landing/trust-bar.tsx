import { siteConfig } from "@/lib/config/site";
import { Reveal } from "./reveal";

const currentYear = new Date().getFullYear();

// TODO: ganti angka berikut dengan data asli — jangan tampilkan klaim yang belum bisa dibuktikan.
const stats = [
  { value: "5000+", label: "Review On google Maps" },
  {
    value: `${Math.max(currentYear - siteConfig.foundedYear, 1)}+`,
    label: "Tahun beroperasi",
    hideOnMobile: true,
  },
  { value: siteConfig.unitsSold, label: "Unit terjual" },
  { value: "100%", label: "Unit dicek fisik & fungsi" },
];

export function TrustBar() {
  return (
    <section className="border-y border-[#1E293B]/10 bg-[#0F172A] relative overflow-hidden py-6 sm:py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_50%_at_50%_50%,rgba(20,184,150,0.15),transparent_80%)]" />
      <Reveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <dl className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className={`text-center sm:text-left ${s.hideOnMobile ? "hidden sm:block" : ""}`}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-lg font-extrabold tracking-tight sm:text-4xl bg-gradient-to-r from-[#FFFFFF] via-[#F2F2EF] to-accent-gold-500 bg-clip-text text-transparent font-heading">
                {s.value}
              </dd>
              <p className="mt-1 text-[9px] font-bold leading-tight tracking-tight text-brand-100/70 uppercase sm:mt-2 sm:text-[11px] sm:tracking-[0.15em] sm:leading-normal">{s.label}</p>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
