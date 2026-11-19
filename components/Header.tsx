"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { navigation } from "@/data/siteConfig";
import { BrandMark } from "@/components/ui/BrandMark";
import { buttonClasses } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("top");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Solid header after a little scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const ids = navigation.map((n) => n.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) menuButtonRef.current?.focus();
  }, []);

  // Drawer: lock scroll, Escape to close, keep focus inside
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const scrollbar = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    html.style.paddingRight = `${scrollbar}px`;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
      if (e.key === "Tab" && drawerRef.current) {
        const focusables = [
          menuButtonRef.current,
          ...drawerRef.current.querySelectorAll<HTMLElement>("a[href], button"),
        ].filter((el): el is HTMLElement => Boolean(el));
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    window.setTimeout(() => drawerRef.current?.querySelector<HTMLElement>("a[href]")?.focus(), 50);

    const mq = window.matchMedia("(min-width: 64rem)");
    const onMq = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onMq);

    return () => {
      html.style.overflow = "";
      html.style.paddingRight = "";
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open, close]);

  const solid = scrolled || open;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-[var(--ease-premium)] ${
        solid
          ? "border-b border-line/70 bg-ink/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:bg-bone focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>

      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
        <a href="#top" aria-label="KAVERO — back to top" className="relative z-[52] -m-2 p-2">
          <BrandMark />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-3">
            {navigation.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`group relative block px-2.5 py-3 text-[0.68rem] font-medium tracking-[0.14em] whitespace-nowrap uppercase xl:px-3 xl:text-[0.72rem] xl:tracking-[0.18em] transition-colors duration-300 ${
                      isActive ? "text-bone" : "text-silver hover:text-bone"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute right-2.5 bottom-1.5 left-2.5 h-px xl:right-3 xl:left-3 origin-left bg-accent transition-transform duration-500 ease-[var(--ease-premium)] ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block">
            <a href="#contact" className={buttonClasses("primary", "md")}>
              <span>Book now</span>
            </a>
          </span>

          <button
            ref={menuButtonRef}
            type="button"
            className="relative z-[52] -mr-2 flex h-12 w-12 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 block h-[1.5px] w-6 bg-bone transition-all duration-500 ease-[var(--ease-premium)] ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] bg-bone transition-all duration-500 ease-[var(--ease-premium)] ${
                  open ? "top-1/2 w-6 -translate-y-1/2 -rotate-45" : "top-full w-4 -translate-y-full"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

    </header>

    <AnimatePresence>
      {open && (
        <m.div
          ref={drawerRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-40 flex flex-col bg-ink lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="h-[var(--header-h)] shrink-0" />
          <nav aria-label="Mobile" className="container-x flex flex-1 flex-col overflow-y-auto pt-6 pb-8">
            <ul className="border-t border-line">
              {navigation.map((item, i) => (
                <m.li
                  key={item.id}
                  className="border-b border-line"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.045, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={item.href}
                    onClick={() => close(false)}
                    aria-current={active === item.id ? "true" : undefined}
                    className="group flex items-center justify-between py-4 font-display text-[1.75rem] font-semibold tracking-tight uppercase xs:text-3xl"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="w-6 text-[0.7rem] font-medium tracking-[0.2em] text-accent tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={active === item.id ? "text-bone" : "text-bone/80"}>{item.label}</span>
                    </span>
                    <ArrowRight
                      className="h-5 w-5 text-silver transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </a>
                </m.li>
              ))}
            </ul>

            <m.div
              className="mt-auto pt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <a
                href="#contact"
                onClick={() => close(false)}
                className={buttonClasses("primary", "lg", "w-full")}
              >
                <span>Book now</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <p className="mt-6 text-center text-[0.65rem] tracking-[0.24em] text-silver uppercase">
                Premium Auto Detailing Studio
              </p>
            </m.div>
          </nav>
        </m.div>
      )}
    </AnimatePresence>
    </>
  );
}
