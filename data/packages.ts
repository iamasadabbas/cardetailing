import type { ServiceOptionValue } from "./inquiry";

export type DetailPackage = {
  id: string;
  name: string;
  summary: string;
  includes: string[];
  cta: string;
  inquiry: ServiceOptionValue;
  featured?: boolean;
};

export const packages: DetailPackage[] = [
  {
    id: "essential",
    name: "Essential",
    summary: "Suitable for regular upkeep.",
    includes: [
      "Exterior hand wash",
      "Wheel and tire cleaning",
      "Interior vacuum",
      "Interior surface wipe-down",
      "Exterior finishing",
    ],
    cta: "Ask About Essential",
    inquiry: "essential-package",
  },
  {
    id: "signature",
    name: "Signature",
    summary: "Suitable for more comprehensive cleaning.",
    includes: [
      "Detailed exterior wash",
      "Wheel and tire care",
      "Interior deep cleaning",
      "Trim and surface attention",
      "Exterior finishing",
    ],
    cta: "Ask About Signature",
    inquiry: "signature-package",
    featured: true,
  },
  {
    id: "complete-care",
    name: "Complete Care",
    summary: "Suitable for owners seeking additional finishing services.",
    includes: [
      "Detailed exterior and interior care",
      "Surface assessment",
      "Available polishing options",
      "Available paint protection options",
      "Service consultation",
    ],
    cta: "Ask About Complete Care",
    inquiry: "complete-care",
  },
];

export const packagesNote =
  "Services and final quotations depend on vehicle size, condition, and selected treatments. Packages shown for demonstration purposes.";
