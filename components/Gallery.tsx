"use client";

import Image from "next/image";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { gallery } from "@/data/gallery";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastIndex = useRef(0);

  const open = (i: number) => {
    lastIndex.current = i;
    setDirection(0);
    setIndex(i);
  };

  const close = () => {
    setIndex(null);
    // return focus to the image that opened the viewer
    window.setTimeout(() => triggerRefs.current[lastIndex.current]?.focus(), 0);
  };

  const go = (delta: number) => {
    if (index === null) return;
    const next = (index + delta + gallery.length) % gallery.length;
    lastIndex.current = next;
    setDirection(delta);
    setIndex(next);
  };

  const isOpen = index !== null;

  const onKey = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "Tab" && dialogRef.current) {
      const f = dialogRef.current.querySelectorAll<HTMLElement>("button");
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  useEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    const scrollbar = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    html.style.paddingRight = `${scrollbar}px`;
    closeRef.current?.focus();

    const handler = (e: KeyboardEvent) => onKey(e);
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
      html.style.overflow = "";
      html.style.paddingRight = "";
    };
  }, [isOpen]);

  // basic swipe support
  const touchX = useRef<number | null>(null);

  const current = index !== null ? gallery[index] : null;

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section-y relative border-t border-line/60 bg-charcoal">
      <div className="container-x">
        <div className="mb-12 grid grid-cols-1 gap-8 md:mb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="06" label="The Gallery" className="mb-8" />
            <h2
              id="gallery-title"
              className="display-tight text-[clamp(2.1rem,9vw,3.25rem)] md:text-[clamp(3rem,5.6vw,5rem)]"
              data-reveal
            >
              The details speak<span className="text-accent">.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:justify-self-end lg:text-right" data-reveal>
            <p className="eyebrow inline-flex items-center gap-2 border border-line px-3 py-2 text-left text-[0.6rem] tracking-[0.2em] text-silver">
              <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
              Automotive studies / Concept imagery
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-silver lg:ml-auto">
              Licensed stock photography selected to illustrate the studio’s visual direction. These are not
              KAVERO customer projects.
            </p>
          </div>
        </div>

        <ul className="gallery-grid">
          {gallery.map((item, i) => (
            <li
              key={item.caption}
              className="gallery-tile"
              data-reveal="fade"
              style={{ "--reveal-delay": `${(i % 4) * 80}ms` } as React.CSSProperties}
            >
              <button
                ref={(el) => {
                  triggerRefs.current[i] = el;
                }}
                type="button"
                onClick={() => open(i)}
                aria-label={`Open image ${i + 1} of ${gallery.length}: ${item.alt}`}
                className="group relative block h-full w-full overflow-hidden bg-graphite text-left"
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  quality={70}
                  placeholder="blur"
                  sizes="(min-width: 768px) 45vw, 50vw"
                  style={item.focus ? { objectPosition: item.focus } : undefined}
                  className="object-cover contrast-[1.04] saturate-[0.8] transition-[transform,filter] duration-[1.2s] ease-[var(--ease-premium)] group-hover:scale-[1.05] md:brightness-[0.86] md:group-hover:brightness-100"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute right-3 bottom-3 left-3 flex items-end justify-between gap-3 sm:right-4 sm:bottom-4 sm:left-4">
                  <span className="text-[0.6rem] font-medium tracking-[0.2em] text-bone/90 uppercase sm:text-[0.65rem]">
                    <span>{item.caption}</span>
                  </span>
                  <span className="hidden h-9 w-9 shrink-0 translate-y-2 items-center justify-center border border-bone/30 bg-ink/40 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:flex">
                    <Maximize2 className="h-4 w-4" aria-hidden="true" />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- Lightbox ---------- */}
      <AnimatePresence>
        {current && index !== null && (
          <m.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            className="fixed inset-0 z-[70] flex flex-col bg-ink/97 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <div className="container-x flex h-[var(--header-h)] shrink-0 items-center justify-between">
              <p className="eyebrow text-silver" aria-live="polite">
                <span className="text-bone tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                <span className="mx-2">/</span>
                <span className="tabular-nums">{String(gallery.length).padStart(2, "0")}</span>
                <span className="ml-4 hidden text-silver/70 sm:inline">Concept imagery</span>
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close image viewer"
                className="-mr-2 flex h-12 w-12 items-center justify-center text-bone transition-colors hover:text-accent"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20 lg:px-28">
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <m.figure
                  key={index}
                  custom={direction}
                  className="relative flex h-full w-full flex-col items-center justify-center"
                  initial={{ opacity: 0, x: direction * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -60 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative h-full max-h-[calc(100svh-var(--header-h)-7rem)] w-full">
                    <Image
                      src={current.src}
                      alt={current.alt}
                      fill
                      quality={80}
                      sizes="100vw"
                      placeholder="blur"
                      className="object-contain"
                    />
                  </div>
                  <figcaption className="mt-4 max-w-2xl text-center text-sm text-silver">{current.alt}</figcaption>
                </m.figure>
              </AnimatePresence>

              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous image"
                className="absolute bottom-0 left-4 flex h-12 w-12 items-center justify-center border border-line bg-ink/60 text-bone transition-colors hover:border-accent hover:text-accent sm:top-1/2 sm:bottom-auto sm:left-6 sm:-translate-y-1/2"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next image"
                className="absolute right-4 bottom-0 flex h-12 w-12 items-center justify-center border border-line bg-ink/60 text-bone transition-colors hover:border-accent hover:text-accent sm:top-1/2 sm:right-6 sm:bottom-auto sm:-translate-y-1/2"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="h-16 shrink-0 sm:h-8" />
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
