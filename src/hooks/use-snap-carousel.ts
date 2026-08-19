"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const RESUME_AFTER_INTERACTION_MS = 5000;

/**
 * Interaksi carousel scroll-snap yang dipakai bersama: geser manual (swipe/drag),
 * geser otomatis berkala, dan indikator index aktif. Layout/kartu ditentukan
 * pemanggil — hook ini cuma mengurus track scroll-nya.
 */
export function useSnapCarousel({
  length,
  autoSlideMs,
}: {
  length: number;
  autoSlideMs?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  const pauseAutoSlide = useCallback(() => {
    pausedRef.current = true;
    clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_AFTER_INTERACTION_MS);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (length === 0) return;
      const next = (index + length) % length;
      setActiveIndex(next);
      scrollToIndex(next);
      pauseAutoSlide();
    },
    [length, scrollToIndex, pauseAutoSlide]
  );

  useEffect(() => {
    if (!autoSlideMs || length <= 1) return;
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setActiveIndex((prev) => {
        const next = (prev + 1) % length;
        scrollToIndex(next);
        return next;
      });
    }, autoSlideMs);
    return () => clearInterval(id);
  }, [length, autoSlideMs, scrollToIndex]);

  // Sinkronkan index aktif dengan posisi scroll saat pengguna geser manual (drag/swipe).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      pauseAutoSlide();

      const cards = Array.from(track.children) as HTMLElement[];
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let closestDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft + card.clientWidth / 2 - center);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, [pauseAutoSlide]);

  // Drag-to-scroll dengan mouse (touch/trackpad sudah bisa geser secara native).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      isDragging = true;
      startX = e.clientX;
      startScrollLeft = track.scrollLeft;
      track.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      track.scrollLeft = startScrollLeft - (e.clientX - startX);
    };
    const onPointerUp = () => {
      isDragging = false;
    };

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", onPointerUp);
    track.addEventListener("pointerleave", onPointerUp);
    return () => {
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", onPointerUp);
      track.removeEventListener("pointerleave", onPointerUp);
    };
  }, []);

  return { trackRef, activeIndex, goTo, pauseAutoSlide };
}
