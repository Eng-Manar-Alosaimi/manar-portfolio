import type { ProjectKind } from "@/data/projects";
import { cn } from "@/lib/site";

export function KindBadge({ kind, className }: { kind: ProjectKind; className?: string }) {
  const sim = kind === "Accelerator case simulation";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.12em]",
        sim ? "border-signal/50 text-signal" : "border-line-2 text-muted",
        className,
      )}
    >
      <span className={cn("h-1 w-1 rotate-45", sim ? "bg-signal" : "bg-accent")} aria-hidden />
      {kind}
    </span>
  );
}
