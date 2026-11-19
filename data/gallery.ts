import type { StaticImageData } from "next/image";
import polished from "@/public/images/production/vehicle.webp";
import correction from "@/public/images/production/gallery-finish.webp";
import interior from "@/public/images/production/gallery-interior.webp";
import coating from "@/public/images/production/gallery-coating.webp";
import cabin from "@/public/images/production/cabin.webp";
import wash from "@/public/images/production/gallery-wash.webp";

export type GalleryItem = { src: StaticImageData; alt: string; caption: string; layout: string; focus?: string };
export const gallery: GalleryItem[] = [
  {src:polished, alt:"Black Porsche with illuminated rear light in a dark studio", caption:"Sculpted in light", layout:"",focus:"55% 50%"},
  {src:correction, alt:"Refined black paint and headlight glass under studio inspection lights", caption:"Paint clarity", layout:""},
  {src:interior, alt:"Technician cleaning a black leather steering wheel by hand", caption:"Interior care", layout:""},
  {src:coating, alt:"Applicator block applying ceramic coating to polished paint", caption:"Ceramic protection", layout:""},
  {src:cabin, alt:"Premium black leather cabin and steering wheel", caption:"Cabin materials", layout:""},
  {src:wash, alt:"Gloved hand carefully cleaning a black vehicle wheel", caption:"Wheel detailing", layout:""}
];
