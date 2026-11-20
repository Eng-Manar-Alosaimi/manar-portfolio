import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { categories, getProject, projects } from "@/data/projects";
import { Diagram } from "@/components/projects/Diagram";
import { KindBadge } from "@/components/projects/KindBadge";
import { Reveal } from "@/components/Reveal";
import { hasCanonicalDomain } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: hasCanonicalDomain ? { canonical: `/projects/${p.slug}` } : undefined,
    openGraph: { title: p.title, description: p.summary, type: "article" },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const cat = categories[p.category];

  return (
    <article className="pt-16">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-texture pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="wrap relative py-14 md:py-20">
          <Link href="/#projects" className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted hover:text-accent">
            <ArrowLeft size={14} aria-hidden /> All projects
          </Link>
          <Reveal className="mt-10">
            <p className="eyebrow">
              <span className="text-accent">Category {cat.index}</span>
              <span className="mx-2 text-faint">—</span>
              {cat.label}
            </p>
            <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.02] tracking-[-0.02em] text-balance">{p.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">{p.summary}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-10 grid grid-cols-2 border-y border-line md:grid-cols-4">
              {[
                ["Type", <KindBadge key="k" kind={p.kind} />],
                ["Year", p.year],
                ["Context", p.context],
                ["My role", p.role],
              ].map(([k, v], i) => (
                <div key={k as string} className={`py-4 pr-4 ${i % 2 === 0 ? "" : "pl-4 md:pl-0"} md:border-r md:border-line md:px-4 md:first:pl-0 md:last:border-r-0`}>
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-faint">{k}</dt>
                  <dd className="mt-2 text-sm text-text/90">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {p.notice && (
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-3xl border-l-2 border-signal pl-4 text-sm leading-relaxed text-muted">{p.notice}</p>
            </Reveal>
          )}

          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
            {p.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 border border-line-2 px-4 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent">
                {l.label}
                <ArrowUpRight size={14} aria-hidden />
                {l.note && <span className="font-mono text-[0.6rem] text-faint">· {l.note}</span>}
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ))}
          </Reveal>
        </div>
      </header>

      {/* Metrics strip */}
      <div className="border-b border-line bg-ink-2">
        <dl className="wrap grid grid-cols-1 sm:grid-cols-3">
          {p.metrics.map((m) => (
            <div key={m.label} className="border-b border-line py-6 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0">
              <dd className="font-serif text-3xl md:text-4xl">{m.value}</dd>
              <dt className="mt-2 text-sm text-muted">{m.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      {/* Body */}
      <div className="wrap grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
          <ol className="sticky top-24 space-y-1 border-l border-line">
            {p.sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-muted transition-colors hover:border-accent hover:text-text">
                  <span className="mr-2 font-mono text-[0.62rem] text-faint">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-16 lg:col-span-9">
          {p.sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-24" aria-labelledby={`h-${s.id}`}>
              <Reveal>
                <h2 id={`h-${s.id}`} className="flex items-baseline gap-4 border-t border-line pt-5 font-serif text-2xl md:text-3xl">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
              </Reveal>
              <div className="mt-6 max-w-3xl space-y-4">
                {s.body?.map((b, j) => (
                  <Reveal key={j} delay={0.04}>
                    <p className="leading-relaxed text-text/85">{b}</p>
                  </Reveal>
                ))}
                {s.bullets && (
                  <Reveal delay={0.06}>
                    <ul className="space-y-2.5">
                      {s.bullets.map((b) => (
                        <li key={b} className="relative pl-6 leading-relaxed text-text/85">
                          <span className="absolute left-0 top-[0.62rem] h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )}
              </div>
              {s.diagram && (
                <Reveal delay={0.08} className="mt-8">
                  <figure className="border border-line bg-ink-2 p-4 sm:p-6">
                    <Diagram k={p.diagram} />
                    <figcaption className="mt-4 border-t border-line pt-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">
                      Interactive figure — {p.title}
                    </figcaption>
                  </figure>
                </Reveal>
              )}
              {s.table && (
                <Reveal delay={0.08} className="mt-8 overflow-x-auto">
                  <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
                    {s.table.caption && <caption className="mb-3 caption-bottom pt-3 text-left font-mono text-[0.65rem] text-faint">{s.table.caption}</caption>}
                    <thead>
                      <tr>
                        {s.table.head.map((h) => (
                          <th key={h} scope="col" className="border-b border-line-2 py-2 pr-4 font-mono text-[0.65rem] font-normal uppercase tracking-[0.12em] text-faint">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {s.table.rows.map((r) => (
                        <tr key={r.join("|")} className="border-b border-line">
                          {r.map((c, ci) => (
                            <td key={ci} className={`py-3 pr-4 align-top ${ci === 0 ? "text-text" : "text-muted"} ${/^[\d.]+%$/.test(c) ? "font-mono" : ""}`}>
                              {c}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Reveal>
              )}
              {s.figures && (
                <div className={`mt-8 grid gap-6 ${s.figures.length > 1 ? "sm:grid-cols-2" : "max-w-2xl"}`}>
                  {s.figures.map((f) => (
                    <Reveal key={f.src}>
                      <figure className="border border-line bg-panel p-2">
                        <Image src={f.src} alt={f.alt} width={f.width} height={f.height} sizes="(min-width: 1024px) 36rem, 100vw" className="h-auto max-h-[32rem] w-full object-contain" />
                      </figure>
                      <figcaption className="mt-2 font-mono text-[0.65rem] text-faint">{f.caption}</figcaption>
                    </Reveal>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>

      {/* Prev / next */}
      <nav aria-label="More projects" className="border-t border-line">
        <div className="wrap grid sm:grid-cols-2">
          <Link href={`/projects/${prev.slug}`} className="group border-b border-line py-8 transition-colors hover:bg-panel sm:border-b-0 sm:border-r sm:pr-8">
            <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-faint">
              <ArrowLeft size={13} aria-hidden /> Previous
            </span>
            <span className="mt-2 block font-serif text-xl group-hover:text-accent">{prev.title}</span>
          </Link>
          <Link href={`/projects/${next.slug}`} className="group py-8 text-right transition-colors hover:bg-panel sm:pl-8">
            <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-faint">
              Next <ArrowRight size={13} aria-hidden />
            </span>
            <span className="mt-2 block font-serif text-xl group-hover:text-accent">{next.title}</span>
          </Link>
        </div>
      </nav>
    </article>
  );
}
