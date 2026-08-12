import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "./reveal";

const categories = [
  {
    name: "MacBook",
    image: "/macbook-pro.png",
    description: "Air & Pro, dari kerja harian sampai video editing berat.",
  },
  {
    name: "iMac",
    image: "/imac.png",
    description: "All-in-one desktop untuk desain dan produktivitas kantor.",
  },
  {
    name: "Mac Mini",
    image: "/mac-mini.png",
    description: "Performa desktop ringkas, cocok untuk setup fleksibel.",
  },
  {
    name: "iPad",
    image: "/ipad.png",
    description: "Pro & Air, untuk kreativitas dan mobilitas tinggi.",
  },
] as const;

export function Categories() {
  const gridClasses = [
    "lg:col-span-2 lg:row-span-2 aspect-[4/3] lg:aspect-auto", // MacBook: large featured card
    "lg:col-span-2 aspect-[4/3] lg:aspect-[2.1/1]",            // iMac: wide card
    "lg:col-span-1 aspect-[4/3]",                             // Mac Mini: standard square
    "lg:col-span-1 aspect-[4/3]",                             // iPad: standard square
  ];

  return (
    <section id="katalog" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="max-w-xl">
        <p className="text-xs uppercase font-bold tracking-[0.2em] text-brand-700">Kategori Produk</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Pilih kategori, langsung lihat unit yang tersedia
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:grid-flow-row-dense">
        {categories.map((cat, i) => (
          <Reveal key={cat.name} delay={i * 0.06} className={gridClasses[i]}>
            <Link
              href={`/katalog?kategori=${encodeURIComponent(cat.name)}`}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/50 bg-white/70 shadow-sm backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-300/60 hover:shadow-[0_20px_40px_-15px_rgba(15,118,110,0.1)]"
            >
              <div className="relative flex-1 overflow-hidden bg-secondary/40">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-col p-6 bg-white/90 backdrop-blur-sm border-t border-border/20">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold tracking-tight text-foreground">{cat.name}</h3>
                  <div className="flex gap-1.5">
                    <Badge variant="secondary" className="bg-accent-gold-100 text-accent-gold-700 border-none text-[10px]">
                      Baru
                    </Badge>
                    <Badge variant="secondary" className="bg-secondary text-muted-foreground border-none text-[10px]">
                      Second
                    </Badge>
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 group-hover:text-brand-600 transition-colors">
                  Lihat unit
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1.5 duration-300" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
