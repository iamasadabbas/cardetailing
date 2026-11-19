"use client";

import Image from "next/image";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { gallery } from "@/data/gallery";

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const openedIndex = useRef(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);


  const open = (i: number) => {
    openedIndex.current = i;
    setDirection(0);
    setIndex(i);
  };

  const close = () => {
    setIndex(null);
    // return focus to the image that opened the viewer
    window.setTimeout(() => triggerRefs.current[openedIndex.current]?.focus(), 0);
  };

  const go = (delta: number) => {
    if (index === null) return;
    const next = (index + delta + gallery.length) % gallery.length;
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
        <div className="studio-intro">
          <h2 id="gallery-title">The finish,<br />in detail.</h2>
          <p>Reflected light. Rich materials. Precise care.<br />AI-generated concept imagery illustrating the KAVERO approach.</p>
        </div>
        <ul className="editorial-gallery">
          {gallery.map((item, i) => (
            <li key={item.caption} className="gallery-tile">
              <button ref={el => { triggerRefs.current[i] = el; }} type="button" onClick={() => open(i)} aria-label={"Enlarge " + item.caption}>
                <Image src={item.src} alt={item.alt} fill quality={85} sizes={i === 0 ? "(min-width:1536px) 1000px, (min-width:768px) 65vw, calc(100vw - 48px)" : i < 3 ? "(min-width:1536px) 560px, (min-width:768px) 38vw, 50vw" : "(min-width:1536px) 450px, (min-width:768px) 30vw, 50vw"} style={{objectPosition:item.focus}} />
                <span className="gallery-caption">{item.caption}<Maximize2 size={18} aria-hidden="true" /></span>
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
                      loading="eager"
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
