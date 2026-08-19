"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Reveal } from "./reveal";
import { testimonials as defaultTestimonials, type Testimonial } from "@/lib/config/site";
import { useSnapCarousel } from "@/hooks/use-snap-carousel";

const AUTO_SLIDE_MS = 4000;

export function Testimonials({ testimonials = defaultTestimonials }: { testimonials?: Testimonial[] }) {
  const list = testimonials.length > 0 ? testimonials : defaultTestimonials;
  const { trackRef, activeIndex, goTo, pauseAutoSlide } = useSnapCarousel({
    length: list.length,
    autoSlideMs: AUTO_SLIDE_MS,
  });

  return (
    <section
      className="bg-gradient-to-b from-secondary/20 to-secondary/50"
      onMouseEnter={pauseAutoSlide}
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-24 lg:px-8">
        <Reveal className="max-w-xl">
          <p className="text-xs uppercase font-bold tracking-[0.2em] text-brand-700">Testimoni</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Apa kata pelanggan kami
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="relative mt-6 sm:mt-12">
          {list.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                aria-label="Testimoni sebelumnya"
                className="absolute -left-4 top-1/2 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/90 text-foreground shadow-sm transition-colors hover:bg-white sm:flex"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                aria-label="Testimoni berikutnya"
                className="absolute -right-4 top-1/2 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/90 text-foreground shadow-sm transition-colors hover:bg-white sm:flex"
              >
                <ChevronRight className="size-4" />
              </button>
            </>
          )}

          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 pb-2 cursor-grab select-none active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:gap-6"
          >
            {list.map((t) => (
              <div
                key={t.id}
                className="flex w-[220px] shrink-0 snap-start flex-col justify-between rounded-2xl border border-white/50 bg-white/70 p-4 shadow-sm backdrop-blur-md sm:w-[340px] sm:rounded-3xl sm:p-6"
              >
                <div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`size-3.5 sm:size-4 ${
                          idx < t.rating ? "fill-accent-gold-500 text-accent-gold-500" : "text-border"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-foreground/90 italic sm:mt-4 sm:line-clamp-none sm:text-sm">
                    &ldquo;{t.comment}&rdquo;
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-2 sm:mt-6 sm:gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-50 to-brand-100/50 border border-brand-100/30 text-xs font-semibold text-brand-700 shadow-sm sm:size-10 sm:text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground sm:text-sm">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground sm:text-xs">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {list.length > 1 && (
            <div className="mt-4 flex justify-center gap-2 sm:mt-6">
              {list.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Ke testimoni ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all sm:h-2 ${
                    i === activeIndex ? "w-5 bg-brand-700 sm:w-6" : "w-1.5 bg-border hover:bg-brand-300/60 sm:w-2"
                  }`}
                />
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
