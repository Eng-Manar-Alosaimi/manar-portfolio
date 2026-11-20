import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { Diagram } from "@/components/projects/Diagram";
import { KindBadge } from "@/components/projects/KindBadge";
import { categories, projectsBy, type Project, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/site";

function CategoryHead({ c }: { c: ProjectCategory }) {
  const cat = categories[c];
  return (
    <Reveal className="mb-10 grid gap-4 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-3">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint">Category {cat.index}</span>
      </div>
      <div className="md:col-span-9">
        <h3 className="font-serif text-2xl md:text-3xl">{cat.label}</h3>
        <p className="mt-2 max-w-2xl text-muted">{cat.blurb}</p>
      </div>
    </Reveal>
  );
}

/** Editorial split row used for every technical project — same scale, alternating sides. */
function ProjectRow({ p, flip, fig }: { p: Project; flip: boolean; fig: string }) {
  return (
    <article className="grid gap-8 border-t border-line py-12 md:py-16 lg:grid-cols-12 lg:gap-12" aria-labelledby={`p-${p.slug}`}>
      <Reveal className={cn("lg:col-span-5", flip && "lg:order-2 lg:col-start-8")}>
        <div className="flex flex-wrap items-center gap-2">
          <KindBadge kind={p.kind} />
          <span className="font-mono text-[0.65rem] text-faint">{p.year}</span>
        </div>
        <h4 id={`p-${p.slug}`} className="mt-5 font-serif text-[clamp(1.7rem,3vw,2.4rem)] leading-tight">
          <Link href={`/projects/${p.slug}`} className="transition-colors hover:text-accent">
            {p.title}
          </Link>
        </h4>
        <p className="mt-2 font-mono text-[0.7rem] text-muted">{p.context}</p>
        <p className="mt-5 text-[1.02rem] leading-relaxed text-text/85">{p.tagline}</p>

        <dl className="mt-7 grid grid-cols-3 border-y border-line">
          {p.metrics.map((m) => (
            <div key={m.label} className="border-r border-line px-3 py-4 first:pl-0 last:border-r-0">
              <dt className="sr-only">{m.label}</dt>
              <dd className="font-serif text-[clamp(1.15rem,2.2vw,1.6rem)] leading-none text-text">{m.value}</dd>
              <dd className="mt-2 text-[0.72rem] leading-snug text-muted">{m.label}</dd>
            </div>
          ))}
        </dl>

        {p.notice && <p className="mt-4 border-l-2 border-signal/70 pl-3 text-[0.8rem] leading-relaxed text-muted">{p.notice}</p>}

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
          {p.stack.slice(0, 6).map((s) => (
            <li key={s} className="border border-line px-2 py-1 font-mono text-[0.62rem] text-muted">
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href={`/projects/${p.slug}`} className="group inline-flex items-center gap-2 text-sm text-accent">
            Read the case study
            <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </Link>
          {p.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted underline-offset-4 hover:text-text hover:underline">
              {l.label} <span className="sr-only">(opens in a new tab)</span>↗
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal className={cn("lg:col-span-7", flip && "lg:order-1 lg:col-start-1")} delay={0.1}>
        <figure className="border border-line bg-ink-2 p-4 sm:p-6">
          <Diagram k={p.diagram} compact />
          <figcaption className="mt-4 border-t border-line pt-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">
            Fig. {fig} — {p.title} · interactive
          </figcaption>
        </figure>
      </Reveal>
    </article>
  );
}

function CaseCard({ p, i }: { p: Project; i: number }) {
  return (
    <Reveal delay={(i % 2) * 0.08}>
      <article className="group flex h-full flex-col border-t border-line pt-6">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.65rem] text-faint">C.{i + 1}</span>
          <KindBadge kind={p.kind} />
        </div>
        <h4 className="mt-4 font-serif text-2xl leading-tight">
          <Link href={`/projects/${p.slug}`} className="transition-colors group-hover:text-accent">
            {p.title}
          </Link>
        </h4>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{p.tagline}</p>
        <div className="mt-5 border border-line bg-ink-2 p-3" aria-hidden={false}>
          <Diagram k={p.diagram} compact />
        </div>
        <p className="mt-4 font-mono text-[0.65rem] text-faint">{p.stack.join(" · ")}</p>
        <Link href={`/projects/${p.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm text-accent">
          Read the case <ArrowUpRight size={15} aria-hidden />
        </Link>
      </article>
    </Reveal>
  );
}

export function Projects() {
  const ai = projectsBy("ai");
  const data = projectsBy("data");
  const consulting = projectsBy("consulting");

  return (
    <section id="projects" className="scroll-mt-20 py-24 md:py-36" aria-labelledby="projects-title">
      <div className="wrap">
        <SectionHead
          index="03"
          label="Projects & Case Studies"
          title={<span id="projects-title">What I have actually built — and how it works.</span>}
          lede="Each project shows its context (personal, team, course or training simulation), what I contributed, and an interactive view of its architecture. Open any case study for the full write-up, including testing and limitations."
        />

        <div className="mt-20">
          <CategoryHead c="ai" />
          {ai.map((p, i) => (
            <ProjectRow key={p.slug} p={p} flip={i % 2 === 1} fig={`A.${i + 1}`} />
          ))}
        </div>

        <div className="mt-24">
          <CategoryHead c="data" />
          {data.map((p, i) => (
            <ProjectRow key={p.slug} p={p} flip={i % 2 === 1} fig={`B.${i + 1}`} />
          ))}
        </div>

        <div className="mt-24">
          <CategoryHead c="consulting" />
          <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
            {consulting.map((p, i) => (
              <CaseCard key={p.slug} p={p} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
