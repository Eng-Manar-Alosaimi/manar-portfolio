"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { devCategories, development, type DevCategory, type DevItem } from "@/data/development";
import { getProject } from "@/data/projects";

function Milestone({ item, last }: { item: DevItem; last: boolean }) {
  const [open, setOpen] = useState(false);
  const related = item.relatedProject ? getProject(item.relatedProject) : null;

  return (
    <li className="relative pl-8">
      {/* Path segment + node */}
      {!last && <span className="absolute left-[5px] top-4 h-[calc(100%+0.25rem)] w-px bg-line-2" aria-hidden />}
      <motion.span
        className="absolute left-0 top-[0.55rem] h-[11px] w-[11px] rotate-45 border border-accent bg-ink"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        aria-hidden
      />
      <div className="pb-8">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          {item.provider && <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-accent">{item.provider}</span>}
          <span className="font-mono text-[0.62rem] text-faint">{item.type}</span>
          {item.year && <span className="font-mono text-[0.62rem] text-faint">· {item.year}</span>}
        </div>
        <h4 className="mt-1.5 text-[1.02rem] leading-snug text-text">
          {item.url ? (
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              {item.name} ↗
            </a>
          ) : (
            item.name
          )}
        </h4>
        <p className="mt-1.5 text-[0.82rem] text-muted">{item.outcomes.join(" · ")}</p>
        {related && (
          <Link href={`/projects/${related.slug}`} className="mt-2 inline-block font-mono text-[0.65rem] text-accent hover:underline">
            → Applied in: {related.title}
          </Link>
        )}
        {item.detail && (
          <>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted hover:text-text"
            >
              Programme detail
              <ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="mt-4 grid gap-4 border border-line bg-panel/50 p-4 sm:grid-cols-2">
                    {item.detail.map((d) => (
                      <div key={d.title}>
                        <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-signal">{d.title}</p>
                        <ul className="mt-2 space-y-1 text-[0.85rem] text-muted">
                          {d.items.map((x) => (
                            <li key={x}>— {x}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </li>
  );
}

export function Development() {
  const order: DevCategory[] = ["ai", "data", "consulting", "mentorship"];
  return (
    <section id="development" className="scroll-mt-20 border-y border-line bg-ink-2 py-24 md:py-32" aria-labelledby="dev-title">
      <div className="wrap">
        <SectionHead
          index="04"
          label="Professional Development"
          title={<span id="dev-title">Learning paths that feed the projects.</span>}
          lede="Certifications, courses, bootcamps and programmes — grouped by direction. Credentials are listed on LinkedIn."
        />
        <div className="mt-16 grid gap-x-12 gap-y-4 md:grid-cols-2">
          {order.map((c, ci) => {
            const items = development.filter((d) => d.category === c);
            return (
              <Reveal key={c} delay={ci * 0.06} className={c === "ai" ? "md:row-span-3" : undefined}>
                <h3 className="mb-6 flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-text">
                  <span className="text-accent">{String(ci + 1).padStart(2, "0")}</span>
                  {devCategories[c]}
                  <span className="h-px flex-1 bg-line" aria-hidden />
                </h3>
                <ol>
                  {items.map((it, i) => (
                    <Milestone key={it.name} item={it} last={i === items.length - 1} />
                  ))}
                </ol>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
