import { Star } from "lucide-react";
import { Reveal } from "./reveal";

// TODO: ganti dengan testimoni pelanggan asli (nama, kota, rating, komentar) sebelum go-live.
const testimonials = [
  {
    name: "Rizal",
    city: "Surabaya",
    rating: 5,
    comment:
      "Beli MacBook Pro second di sini, kondisinya bener-bener mulus sesuai deskripsi. Garansinya juga jelas.",
  },
  {
    name: "Dinda",
    city: "Semarang",
    rating: 5,
    comment:
      "Proses tukar tambah iPad lama ke yang baru cepat, harganya juga wajar. Pelayanan ramah.",
  },
  {
    name: "Farhan",
    city: "Bandung",
    rating: 4,
    comment:
      "Konsultasi via WhatsApp responsif, dibantu pilih spek Mac Mini sesuai kebutuhan kerja.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-gradient-to-b from-secondary/20 to-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="max-w-xl">
          <p className="text-xs uppercase font-bold tracking-[0.2em] text-brand-700">Testimoni</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Apa kata pelanggan kami
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <div className="h-full rounded-3xl border border-white/50 bg-white/70 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-300/40 hover:shadow-[0_20px_40px_-15px_rgba(15,118,110,0.06)] flex flex-col justify-between">
                <div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`size-4 ${
                          idx < t.rating ? "fill-accent-gold-500 text-accent-gold-500" : "text-border"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/90 italic">
                    &ldquo;{t.comment}&rdquo;
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-50 to-brand-100/50 border border-brand-100/30 text-sm font-semibold text-brand-700 shadow-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.city}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
