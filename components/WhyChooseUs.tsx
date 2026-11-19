import Image from "next/image";
import treatment from "@/public/images/production/approach.webp";

export function WhyChooseUs() {
  return (
    <section id="why-kavero" className="studio-band kavero-approach" aria-labelledby="why-title">
      <div className="container-x approach-layout">
        <div className="approach-image"><Image src={treatment} alt="Concept image of a microfiber cloth finishing reflective black paint" fill sizes="(min-width:1536px) 1080px, (min-width:768px) 70vw, 100vw" /></div>
        <div className="approach-copy">
          <p className="service-number">Why KAVERO</p>
          <h2 id="why-title">Care begins<br />with attention.</h2>
          <p>A considered detail starts with understanding the vehicle. Its paint, its materials and the finish you want to preserve.</p>
          <dl>
            <div><dt>Assess before refining</dt><dd>The condition of each surface guides the treatment.</dd></div>
            <div><dt>Prepare with purpose</dt><dd>Careful cleaning and preparation come before correction or protection.</dd></div>
            <div><dt>Finish with clarity</dt><dd>A final review and practical aftercare help you understand the next steps.</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
