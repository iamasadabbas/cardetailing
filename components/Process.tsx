"use client";

import { useRef } from "react";
import { m, useScroll, useSpring, useTransform } from "motion/react";
import { processSteps } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Process() {
  const trackRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 85%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const scale = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section id="process" aria-labelledby="process-title" className="section-y relative overflow-hidden border-t border-line/60 bg-charcoal">
      <div className="container-x relative">
        <div className="mb-16 grid grid-cols-1 gap-8 md:mb-24 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="08" label="How It Works" className="mb-8" />
            <h2
              id="process-title"
              className="display-tight text-[clamp(2.1rem,9vw,3.25rem)] md:text-[clamp(3rem,5.4vw,4.75rem)]"
              data-reveal
            >
              From first contact
              <br />
              <span className="text-silver/55">to final finish.</span>
            </h2>
          </div>
          <p className="max-w-sm leading-relaxed text-silver lg:col-span-4 lg:justify-self-end" data-reveal>
            A clear, four-step path — so you always know what happens next and what has been agreed.
          </p>
        </div>

        <ol ref={trackRef} className="relative grid grid-cols-1 gap-0 lg:grid-cols-4 lg:gap-8">
          {/* Track — vertical on mobile, horizontal on desktop */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[0.6875rem] w-px bg-line lg:top-[0.6875rem] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
          <m.span
            aria-hidden="true"
            style={{ scaleY: scale }}
            className="absolute top-2 bottom-2 left-[0.6875rem] w-px origin-top bg-accent lg:hidden"
          />
          <m.span
            aria-hidden="true"
            style={{ scaleX: scale }}
            className="absolute top-[0.6875rem] right-0 left-0 hidden h-px origin-left bg-accent lg:block"
          />

          {processSteps.map((step, i) => (
            <li
              key={step.number}
              className="relative grid grid-cols-[1.375rem_1fr] gap-x-6 pb-12 last:pb-0 lg:block lg:pb-0"
              data-reveal
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            >
              <span aria-hidden="true" className="relative z-10 mt-0.5 flex h-[1.375rem] w-[1.375rem] items-center justify-center border border-line bg-charcoal lg:mt-0">
                <span className="h-1.5 w-1.5 bg-accent" />
              </span>

              <div className="lg:mt-10 lg:pr-4">
                <p className="font-display text-[3.25rem] leading-none font-bold tracking-tighter text-bone/12 tabular-nums lg:text-[4.5rem]">
                  {step.number}
                </p>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight uppercase lg:mt-6 lg:text-[1.35rem]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs leading-relaxed text-silver">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
