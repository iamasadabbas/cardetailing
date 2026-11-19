# KAVERO — Premium Auto Detailing Studio (concept website)

A cinematic, single-page marketing site for a fictional premium car detailing studio.
Built as a portfolio / demonstration piece and structured so it can be re-branded for a
real detailing business.

> **Concept website — demonstration only.** KAVERO is not a real company. No addresses,
> reviews, ratings, prices or achievements are invented, and the inquiry form does not
> send data anywhere until you connect a service (see below).

## Stack

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript
- Tailwind CSS v4 (via `@tailwindcss/turbopack`)
- Motion (`motion/react`) for interactive transitions · Lucide icons
- `next/font` (Space Grotesk + Inter) · `next/image` with AVIF/WebP

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Project structure

```
app/            layout (metadata, fonts), page, globals.css (design tokens), icon.svg
components/     one component per section + ui/ primitives (Button, BrandMark, …)
data/           ALL editable content: siteConfig, services, packages, gallery, content (FAQ/process/principles), inquiry options
lib/inquiry.ts  form submission integration point
public/images/  locally stored, optimised photography (see IMAGE-CREDITS.md)
public/og.jpg   Open Graph share image (1200×630)
```

## Adapting for a real business

1. **Brand + contact:** edit `data/siteConfig.ts` — name, tagline, description, `contact`
   (email / phone / address / hours) and `social`. Empty values are not rendered.
   Set `isConcept: false` to remove the footer disclosure.
2. **Content:** edit the files in `data/`. Services and packages drive the CTAs and the
   form's "Interested Service" options automatically.
3. **Photography:** replace files in `public/images/` (keep names or update the imports in
   `data/`). Use the business's own work in the gallery, and update the gallery label.
4. **Colours / type:** tokens live in the `@theme` block of `app/globals.css`.
5. **Domain:** set `NEXT_PUBLIC_SITE_URL` so canonical + Open Graph URLs are absolute.

## Connecting the inquiry form

The form validates fully in the browser. By default it runs in **demo mode** and shows
"Demo Form Completed — No message has been sent…".

To send real inquiries, set `NEXT_PUBLIC_INQUIRY_ENDPOINT` to any endpoint that accepts a
JSON `POST` (your own API route, Formspree, Basin, a CRM/Zapier webhook, …). The payload is:

```json
{ "fullName": "", "email": "", "phone": "", "vehicleMake": "", "vehicleModel": "", "service": "", "details": "" }
```

See `lib/inquiry.ts`. Add spam protection and a privacy notice before going live.

## Deployment

Any Node host or Vercel works:

- **Vercel:** import the repo, framework preset "Next.js", add the env vars above, deploy.
- **Self-hosted:** `npm run build && npm run start` (set `PORT` as needed).

The page is fully static (prerendered), so it also performs well behind a CDN.

## Visual redesign review

See [.design/REVIEW.md](.design/REVIEW.md) for the November 2026 redesign, rendered desktop/mobile/tablet screenshots, completed browser checks, and verification limits. Photography sources are documented in [IMAGE-CREDITS.md](IMAGE-CREDITS.md).
