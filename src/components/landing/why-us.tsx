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
    <section id="tentang" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="max-w-xl">
        <p className="text-sm font-medium text-brand-700">Kenapa Pilih Kami</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
          Alasan pelanggan percaya Mumtaz MacBook Store
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {points.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <div className="flex h-full gap-4 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                <p.icon className="size-5 text-brand-700" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
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
