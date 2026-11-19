"use client";

import { useId, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Plus } from "lucide-react";
import { faqs } from "@/data/content";
import { buttonClasses } from "@/components/ui/Button";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y relative bg-ink">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="faq-introduction">
              <h2
                id="faq-title"
                className="display-tight text-[clamp(2.1rem,9vw,3.25rem)] md:text-[clamp(3rem,5.4vw,4.5rem)] lg:text-[clamp(2.75rem,3.6vw,3.6rem)]"
                data-reveal
              >
                Good questions.
                <br />
                <span className="text-silver/55">Clear answers.</span>
              </h2>
              <p className="mt-8 max-w-sm leading-relaxed text-silver" data-reveal>
                Something else on your mind? Include it in your inquiry and it can be discussed before any
                work is agreed.
              </p>
              <a href="#contact" className={buttonClasses("ghost", "md", "mt-8")} data-reveal>
                <span>Ask a question</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 xl:col-span-6 xl:col-start-7">
            <ul className="border-t border-line">
              {faqs.map((item, i) => {
                const isOpen = openIndex === i;
                const btnId = `${baseId}-q-${i}`;
                const panelId = `${baseId}-a-${i}`;
                return (
                  <li key={item.q} className="border-b border-line">
                    <h3>
                      <button
                        id={btnId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenIndex(isOpen ? null : i)}
                        className="group flex w-full items-start justify-between gap-6 py-6 text-left md:py-7"
                      >
                        <span className="flex gap-4 sm:gap-6">
                          <span className="pt-[0.2rem] text-[0.7rem] font-semibold tracking-[0.18em] text-accent tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`font-display text-lg leading-snug font-medium tracking-tight transition-colors duration-300 sm:text-xl ${
                              isOpen ? "text-bone" : "text-bone/85 group-hover:text-bone"
                            }`}
                          >
                            {item.q}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border transition-all duration-500 ease-[var(--ease-premium)] ${
                            isOpen
                              ? "border-accent bg-accent text-ink"
                              : "border-line text-silver group-hover:border-bone group-hover:text-bone"
                          }`}
                        >
                          <Plus className={`h-4 w-4 transition-transform duration-500 ease-[var(--ease-premium)] ${isOpen ? "rotate-45" : ""}`} />
                        </span>
                      </button>
                    </h3>
                    <div id={panelId} role="region" aria-labelledby={btnId}>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <m.div
                          key="panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-xl pr-12 pb-7 pl-[2.2rem] leading-relaxed text-silver sm:pl-[2.95rem]">
                            {item.a}
                          </p>
                        </m.div>
                      )}
                    </AnimatePresence>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
