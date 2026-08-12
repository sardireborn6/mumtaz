"use client";

import { useEffect, useState } from "react";
import { ModelViewer } from "@/components/katalog/model-viewer";

const FADE_MS = 450;
const STORAGE_KEY = "mm-hero-model-index";

const models = [
  {
    src: "/3d1.glb",
    poster: "",
    alt: "MacBook Air M2 — model 3D interaktif, geser untuk memutar",
    cameraOrbit: "50deg 70deg 150%",
    orientation: "0deg 15deg 0deg",
  },
  {
    src: "/3d2.glb",
    poster: "",
    alt: "MacBook Pro M3 16-inch — model 3D interaktif, geser untuk memutar",
    cameraOrbit: "20deg 80deg 150%",
  },
  {
    src: "/3d3.glb",
    poster: "",
    alt: "iPad Pro M4 — model 3D interaktif, geser untuk memutar",
    cameraOrbit: "20deg 60deg 150%",
  },
  {
    src: "/3d4.glb",
    poster: "",
    alt: "iMac — model 3D interaktif, geser untuk memutar",
    cameraOrbit: "20deg 75deg 150%",
  },
];

// Model berikutnya dalam urutan, disimpan di sessionStorage supaya reload
// penuh atau pindah halaman lalu balik lagi ke beranda tetap lanjut ke
// model berikutnya (bukan tiap saat auto-ganti sendiri di background).
function nextIndexFromStorage() {
  if (typeof window === "undefined") return 0;
  const stored = window.sessionStorage.getItem(STORAGE_KEY);
  const current = stored ? Number.parseInt(stored, 10) : -1;
  const next = (current + 1) % models.length;
  window.sessionStorage.setItem(STORAGE_KEY, String(next));
  return next;
}

export function HeroModelCycle({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // Ganti model saat halaman ini benar-benar dibuka ulang: reload penuh,
  // atau navigasi dari halaman lain balik ke beranda (komponen ini
  // dipasang ulang). Sengaja tanpa timer otomatis supaya tidak diam-diam
  // mengunduh keempat model tiap kunjungan.
  useEffect(() => {
    // sessionStorage tidak tersedia saat SSR, jadi index "sebenarnya" baru
    // bisa diketahui di client setelah mount — sengaja pakai effect di sini.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIndex(nextIndexFromStorage());
  }, []);

  // Juga ganti saat user pindah tab lalu balik lagi ke tab ini.
  useEffect(() => {
    let wasHidden = false;

    function handleVisibilityChange() {
      if (document.hidden) {
        wasHidden = true;
        return;
      }
      if (!wasHidden) return;
      wasHidden = false;
      setVisible(false);
      window.setTimeout(() => {
        setIndex(nextIndexFromStorage());
        setVisible(true);
      }, FADE_MS);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const current = models[index];

  return (
    <div className={`relative ${className ?? ""}`}>
      <div
        className="h-full w-full transition-opacity ease-in-out"
        style={{ opacity: visible ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
      >
        <ModelViewer
          src={current.src}
          poster={current.poster}
          alt={current.alt}
          cameraOrbit={current.cameraOrbit}
          orientation={current.orientation}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
