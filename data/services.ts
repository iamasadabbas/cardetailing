import type { StaticImageData } from "next/image";
import type { ServiceOptionValue } from "./inquiry";

import exteriorImg from "@/public/images/gallery-pressure-rinse.jpg";
import interiorImg from "@/public/images/interior-studio.jpg";
import paintImg from "@/public/images/gallery-911-street.jpg";
import ceramicImg from "@/public/images/coating-detail.jpg";

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
    alt: "A detailer rinsing the bodywork of a dark BMW before hand washing",
    focus: "50% 55%",
    inquiry: "exterior-detailing",
  },
  {
    number: "02",
    title: "Interior Deep Cleaning",
    description:
      "Detailed attention to seats, carpets, trim, and frequently touched surfaces for a refreshed cabin.",
    points: ["Seats & carpets", "Trim & panels", "Touch surfaces"],
    image: interiorImg,
    alt: "Ferrari cabin with black leather seats, a sculpted dashboard and a leather steering wheel",
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
    alt: "Glossy black sports car with sharp reflections along its bodywork",
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
    alt: "Close-up of water droplets beading on polished automotive paint",
    focus: "50% 50%",
    inquiry: "ceramic-coating",
  },
];
