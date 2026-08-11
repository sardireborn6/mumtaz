import Image from "next/image";
import { Clock, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { branches, buildWhatsAppLink } from "@/lib/config/site";
import { Reveal } from "./reveal";

export function Branches() {
  return (
    <section id="cabang" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="max-w-xl">
        <p className="text-sm font-medium text-brand-700">Cabang Kami</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
          {branches.length} cabang tersebar di Jawa, siap Anda kunjungi
        </h2>
      </Reveal>

      <Reveal delay={0.08} className="relative mt-8 aspect-[21/9] w-full overflow-hidden rounded-3xl">
        <Image
          src="/store.png"
          alt="Suasana showroom Mumtaz MacBook Store"
          fill
          sizes="(min-width: 1024px) 1152px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <p className="text-sm font-medium text-white/90">
            Showroom kami — unit display siap dicoba langsung sebelum Anda memutuskan.
          </p>
        </div>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {branches.map((branch, i) => (
          <Reveal key={branch.id} delay={i * 0.05}>
            <div className="h-full rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground">{branch.name}</h3>
              <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-700" />
                {branch.address}
              </p>
              <p className="mt-1.5 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="size-4 shrink-0 text-brand-700" />
                {branch.hours}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline">
                  <a href={branch.mapsUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation className="size-3.5" />
                    Rute
                  </a>
                </Button>
                <Button asChild size="sm" className="bg-brand-700 text-white hover:bg-brand-600">
                  <a
                    href={buildWhatsAppLink(
                      `Halo, saya ingin bertanya tentang unit Apple di ${branch.name}.`,
                      branch.whatsappNumber
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon className="size-3.5" />
                    WhatsApp Cabang
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
