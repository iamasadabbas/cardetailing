import { SectionLabel } from "@/components/ui/SectionLabel";
export function BrandIntroduction() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="section-y approach-studio"><div className="container-x">
      <div className="approach-grid"><SectionLabel index="02" label="The KAVERO Philosophy" /><div><h2 id="approach-title" className="editorial-title" data-reveal>Some see a car.<br />We see <span className="muted">every detail.</span></h2><div className="approach-copy" data-reveal><p>A reflection of you. A source of pride. A reason to take the long way home.</p><p>We believe caring for your car should feel as considered as driving it. From the first inspection to the final finish, every surface receives the attention it deserves.</p></div></div></div>
      <div className="philosophy-rail"><span>Restore the finish.</span><span>Refine the feeling.</span><span>Preserve the drive.</span></div>
    </div></section>
  );
}
