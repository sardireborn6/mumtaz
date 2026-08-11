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
    <section className="bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="max-w-xl">
          <p className="text-sm font-medium text-brand-700">Testimoni</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            Apa kata pelanggan kami
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`size-4 ${
                        idx < t.rating ? "fill-brand-700 text-brand-700" : "text-border"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/90">
                  &ldquo;{t.comment}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-700">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
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
