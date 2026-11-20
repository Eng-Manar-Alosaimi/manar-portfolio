"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Copies the email address — a fallback for visitors without a mail app configured. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Older browsers / insecure contexts: fall back to a hidden textarea.
      const t = document.createElement("textarea");
      t.value = email;
      t.style.position = "fixed";
      t.style.opacity = "0";
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 border border-line-2 px-6 py-3.5 text-text transition-colors hover:border-accent hover:text-accent"
    >
      {copied ? <Check size={17} className="text-accent" aria-hidden /> : <Copy size={17} aria-hidden />}
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
