"use client";

import { motion, useReducedMotion } from "framer-motion";

const T = { fontSize: 11.5, className: "font-mono", fill: "var(--color-muted)" } as const;

function useDraw() {
  const reduce = useReducedMotion();
  return (d = 0) => ({
    initial: { pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true },
    transition: { duration: reduce ? 0 : 0.9, delay: reduce ? 0 : d },
  });
}

/** FitBox — issue tree: symptom → hypotheses → validated root causes (prioritised). */
export function IssueTree() {
  const draw = useDraw();
  const hyps = [
    { y: 30, t: "H1 Logistics execution", hi: true },
    { y: 70, t: "H3 Delivery-model misalignment", hi: true },
    { y: 110, t: "H4 Menu stagnation", hi: false },
    { y: 150, t: "H7 Acquisition vs retention", hi: false },
    { y: 190, t: "H8 Packaging economics", hi: false },
  ];
  return (
    <svg viewBox="0 0 520 220" className="h-auto w-full" role="img" aria-label="Issue tree from a 22% sales decline to five hypotheses, two of which were prioritised as root causes.">
      <rect x={6} y={90} width={110} height={40} fill="var(--color-ink)" stroke="var(--color-signal)" />
      <text x={61} y={108} textAnchor="middle" fontSize={12} fill="var(--color-text)">−22% sales</text>
      <text x={61} y={122} textAnchor="middle" {...T} fontSize={10}>symptom</text>
      {hyps.map((h, i) => (
        <g key={h.t}>
          <motion.path d={`M116,110 C160,110 160,${h.y} 200,${h.y}`} fill="none" stroke={h.hi ? "var(--color-signal)" : "var(--color-line-2)"} strokeWidth={h.hi ? 1.5 : 1} {...draw(i * 0.1)} />
          <rect x={200} y={h.y - 14} width={222} height={28} fill="var(--color-ink)" stroke={h.hi ? "var(--color-signal)" : "var(--color-line-2)"} />
          <text x={210} y={h.y + 4} fontSize={12.5} fill={h.hi ? "var(--color-text)" : "var(--color-muted)"}>{h.t}</text>
        </g>
      ))}
      <motion.path d="M422,30 C445,30 445,50 462,50 M422,70 C445,70 445,50 462,50" fill="none" stroke="var(--color-signal)" strokeWidth={1.5} {...draw(0.6)} />
      <text x={466} y={46} fontSize={12.5} fill="var(--color-signal)">Root</text>
      <text x={466} y={60} fontSize={12.5} fill="var(--color-signal)">cause</text>
      <text x={422} y={150} {...T} fontSize={10}>scored 1–5 on</text>
      <text x={422} y={164} {...T} fontSize={10}>impact × evidence</text>
    </svg>
  );
}

/** Hospital group — the consolidated margin hides a 43-point spread. */
export function MarginSpread() {
  const reduce = useReducedMotion();
  const rows = [
    { t: "Premium Ortho & Spine", v: 27.0 },
    { t: "Central (flagship)", v: 5.4 },
    { t: "Group consolidated", v: 7.1, group: true },
    { t: "East (growth site)", v: -16.5 },
  ];
  const zero = 260;
  const k = 7;
  return (
    <svg viewBox="0 0 520 200" className="h-auto w-full" role="img" aria-label="Operating margin by hospital: 27.0%, 5.4%, minus 16.5%, against a consolidated 7.1%.">
      <line x1={zero} y1={10} x2={zero} y2={190} stroke="var(--color-line-2)" />
      {rows.map((r, i) => {
        const y = 22 + i * 44;
        const w = Math.abs(r.v) * k;
        const x = r.v >= 0 ? zero : zero - w;
        const color = r.group ? "var(--color-muted)" : r.v < 0 ? "var(--color-signal)" : "var(--color-accent)";
        return (
          <g key={r.t}>
            <text x={zero - 8 - (r.v < 0 ? w : 0)} y={y + 14} textAnchor="end" fontSize={12.5} fill="var(--color-text)">{r.t}</text>
            <motion.rect
              x={x}
              y={y}
              width={w}
              height={20}
              fill={color}
              fillOpacity={r.group ? 0.35 : 0.85}
              style={{ transformBox: "fill-box", transformOrigin: r.v >= 0 ? "left center" : "right center" }}
              initial={{ scaleX: reduce ? 1 : 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : i * 0.1 }}
            />
            <text x={r.v >= 0 ? zero + w + 6 : zero + 6} y={y + 14} {...T} fill={color}>{r.v.toFixed(1)}%</text>
          </g>
        );
      })}
    </svg>
  );
}

/** Investment committee — decision tree with the chosen branch. */
export function DecisionTree() {
  const draw = useDraw();
  const opts = [
    { y: 60, t: "A · Build & operate", c: false },
    { y: 140, t: "B · Partner / JV + PPP", c: true },
  ];
  return (
    <svg viewBox="0 0 520 200" className="h-auto w-full" role="img" aria-label="Decision tree: proceed with the investment? Option B, partner or joint venture with PPP financing, is chosen with conditions.">
      <rect x={20} y={80} width={40} height={40} transform="rotate(45 40 100)" fill="var(--color-ink)" stroke="var(--color-accent)" />
      <text x={40} y={104} textAnchor="middle" fontSize={12.5} fill="var(--color-accent)">?</text>
      <text x={40} y={150} textAnchor="middle" {...T} fontSize={10}>$200M decision</text>
      {opts.map((o, i) => (
        <g key={o.t}>
          <motion.path d={`M68,100 C120,100 120,${o.y} 170,${o.y}`} fill="none" stroke={o.c ? "var(--color-accent)" : "var(--color-line-2)"} strokeWidth={o.c ? 1.6 : 1} {...draw(i * 0.1)} />
          <rect x={170} y={o.y - 15} width={190} height={30} fill="var(--color-ink)" stroke={o.c ? "var(--color-accent)" : "var(--color-line-2)"} />
          <text x={180} y={o.y + 4} fontSize={12.5} fill={o.c ? "var(--color-text)" : "var(--color-muted)"}>{o.t}</text>
        </g>
      ))}
      <text x={180} y={88} {...T} fontSize={10}>investor CapEx SAR 675mn</text>
      <text x={180} y={168} {...T} fontSize={10}>investor CapEx SAR 270mn (−60%)</text>
      <motion.path d="M360,140 L400,140" stroke="var(--color-accent)" strokeWidth={1.6} {...draw(0.5)} />
      <text x={406} y={132} fontSize={12.5} fill="var(--color-accent)">Proceed with</text>
      <text x={406} y={147} fontSize={12.5} fill="var(--color-accent)">conditions</text>
      <text x={406} y={164} {...T} fontSize={10}>validate cost</text>
      <text x={406} y={177} {...T} fontSize={10}>controls first</text>
    </svg>
  );
}

/** Distribution model — break-even chart: revenue vs total cost per month. */
export function BreakEven() {
  const draw = useDraw();
  // Volumes in millions of cans/month; values in SAR thousands.
  const X = (v: number) => 50 + v * 230; // 0..2M → 50..510
  const Y = (s: number) => 180 - s * 0.055; // 0..3000k → 180..15
  const rev = (v: number) => 1485 * v; // SAR 1.50 × 99% sold
  const cost = (v: number) => 508.3 + 1100 * v; // fixed (opex + depreciation) + variable (purchase + logistics)
  const be = 1.32;
  return (
    <svg viewBox="0 0 520 210" className="h-auto w-full" role="img" aria-label="Break-even chart: revenue and total cost lines cross at about 1.32 million cans per month, above the planned 1.0 million.">
      <line x1={50} y1={180} x2={510} y2={180} stroke="var(--color-line-2)" />
      <line x1={50} y1={15} x2={50} y2={180} stroke="var(--color-line-2)" />
      <motion.path d={`M${X(0)},${Y(cost(0))} L${X(2)},${Y(cost(2))}`} stroke="var(--color-signal)" strokeWidth={1.6} fill="none" {...draw(0)} />
      <motion.path d={`M${X(0)},${Y(rev(0))} L${X(2)},${Y(rev(2))}`} stroke="var(--color-accent)" strokeWidth={1.6} fill="none" {...draw(0.2)} />
      <line x1={X(1)} y1={15} x2={X(1)} y2={180} stroke="var(--color-muted)" strokeDasharray="3 4" />
      <text x={X(1) - 4} y={26} textAnchor="end" {...T}>plan 1.0M</text>
      <line x1={X(be)} y1={Y(rev(be))} x2={X(be)} y2={180} stroke="var(--color-text)" strokeDasharray="2 3" />
      <circle cx={X(be)} cy={Y(rev(be))} r={4} fill="var(--color-text)" />
      <text x={X(be) + 6} y={Y(rev(be)) + 22} {...T} fill="var(--color-text)">break-even ≈1.32M (+32%)</text>
      <text x={X(2) - 2} y={Y(rev(2)) - 6} textAnchor="end" {...T} fill="var(--color-accent)">revenue</text>
      <text x={X(2) - 2} y={Y(cost(2)) + 14} textAnchor="end" {...T} fill="var(--color-signal)">total cost</text>
      <text x={280} y={200} textAnchor="middle" {...T} fontSize={10}>cans / month</text>
    </svg>
  );
}
