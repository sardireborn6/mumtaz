"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ShieldCheck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { siteConfig } from "@/lib/config/site";
import { BranchSelectorDialog } from "./branch-selector-dialog";
import { HeroModelCycle } from "./hero-model-cycle";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAF9]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_70%_at_85%_0%,var(--brand-100),transparent_70%)] opacity-80"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_15%_100%,var(--accent-gold-100),transparent_70%)] opacity-60"
      />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-32 lg:px-8">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-[3.6rem] lg:leading-[1.08] font-heading"
          >
            Unit Apple <span className="text-gradient-brand">Original</span> &amp; <span className="text-gradient-gold">Bergaransi</span> Mewah.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Beli, jual, atau tukar-tambah MacBook, iMac, Mac Mini, dan iPad — baru maupun
            second berkualitas tinggi — dengan unit terverifikasi 100% fisik & fungsi, plus garansi resmi toko dari {siteConfig.name}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <BranchSelectorDialog customMessage="Halo, saya ingin konsultasi untuk beli/jual/tukar-tambah unit Apple.">
              <Button size="lg" className="bg-gradient-to-r from-brand-700 to-brand-600 hover:from-brand-600 hover:to-brand-500 text-white rounded-full px-8 py-7 text-base font-semibold shadow-lg shadow-brand-900/10 hover:shadow-xl hover:shadow-brand-900/20 transition-all duration-300 shimmer-button">
                <WhatsAppIcon className="size-5" />
                Konsultasi via WhatsApp
              </Button>
            </BranchSelectorDialog>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 py-7 text-base font-semibold border-border bg-white/40 hover:bg-white/80 transition-all duration-300 backdrop-blur-sm">
              <Link href="/katalog">Lihat Katalog</Link>
            </Button>
          </motion.div>
        </div>

        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 size-[320%] -translate-x-1/2 -translate-y-1/2 animate-[spin_50s_linear_infinite] motion-reduce:animate-none bg-[radial-gradient(20%_20%_at_65%_30%,var(--brand-300),transparent_70%)] opacity-70 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 size-[320%] -translate-x-1/2 -translate-y-1/2 animate-[spin_35s_linear_infinite_reverse] motion-reduce:animate-none bg-[radial-gradient(18%_18%_at_30%_70%,var(--brand-600),transparent_70%)] opacity-55 blur-3xl" />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto aspect-square w-full max-w-md"
          >
            <HeroModelCycle className="h-full w-full" />
          </motion.div>

          {/* Floating Badges */}
          <motion.div
            initial={{ opacity: 0, y: 10, x: 10 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="absolute bottom-6 right-0 flex items-center gap-2 rounded-2xl border border-white/50 bg-white/80 backdrop-blur-md px-4 py-2.5 text-sm font-bold text-foreground shadow-md sm:right-2"
          >
            <MapPin className="size-4 text-brand-700 shrink-0" />
            Kirim Seluruh Indonesia
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10, x: -10 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="absolute top-12 left-0 flex items-center gap-2 rounded-2xl border border-white/50 bg-white/80 backdrop-blur-md px-4 py-2.5 text-sm font-bold text-foreground shadow-md sm:left-2"
          >
            <ShieldCheck className="size-4 text-accent-gold-700 shrink-0" />
            Garansi Toko 100%
          </motion.div>
        </div>
      </div>
    </section>
  );
}
