import { clusters, network } from "@/lib/network";

/** Static SVG projection of the same network. Used before WebGL loads, on small/touch screens,
 * with reduced motion, and when WebGL is unavailable. `animate` enables cheap CSS packet flow. */
export function NetworkFallback({ animate = false }: { animate?: boolean }) {
  const P = (p: [number, number, number]) => {
    const f = 6.2 / (6.2 - p[2]);
    return [p[0] * f * 100, -p[1] * f * 100] as const;
  };
  const applied = new Set(clusters.filter((c) => !c.core).map((c) => c.id));
  const pos = network.nodes.map((n) => P(n.spread));

  return (
    <svg viewBox="-380 -230 760 460" className="h-full w-full" role="img" aria-label="Network diagram: four core engineering clusters — AI, Data, Intelligent Systems, Software — connected to each other, with Compliance and Consulting as applied domains on the outside.">
      <g>
        {network.edges.map((e, i) => {
          const [x1, y1] = pos[e.a];
          const [x2, y2] = pos[e.b];
          const orange = e.kind === "applied";
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={orange ? "var(--color-signal)" : "var(--color-accent)"}
              strokeOpacity={e.kind === "intra" ? 0.22 : 0.38}
              strokeWidth={e.kind === "intra" ? 0.8 : 1}
              className={animate && e.kind !== "intra" ? "flow-dash" : undefined}
            />
          );
        })}
      </g>
      <g>
        {network.nodes.map((n, i) => {
          const [x, y] = pos[i];
          const color = applied.has(n.cluster) ? "var(--color-signal)" : "var(--color-accent)";
          return n.hub ? (
            <rect
              key={i}
              x={x - 7}
              y={y - 7}
              width={14}
              height={14}
              transform={`rotate(45 ${x} ${y})`}
              fill="var(--color-ink)"
              stroke={color}
              strokeWidth={1.2}
            />
          ) : (
            <circle key={i} cx={x} cy={y} r={2.6} fill={color} fillOpacity={0.85} className={animate ? "pulse-node" : undefined} style={{ animationDelay: `${(i % 7) * 0.4}s` }} />
          );
        })}
      </g>
      <g className="font-mono" fontSize={10.5} letterSpacing="0.08em">
        {clusters.map((c) => {
          const [x, y] = P(c.center);
          return (
            <text key={c.id} x={x} y={y - c.spread * 100 - 10} textAnchor="middle" fill={c.core ? "var(--color-muted)" : "var(--color-signal)"}>
              {c.label.replace("Applied · ", "").toUpperCase()}
            </text>
          );
        })}
      </g>
    </svg>
  );
}
