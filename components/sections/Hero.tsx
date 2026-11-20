"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, Github, Linkedin, MapPin } from "lucide-react";
import { useRef } from "react";
import { profile } from "@/data/profile";
import { HeroVisual } from "@/components/3d/HeroVisual";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);

  // CSS-driven entrance: runs before hydration so the hero text is never hidden waiting for JS.
  const rise = (d: number) => ({ animationDelay: `${d}s` });

  return (
    <section ref={ref} className="relative overflow-hidden pt-16" aria-labelledby="hero-title">
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="wrap relative grid min-h-[calc(100svh-4rem)] items-center gap-8 py-12 lg:grid-cols-12 lg:py-0">
        <motion.div style={{ y: yText, opacity: fade }} className="relative z-10 lg:col-span-6">
          <motion.p style={rise(0.05)} className="hero-rise eyebrow flex items-center gap-2">
            <MapPin size={12} className="text-accent" aria-hidden />
            {profile.location}
          </motion.p>

          <h1 id="hero-title" className="mt-6 font-serif text-[clamp(3.1rem,9vw,6.6rem)] leading-[0.92] tracking-[-0.025em]">
            <motion.span style={rise(0.12)} className="hero-rise block">
              Manar
            </motion.span>
            <motion.span style={rise(0.2)} className="hero-rise block italic text-text/90">
              Alosaimi
            </motion.span>
          </h1>

          <motion.ul style={rise(0.32)} className="hero-rise mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.78rem] uppercase tracking-[0.12em] text-accent">
            {profile.descriptor.map((d, i) => (
              <li key={d} className="flex items-center gap-3">
                {i > 0 && <span className="text-faint" aria-hidden>|</span>}
                {d}
              </li>
            ))}
          </motion.ul>

          <motion.p style={rise(0.42)} className="hero-rise mt-6 max-w-[34rem] text-[1.08rem] leading-relaxed text-muted">
            {profile.summary}
          </motion.p>

          <motion.div style={rise(0.52)} className="hero-rise mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 bg-accent px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-text"
            >
              Explore my work
              <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-line-2 px-5 py-3 text-sm text-text transition-colors hover:border-accent hover:text-accent"
            >
              Let&apos;s connect
            </a>
            <span className="flex items-center">
            <span className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden />
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center text-muted transition-colors hover:text-accent"
              aria-label="LinkedIn profile (opens in a new tab)"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center text-muted transition-colors hover:text-accent"
              aria-label="GitHub profile (opens in a new tab)"
            >
              <Github size={18} />
            </a>
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: yVisual }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="relative -mx-4 aspect-[720/460] sm:mx-0 lg:col-span-6 lg:aspect-[1/1] xl:aspect-[6/5]"
        >
          <HeroVisual />
        </motion.div>
      </div>

      <div className="wrap relative pb-6">
        <div className="flex items-center justify-between border-t border-line pt-4 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-faint">
          <span>Fig. 0 — Intelligent engineering network</span>
          <span className="hidden sm:inline">Scroll ↓</span>
        </div>
      </div>
    </section>
  );
}
