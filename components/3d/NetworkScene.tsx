"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { clusters, network } from "@/lib/network";

const CYAN = new THREE.Color("#3ec8f0");
const CYAN_DIM = new THREE.Color("#7fb6c8");
const ORANGE = new THREE.Color("#d9824b");
const PACKETS = 28;

type Shared = { pointer: { x: number; y: number }; scroll: number };

function Network({ shared }: { shared: React.RefObject<Shared> }) {
  const group = useRef<THREE.Group>(null);
  // Fit the whole network (≈7.4 world units wide incl. applied clusters) inside the frame.
  const { viewport } = useThree();
  const fit = Math.min(1, viewport.width / 7.6, viewport.height / 4.6);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const hubsRef = useRef<THREE.InstancedMesh>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const appliedLines = useRef<THREE.LineSegments>(null);
  const packets = useRef<THREE.Points>(null);
  const lastBlend = useRef(-1);
  const current = useMemo(() => network.nodes.map((n) => new THREE.Vector3(...n.spread)), []);

  const isApplied = useMemo(() => {
    const set = new Set(clusters.filter((c) => !c.core).map((c) => c.id));
    return network.nodes.map((n) => set.has(n.cluster));
  }, []);

  const satellites = useMemo(() => network.nodes.filter((n) => !n.hub), []);
  const hubs = useMemo(() => network.nodes.filter((n) => n.hub), []);
  const coreEdges = useMemo(() => network.edges.filter((e) => e.kind !== "applied"), []);
  const appEdges = useMemo(() => network.edges.filter((e) => e.kind === "applied"), []);

  const linePos = useMemo(() => new Float32Array(coreEdges.length * 6), [coreEdges]);
  const appLinePos = useMemo(() => new Float32Array(appEdges.length * 6), [appEdges]);

  // Packets travel along a stable subset of edges.
  const packetEdges = useMemo(
    () =>
      Array.from({ length: PACKETS }, (_, i) => {
        const e = network.edges[(i * 7 + 3) % network.edges.length];
        return { e, offset: (i * 0.137) % 1, speed: 0.12 + ((i * 31) % 10) / 70 };
      }),
    [],
  );
  const packetPos = useMemo(() => new Float32Array(PACKETS * 3), []);

  useEffect(() => {
    satellites.forEach((n, i) => nodesRef.current?.setColorAt(i, isApplied[n.id] ? ORANGE : CYAN_DIM));
    hubs.forEach((n, i) => hubsRef.current?.setColorAt(i, isApplied[n.id] ? ORANGE : CYAN));
    if (nodesRef.current?.instanceColor) nodesRef.current.instanceColor.needsUpdate = true;
    if (hubsRef.current?.instanceColor) hubsRef.current.instanceColor.needsUpdate = true;
  }, [satellites, hubs, isApplied]);

  const m = useMemo(() => new THREE.Matrix4(), []);
  const q = useMemo(() => new THREE.Quaternion(), []);
  const s = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, dt) => {
    const sh = shared.current;
    if (!sh || !group.current) return;
    const t = state.clock.elapsedTime;

    // Pointer parallax + slow idle drift.
    const g = group.current;
    g.rotation.y += (sh.pointer.x * 0.35 + Math.sin(t * 0.08) * 0.25 - g.rotation.y) * Math.min(1, dt * 2.5);
    g.rotation.x += (-sh.pointer.y * 0.22 - g.rotation.x) * Math.min(1, dt * 2.5);

    // Scroll tightens the clusters into a single lattice (only recompute when it changes).
    const blend = Math.round(sh.scroll * 100) / 100;
    if (blend !== lastBlend.current) {
      lastBlend.current = blend;
      const e = blend * blend * (3 - 2 * blend);
      network.nodes.forEach((n, i) => {
        current[i].set(
          n.spread[0] + (n.compact[0] - n.spread[0]) * e,
          n.spread[1] + (n.compact[1] - n.spread[1]) * e,
          n.spread[2] + (n.compact[2] - n.spread[2]) * e,
        );
      });
      satellites.forEach((n, i) => {
        s.setScalar(1);
        m.compose(current[n.id], q, s);
        nodesRef.current?.setMatrixAt(i, m);
      });
      hubs.forEach((n, i) => {
        s.setScalar(1);
        m.compose(current[n.id], q, s);
        hubsRef.current?.setMatrixAt(i, m);
      });
      if (nodesRef.current) nodesRef.current.instanceMatrix.needsUpdate = true;
      if (hubsRef.current) hubsRef.current.instanceMatrix.needsUpdate = true;

      const fill = (arr: Float32Array, list: typeof coreEdges, ref: React.RefObject<THREE.LineSegments | null>) => {
        list.forEach((ed, i) => {
          const a = current[ed.a];
          const b = current[ed.b];
          arr.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6);
        });
        const attr = ref.current?.geometry.getAttribute("position") as THREE.BufferAttribute | undefined;
        if (attr) attr.needsUpdate = true;
      };
      fill(linePos, coreEdges, lines);
      fill(appLinePos, appEdges, appliedLines);
    }

    // Data packets.
    packetEdges.forEach((p, i) => {
      const k = (t * p.speed + p.offset) % 1;
      const a = current[p.e.a];
      const b = current[p.e.b];
      packetPos[i * 3] = a.x + (b.x - a.x) * k;
      packetPos[i * 3 + 1] = a.y + (b.y - a.y) * k;
      packetPos[i * 3 + 2] = a.z + (b.z - a.z) * k;
    });
    const pAttr = packets.current?.geometry.getAttribute("position") as THREE.BufferAttribute | undefined;
    if (pAttr) pAttr.needsUpdate = true;
  });

  return (
    <group ref={group} scale={fit}>
      <instancedMesh ref={nodesRef} args={[undefined, undefined, satellites.length]}>
        <icosahedronGeometry args={[0.045, 0]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <instancedMesh ref={hubsRef} args={[undefined, undefined, hubs.length]}>
        <octahedronGeometry args={[0.13, 0]} />
        <meshBasicMaterial wireframe toneMapped={false} />
      </instancedMesh>
      <lineSegments ref={lines}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#3ec8f0" transparent opacity={0.3} depthWrite={false} />
      </lineSegments>
      <lineSegments ref={appliedLines}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[appLinePos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#d9824b" transparent opacity={0.3} depthWrite={false} />
      </lineSegments>
      <points ref={packets}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[packetPos, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#bff0ff" size={0.05} sizeAttenuation transparent opacity={0.95} depthWrite={false} />
      </points>
    </group>
  );
}

export default function NetworkScene({ onReady }: { onReady?: () => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const shared = useRef<Shared>({ pointer: { x: 0, y: 0 }, scroll: 0 });
  const io = useRef<IntersectionObserver | null>(null);

  useEffect(() => () => io.current?.disconnect(), []);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      shared.current.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      shared.current.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      const h = el.getBoundingClientRect().height || 1;
      shared.current.scroll = Math.min(1, Math.max(0, window.scrollY / (h * 1.1)));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        frameloop="always"
        onCreated={(state) => {
          // Stop rendering entirely while the hero is off screen.
          io.current = new IntersectionObserver(([entry]) => {
            state.setFrameloop(entry.isIntersecting ? "always" : "never");
          });
          if (wrap.current) io.current.observe(wrap.current);
          onReady?.();
        }}
        aria-hidden
      >
        <Network shared={shared} />
      </Canvas>
    </div>
  );
}
