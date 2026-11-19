import type { StaticImageData } from "next/image";
import img911 from "@/public/images/gallery-911-street.jpg";
import imgFront from "@/public/images/final-front.jpg";
import imgMono from "@/public/images/gallery-mono-gt.jpg";
import imgBlack from "@/public/images/gallery-black-front.jpg";
import imgProfile from "@/public/images/featured-silhouette.jpg";
export type GalleryItem = { src: StaticImageData; alt: string; caption: string; layout: string; focus?: string };
// Licensed concept photography, not KAVERO client work. See IMAGE-CREDITS.md.
export const gallery: GalleryItem[] = [
 {src:img911, alt:"Black Porsche 911 with bronze wheels on a quiet city street", caption:"A study in gloss", layout:"", focus:"50% 65%"},
 {src:imgFront, alt:"Silver Ferrari photographed head-on with sculpted bodywork and sharp reflections", caption:"Sculpted in silver", layout:"", focus:"50% 70%"},
 {src:imgMono, alt:"Dark Mercedes grand tourer at a harbour, photographed in monochrome", caption:"Depth. Clarity. Presence.", layout:"", focus:"50% 70%"},
 {src:imgBlack, alt:"Gloss black Audi facing forward at dusk", caption:"The finer details", layout:"", focus:"50% 65%"},
 {src:imgProfile, alt:"Black Mercedes coupe in profile under a narrow band of light", caption:"Light meets form", layout:"", focus:"50% 65%"}
];
