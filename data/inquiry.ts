/** Options for the "Interested Service" select. Values are stable keys used by CTAs. */
export const serviceOptions = [
  { value: "exterior-detailing", label: "Exterior Detailing" },
  { value: "interior-deep-cleaning", label: "Interior Deep Cleaning" },
  { value: "paint-correction", label: "Paint Correction" },
  { value: "ceramic-coating", label: "Ceramic Coating" },
  { value: "essential-package", label: "Essential Package" },
  { value: "signature-package", label: "Signature Package" },
  { value: "complete-care", label: "Complete Care" },
  { value: "not-sure", label: "Not Sure Yet" },
] as const;

export type ServiceOptionValue = (typeof serviceOptions)[number]["value"];
