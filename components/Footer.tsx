import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col gap-3 py-8 font-mono text-[0.7rem] text-faint sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Designed &amp; engineered in {profile.location}</span>
      </div>
    </footer>
  );
}
