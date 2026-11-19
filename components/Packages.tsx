import { packages, packagesNote } from "@/data/packages";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { InquiryLink } from "@/components/ui/InquiryLink";
import { buttonClasses } from "@/components/ui/Button";
export function Packages() {
 return <section id="packages" aria-labelledby="packages-title" className="section-y"><div className="container-x">
  <div className="studio-section-head"><div><SectionLabel index="07" label="Care, Curated" className="mb-7" /><h2 id="packages-title" className="editorial-title" data-reveal>The right attention.<br /><span className="muted">At every level.</span></h2></div><p data-reveal>{packagesNote}</p></div>
  <ol className="package-collection">{packages.map((pkg)=><li key={pkg.id} className="package-story" data-reveal><span className="eyebrow">{pkg.featured ? <strong>The signature treatment</strong> : pkg.id === "essential" ? "The everyday refresh" : "The complete approach"}</span><h3>{pkg.name}</h3><p>{pkg.summary}</p><ul>{pkg.includes.map(item=><li key={item}>{item}</li>)}</ul><p className="package-price">Individually quoted</p><InquiryLink service={pkg.inquiry} className={buttonClasses(pkg.featured ? "primary" : "ghost", "lg")}>{pkg.cta}</InquiryLink></li>)}</ol>
 </div></section>;
}
