"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { BranchSelectorDialog } from "./branch-selector-dialog";
import { Reveal } from "./reveal";

const noiseTexture =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function CtaBanner() {
  const panelRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }

  return (
    <section id="kontak" className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <Reveal>
        <div
          ref={panelRef}
          onMouseMove={handleMouseMove}
          className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/30 px-5 py-10 text-center shadow-xl backdrop-blur-2xl sm:px-16 sm:py-20"
          style={
            {
              "--mx": "50%",
              "--my": "0%",
              transitionProperty: "--mx, --my",
              transitionDuration: "550ms",
              transitionTimingFunction: "ease-out",
            } as React.CSSProperties
          }
        >
          {/* Sheen diagonal — kilau cahaya menembus permukaan seperti air/kaca */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent"
          />

          {/* Riak warna — bahasa visual yang sama dengan Hero, bergerak pelan seperti arus */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 size-[280%] -translate-x-1/2 -translate-y-1/2 animate-[spin_45s_linear_infinite] motion-reduce:animate-none bg-[radial-gradient(22%_22%_at_60%_25%,var(--brand-300),transparent_70%)] opacity-45 blur-2xl" />
            <div className="absolute left-1/2 top-1/2 size-[280%] -translate-x-1/2 -translate-y-1/2 animate-[spin_60s_linear_infinite_reverse] motion-reduce:animate-none bg-[radial-gradient(20%_20%_at_35%_75%,var(--brand-500),transparent_70%)] opacity-35 blur-2xl" />
          </div>

          {/* Glow hijau memancar dari bawah, seperti cahaya menembus air dari dasar */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-1/3 left-1/2 h-2/3 w-[140%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(closest-side,var(--brand-400),transparent_70%)] opacity-60 blur-3xl"
          />

          {/* Kilau yang mengikuti kursor, seperti cahaya memantul di permukaan air saat disentuh */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(420px circle at var(--mx) var(--my), color-mix(in oklch, white 70%, var(--brand-300)), transparent 70%)",
            }}
          />

          {/* Grain sangat halus supaya kacanya tidak terasa flat */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
            style={{ backgroundImage: noiseTexture }}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/50"
          />

          <div className="relative">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-brand-700/15 bg-white/60 backdrop-blur-sm shadow-sm">
              <WhatsAppIcon className="size-6 text-brand-700" />
            </div>

            <h2 className="mx-auto mt-6 max-w-xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl font-heading">
              Siap beli, jual, atau tukar-tambah unit Apple Anda?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground sm:text-base leading-relaxed">
              Tim kami siap bantu dari konsultasi sampai serah terima unit di store terdekat.
            </p>
            <BranchSelectorDialog customMessage="Halo, saya ingin konsultasi sebelum membeli/menjual unit Apple.">
              <Button size="lg" className="mt-8 bg-gradient-to-r from-brand-700 to-brand-600 hover:from-brand-600 hover:to-brand-500 text-white rounded-full px-6 py-5 text-sm font-semibold shadow-lg shadow-brand-900/10 hover:shadow-xl hover:shadow-brand-900/20 transition-all duration-300 shimmer-button sm:px-8 sm:py-7 sm:text-base">
                <WhatsAppIcon className="size-5" />
                Chat via WhatsApp Sekarang
              </Button>
            </BranchSelectorDialog>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
