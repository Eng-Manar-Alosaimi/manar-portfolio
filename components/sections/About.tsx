"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";

const concepts = [
  {
    id: "understand",
    n: "I",
    title: "Understand",
    text: "Problem analysis, research and structured thinking — establishing the technical and business requirements before choosing a solution.",
  },
  {
    id: "engineer",
    n: "II",
    title: "Engineer",
    text: "System architecture, intelligent applications and data solutions — turning requirements into working components that fit together.",
  },
  {
    id: "deliver",
    n: "III",
    title: "Deliver",
    text: "Testing, validation and analytical evaluation — measuring what was built and being clear about where it stops working.",
  },
] as const;

type Id = (typeof concepts)[number]["id"];

function ConceptDiagram({ active, setActive }: { active: Id | null; setActive: (id: Id | null) => void }) {
  const reduce = useReducedMotion();
  const on = (id: Id) => active === null || active === id;
  const draw = {
    initial: { pathLength: reduce ? 1 : 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "-15%" },
  };
  const tr = (d: number) => ({ duration: reduce ? 0 : 1.6, delay: reduce ? 0 : d, ease: [0.65, 0, 0.35, 1] as const });

  // Triangle (understand), hexagon (engineer), circle (deliver) — overlapping to show the loop.
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${200 + 78 * Math.cos(a)},${205 + 78 * Math.sin(a)}`;
  }).join(" ");

  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-label="Diagram of three overlapping shapes: a triangle for Understand, a hexagon for Engineer and a circle for Deliver, connected in a loop.">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--color-faint)" />
        </marker>
      </defs>
      {/* Orbit / loop */}
      <motion.circle cx={200} cy={205} r={170} fill="none" stroke="var(--color-line-2)" strokeDasharray="2 6" {...draw} transition={tr(0)} />
      <motion.path d="M 200 35 A 170 170 0 0 1 347 290" fill="none" stroke="var(--color-faint)" markerEnd="url(#arrow)" {...draw} transition={tr(0.4)} />
      <motion.path d="M 347 290 A 170 170 0 0 1 53 290" fill="none" stroke="var(--color-faint)" markerEnd="url(#arrow)" {...draw} transition={tr(0.7)} />
      <motion.path d="M 53 290 A 170 170 0 0 1 200 35" fill="none" stroke="var(--color-faint)" markerEnd="url(#arrow)" {...draw} transition={tr(1)} />

      <g style={{ opacity: on("understand") ? 1 : 0.18, transition: "opacity .4s" }}>
        <motion.polygon points="200,92 128,236 272,236" fill="none" stroke="var(--color-accent)" strokeWidth={1.4} {...draw} transition={tr(0.2)} />
      </g>
      <g style={{ opacity: on("engineer") ? 1 : 0.18, transition: "opacity .4s" }}>
        <motion.polygon points={hex} fill="none" stroke="var(--color-text)" strokeWidth={1.2} {...draw} transition={tr(0.45)} />
      </g>
      <g style={{ opacity: on("deliver") ? 1 : 0.18, transition: "opacity .4s" }}>
        <motion.circle cx={200} cy={205} r={52} fill="none" stroke="var(--color-signal)" strokeWidth={1.4} {...draw} transition={tr(0.7)} />
      </g>
      <circle cx={200} cy={205} r={3} fill="var(--color-accent)" />

      {(
        [
          { id: "understand", x: 200, y: 22, label: "I · UNDERSTAND" },
          { id: "engineer", x: 372, y: 312, label: "II · ENGINEER" },
          { id: "deliver", x: 28, y: 312, label: "III · DELIVER" },
        ] as const
      ).map((l) => (
        <text
          key={l.id}
          x={l.x}
          y={l.y}
          textAnchor={l.x > 300 ? "end" : l.x < 100 ? "start" : "middle"}
          className="font-mono"
          fontSize={11}
          letterSpacing="0.12em"
          fill={active === l.id ? "var(--color-accent)" : "var(--color-muted)"}
          style={{ cursor: "default" }}
          onMouseEnter={() => setActive(l.id)}
          onMouseLeave={() => setActive(null)}
        >
          {l.label}
        </text>
      ))}
    </svg>
  );
}

export function About() {
  const [active, setActive] = useState<Id | null>(null);

  return (
    <section id="about" className="wrap scroll-mt-20 py-24 md:py-36" aria-labelledby="about-title">
      <SectionHead
        index="01"
        label="About"
        title={
          <span id="about-title">
            An engineer who connects <em className="text-accent not-italic">intelligent systems</em>, data and the problems they are meant to solve.
          </span>
        }
      />

      <div className="mt-14 grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="prose-journal md:col-span-6 md:col-start-4 lg:col-span-5 lg:col-start-4">
          <Reveal>
            <p>
              My foundation is Computer Engineering: hardware, software and the systems thinking that joins them. My graduation project put that
              into practice — an Edge AI earbud where a neural network, sensors and cellular communication had to run together on a single
              microcontroller.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p>
              From embedded inference I moved up the stack to language models and agents: services that retrieve evidence, return structured
              outputs and fail safely, and coordinator workflows that route requests to specialised components behind guardrails.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Intelligent systems depend on the data beneath them, so I also build the pipelines — layered lakehouse tables with contracts,
              quality gates and reproducible runs that serve both analytics and machine learning.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              Across all of it I care about the same thing: understanding the problem properly, engineering a solution that holds together, and
              validating it honestly. I have applied this in compliance assessment and in structured business cases, where analytical rigour
              matters as much as the technology.
            </p>
          </Reveal>
        </div>

        <Reveal className="md:col-span-12 lg:col-span-4 lg:col-start-9" delay={0.1}>
          <div className="mx-auto aspect-square max-w-[22rem]">
            <ConceptDiagram active={active} setActive={setActive} />
          </div>
        </Reveal>
      </div>

      <ol className="mt-16 grid border-t border-line md:grid-cols-3">
        {concepts.map((c, i) => (
          <li key={c.id} className="border-b border-line md:border-b-0 md:border-r md:last:border-r-0">
            <Reveal delay={i * 0.08}>
              <button
                type="button"
                onMouseEnter={() => setActive(c.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(c.id)}
                onBlur={() => setActive(null)}
                aria-pressed={active === c.id}
                className="group block h-full w-full p-6 text-left transition-colors hover:bg-panel focus-visible:bg-panel md:p-8"
              >
                <span className="font-mono text-xs text-faint">{c.n}</span>
                <span className="mt-3 block font-serif text-2xl transition-colors group-hover:text-accent">{c.title}</span>
                <span className="mt-3 block text-[0.95rem] leading-relaxed text-muted">{c.text}</span>
              </button>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
