import type { StaticImageData } from "next/image";
import type { ServiceOptionValue } from "./inquiry";

import exteriorImg from "@/public/images/production/wash.webp";
import interiorImg from "@/public/images/production/interior.webp";
import paintImg from "@/public/images/production/paint.webp";
import ceramicImg from "@/public/images/production/coating.webp";

export type Service = {
  number: string;
  title: string;
  description: string;
  points: string[];
  image: StaticImageData;
  alt: string;
  /** focal point for object-position */
  focus: string;
  inquiry: ServiceOptionValue;
};

export const services: Service[] = [
  {
    number: "01",
    title: "Exterior Detailing",
    description:
      "Careful exterior cleaning, wheel care, and finishing treatments that leave your vehicle looking its best.",
    points: ["Pre-wash rinse", "Wheels & tires", "Exterior finishing"],
    image: exteriorImg,
    alt: "Concept image of a black car being washed by hand",
    focus: "50% 68%",
    inquiry: "exterior-detailing",
  },
  {
    number: "02",
    title: "Interior Deep Cleaning",
    description:
      "Detailed attention to seats, carpets, trim, and frequently touched surfaces for a refreshed cabin.",
    points: ["Seats & carpets", "Trim & panels", "Touch surfaces"],
    image: interiorImg,
    alt: "Concept image of a gloved detailer brushing a black leather seat",
    focus: "50% 50%",
    inquiry: "interior-deep-cleaning",
  },
  {
    number: "03",
    title: "Paint Correction",
    description:
      "Specialized polishing processes designed to address eligible surface imperfections and improve paint clarity.",
    points: ["Paint assessment", "Machine polishing", "Clarity & gloss"],
    image: paintImg,
    alt: "Concept image of a gloved technician polishing black automotive paint",
    focus: "50% 60%",
    inquiry: "paint-correction",
  },
  {
    number: "04",
    title: "Ceramic Coating",
    description:
      "Protective coating options designed to support easier maintenance and provide a carefully finished appearance.",
    points: ["Surface preparation", "Coating options", "Aftercare guidance"],
    image: ceramicImg,
    alt: "Concept image of ceramic coating applied with an applicator block",
    focus: "50% 50%",
    inquiry: "ceramic-coating",
  },
];
