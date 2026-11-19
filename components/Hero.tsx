import Image from "next/image";
import heroImg from "@/public/images/studio-hero.jpg";
import { ButtonLink } from "@/components/ui/Button";
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="hero-studio">
      <div className="hero-photograph anim-hero-image"><Image src={heroImg} alt="Sculpted silver Ferrari, photographed head-on with its bodywork catching the light" fill loading="eager" fetchPriority="high" quality={80} sizes="(min-width:1024px) 78vw, 100vw" placeholder="blur" /></div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="container-x hero-content">
        <p className="eyebrow hero-kicker anim-fade">Automotive care. Elevated.</p>
        <h1 id="hero-title" className="hero-title anim-rise">A finer<br />standard<br />of <em>detail.</em></h1>
        <p className="hero-description anim-rise">For the love of the drive.<br />Precision detailing, considered protection,<br className="hidden sm:block" /> and a finish that speaks for itself.</p>
        <div className="hero-actions anim-rise"><ButtonLink href="#contact">Book a Detail</ButtonLink><a href="#services" className="text-link">Explore services</a></div>
      </div>
      <div className="container-x hero-bottom"><span className="eyebrow">Premium Auto Detailing Studio</span><span className="hero-bottom-note">Considered care. From every angle.</span><a href="#approach" className="eyebrow scroll-link">Discover KAVERO <span aria-hidden="true" /></a></div>
    </section>
  );
}
