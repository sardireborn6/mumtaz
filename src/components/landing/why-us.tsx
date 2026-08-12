import { ShieldCheck, SearchCheck, RefreshCcw, Wallet, Wrench } from "lucide-react";
import { Reveal } from "./reveal";

const points = [
  {
    icon: ShieldCheck,
    title: "Unit bergaransi",
    description: "Setiap unit baru maupun second dilengkapi garansi resmi dari toko.",
  },
  {
    icon: SearchCheck,
    title: "Cek fisik & fungsi",
    description: "Diperiksa menyeluruh sebelum dijual — baterai, layar, hingga port.",
  },
  {
    icon: RefreshCcw,
    title: "Bisa tukar tambah",
    description: "Tukar unit lama Anda dengan MacBook, iMac, atau iPad terbaru.",
  },
  {
    icon: Wallet,
    title: "Pembayaran fleksibel",
    description: "Tunai, transfer, hingga cicilan — sesuaikan dengan kebutuhan Anda.",
  },
  {
    icon: Wrench,
    title: "Teknisi berpengalaman",
    description: "Tim teknisi khusus perangkat Apple menangani setiap unit yang masuk.",
  },
];

export function WhyUs() {
  return (
    <section id="tentang" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="max-w-xl">
        <p className="text-xs uppercase font-bold tracking-[0.2em] text-brand-700">Kenapa Pilih Kami</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Alasan pelanggan percaya Mumtaz MacBook Store
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {points.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <div className="flex h-full gap-5 rounded-3xl border border-white/50 bg-white/60 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-300/40 hover:shadow-[0_20px_40px_-15px_rgba(15,118,110,0.08)]">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100/50 border border-brand-100/40 shadow-inner">
                <p.icon className="size-5 text-brand-700" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
