"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { professionalGroups, technicalGroups, type Skill, type SkillGroup } from "@/data/skills";
import { projects } from "@/data/projects";
import { cn } from "@/lib/site";

const short: Record<string, string> = {
  "smart-hajj-earbud": "Hajj Earbud",
  "ai-compliance-assessment": "Compliance AI",
  "logistics-multi-agent": "Logistics MAS",
  "masar-lakehouse": "Masar Lakehouse",
  "fitbox-diagnostic": "FitBox",
  "hospital-turnaround": "Hospital Group",
  "investment-committee": "Invest. Committee",
  "pepsi-financial-model": "Fin. Model",
};

/** Evidence map: the selected skill sits at the centre, wired to the projects that demonstrate it. */
function EvidenceMap({ skill, group }: { skill: Skill | null; group: SkillGroup | null }) {
  const R = 150;
  const nodes = projects.map((p, i) => {
    const a = (i / projects.length) * Math.PI * 2 - Math.PI / 2;
    return { p, x: 200 + R * Math.cos(a), y: 200 + R * Math.sin(a) };
  });
  const lit = new Set(skill?.evidence ?? group?.skills.flatMap((s) => s.evidence) ?? []);

  return (
    <svg viewBox="-40 0 480 400" className="h-full w-full" role="img" aria-label={skill ? `${skill.name} is demonstrated in: ${skill.evidence.map((e) => short[e]).join(", ")}` : "Map linking skills to the projects that demonstrate them"}>
      <circle cx={200} cy={200} r={R} fill="none" stroke="var(--color-line)" strokeDasharray="2 5" />
      <circle cx={200} cy={200} r={R * 0.45} fill="none" stroke="var(--color-line)" />
      {nodes.map(({ p, x, y }) => {
        const on = lit.has(p.slug);
        return (
          <g key={p.slug}>
            <line x1={200} y1={200} x2={x} y2={y} stroke={on ? "var(--color-accent)" : "var(--color-line)"} strokeOpacity={on ? 1 : 0.5} strokeWidth={on ? 1.8 : 0.8} strokeDasharray={on ? "6 6" : undefined} className={on ? "flow-dash" : undefined} style={{ transition: "stroke .3s" }} />
            <circle cx={x} cy={y} r={on ? 6.5 : 3.5} fill={on ? "var(--color-accent)" : "var(--color-ink)"} stroke={p.category === "consulting" ? "var(--color-signal)" : "var(--color-accent)"} strokeWidth={1.2} style={{ transition: "all .3s" }} />
            <text x={x} y={y + (y > 200 ? 20 : -12)} textAnchor="middle" className="font-mono" fontSize={9.5} letterSpacing="0.06em" fill={on ? "var(--color-text)" : "var(--color-faint)"}>
              {short[p.slug]}
            </text>
          </g>
        );
      })}
      <rect x={185} y={185} width={30} height={30} transform="rotate(45 200 200)" fill="var(--color-ink)" stroke="var(--color-accent)" strokeWidth={1.4} />
      <text x={200} y={204} textAnchor="middle" className="font-mono" fontSize={10} fill="var(--color-accent)">
        {skill ? "◆" : group ? group.short.slice(0, 4).toUpperCase() : "ALL"}
      </text>
    </svg>
  );
}

export function Skills() {
  const [tab, setTab] = useState<"technical" | "professional">("technical");
  const groups = tab === "technical" ? technicalGroups : professionalGroups;
  const [sel, setSel] = useState<{ g: string; s?: string } | null>(null);

  const selGroup = useMemo(() => groups.find((g) => g.id === sel?.g) ?? null, [groups, sel]);
  const selSkill = useMemo(() => selGroup?.skills.find((s) => s.name === sel?.s) ?? null, [selGroup, sel]);

  return (
    <section id="skills" className="relative scroll-mt-20 border-y border-line bg-ink-2 py-24 md:py-36" aria-labelledby="skills-title">
      <div className="wrap">
        <SectionHead
          index="02"
          label="Skills"
          title={<span id="skills-title">A capability map, wired to evidence.</span>}
          lede="Every skill below links to the work that demonstrates it. No percentages — the projects carry the weight."
        />

        <Reveal className="mt-12 flex gap-0 border-b border-line" delay={0.1} role="tablist" aria-label="Skill categories">
          {(["technical", "professional"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => {
                setTab(t);
                setSel(null);
              }}
              className={cn("relative -mb-px px-4 py-3 text-sm capitalize transition-colors", tab === t ? "text-text" : "text-muted hover:text-text")}
            >
              {t === "technical" ? "Technical" : "Professional & soft"}
              {tab === t && <motion.span layoutId="skills-tab" className="absolute inset-x-0 bottom-0 h-px bg-accent" />}
            </button>
          ))}
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div className="mx-auto aspect-square max-w-[26rem]">
                <EvidenceMap skill={selSkill} group={selGroup} />
              </div>
              <div className="mt-4 min-h-[4.5rem] border-t border-line pt-4" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.div key={selSkill?.name ?? selGroup?.id ?? "none"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                    {selSkill ? (
                      <>
                        <p className="font-serif text-xl">{selSkill.name}</p>
                        <p className="mt-1 text-sm text-muted">
                          <>
                              Demonstrated in{" "}
                              {selSkill.evidence.map((slug, i) => (
                                <span key={slug}>
                                  {i > 0 && ", "}
                                  <Link href={`/projects/${slug}`} className="text-accent underline-offset-4 hover:underline">
                                    {projects.find((p) => p.slug === slug)?.title}
                                  </Link>
                                </span>
                              ))}
                          </>
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-muted">Hover or focus a skill to trace it to the projects that demonstrate it.</p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-7">
            {groups.map((g, gi) => (
              <Reveal key={`${tab}-${g.id}`} delay={gi * 0.05} className={cn(g.secondary && "sm:col-span-2")}>
                <div onMouseEnter={() => setSel((s) => (s?.g === g.id ? s : { g: g.id }))} className={cn(g.secondary && "border border-dashed border-line-2 p-5")}>
                  <h3 className="flex items-baseline justify-between border-b border-line pb-2">
                    <span className={cn("font-mono text-[0.72rem] uppercase tracking-[0.14em]", g.secondary ? "text-signal" : "text-accent")}>{g.label}</span>
                    <span className="font-mono text-[0.65rem] text-faint">{String(g.skills.length).padStart(2, "0")}</span>
                  </h3>
                  {g.note && <p className="mt-2 text-xs text-faint">{g.note}</p>}
                  <ul className={cn("mt-2", g.secondary && "sm:columns-2 sm:gap-8")}>
                    {g.skills.map((s) => {
                      const active = sel?.g === g.id && sel?.s === s.name;
                      return (
                        <li key={s.name} className="break-inside-avoid">
                          <button
                            type="button"
                            onMouseEnter={() => setSel({ g: g.id, s: s.name })}
                            onFocus={() => setSel({ g: g.id, s: s.name })}
                            onClick={() => setSel({ g: g.id, s: s.name })}
                            className={cn("group flex w-full items-center gap-3 py-2 text-left text-[0.95rem] transition-colors", active ? "text-text" : "text-text/80 hover:text-text")}
                          >
                            <span
                              aria-hidden
                              className={cn(
                                "inline-block h-2 w-2 shrink-0 rotate-45 border transition-transform group-hover:scale-125",
                                g.secondary ? "border-signal bg-signal" : "border-accent bg-accent",
                              )}
                            />
                            <span>{s.name}</span>
                            <span className={cn("ml-auto h-px flex-1 max-w-12 bg-accent transition-opacity", active ? "opacity-100" : "opacity-0")} aria-hidden />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
