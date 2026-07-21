# Austin Shea — Personal Website

Professional personal website for Austin Shea, a commercial real estate and operations
professional. Built with React, TypeScript, Vite, Tailwind CSS, and lucide-react.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # typecheck and produce a production build
npm run preview  # preview the production build
```

## Required assets (not committed)

Two files are referenced by the site but must be supplied and placed in `public/`:

- `public/PPMondwest-Regular.woff2` — the PP Mondwest display font. Until it is added, the
  serif accents fall back to Georgia (`font-display: swap` keeps text visible either way).
- `public/Austin-Shea-Resume.pdf` — the downloadable résumé linked from the contact section
  and footer.

PP Neue Montreal is loaded from the Webflow CDN and needs no local file.

## Editing content

All copy that changes over time lives in typed arrays under `src/data/`:

- `experience.ts` — experience carousel entries
- `selectedWork.ts` — selected work items
- `insights.ts` — insight article cards (set `publishedAt` and `href` when an article goes live;
  `null` renders "Coming Soon")
- `skills.ts` — skills strip
- `expertise.ts` — marquee cards
- `independentProjects.ts` — Visplace and Corrideal cards
- `site.ts` — email, LinkedIn URL, résumé path, location, and navigation links

Update the LinkedIn URL in `src/data/site.ts` to the real profile before deploying.

## Accessibility and motion

- All scroll animations respect `prefers-reduced-motion` (marquee, parallax, cursor trail, and
  the auto-advancing carousel are disabled or reduced).
- The experience carousel pauses on hover and focus, and its controls are keyboard accessible.
- The contact form validates client-side and opens the visitor's email client via `mailto:`;
  it does not claim server-side delivery because no backend is connected.
