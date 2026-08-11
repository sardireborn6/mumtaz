"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { buildWhatsAppLink, siteConfig } from "@/lib/config/site";
import { HeroModelCycle } from "./hero-model-cycle";

export function Hero() {
  const waLink = buildWhatsAppLink(
    `Halo ${siteConfig.name}, saya ingin konsultasi untuk beli/jual/tukar-tambah unit Apple.`
  );

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_85%_0%,var(--brand-100),transparent_70%)]"
      />
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24 lg:px-8">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.05]"
          >
            Unit Apple original, bergaransi, dari toko resmi 4 cabang di Jawa.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Beli, jual, atau tukar-tambah MacBook, iMac, Mac Mini, dan iPad — baru maupun
            second — dengan unit yang sudah dicek fisik & fungsi, plus garansi resmi dari
            {" " + siteConfig.name}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="lg" className="bg-brand-700 text-white hover:bg-brand-600">
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-4" />
                Konsultasi via WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/katalog">Lihat Katalog</Link>
            </Button>
          </motion.div>
        </div>

        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 size-[320%] -translate-x-1/2 -translate-y-1/2 animate-[spin_50s_linear_infinite] motion-reduce:animate-none bg-[radial-gradient(20%_20%_at_65%_30%,var(--brand-300),transparent_70%)] opacity-70 blur-2xl" />
            <div className="absolute left-1/2 top-1/2 size-[320%] -translate-x-1/2 -translate-y-1/2 animate-[spin_35s_linear_infinite_reverse] motion-reduce:animate-none bg-[radial-gradient(18%_18%_at_30%_70%,var(--brand-600),transparent_70%)] opacity-55 blur-2xl" />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto aspect-square w-full max-w-md"
          >
            <HeroModelCycle className="h-full w-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10, x: 10 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="absolute bottom-2 right-0 flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-md sm:right-2"
          >
            <MapPin className="size-4 text-brand-700 shrink-0" />
            Kirim ke seluruh Indonesia
          </motion.div>
        </div>
      </div>
    </section>
  );
}
