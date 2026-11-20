/**
 * Certifications, courses, bootcamps, programmes and mentorship.
 * Add `url` (credential link) and `year` only when verified — never invent them.
 */

export type DevCategory = "ai" | "data" | "consulting" | "mentorship";

export type DevItem = {
  provider: string;
  name: string;
  category: DevCategory;
  type: "Certification" | "Course" | "Professional certificate" | "Bootcamp" | "Programme" | "Mentorship";
  year?: string;
  outcomes: string[];
  url?: string;
  relatedProject?: string;
  detail?: { title: string; items: string[] }[];
};

export const devCategories: Record<DevCategory, string> = {
  ai: "AI & LLM Engineering",
  data: "Data & Analytics",
  consulting: "Consulting & Business",
  mentorship: "Professional Development & Mentorship",
};

export const development: DevItem[] = [
  {
    provider: "NVIDIA",
    name: "NVIDIA-Certified Associate: Generative AI LLMs (NCA-GenL)",
    category: "ai",
    type: "Certification",
    outcomes: ["LLM fundamentals", "Generative AI concepts"],
  },
  {
    provider: "SDAIA Academy",
    name: "Modern Data Engineering for AI Systems (SDA-DSC-214)",
    category: "ai",
    type: "Course",
    year: "2026",
    outcomes: ["Lakehouse architecture", "Spark & Delta Lake", "Streaming with Kafka", "Data contracts & quality"],
    relatedProject: "masar-lakehouse",
  },
  {
    provider: "SDAIA Academy",
    name: "Advanced Agentic AI Systems Engineering",
    category: "ai",
    type: "Course",
    outcomes: ["Agentic system design", "Multi-agent orchestration"],
  },
  {
    provider: "Udemy",
    name: "AI Engineer Core Track — LLM Engineering, RAG, QLoRA & Agents",
    category: "ai",
    type: "Course",
    outcomes: ["LLM engineering", "RAG", "QLoRA fine-tuning", "Agents"],
  },
  {
    provider: "Udemy",
    name: "AI Coder — Complete Claude Code & Coding Agents Course",
    category: "ai",
    type: "Course",
    outcomes: ["AI-assisted development", "Coding agents"],
  },
  {
    provider: "IBM",
    name: "IBM AI Engineering Professional Certificate",
    category: "ai",
    type: "Professional certificate",
    outcomes: ["Machine learning", "Deep learning"],
  },
  {
    provider: "Hash Plus",
    name: "Data Analysis with AI Bootcamp",
    category: "data",
    type: "Bootcamp",
    outcomes: ["Data analysis", "AI-assisted analytics"],
  },
  {
    provider: "McKinsey & Company",
    name: "McKinsey Forward Program",
    category: "consulting",
    type: "Programme",
    outcomes: ["Structured problem solving", "Professional communication"],
  },
  {
    provider: "Arpus Consulting",
    name: "Boost Accelerator Program",
    category: "consulting",
    type: "Programme",
    year: "2026 · 60 hours",
    outcomes: ["Structured problem solving", "Business & operations", "Financial modelling", "Presentations"],
    detail: [
      {
        title: "Tier 1 — Core Foundation",
        items: [
          "Structured Problem Solving",
          "Business & Operations",
          "Financial Modelling",
          "Presentations",
          "Case studies completed, submitted, reviewed and approved",
        ],
      },
      {
        title: "Tier 2 — Applied Experience",
        items: [
          "Participated in a Riyadh hospital feasibility study",
          "Problem structuring",
          "Analysis and modelling",
          "Slide development",
          "Team collaboration",
        ],
      },
    ],
  },
  {
    provider: "AWS",
    name: "AWS She Builds Mentorship Program",
    category: "mentorship",
    type: "Mentorship",
    year: "2026",
    outcomes: ["Mentorship", "Professional development"],
  },
  {
    provider: "",
    name: "Digital Transformation and AI for Business",
    category: "mentorship",
    type: "Course",
    outcomes: ["Digital transformation", "AI in business"],
  },
];
