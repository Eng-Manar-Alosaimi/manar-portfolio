import { Reveal } from "./Reveal";

export function SectionHead({
  index,
  label,
  title,
  lede,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 border-t border-line pt-6 md:grid-cols-12 md:gap-8">
      <Reveal className="md:col-span-3">
        <p className="eyebrow">
          <span className="text-accent">§{index}</span>
          <span className="mx-2 text-faint">—</span>
          {label}
        </p>
      </Reveal>
      <div className="md:col-span-9">
        <Reveal delay={0.05}>
          <h2 className="font-serif text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.05] tracking-[-0.015em] text-balance">{title}</h2>
        </Reveal>
        {lede && (
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-muted">{lede}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
