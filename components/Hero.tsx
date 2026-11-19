import Image from "next/image";
import hero from "@/public/images/production/hero.webp";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  return (
    <section id="top" className="studio-hero" aria-labelledby="hero-title">
      <div className="studio-hero-photo">
        <Image src={hero} alt="Concept image of a polished black Porsche in a detailing studio" fill sizes="(min-width:1024px) 72vw, (min-width:768px) 56vw, 100vw" preload fetchPriority="high" quality={80} />
      </div>
      <div className="container-x studio-hero-copy">
        <h1 id="hero-title">Precision detailing<br />for exceptional cars.</h1>
        <p>Paint correction, ceramic coating and interior care, carefully prepared and finished by hand, with attention to every surface.</p>
        <div className="studio-actions">
          <ButtonLink href="#contact">Book an appointment</ButtonLink>
          <ButtonLink href="#services" variant="ghost">Explore services</ButtonLink>
        </div>
      </div>
    </section>
  );
}
