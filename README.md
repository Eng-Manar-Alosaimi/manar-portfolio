# Manar Alosaimi — Portfolio

An editorial engineering portfolio: a single-page overview plus eight case-study pages.

**Stack:** Next.js 15 (App Router, fully static) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion 12 · Three.js via React Three Fiber · Lucide icons.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (type-check + static generation)
npm run lint
```

## Structure

```
app/
  layout.tsx                 fonts, metadata, nav, footer
  page.tsx                   home: Hero → About → Skills → Projects → Development → Education → Contact
  projects/[slug]/page.tsx   case-study template (statically generated for every project)
  sitemap.ts · robots.ts · opengraph-image.tsx · not-found.tsx
components/
  sections/                  one file per home section
  3d/                        HeroVisual (decides 3D vs SVG), NetworkScene (WebGL), NetworkFallback (SVG)
  projects/                  Diagram registry, KindBadge, diagrams/* (one interactive figure per project)
data/                        ← all content lives here
  profile.ts  nav.ts  skills.ts  projects.ts  development.ts  experience.ts
lib/
  network.ts                 node/edge model shared by the 3D scene and its SVG fallback
  site.ts                    site URL + helpers
public/img/                  project figures (metadata stripped)
```

## Updating content

Everything visible is driven by `data/`. You rarely need to touch components.

- **Add a project:** append an object to `projects` in `data/projects.ts`. Pick a `category` (`ai`, `data`, `consulting`) and a `kind` (Personal / Graduation / Team course / Course / Accelerator case simulation), then write `sections`. Each section can have `body`, `bullets`, `table`, `figures`, and `diagram: true` (renders the project's interactive figure). The page at `/projects/<slug>` is generated automatically.
  - For the figure, set `diagram` to an existing key, or add a component in `components/projects/diagrams/` and register it in `components/projects/Diagram.tsx`.
  - Use `notice` for anything a reader must not miss, e.g. "synthetic data" or "training simulation".
- **Add a skill:** add it to a group in `data/skills.ts`. Put the project slugs that demonstrate it in `evidence`. There are no proficiency levels, by design.
- **Add a certificate or course:** add an entry to `data/development.ts`. Titles are enough — credentials live on LinkedIn. `year` and `url` are optional.
- **CV:** the source is `../cv/Manar-Alosaimi-CV.html` (one-page, ATS-friendly). After editing it, export to PDF (open it in Edge/Chrome → Print → Save as PDF, margins "Default", no headers/footers) and copy the PDF to `public/cv/Manar-Alosaimi-CV.pdf`. The "CV" link in the hero and "Download CV" in Contact point to that file via `cvUrl` in `data/profile.ts`.
- **Images:** put them in `public/img/` and reference them in a section's `figures` with their real `width`/`height`. Strip metadata before publishing.

## Motion and performance

- The 3D network is **lazy**. It loads only on desktop-class devices with WebGL, after the browser is idle, and stops rendering when scrolled off screen. DPR is capped at 1.5.
- Phones, touch devices, low-core CPUs, data-saver mode, `prefers-reduced-motion` and no-WebGL all get the SVG version of the same network.
- The hero entrance is pure CSS, so text is visible before JavaScript hydrates. Other reveals use Framer Motion, and all motion collapses under reduced motion.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project →** import the repo. The framework (Next.js) is detected automatically, so no build settings are needed.
3. Optional: under **Settings → Environment Variables**, set `NEXT_PUBLIC_SITE_URL` to the final domain (e.g. `https://manaralosaimi.com`). Canonical URLs are emitted only when this is set. Without it, Open Graph uses Vercel's production URL.
4. Deploy. Every page is static, so there is no server or database.

## Content that still needs Manar's input

| Item | Where | Why |
|---|---|---|
| GPA: confirm 3.80 vs 3.82 against the transcript | `data/experience.ts` | The old site says 3.82; currently shown as 3.8 / 4.0 |
| Logistics course year | `data/projects.ts` | Shown as "Prototype" |
| Provider for "Digital Transformation and AI for Business" | `data/development.ts` | Unknown |
| Consulting PDFs (FitBox, Hospital, IC deck, financial model) | — | Not republished: confirm the Boost/Arpus material may be shared publicly |
| Capstone poster/presentation PDFs | — | Not republished: the presentation shows student ID numbers and the poster names teammates; consider removing the IDs from the public GitHub repo too |
| GRC dashboard screenshots | `public/img/` | Would strengthen the case study |
| Final domain | Vercel env `NEXT_PUBLIC_SITE_URL` | For canonical URLs |
