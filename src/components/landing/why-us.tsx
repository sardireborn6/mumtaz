import { ShieldCheck, SearchCheck, RefreshCcw, Wrench, Truck, HeartHandshake } from "lucide-react";
import { Reveal } from "./reveal";

const points = [
  {
    icon: ShieldCheck,
    title: "Unit bergaransi",
    description: "Garansi mencakup seluruh kerusakan unit selama bukan disebabkan human error",
  },
  {
    icon: SearchCheck,
    title: "Kualitas Terjamin",
    description: "Diperiksa secara menyeluruh sebelum dijual mulai dari baterai, layar, hingga semua port.",
  },
  {
    icon: RefreshCcw,
    title: "Layanan tukar tambah",
    description: "Tukar unit lama Anda dengan MacBook, iMac, atau iPad terbaru.",
  },
  {
    icon: HeartHandshake,
    title: "Service Excellence",
    description: "Memberikan pelayanan yang ramah, cepat, dan solutif.",
  },
  {
    icon: Wrench,
    title: "Teknisi Profesional",
    description: "Tim teknisi Berpengalaman siap menangani setiap unit yang masuk.",
  },
  {
    icon: Truck,
    title: "Pengiriman Cepat & Aman",
    description: "Perlindungan penuh dalam pengemasan untuk pengiriman cepat sampai ke tangan Anda.",
  },
];

function WhyUsCard({ point }: { point: (typeof points)[number] }) {
  return (
    <div className="flex h-full gap-5 rounded-3xl border border-white/50 bg-white/60 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-300/40 hover:shadow-[0_20px_40px_-15px_rgba(15,118,110,0.08)]">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100/50 border border-brand-100/40 shadow-inner">
        <point.icon className="size-5 text-brand-700" strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-foreground tracking-tight">{point.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{point.description}</p>
      </div>
    </div>
  );
}

function WhyUsCardCompact({ point }: { point: (typeof points)[number] }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-white/50 bg-white/60 p-3 shadow-sm backdrop-blur-md">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100/50 border border-brand-100/40 shadow-inner">
        <point.icon className="size-4 text-brand-700" strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="text-sm font-bold text-foreground tracking-tight">{point.title}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-snug text-muted-foreground">{point.description}</p>
      </div>
    </div>
  );
}

export function WhyUs() {
  return (
    <section id="tentang" className="mx-auto max-w-7xl py-14 sm:py-24">
      <Reveal className="max-w-xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase font-bold tracking-[0.2em] text-brand-700">Kenapa Pilih Kami</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Alasan pelanggan percaya Mumtaz MacBook Store
        </h2>
      </Reveal>

      {/* Mobile: grid 2 kolom compact, semua alasan langsung terlihat tanpa geser */}
      <div className="mt-8 grid grid-cols-2 gap-3 px-4 sm:hidden">
        {points.map((p) => (
          <WhyUsCardCompact key={p.title} point={p} />
        ))}
      </div>

      {/* Desktop/tablet: grid seperti semula */}
      <div className="mt-12 hidden px-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:px-6 lg:grid-cols-3 lg:px-8">
        {points.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <WhyUsCard point={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
