# KAVERO visual redesign

Completed November 19, 2026. Implemented in the existing Next.js application; no deployment was performed.

## Direction and changes

The supplied NOCTURNE PDF and PRIME image informed the restrained spacing, dark automotive presentation, and attention to car silhouettes. The final compositions and typography are original to KAVERO.

- Replaced the hero with a large silver Ferrari photograph, oversized sentence-case typography, a serif accent, and separate desktop/mobile compositions. Fixed the old photograph's negative stacking.
- Rebuilt the brand introduction and services, replacing repeated image cards with alternating editorial stories and two supporting service presentations.
- Created a panoramic silhouette interlude and a consistent graphite, warm white, and orange palette.
- Curated the gallery to five automotive studies, with new desktop and mobile crops. Preserved the lightbox, keyboard navigation, touch handling, and focus restoration.
- Replaced boxed package cards with an open comparison, refined the process/FAQ/contact styling, and added a typographic closing section and prominent footer wordmark.
- Added licensed ceramic-coating and Ferrari-interior photographs; replaced the social preview so it also uses licensed photography. Sources are documented in [IMAGE-CREDITS.md](../IMAGE-CREDITS.md).
- Fixed an existing reduced-motion hydration mismatch in the process progress indicators.

## Rendered inspection

Screenshots were captured in local Chrome and visually inspected at desktop (1440 × 1000), tablet (768 × 1000), and mobile (390 × 844) dimensions. Mobile dimensions and touch events were emulated, not tested on a physical phone.

- [Desktop hero](desktop-hero.png)
- [Desktop full page](desktop-full.png)
- [Services](desktop-services.png)
- [Gallery](desktop-gallery.png)
- [Contact form](desktop-contact.png)
- [Mobile hero](mobile-hero.png)
- [Mobile full page](mobile-full.png)
- [Mobile gallery](mobile-gallery.png)
- [Tablet hero](tablet-hero.png)
- [Tablet packages](tablet-packages.png)

The rendered review led to correcting the hero's edge blending, improving photo selection, making gallery captions visible on small screens, and fixing package overflow at intermediate widths.

## Verification

The production build (`npm run build`) passed after the final source changes, including TypeScript checking and static generation.

Browser assertions passed for all four service selections, all three package selections, gallery opening/buttons/keyboard/wrapping/Escape/focus restoration, FAQ expansion, invalid form errors and first-error focus, valid demo submission, form reset, mobile navigation, scroll locking, internal anchor targets, and content visibility with JavaScript disabled. Additional checks passed for simulated gallery swipes and forward/backward focus trapping in the gallery and mobile menu.

No horizontal overflow was found at 360, 390, 768, 1024, 1440, or 1920 pixels. Final screenshot runs found no unloaded/broken images. Functional checks captured JavaScript exceptions and browser console errors; neither occurred in the final run. See [functional-results.json](functional-results.json).

The existing inquiry endpoint integration remains unchanged. Without an endpoint configured, submissions remain explicitly labeled demonstrations and do not send or store customer information. Live delivery was not tested. Safari, Firefox, physical devices, and screen-reader software were not tested.
