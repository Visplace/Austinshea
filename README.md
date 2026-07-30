# Austin Shea — Commercial Real Estate

Professional website for Austin Shea, a commercial real estate and operations
professional based in McLean, Virginia. Built as a fast, self-contained static
site — semantic HTML, one CSS file, and one vanilla JavaScript file. No build
step and no external dependencies, so it renders reliably anywhere.

## Structure

```
index.html          All page sections (clearly commented for easy editing)
css/styles.css      Design system, layout, and responsive styles
js/main.js          Navigation, scroll-spy, insights data, form handling
assets/
  favicon.svg       "AS" monogram favicon
  visplace-logo.png Visplace brand logo (light backgrounds)
  corrideal-logo.png Corrideal brand logo (dark backgrounds)
```

## Editing content

- **Most copy** lives directly in `index.html` under clearly labeled section
  comments (Hero, Expertise, Experience, Selected Work, etc.).
- **Insights / articles** are driven by the `insights` array at the top of
  `js/main.js`. Add an object to publish a new card. Leave
  `status: "coming-soon"` until an article is live — the card then shows
  "Coming Soon" instead of a fabricated date. To publish, set
  `status: "published"` with a real `date` (ISO string) and `url`.

## Before going live — one placeholder to replace

1. **Social preview image** — the `og:image` / `twitter:image` tags point to
   `assets/og-image.png` (1200×630 recommended). Add the file, or remove those
   two meta tags if unused.

The résumé (`assets/Austin-Shea-Resume.pdf`) is in place and linked from the
Contact section and footer (`Download Résumé`).

The canonical URL and structured-data URLs use `https://austinshea.com/`;
update them if the site is hosted elsewhere.

## Contact form

Client-side validation, then submission to **Formspree**
(`https://formspree.io/f/mwvgzgdj`) via `fetch`. On success the visitor sees a
real confirmation; if the request fails, they get a direct-email fallback. The
`<form>` also carries a native `action`/`method`, so it still submits if
JavaScript is unavailable. A hidden `_gotcha` honeypot field filters spam.

To change the destination, update `FORMSPREE_ENDPOINT` in `js/main.js` and the
form's `action` attribute in `index.html`.

## Preview locally

Any static server works, for example:

```
python3 -m http.server 4173
# then open http://localhost:4173
```
