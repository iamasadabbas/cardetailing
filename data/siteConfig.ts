/**
 * Central brand + business configuration.
 *
 * To adapt this template for a real detailing business, update the
 * values below (and the content files in /data). Contact details are
 * intentionally left empty: KAVERO is a fictional concept brand, so no
 * address, phone, email, hours or social profiles are invented.
 * Any field left empty is simply not rendered.
 */
export const siteConfig = {
  name: "KAVERO",
  tagline: "Premium Auto Detailing Studio",
  description:
    "KAVERO is a premium auto detailing studio concept — exterior detailing, interior deep cleaning, paint correction and ceramic coating, presented with care and precision.",
  shortDescription:
    "Considered exterior, interior and paint care for owners who notice the difference.",

  /** Used for canonical URLs and Open Graph. Set NEXT_PUBLIC_SITE_URL in production. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /** This build is a demonstration. Set to false when launching a real business site. */
  isConcept: true,
  conceptDisclosure: "Concept Website — Demonstration Only",

  /**
   * Real business contact details. Leave empty to hide.
   * Example: { email: "studio@example.com", phone: "+1 555 0100", address: "…" }
   */
  contact: {
    email: "",
    phone: "",
    address: "",
    hours: "",
  } as { email: string; phone: string; address: string; hours: string },

  /** Social profiles: { label: "Instagram", href: "https://…" }. Empty = hidden. */
  social: [] as { label: string; href: string }[],
} as const;

export const navigation = [
  { label: "Home", href: "#top", id: "top" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Why KAVERO", href: "#why-kavero", id: "why-kavero" },
  { label: "Gallery", href: "#gallery", id: "gallery" },
  { label: "Process", href: "#process", id: "process" },
  { label: "Contact", href: "#contact", id: "contact" },
] as const;
