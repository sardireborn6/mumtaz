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
  return (
    <section id="katalog" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="max-w-xl">
        <p className="text-sm font-medium text-brand-700">Kategori Produk</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
          Pilih kategori, langsung lihat unit yang tersedia
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat, i) => (
          <Reveal key={cat.name} delay={i * 0.06}>
            <Link
              href={`/katalog?kategori=${encodeURIComponent(cat.name)}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary/40">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-foreground">{cat.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{cat.description}</p>
                <div className="mt-4 flex items-center gap-2">
                  <Badge variant="secondary" className="bg-brand-50 text-brand-700">
                    Baru
                  </Badge>
                  <Badge variant="secondary" className="bg-secondary text-muted-foreground">
                    Second
                  </Badge>
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-700">
                  Lihat unit
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
