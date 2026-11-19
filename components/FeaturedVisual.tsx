import Image from "next/image";
import featuredImg from "@/public/images/featured-silhouette.jpg";
export function FeaturedVisual() {
  return (
    <section className="feature-studio" aria-labelledby="featured-title"><div className="container-x feature-heading"><p className="eyebrow">The KAVERO Standard</p><h2 id="featured-title" data-reveal>Quiet confidence.<br /><em>Immaculate presence.</em></h2></div><div className="feature-photo"><Image src={featuredImg} alt="A black Mercedes coupe in profile, its silhouette traced by reflected light" fill sizes="100vw" quality={80} placeholder="blur" /></div><div className="container-x feature-foot"><p>Good detailing is seen. Great detailing is felt.</p><a href="#process" className="text-link">Our approach to the finish</a></div></section>
  );
}
