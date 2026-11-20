"use client";

import Image from "next/image";
import { useState, type CSSProperties, type PointerEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./BeforeAfter.css";

const sizes = "(min-width: 1536px) 1376px, (min-width: 1440px) calc(100vw - 160px), (min-width: 1024px) calc(100vw - 128px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 48px)";

export function BeforeAfter() {
  const [position, setPosition] = useState(50);

  const move = (event: PointerEvent<HTMLInputElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition(Math.round(Math.min(100, Math.max(0, (event.clientX - bounds.left) / bounds.width * 100))));
  };

  return (
    <section id="before-after" className="studio-band" aria-labelledby="before-after-title">
      <div className="container-x">
        <div className="studio-intro">
          <h2 id="before-after-title">Before &amp; After</h2>
          <p>See the difference that careful paint correction can make.</p>
        </div>
        <figure>
          <div className="paint-comparison" style={{ "--position": `${position}%` } as CSSProperties}>
            <Image src="/images/kavero-after.webp" alt="Black car with a glossy finish after illustrative paint correction" fill sizes={sizes} quality={85} loading="lazy" className="paint-comparison-image" draggable={false} />
            <div className="paint-comparison-before">
              <Image src="/images/kavero-before.webp" alt="The same black car with visible swirl marks before illustrative paint correction" fill sizes={sizes} quality={85} loading="lazy" className="paint-comparison-image" draggable={false} />
            </div>
            <span className="paint-comparison-label paint-comparison-before-label">Before</span>
            <span className="paint-comparison-label paint-comparison-after-label">After</span>
            <div className="paint-comparison-divider" aria-hidden="true">
              <span className="paint-comparison-handle">
                <ChevronLeft size={14} /><ChevronRight size={14} />
              </span>
            </div>
            <input
              className="paint-comparison-range"
              type="range"
              min={0}
              max={100}
              step={1}
              value={position}
              aria-label="Before and after paint correction comparison"
              aria-valuetext={`${position}% before, ${100 - position}% after`}
              aria-describedby="before-after-disclosure"
              onChange={(event) => setPosition(Number(event.target.value))}
              onPointerDown={(event) => {
                if (!event.isPrimary || event.button !== 0) return;
                event.preventDefault();
                event.currentTarget.focus({ preventScroll: true });
                event.currentTarget.setPointerCapture(event.pointerId);
                move(event);
              }}
              onPointerMove={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) move(event);
              }}
              onPointerUp={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                  move(event);
                  event.currentTarget.releasePointerCapture(event.pointerId);
                }
              }}
            />
          </div>
          <figcaption id="before-after-disclosure" className="mt-4 text-sm leading-relaxed text-silver">
            Illustrative AI-generated comparison for demonstration purposes. Not actual customer work.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
