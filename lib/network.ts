/**
 * The "Intelligent Engineering Network" model shared by the WebGL scene and the SVG fallback.
 * Four dense core clusters (AI, Data, Intelligent Systems, Software) sit at the centre;
 * two smaller application clusters (Compliance, Consulting) orbit outside and plug into them.
 * Deterministic (seeded) so server and client render identically.
 */

export type ClusterId = "ai" | "data" | "systems" | "software" | "compliance" | "consulting";

export type Cluster = {
  id: ClusterId;
  label: string;
  core: boolean;
  center: [number, number, number];
  count: number;
  spread: number;
};

export type NetNode = { id: number; cluster: ClusterId; hub: boolean; spread: [number, number, number]; compact: [number, number, number] };
export type NetEdge = { a: number; b: number; kind: "intra" | "core" | "applied" };

export const clusters: Cluster[] = [
  { id: "ai", label: "AI Engineering", core: true, center: [-1.35, 0.95, 0.2], count: 9, spread: 0.62 },
  { id: "data", label: "Data Engineering", core: true, center: [1.4, 0.75, -0.25], count: 9, spread: 0.62 },
  { id: "systems", label: "Intelligent Systems", core: true, center: [-1.05, -1.1, -0.2], count: 8, spread: 0.58 },
  { id: "software", label: "Software & Systems", core: true, center: [1.15, -1.05, 0.3], count: 8, spread: 0.58 },
  { id: "compliance", label: "Applied · Compliance", core: false, center: [2.85, -0.05, 0.6], count: 4, spread: 0.32 },
  { id: "consulting", label: "Applied · Consulting", core: false, center: [-2.9, -0.15, 0.5], count: 4, spread: 0.32 },
];

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function build() {
  const r = rng(20260519);
  const nodes: NetNode[] = [];
  const hubOf: Record<string, number> = {};

  for (const c of clusters) {
    for (let i = 0; i < c.count; i++) {
      const hub = i === 0;
      let p: [number, number, number];
      if (hub) p = [...c.center];
      else {
        const th = r() * Math.PI * 2;
        const ph = Math.acos(2 * r() - 1);
        const rad = c.spread * (0.45 + 0.55 * r());
        p = [
          c.center[0] + rad * Math.sin(ph) * Math.cos(th),
          c.center[1] + rad * Math.sin(ph) * Math.sin(th) * 0.85,
          c.center[2] + rad * Math.cos(ph),
        ];
      }
      // Compact layout: clusters pulled toward the origin to form a single lattice.
      const k = c.core ? 0.42 : 0.55;
      const compact: [number, number, number] = [p[0] * k, p[1] * k, p[2] * k];
      if (hub) hubOf[c.id] = nodes.length;
      nodes.push({ id: nodes.length, cluster: c.id, hub, spread: p, compact });
    }
  }

  const edges: NetEdge[] = [];
  const dist = (a: NetNode, b: NetNode) =>
    Math.hypot(a.spread[0] - b.spread[0], a.spread[1] - b.spread[1], a.spread[2] - b.spread[2]);
  const seen = new Set<string>();
  const add = (a: number, b: number, kind: NetEdge["kind"]) => {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (a === b || seen.has(key)) return;
    seen.add(key);
    edges.push({ a, b, kind });
  };

  // Intra-cluster: each node links to its hub and nearest sibling.
  for (const c of clusters) {
    const members = nodes.filter((n) => n.cluster === c.id);
    for (const n of members) {
      if (n.hub) continue;
      add(n.id, hubOf[c.id], "intra");
      const nearest = members.filter((m) => m.id !== n.id && !m.hub).sort((x, y) => dist(n, x) - dist(n, y))[0];
      if (nearest) add(n.id, nearest.id, "intra");
    }
  }

  // Core-to-core: hubs fully connected, plus a few peripheral bridges.
  const core = clusters.filter((c) => c.core);
  for (let i = 0; i < core.length; i++)
    for (let j = i + 1; j < core.length; j++) {
      add(hubOf[core[i].id], hubOf[core[j].id], "core");
      const A = nodes.filter((n) => n.cluster === core[i].id && !n.hub);
      const B = nodes.filter((n) => n.cluster === core[j].id && !n.hub);
      let best: [number, number, number] = [0, 0, Infinity];
      for (const a of A) for (const b of B) { const d = dist(a, b); if (d < best[2]) best = [a.id, b.id, d]; }
      add(best[0], best[1], "core");
    }

  // Applied clusters plug into the two nearest core hubs.
  for (const c of clusters.filter((c) => !c.core)) {
    const hub = nodes[hubOf[c.id]];
    const near = core
      .map((k) => nodes[hubOf[k.id]])
      .sort((x, y) => dist(hub, x) - dist(hub, y))
      .slice(0, 2);
    near.forEach((n) => add(hub.id, n.id, "applied"));
  }

  return { nodes, edges };
}

export const network = build();
