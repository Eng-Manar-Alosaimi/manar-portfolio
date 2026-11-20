"use client";

import { useState } from "react";

type B = { id: string; x: number; y: number; w: number; h: number; label: string; sub: string; group: "in" | "core" | "out"; text: string };

const blocks: B[] = [
  { id: "mic", x: 20, y: 40, w: 150, h: 46, label: "Microphone", sub: "voice input", group: "in", text: "Continuous audio capture feeding the on-device keyword-spotting model." },
  { id: "ppg", x: 20, y: 110, w: 150, h: 46, label: "PPG sensor", sub: "heart rate · SpO₂", group: "in", text: "Optical sensor measuring heart rate and blood oxygen; tested on multiple individuals against medical reference ranges." },
  { id: "temp", x: 20, y: 180, w: 150, h: 46, label: "MAX30205", sub: "body temperature", group: "in", text: "Clinical-grade temperature sensor; readings compared with the 36.5–37.5 °C human baseline." },
  { id: "sos", x: 20, y: 250, w: 150, h: 46, label: "SOS button", sub: "manual trigger", group: "in", text: "Physical button that immediately sends location and vitals to the supervisor." },
  { id: "kws", x: 265, y: 62, w: 190, h: 56, label: "KWS · CNN", sub: "TensorFlow Lite on-device", group: "core", text: "Mel-spectrogram features → custom CNN classifying 29 Arabic keywords; converted to TFLite to fit flash memory. A detected keyword activates translation." },
  { id: "vitals", x: 265, y: 142, w: 190, h: 56, label: "Vitals monitor", sub: "threshold logic", group: "core", text: "Continuously evaluates readings; a critical condition triggers an automatic SOS." },
  { id: "logic", x: 265, y: 222, w: 190, h: 56, label: "SOS & control", sub: "setup via SMS", group: "core", text: "Receives language and supervisor contact by SMS at setup, then coordinates alerts and the monitoring loop." },
  { id: "spk", x: 550, y: 75, w: 150, h: 46, label: "Earbud speaker", sub: "translation audio", group: "out", text: "Plays translated audio to bridge pilgrims and Arabic-speaking medical teams." },
  { id: "gsm", x: 550, y: 165, w: 150, h: 46, label: "SIM7600E", sub: "4G + GPS", group: "out", text: "Cellular module providing GPS coordinates and sending SMS alerts." },
  { id: "sup", x: 550, y: 245, w: 150, h: 46, label: "Supervisor", sub: "SMS: GPS + vitals", group: "out", text: "Receives the pilgrim's location and health data for rapid intervention." },
];

const links: [string, string][] = [
  ["mic", "kws"],
  ["ppg", "vitals"],
  ["temp", "vitals"],
  ["sos", "logic"],
  ["kws", "spk"],
  ["vitals", "logic"],
  ["logic", "gsm"],
  ["gsm", "sup"],
];

export function EarbudSystem({ compact = false }: { compact?: boolean }) {
  const [sel, setSel] = useState("kws");
  const get = (id: string) => blocks.find((b) => b.id === id)!;
  const cur = get(sel);
  const related = new Set(links.filter(([a, b]) => a === sel || b === sel).flat());

  const edge = (a: B, b: B) => {
    const x1 = a.x + a.w;
    const y1 = a.y + a.h / 2;
    const x2 = b.x;
    const y2 = b.y + b.h / 2;
    if (a.group === "out" && b.group === "out") return `M${a.x + a.w / 2},${a.y + a.h} L${b.x + b.w / 2},${b.y}`;
    const mx = (x1 + x2) / 2;
    return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
  };

  return (
    <div className="w-full">
      <div className="-mx-1 overflow-x-auto px-1 pb-1" tabIndex={0} aria-label="Diagram (scroll horizontally on small screens)">
      <svg viewBox="0 0 720 320" className="h-auto w-full min-w-[34rem]" role="group" aria-label="Hardware and software block diagram of the earbud">
        {/* ESP32-S3 boundary */}
        <rect x={245} y={22} width={230} height={278} fill="var(--color-panel)" fillOpacity={0.5} stroke="var(--color-accent)" strokeOpacity={0.5} strokeDasharray="6 4" />
        <text x={360} y={16} textAnchor="middle" fontSize={10} className="font-mono" letterSpacing="0.12em" fill="var(--color-accent)">
          ESP32-S3 · EDGE INFERENCE
        </text>
        {links.map(([a, b]) => {
          const on = a === sel || b === sel;
          return (
            <g key={a + b}>
              <path d={edge(get(a), get(b))} fill="none" stroke="var(--color-line-2)" />
              {on && <path d={edge(get(a), get(b))} fill="none" stroke="var(--color-accent)" strokeWidth={1.6} className="flow-dash" />}
            </g>
          );
        })}
        {blocks.map((b) => {
          const on = b.id === sel;
          const near = related.has(b.id);
          return (
            <g
              key={b.id}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={`${b.label}: ${b.sub}`}
              onClick={() => setSel(b.id)}
              onMouseEnter={() => setSel(b.id)}
              onFocus={() => setSel(b.id)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSel(b.id)}
              style={{ cursor: "pointer", outline: "none" }}
              opacity={on || near ? 1 : 0.6}
            >
              <rect x={b.x} y={b.y} width={b.w} height={b.h} fill="var(--color-ink)" stroke={on ? "var(--color-accent)" : "var(--color-line-2)"} strokeWidth={on ? 1.6 : 1} />
              <text x={b.x + 12} y={b.y + b.h / 2 - 3} fontSize={15} fill="var(--color-text)">
                {b.label}
              </text>
              <text x={b.x + 12} y={b.y + b.h / 2 + 13} fontSize={11} className="font-mono" fill="var(--color-faint)">
                {b.sub}
              </text>
            </g>
          );
        })}
        {["INPUTS", "OUTPUTS"].map((t, i) => (
          <text key={t} x={i ? 625 : 95} y={16} textAnchor="middle" fontSize={10} className="font-mono" letterSpacing="0.12em" fill="var(--color-faint)">
            {t}
          </text>
        ))}
      </svg>
      </div>
      <div className={compact ? "mt-2 min-h-[3.5rem]" : "mt-3 min-h-[3.5rem] border-l-2 border-accent pl-4"} aria-live="polite">
        <p className="text-sm text-text">{cur.label}</p>
        <p className="text-sm leading-relaxed text-muted">{cur.text}</p>
      </div>
    </div>
  );
}
