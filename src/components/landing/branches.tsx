import Image from "next/image";
import { Clock, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { branches as defaultBranches, buildWhatsAppLink, type Branch } from "@/lib/config/site";
import { Reveal } from "./reveal";

function BranchCard({ branch }: { branch: Branch }) {
  return (
    <div className="h-full rounded-2xl border border-border bg-card p-4 sm:p-6">
      <h3 className="font-semibold text-foreground">{branch.name}</h3>
      <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
        <MapPin className="mt-0.5 size-4 shrink-0 text-brand-700" />
        <span className="line-clamp-1 sm:line-clamp-none">{branch.address}</span>
      </p>
      <p className="mt-1.5 hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
        <Clock className="size-4 shrink-0 text-brand-700" />
        {branch.hours}
      </p>
      <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
        <Button asChild size="sm" variant="outline" className="h-10 sm:h-7">
          <a href={branch.mapsUrl} target="_blank" rel="noopener noreferrer">
            <Navigation className="size-3.5" />
            Rute
          </a>
        </Button>
        <Button asChild size="sm" className="h-10 bg-brand-700 text-white hover:bg-brand-600 sm:h-7">
          <a
            href={buildWhatsAppLink(
              `Halo, saya ingin bertanya tentang unit Apple di ${branch.name}.`,
              branch.whatsappNumber
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon className="size-3.5" />
            WhatsApp Store
          </a>
        </Button>
      </div>
    </div>
  );
}

export function Branches({ branches = defaultBranches }: { branches?: Branch[] }) {
  const branchList = branches.length > 0 ? branches : defaultBranches;

  return (
    <section id="cabang" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <Reveal className="max-w-xl">
        <p className="text-sm font-medium text-brand-700">Store Kami</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
          {branchList.length} store tersebar di pulau Jawa, siap Anda kunjungi
        </h2>
      </Reveal>

      <Reveal delay={0.08} className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-3xl sm:aspect-[21/9]">
        <Image
          src="/store.png"
          alt="Suasana showroom Mumtaz MacBook Store"
          fill
          sizes="(min-width: 1024px) 1152px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <p className="text-sm font-medium text-white/90">
            unit display siap dicoba langsung sebelum Anda beli.
          </p>
        </div>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {branchList.map((branch, i) => (
          <Reveal key={branch.id} delay={i * 0.05}>
            <BranchCard branch={branch} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
