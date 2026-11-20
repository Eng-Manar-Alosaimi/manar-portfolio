import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";
import { CopyEmail } from "@/components/CopyEmail";

export function Contact() {
  const links = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, external: false },
    { icon: Linkedin, label: "LinkedIn", value: "manar-alosaimixx", href: profile.linkedin, external: true },
    { icon: Github, label: "GitHub", value: "Eng-Manar-Alosaimi", href: profile.github, external: true },
  ];

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden border-t border-line py-24 md:py-36" aria-labelledby="contact-title">
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="wrap relative">
        <Reveal>
          <p className="eyebrow">
            <span className="text-accent">§06</span>
            <span className="mx-2 text-faint">—</span>Contact
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="contact-title" className="mt-8 max-w-5xl font-serif text-[clamp(2.4rem,6.5vw,5.4rem)] leading-[1] tracking-[-0.02em] text-balance">
            Have a problem worth engineering a solution for?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            Open to opportunities across AI Engineering, Data Engineering and Intelligent Systems — and to applying them in GRC and technology
            consulting contexts.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
          <a href={`mailto:${profile.email}`} className="group inline-flex items-center gap-2 bg-accent px-6 py-3.5 font-medium text-ink transition-colors hover:bg-text">
            <Mail size={17} aria-hidden /> Email me
          </a>
          <CopyEmail email={profile.email} />
          {profile.cvUrl && (
            <a href={profile.cvUrl} download className="inline-flex items-center gap-2 border border-line-2 px-6 py-3.5 text-text transition-colors hover:border-accent hover:text-accent">
              <Download size={17} aria-hidden /> Download CV
            </a>
          )}
        </Reveal>

        <Reveal delay={0.2}>
          <ul className="mt-16 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {links.map((l) => (
              <li key={l.label} className="border-b border-line lg:border-b-0 lg:border-r">
                <a
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full flex-col gap-3 p-5 transition-colors hover:bg-panel"
                >
                  <span className="flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.12em] text-faint">
                    <span className="inline-flex items-center gap-2">
                      <l.icon size={13} aria-hidden /> {l.label}
                    </span>
                    <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  </span>
                  <span className="break-all text-[0.95rem] text-text group-hover:text-accent">{l.value}</span>
                  {l.external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </li>
            ))}
            <li className="flex flex-col gap-3 p-5">
              <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-faint">
                <MapPin size={13} aria-hidden /> Location
              </span>
              <span className="text-[0.95rem]">{profile.location}</span>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
