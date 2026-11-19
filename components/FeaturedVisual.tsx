import Image from "next/image";
import featuredImg from "@/public/images/gallery-garage-coupe.jpg";
export function FeaturedVisual() {
 return <section className="feature-studio feature-review" aria-labelledby="featured-title"><div className="container-x feature-heading"><div><p className="eyebrow">The KAVERO Standard</p><h2 id="featured-title">Presence.<br /><em>In every light.</em></h2></div><p className="feature-description">The contours. The clarity. The finish.<br />Care that brings your car back into focus.</p></div><div className="container-x"><div className="feature-photo"><Image src={featuredImg} alt="Silver Audi coupe in a garage, clearly illuminated against dark architectural walls" fill sizes="(min-width:1440px) 1280px, 100vw" quality={80} loading="eager" /></div></div><div className="container-x feature-foot"><p>Good detailing is seen. Great detailing is felt.</p><a href="#process" className="text-link">Our approach to the finish</a></div></section>;
}
