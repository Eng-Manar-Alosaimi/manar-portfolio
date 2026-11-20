"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/site";

type Layer = { id: string; title: string; tag: string; tone: string; items: string[]; purpose: string; code: string; tech: string };

const layers: Layer[] = [
  {
    id: "sources",
    title: "Sources",
    tag: "raw",
    tone: "#5d6774",
    items: ["Trips & drivers (CSV / JSON)", "Kafka GPS stream"],
    purpose: "Synthetic data for a fictional ride-hailing company: trips, drivers and GPS pings across five Saudi cities. A Kafka producer simulates the live GPS feed.",
    code: "scripts/make_data.py · stream/gps_producer.py",
    tech: "Python · Kafka 3.7",
  },
  {
    id: "bronze",
    title: "Bronze",
    tag: "as it arrived",
    tone: "#a0704a",
    items: ["Landed once", "Profiled", "Delta format"],
    purpose: "Keep the raw data exactly as it arrived, in Delta tables, so every later step can be replayed and audited. Profiling surfaces quality issues early.",
    code: "ingest/land_bronze.py · ingest/profile_bronze.py · stream/ingest_gps_stream.py",
    tech: "Spark · Delta Lake",
  },
  {
    id: "silver",
    title: "Silver",
    tag: "clean & enforced",
    tone: "#9aa7b4",
    items: ["dbt models + tests", "CHECK constraints", "MERGE · time travel"],
    purpose: "Clean, typed, deduplicated trips. dbt tests validate the model and Delta constraints reject bad writes. MERGE handles upserts; time travel and VACUUM/OPTIMIZE keep the table reliable and fast.",
    code: "dbt/masar/models · delta/enforce_silver.py · delta/merge_ops.py",
    tech: "dbt 1.8 · Delta Lake",
  },
  {
    id: "gate",
    title: "Quality gate",
    tag: "contract",
    tone: "#d9824b",
    items: ["7 / 7 rules", "Observability", "PII retention"],
    purpose: "A data contract decides whether silver may be promoted. Observability records volumes and freshness; PII retention supports erasing a rider on request.",
    code: "quality/contract.py · quality/gate.py · quality/observe.py · quality/pii.py",
    tech: "Python · data contract",
  },
  {
    id: "gold",
    title: "Gold",
    tag: "marts & features",
    tone: "#e0b84f",
    items: ["Demand mart (120 rows)", "Per-trip features"],
    purpose: "Business-ready aggregates — demand per city per hour — and one feature row per trip for modelling.",
    code: "transform/build_gold.py · pipeline.py",
    tech: "Spark SQL",
  },
  {
    id: "serve",
    title: "Consumers",
    tag: "BI + AI",
    tone: "#3ec8f0",
    items: ["BI-safe table", "Point-in-time training set"],
    purpose: "Two consumers from one source of truth: a pseudonymised BI table with no raw rider or driver IDs, and a training set joined point-in-time to avoid label leakage.",
    code: "serve/bi_view.py · serve/training_join.py · serve/leakage_drill.py",
    tech: "Spark · Delta",
  },
];

export function LakehousePipeline({ compact = false }: { compact?: boolean }) {
  const [sel, setSel] = useState("silver");
  const L = layers.find((l) => l.id === sel)!;

  return (
    <div className="w-full">
      <ol className={cn("grid gap-1.5", "grid-cols-2 sm:grid-cols-3")} aria-label="Lakehouse layers">
        {layers.map((l, i) => {
          const on = l.id === sel;
          return (
            <li key={l.id} className="relative">
              <button
                type="button"
                onClick={() => setSel(l.id)}
                onMouseEnter={() => setSel(l.id)}
                aria-pressed={on}
                className={cn("relative flex h-full w-full flex-col overflow-hidden border p-3 text-left transition-colors", on ? "border-text/60 bg-panel-2" : "border-line bg-panel/50 hover:border-line-2")}
              >
                <span className="absolute inset-y-0 left-0 w-1" style={{ background: l.tone, opacity: on ? 1 : 0.55 }} aria-hidden />
                <span className="pl-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-faint">
                  {String(i).padStart(2, "0")} · {l.tag}
                </span>
                <span className="mt-1 pl-1 font-serif text-lg">{l.title}</span>
                {!compact && (
                  <ul className="mt-2 space-y-0.5 pl-1">
                    {l.items.map((it) => (
                      <li key={it} className="font-mono text-[0.62rem] text-muted">
                        {it}
                      </li>
                    ))}
                  </ul>
                )}
                {/* Flowing data stripe on the selected layer */}
                {on && (
                  <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] w-full" aria-hidden>
                    <line x1="0" y1="1" x2="100%" y2="1" stroke={l.tone} strokeWidth="2" className="flow-dash" />
                  </svg>
                )}
              </button>
            </li>
          );
        })}
      </ol>
      <div className="mt-4 min-h-[8rem]" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div key={L.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="grid gap-3 border-l-2 pl-4 sm:grid-cols-3" style={{ borderColor: L.tone }}>
            <div className="sm:col-span-2">
              <p className="font-serif text-lg">{L.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{L.purpose}</p>
            </div>
            <dl className="space-y-2 font-mono text-[0.65rem]">
              <div>
                <dt className="uppercase tracking-[0.12em] text-faint">Tech</dt>
                <dd className="text-text/80">{L.tech}</dd>
              </div>
              {!compact && (
                <div>
                  <dt className="uppercase tracking-[0.12em] text-faint">Code</dt>
                  <dd className="break-words text-text/80">{L.code}</dd>
                </div>
              )}
            </dl>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
