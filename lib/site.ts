/**
 * Site URL resolution.
 * - Set NEXT_PUBLIC_SITE_URL (e.g. https://manaralosaimi.com) once the final domain is known;
 *   canonical URLs are only emitted when it is set.
 * - On Vercel, the production URL is used automatically for Open Graph images.
 */
const explicit = process.env.NEXT_PUBLIC_SITE_URL;
const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const hasCanonicalDomain = Boolean(explicit);
export const siteUrl = (explicit || (vercel ? `https://${vercel}` : "http://localhost:3000")).replace(/\/$/, "");

export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
