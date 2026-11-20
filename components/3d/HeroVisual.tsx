"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { NetworkFallback } from "./NetworkFallback";
import { clusters } from "@/lib/network";

// The WebGL chunk is only requested when we decide to use it.
const NetworkScene = dynamic(() => import("./NetworkScene"), { ssr: false });

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return Boolean(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}

export function HeroVisual() {
  const reduce = useReducedMotion();
  const [use3d, setUse3d] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const small = window.matchMedia("(max-width: 767px)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const lowCores = (navigator.hardwareConcurrency ?? 8) <= 2;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    // Performance first: phones/tablets, reduced motion, weak devices and no-WebGL get the SVG.
    if (reduce || small || coarse || lowCores || saveData || !webglAvailable()) return;
    // Defer the 3D load until the browser is idle so it never competes with first paint.
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number; cancelIdleCallback?: (id: number) => void };
    const id = w.requestIdleCallback ? w.requestIdleCallback(() => setUse3d(true)) : window.setTimeout(() => setUse3d(true), 600);
    return () => (w.cancelIdleCallback ? w.cancelIdleCallback(id) : window.clearTimeout(id));
  }, [reduce]);

  return (
    <figure className="relative h-full w-full" aria-label="Intelligent engineering network">
      <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-0" : "opacity-100"}`}>
        <NetworkFallback animate={!reduce} />
      </div>
      {use3d && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
          <NetworkScene onReady={() => setReady(true)} />
        </div>
      )}
      <figcaption
        className={`pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap justify-center gap-x-4 gap-y-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
      >
        {clusters.map((c) => (
          <span key={c.id} className="inline-flex items-center gap-1.5">
            <span className={`inline-block h-1.5 w-1.5 rotate-45 ${c.core ? "bg-accent" : "bg-signal"}`} />
            {c.label}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
