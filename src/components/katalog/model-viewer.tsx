"use client";

import { createElement, useEffect, useState } from "react";
import Image from "next/image";

// <model-viewer> adalah web component (@google/model-viewer) — dimuat lazy,
// client-side only, supaya tidak masuk initial bundle halaman lain dan tetap
// menjaga skor performa. React.createElement dipakai (bukan JSX langsung)
// supaya tidak bergantung pada deklarasi tipe custom element global.
export function ModelViewer({
  src,
  poster,
  alt,
  className,
  cameraOrbit,
  orientation,
  autoRotateDelay,
  fieldOfView,
  rotationPerSecond = "16deg",
  autoRotate = true,
}: {
  src: string;
  poster?: string;
  alt: string;
  className?: string;
  /** Posisi kamera awal: "azimuth polar radius", mis. "45deg 75deg 105%". */
  cameraOrbit?: string;
  /** Rotasi objek itu sendiri di sumbu X/Y/Z, mis. "0deg 20deg 0deg". */
  orientation?: string;
  /** Jeda sebelum auto-rotate mulai jalan setelah interaksi terakhir, mis. "3000". */
  autoRotateDelay?: string;
  /** Sudut pandang kamera, mis. "30deg". */
  fieldOfView?: string;
  /** Kecepatan auto-rotate. Default "16deg" per detik. */
  rotationPerSecond?: string;
  /** Matikan untuk menonaktifkan auto-rotate sama sekali. Default true. */
  autoRotate?: boolean;
}) {
  const [ready, setReady] = useState(false);
  // Gaya "wiggle" bawaan model-viewer mengulang animasi geser kanan-kiri
  // terus-menerus tiap beberapa detik selama belum pernah di-drag — supaya
  // cuma kelihatan sekali (satu siklus gerakan) lalu diam, prompt dipaksa
  // mati lewat timer setelah cukup waktu untuk satu kali animasi selesai.
  const [promptEnabled, setPromptEnabled] = useState(true);

  useEffect(() => {
    let cancelled = false;
    import("@google/model-viewer").then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setPromptEnabled(false), 6000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) {
    return (
      <div className={`relative overflow-hidden ${className ?? ""}`}>
        {poster && <Image src={poster} alt={alt} fill className="object-cover" priority />}
      </div>
    );
  }

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return createElement("model-viewer", {
    src,
    ...(poster ? { poster } : {}),
    alt,
    class: className,
    "camera-controls": true,
    "auto-rotate": autoRotate && !prefersReducedMotion,
    // "auto" muncul lagi tiap kunjungan/pindah halaman (disukai). Gaya
    // "wiggle" dipertahankan supaya ada gerakan geser kanan-kiri yang
    // kelihatan, tapi dipaksa mati lewat promptEnabled setelah ~6 detik
    // (lihat useEffect di atas) supaya cuma main sekali, bukan berulang.
    "interaction-prompt": promptEnabled ? "auto" : "none",
    "interaction-prompt-style": "wiggle",
    "rotation-per-second": rotationPerSecond,
    ...(cameraOrbit ? { "camera-orbit": cameraOrbit } : {}),
    ...(orientation ? { orientation } : {}),
    ...(autoRotateDelay ? { "auto-rotate-delay": autoRotateDelay } : {}),
    ...(fieldOfView ? { "field-of-view": fieldOfView } : {}),
    "shadow-intensity": "0.4",
    "shadow-softness": "1",
    // Material logam gelap (mis. MacBook Air warna Midnight) secara fisik
    // cuma memantulkan cahaya lewat highlight specular dari environment map,
    // bukan cahaya ambient biasa — jadi exposure dinaikkan cukup tinggi di
    // sini supaya sisi yang tidak kena highlight tetap terlihat jelas,
    // sementara environment map bawaan (neutral, HDR) tetap dipertahankan
    // karena punya highlight yang lebih hidup dibanding environment map
    // flat buatan sendiri (dicoba sebelumnya, hasilnya malah lebih datar).
    exposure: "2",
    "tone-mapping": "commerce",
    style: { width: "100%", height: "100%", backgroundColor: "transparent" },
  });
}
