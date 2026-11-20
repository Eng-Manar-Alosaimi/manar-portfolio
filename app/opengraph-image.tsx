import { ImageResponse } from "next/og";

export const alt = "Manar Alosaimi — Computer Engineer | AI, Data & Intelligent Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  const nodes = [
    [820, 180], [930, 250], [1010, 150], [880, 360], [1040, 330], [960, 450], [800, 470], [1090, 470],
  ];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0a0c0f", color: "#e9e6df", padding: 72, position: "relative" }}>
        <svg width="1200" height="630" style={{ position: "absolute", left: 0, top: 0 }}>
          {nodes.map(([x, y], i) =>
            nodes.slice(i + 1, i + 3).map(([x2, y2], j) => <line key={`${i}-${j}`} x1={x} y1={y} x2={x2} y2={y2} stroke="#3ec8f0" strokeOpacity="0.35" />),
          )}
          {nodes.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 9 : 5} fill={i === 6 ? "#d9824b" : "#3ec8f0"} />
          ))}
        </svg>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#8f98a5" }}>RIYADH, SAUDI ARABIA</div>
          <div style={{ fontSize: 96, lineHeight: 1, marginTop: 20 }}>Manar Alosaimi</div>
          <div style={{ fontSize: 30, marginTop: 28, color: "#3ec8f0" }}>Computer Engineer · AI & Data Solutions · Intelligent Systems</div>
        </div>
      </div>
    ),
    size,
  );
}
