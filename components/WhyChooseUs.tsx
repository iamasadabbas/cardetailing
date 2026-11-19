import Image from "next/image";
import { Droplets, Layers, MessagesSquare, ScanSearch } from "lucide-react";
import whyImg from "@/public/images/why-pressure-wash.jpg";
import { principles } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";

const icons = {
  scan: ScanSearch,
  layers: Layers,
  droplet: Droplets,
  message: MessagesSquare,
} as const;

export function WhyChooseUs() {
  return (
    <section id="why-kavero" aria-labelledby="why-title" className="section-y relative bg-ink">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          {/* Image column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
              <div className="relative aspect-[4/5] overflow-hidden bg-graphite sm:aspect-[16/11] lg:aspect-[4/5]" data-reveal="image">
                <Image
                  src={whyImg}
                  alt="High-pressure water spraying across the rear wheel and bodywork of a dark sports car"
                  fill
                  quality={70}
                  placeholder="blur"
                  sizes="(min-width:1024px) 40vw, 100vw"
                  className="object-cover object-[38%_50%] contrast-[1.04] saturate-[0.8]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" aria-hidden="true" />
                <p className="absolute right-5 bottom-5 left-5 flex items-center justify-between text-[0.62rem] font-medium tracking-[0.24em] text-bone/85 uppercase">
                  <span>Preparation first</span>
                  <span className="text-accent">●</span>
                </p>
              </div>
            </div>
          </div>

          {/* Principles column */}
          <div className="lg:col-span-7 lg:pl-6 xl:pl-12">
            <SectionLabel index="05" label="The Difference" className="mb-8" />
            <h2
              id="why-title"
              className="display-tight text-[clamp(2.1rem,9vw,3.25rem)] md:text-[clamp(3rem,5.4vw,4.75rem)]"
              data-reveal
            >
              Detailing
              <br />
              with intention<span className="text-accent">.</span>
            </h2>

            <ol className="mt-14 border-t border-line lg:mt-20">
              {principles.map((p, i) => {
                const Icon = icons[p.icon];
                return (
                  <li
                    key={p.title}
                    className="group grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 border-b border-line py-8 sm:grid-cols-[3rem_1.15fr_1.25fr] sm:gap-x-8 md:py-10"
                    data-reveal
                    style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                  >
                    <span className="pt-[0.3rem] font-display text-sm font-semibold tracking-[0.18em] text-accent tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="flex items-start gap-3 self-start font-display text-xl leading-snug font-semibold tracking-tight uppercase sm:text-[1.35rem]">
                      <Icon
                        className="mt-[0.2rem] h-5 w-5 shrink-0 text-silver transition-colors duration-300 group-hover:text-accent"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      {p.title}
                    </h3>
                    <p className="col-start-2 leading-relaxed text-silver sm:col-start-3 sm:row-start-1 sm:pt-0.5">{p.text}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
