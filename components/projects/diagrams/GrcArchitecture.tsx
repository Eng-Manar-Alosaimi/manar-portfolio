"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/site";

type Stage = { id: string; title: string; kind: "ai" | "det"; tech: string; text: string };

const stages: Stage[] = [
  { id: "pdf", title: "Policy document", kind: "det", tech: "PDF upload · FastAPI", text: "A policy pack is uploaded as PDF. Only PDFs are accepted; empty or unreadable files are rejected with a clear error." },
  { id: "extract", title: "Document analysis", kind: "det", tech: "PyMuPDF", text: "Text is extracted page by page and split into ~800-character paragraph chunks, each keeping its page number so evidence can be cited." },
  { id: "retrieve", title: "Retrieval", kind: "det", tech: "Keyword overlap · top-3", text: "For each requirement, the chunks sharing the most keywords are selected. The model only ever sees these excerpts." },
  { id: "assess", title: "AI assessment", kind: "ai", tech: "Gemini · 3-model fallback", text: "One requirement + its excerpts per call. Strict rules: judge only from the excerpts, return NO_EVIDENCE if unsupported, always cite the page. Retries on 503/429 and falls back across three models. Runs 5 requirements in parallel." },
  { id: "json", title: "Evidence & structured JSON", kind: "ai", tech: "Fixed schema", text: "The response must match a fixed schema — status, exact quote, page, section, reason, recommendation. Unparseable output is recorded as ERROR, never guessed." },
  { id: "analytics", title: "Compliance analytics", kind: "det", tech: "Pandas", text: "Scores are computed in code, not by the model: simple score, risk-weighted score (weights 1–5), high-risk exposure and per-category results." },
];

const example = {
  requirement_id: "GOV-002",
  status: "PARTIAL",
  evidence: "Compliance responsibilities are assigned to the Compliance department.",
  page: 1,
  section: "3. COMPLIANCE",
  reason: "Confirms a Compliance department … but no evidence of independence, authority, or resources.",
};

export function GrcArchitecture({ compact = false }: { compact?: boolean }) {
  const [sel, setSel] = useState<string>("assess");
  const stage = stages.find((s) => s.id === sel)!;

  return (
    <div className="w-full">
      <ol className={cn("grid gap-2", "grid-cols-2 sm:grid-cols-3")} aria-label="Pipeline stages">
        {stages.map((s, i) => {
          const active = s.id === sel;
          const color = s.kind === "ai" ? "accent" : "signal";
          return (
            <li key={s.id} className="relative">
              <button
                type="button"
                onClick={() => setSel(s.id)}
                onMouseEnter={() => setSel(s.id)}
                aria-pressed={active}
                className={cn(
                  "group relative flex h-full w-full flex-col items-start border p-3 text-left transition-colors",
                  active ? (color === "accent" ? "border-accent bg-accent/10" : "border-signal bg-signal/10") : "border-line bg-panel/60 hover:border-line-2",
                )}
              >
                <span className="flex w-full items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.12em]">
                  <span className="text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <span className={color === "accent" ? "text-accent" : "text-signal"}>{s.kind === "ai" ? "AI" : "Deterministic"}</span>
                </span>
                <span className="mt-2 text-[0.9rem] leading-snug text-text">{s.title}</span>
                <span className="mt-1 font-mono text-[0.62rem] text-muted">{s.tech}</span>
                {active && <motion.span layoutId={`grc-bar-${compact}`} className={cn("absolute inset-x-0 bottom-0 h-0.5", color === "accent" ? "bg-accent" : "bg-signal")} />}
              </button>
            </li>
          );
        })}
      </ol>

      <div className={cn("mt-4 grid gap-4", !compact && "xl:grid-cols-5")}>
        <div className={cn("min-h-[7.5rem] border-l-2 pl-4", stage.kind === "ai" ? "border-accent" : "border-signal", !compact && "xl:col-span-3")} aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div key={stage.id} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <p className="font-serif text-lg">{stage.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{stage.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        {!compact && (
          <figure className="border border-line bg-ink p-4 xl:col-span-2">
            <figcaption className="mb-2 flex justify-between font-mono text-[0.6rem] uppercase tracking-[0.12em] text-faint">
              <span>Real output · Q2 sample</span>
              <span className="text-accent">schema-enforced</span>
            </figcaption>
            <pre className="whitespace-pre-wrap break-words font-mono text-[0.7rem] leading-relaxed text-muted">
              {"{\n"}
              {Object.entries(example).map(([k, v]) => (
                <span key={k}>
                  {"  "}
                  <span className="text-accent">&quot;{k}&quot;</span>: <span className={k === "evidence" || k === "page" ? "text-signal" : "text-text/80"}>{JSON.stringify(v)}</span>
                  {",\n"}
                </span>
              ))}
              {"  …\n}"}
            </pre>
          </figure>
        )}
      </div>

      <p className="mt-4 flex flex-wrap gap-4 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">
        <span className="inline-flex items-center gap-2"><span className="h-2 w-2 bg-accent" /> Model involved</span>
        <span className="inline-flex items-center gap-2"><span className="h-2 w-2 bg-signal" /> Deterministic code</span>
      </p>
    </div>
  );
}
