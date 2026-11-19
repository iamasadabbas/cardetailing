import { navigation, siteConfig } from "@/data/siteConfig";
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
    <footer className="studio-footer">
      <a className="footer-signature" href="#top" aria-label="KAVERO, back to top">{siteConfig.name}</a>
      <p>{siteConfig.shortDescription}</p>
      <nav aria-label="Footer">{navigation.map(n => <a key={n.id} href={n.href}>{n.label}</a>)}</nav>
      {contactItems.map(c => <p key={c.label}>{c.label} &middot; {c.href ? <a href={c.href}>{c.value}</a> : c.value}</p>)}
      {social.map(s => <a key={s.href} href={s.href}>{s.label}</a>)}
      <small>&copy; <CurrentYear /> KAVERO &middot; {siteConfig.isConcept && siteConfig.conceptDisclosure}</small>
    </footer>
  );
}
