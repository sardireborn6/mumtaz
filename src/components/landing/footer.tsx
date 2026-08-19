import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { branches as defaultBranches, buildWhatsAppLink, navLinks, siteConfig, socials, type Branch } from "@/lib/config/site";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.92-1.88 2.63-5.24 3.73-8.31 2.87-3.06-.85-5.32-3.69-5.39-6.88-.04-3.17 2.14-6.1 5.24-6.79.72-.16 1.47-.21 2.21-.16.01 1.34 0 2.68.01 4.02-.75-.12-1.53-.02-2.22.28-.97.41-1.67 1.34-1.81 2.37-.2 1.48.59 3.03 1.98 3.59 1.32.55 2.96.22 3.93-.78.69-.71.93-1.72.9-2.71 0-3.32-.01-6.64 0-9.96-.04.01-.08.01-.12.01z" />
    </svg>
  );
}

export function Footer({ branches = defaultBranches }: { branches?: Branch[] }) {
  const year = new Date().getFullYear();
  const branchList = branches.length > 0 ? branches : defaultBranches;

  return (
    <footer className="border-t border-border bg-[#F5F5F3]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="divide-y divide-border/40 sm:grid sm:grid-cols-[1.4fr_1fr_1.6fr] sm:gap-12 sm:divide-y-0">
          <div className="flex flex-col items-center pb-8 text-center first:pt-0 sm:items-start sm:pb-0 sm:text-left">
            <Image
              src="/logo.png"
              alt={siteConfig.name}
              width={180}
              height={59}
              className="h-9 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Bagian dari {siteConfig.group} — toko resmi jual-beli unit Apple baru & second,
              bergaransi, dengan {branches.length} store di Jawa.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-full border border-border/80 size-9 text-muted-foreground transition-all duration-300 hover:border-brand-600 hover:text-brand-700 hover:bg-brand-50"
                  aria-label={s.label}
                >
                  {s.label === "Instagram" ? (
                    <InstagramIcon className="size-4" />
                  ) : (
                    <TikTokIcon className="size-4" />
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="py-8 text-center sm:py-0 sm:text-left">
            <h3 className="text-sm font-semibold text-foreground">Link Cepat</h3>
            <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2.5 sm:block sm:space-y-3">
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

          <div className="py-8 text-center last:pb-0 sm:py-0 sm:text-left">
            <h3 className="text-sm font-semibold text-foreground">Store Kami</h3>
            <ul className="mt-4 grid grid-cols-2 gap-4 text-left sm:gap-5">
              {branchList.map((branch) => (
                <li key={branch.id} className="text-sm">
                  <p className="font-medium text-foreground">{branch.name}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <a
                      href={branch.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-brand-700"
                    >
                      <MapPin className="size-3.5 shrink-0" />
                      Lihat Lokasi
                    </a>
                    <a
                      href={buildWhatsAppLink(
                        `Halo, saya ingin bertanya tentang unit Apple di ${branch.name}.`,
                        branch.whatsappNumber
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-brand-700 transition-colors hover:text-brand-600"
                    >
                      <WhatsAppIcon className="size-3.5" />
                      WhatsApp
                    </a>
                  </div>
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
          Model 3D : &quot;macbook pro M3 16 inch 2024&quot; oleh jackbaeten dan
          &quot;Ipad pro 13in silver m4&quot; oleh Polyman_3D, via Sketchfab, lisensi CC BY 4.0.
        </p>
      </div>
    </footer>
  );
}
