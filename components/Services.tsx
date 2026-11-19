import Image from "next/image";
import { services } from "@/data/services";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { InquiryLink } from "@/components/ui/InquiryLink";
export function Services() {
  const ordered = [services[2], services[3], services[0], services[1]];
  return (
    <section id="services" aria-labelledby="services-title" className="section-y services-studio"><div className="container-x">
      <div className="studio-section-head"><div><SectionLabel index="03" label="The Art of Car Care" className="mb-7" /><h2 id="services-title" className="editorial-title" data-reveal>Exceptional care.<br /><span className="muted">In every sense.</span></h2></div><p data-reveal>From the depth of your paint to the feeling of your cabin. Thoughtful treatments, tailored to your vehicle.</p></div>
      <div className="services-composition">{ordered.map((s, i) => (
        <article key={s.number} className={"service-story service-story-" + i}>
          <InquiryLink service={s.inquiry} className="service-image" aria-label={"Enquire about " + s.title}><Image src={s.image} alt={s.alt} fill quality={80} placeholder="blur" sizes="(min-width:1024px) 55vw, 100vw" style={{objectPosition:s.focus}} /><span className="image-caption">KAVERO / {s.title}</span></InquiryLink>
          <div className="service-copy" data-reveal><p className="eyebrow text-accent">{i < 2 ? "Refine & protect" : "Refresh & restore"}</p><h3>{s.title}</h3><p>{s.description}</p><ul>{s.points.map(p=><li key={p}>{p}</li>)}</ul><InquiryLink service={s.inquiry} className="text-link">Discover this service</InquiryLink></div>
        </article>
      ))}</div>
    </div></section>
  );
}
