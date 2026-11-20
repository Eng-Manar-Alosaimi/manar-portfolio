import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[70vh] flex-col justify-center pt-16">
      <p className="eyebrow text-accent">404 — Node not found</p>
      <h1 className="mt-4 font-serif text-5xl">This path isn&apos;t connected.</h1>
      <Link href="/" className="mt-8 text-accent underline-offset-4 hover:underline">
        Return to the network →
      </Link>
    </section>
  );
}
