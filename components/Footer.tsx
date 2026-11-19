import { ArrowUp } from "lucide-react";
import { navigation, siteConfig } from "@/data/siteConfig";
import { services } from "@/data/services";
import { BrandMark } from "@/components/ui/BrandMark";
import { InquiryLink } from "@/components/ui/InquiryLink";
import { CurrentYear } from "@/components/ui/CurrentYear";

export function Footer() {
  const { contact, social } = siteConfig;
  const contactItems = [
    contact.email && { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    contact.phone && { label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    contact.address && { label: "Studio", value: contact.address },
    contact.hours && { label: "Hours", value: contact.hours },
  ].filter(Boolean) as { label: string; value: string; href?: string }[];

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      <div className="container-x pt-20 pb-10 md:pt-24">
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-12 md:gap-8">
          <div className="col-span-2 md:col-span-5 lg:col-span-4">
            <BrandMark withTagline />
            <p className="mt-7 max-w-xs leading-relaxed text-silver">{siteConfig.shortDescription}</p>
            {contactItems.length > 0 && (
              <dl className="mt-8 space-y-3 text-sm">
                {contactItems.map((c) => (
                  <div key={c.label} className="flex gap-4">
                    <dt className="w-16 text-silver">{c.label}</dt>
                    <dd>{c.href ? <a href={c.href} className="hover:text-accent">{c.value}</a> : c.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <nav aria-label="Footer" className="col-span-1 md:col-span-3 lg:col-span-2 lg:col-start-7">
            <p className="eyebrow mb-6 text-silver">Navigate</p>
            <ul className="space-y-1">
              {navigation.map((n) => (
                <li key={n.id}>
                  <a href={n.href} className="inline-block py-1.5 text-bone/85 transition-colors hover:text-accent">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="col-span-1 md:col-span-4 lg:col-span-3">
            <p className="eyebrow mb-6 text-silver">Services</p>
            <ul className="space-y-1">
              {services.map((s) => (
                <li key={s.number}>
                  <InquiryLink service={s.inquiry} className="inline-block py-1.5 text-bone/85 transition-colors hover:text-accent">
                    {s.title}
                  </InquiryLink>
                </li>
              ))}
              <li>
                <a href="#packages" className="inline-block py-1.5 text-bone/85 transition-colors hover:text-accent">
                  Detailing Packages
                </a>
              </li>
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-12 lg:col-span-1 lg:justify-self-end">
            <a
              href="#top"
              className="group inline-flex items-center gap-3 text-[0.68rem] font-semibold tracking-[0.22em] text-bone uppercase lg:flex-col-reverse"
            >
              <span className="flex h-12 w-12 items-center justify-center border border-line transition-all duration-500 ease-[var(--ease-premium)] group-hover:-translate-y-1 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="lg:[writing-mode:vertical-rl]">Back to top</span>
            </a>
          </div>
        </div>

        {social.length > 0 && (
          <ul className="mt-12 flex flex-wrap gap-6 text-sm">
            {social.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-silver hover:text-accent">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Oversized wordmark */}
      <div className="container-x pt-6" aria-hidden="true">
        <svg viewBox="0 0 1000 205" className="block h-auto w-full select-none" role="presentation" focusable="false">
          <text
            x="500"
            y="190"
            textAnchor="middle"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            className="fill-bone/[0.05] font-display"
            style={{ fontSize: 262, fontWeight: 700, letterSpacing: "-0.04em" }}
          >
            KAVERO
          </text>
        </svg>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-4 py-6 text-xs text-silver md:flex-row md:items-center md:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.name}. {siteConfig.tagline}.
          </p>
          {siteConfig.isConcept && (
            <p className="inline-flex items-center gap-2 self-start border border-line px-3 py-1.5 text-[0.65rem] tracking-[0.08em] whitespace-nowrap uppercase xs:text-xs xs:tracking-[0.14em] md:self-auto">
              <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
              {siteConfig.conceptDisclosure}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
