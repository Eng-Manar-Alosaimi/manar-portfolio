import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({ url: `${siteUrl}/projects/${p.slug}`, changeFrequency: "yearly" as const, priority: p.category === "consulting" ? 0.5 : 0.8 })),
  ];
}
