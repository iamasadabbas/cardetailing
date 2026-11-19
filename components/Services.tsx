import Image from "next/image";
import { services } from "@/data/services";
import { InquiryLink } from "@/components/ui/InquiryLink";

export function Services() {
  const ordered = [services[2], services[3], services[0], services[1]];
  return (
    <section id="services" className="studio-band" aria-labelledby="services-title">
      <div className="container-x">
        <div className="studio-intro">
          <h2 id="services-title">Considered care.<br />A remarkable finish.</h2>
          <p>Four specialist treatments. One considered approach to the paint, protection and materials that make your car yours.</p>
        </div>
        <div className="photographic-services">
          {ordered.map((s, i) => (
            <article key={s.inquiry} className={`service-story-${i} photographic-service`}>
              <div className="service-photograph"><Image src={s.image} alt={s.alt} fill quality={85} sizes="(min-width:1536px) 870px, (min-width:768px) 58vw, calc(100vw - 48px)" /></div>
              <div className="service-copy">
                <p className="service-number">0{i + 1} / {i < 2 ? "Refine & protect" : "Clean & renew"}</p>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <InquiryLink service={s.inquiry} className="service-inquiry">Explore this treatment <span aria-hidden="true">↗</span></InquiryLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
