import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { branches, buildWhatsAppLink, navLinks, siteConfig, socials } from "@/lib/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.2fr_1fr_1.6fr]">
          <div>
            <Image
              src="/logo.png"
              alt={siteConfig.name}
              width={180}
              height={59}
              className="h-9 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Bagian dari {siteConfig.group} — toko jual-beli unit Apple baru & second,
              bergaransi, dengan {branches.length} cabang di Jawa.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-brand-600 hover:text-brand-700"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Link Cepat</h3>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Cabang Kami</h3>
            <ul className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {branches.map((branch) => (
                <li key={branch.id} className="text-sm">
                  <p className="font-medium text-foreground">{branch.name}</p>
                  <p className="mt-1 flex items-start gap-1.5 text-muted-foreground">
                    <MapPin className="mt-0.5 size-3.5 shrink-0" />
                    <span>{branch.address}</span>
                  </p>
                  <a
                    href={buildWhatsAppLink(
                      `Halo, saya ingin bertanya tentang unit Apple di ${branch.name}.`,
                      branch.whatsappNumber
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 flex items-center gap-1.5 text-brand-700 transition-colors hover:text-brand-600"
                  >
                    <WhatsAppIcon className="size-3.5" />
                    WhatsApp Cabang
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {year} {siteConfig.name}. Bagian dari {siteConfig.group}.
          </p>
          <a
            href={`tel:+${siteConfig.phoneNumber}`}
            className="flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Phone className="size-3.5" />+{siteConfig.phoneNumber}
          </a>
        </div>

        <p className="mt-4 text-center text-[11px] text-muted-foreground/70 sm:text-left">
          Model 3D pada beranda: &quot;macbook pro M3 16 inch 2024&quot; oleh jackbaeten dan
          &quot;Ipad pro 13in silver m4&quot; oleh Polyman_3D, via Sketchfab, lisensi CC BY 4.0.
        </p>
      </div>
    </footer>
  );
}
