import Link from "next/link";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { education, experience } from "@/data/experience";

function Entry({ when, children }: { when: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid gap-3 border-t border-line py-8 md:grid-cols-12 md:gap-8">
      <div className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-faint md:col-span-3">{when}</div>
      <div className="md:col-span-9">{children}</div>
    </div>
  );
}

export function Education() {
  return (
    <section id="experience" className="wrap scroll-mt-20 py-24 md:py-32" aria-labelledby="edu-title">
      <SectionHead index="05" label="Education & Experience" title={<span id="edu-title">Foundations.</span>} />

      <div className="mt-14">
        <Reveal>
          <p className="eyebrow mb-2 text-accent">Education</p>
          <Entry when={education.year}>
            <h3 className="font-serif text-2xl md:text-3xl">{education.degree}</h3>
            <p className="mt-1 text-muted">
              {education.school}, {education.location}
            </p>
            <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
              <div>
                <dt className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">GPA</dt>
                <dd className="mt-1 font-serif text-xl">{education.gpa}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">Distinction</dt>
                <dd className="mt-1 font-serif text-xl">{education.honors}</dd>
              </div>
            </dl>
            <p className="mt-5 text-sm text-muted">
              Graduation project:{" "}
              <Link href={`/projects/${education.projectSlug}`} className="text-accent underline-offset-4 hover:underline">
                Smart Hajj Earbud Assistant (Edge AI)
              </Link>
            </p>
          </Entry>
        </Reveal>

        <Reveal className="mt-10">
          <p className="eyebrow mb-2 text-accent">Cooperative training</p>
          {experience.map((e) => (
            <Entry key={e.title} when={e.period}>
              <h3 className="font-serif text-2xl">{e.title}</h3>
              <p className="mt-1 text-muted">
                {e.org} · {e.place}
              </p>
              <p className="mt-4 max-w-2xl leading-relaxed text-text/85">{e.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Training areas">
                {e.areas.map((a) => (
                  <li key={a} className="border border-line px-2.5 py-1 font-mono text-[0.68rem] text-muted">
                    {a}
                  </li>
                ))}
              </ul>
            </Entry>
          ))}
        </Reveal>

      </div>
    </section>
  );
}
