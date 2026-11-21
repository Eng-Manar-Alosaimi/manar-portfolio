/**
 * Skills taxonomy. No proficiency levels by design.
 * `evidence` links a skill to project slugs (see data/projects.ts).
 */

export type Skill = { name: string; evidence: string[] };
export type SkillGroup = { id: string; label: string; short: string; secondary?: boolean; note?: string; skills: Skill[] };

export const technicalGroups: SkillGroup[] = [
  {
    id: "ai",
    label: "AI & Machine Learning",
    short: "AI",
    skills: [
      { name: "Large Language Models (LLMs)", evidence: ["ai-compliance-assessment", "logistics-multi-agent"] },
      { name: "Prompt Engineering", evidence: ["ai-compliance-assessment"] },
      { name: "Retrieval-Augmented Generation (RAG)", evidence: ["ai-compliance-assessment"] },
      { name: "AI Agents & Multi-Agent Systems", evidence: ["logistics-multi-agent"] },
      { name: "Edge AI / TinyML", evidence: ["smart-hajj-earbud"] },
    ],
  },
  {
    id: "dev",
    label: "Programming & Development",
    short: "Dev",
    skills: [
      { name: "Python", evidence: ["ai-compliance-assessment", "masar-lakehouse", "logistics-multi-agent", "smart-hajj-earbud"] },
      { name: "API Integration", evidence: ["ai-compliance-assessment", "logistics-multi-agent"] },
      { name: "JSON Schema Design", evidence: ["ai-compliance-assessment"] },
    ],
  },
  {
    id: "data",
    label: "Data Engineering & Analytics",
    short: "Data",
    skills: [
      { name: "Apache Spark", evidence: ["masar-lakehouse"] },
      { name: "Delta Lake", evidence: ["masar-lakehouse"] },
      { name: "Apache Kafka", evidence: ["masar-lakehouse"] },
      { name: "dbt", evidence: ["masar-lakehouse"] },
      { name: "Lakehouse Architecture", evidence: ["masar-lakehouse"] },
      { name: "Data Quality", evidence: ["masar-lakehouse"] },
      { name: "Pandas", evidence: ["ai-compliance-assessment"] },
      { name: "Data Analysis", evidence: ["ai-compliance-assessment", "hospital-turnaround"] },
    ],
  },
  {
    id: "systems",
    label: "Systems & Software Engineering",
    short: "Systems",
    skills: [
      { name: "System Architecture", evidence: ["smart-hajj-earbud", "logistics-multi-agent", "ai-compliance-assessment", "masar-lakehouse"] },
      { name: "Workflow Design", evidence: ["logistics-multi-agent", "masar-lakehouse"] },
      { name: "Embedded Systems", evidence: ["smart-hajj-earbud"] },
      { name: "Hardware Integration", evidence: ["smart-hajj-earbud"] },
    ],
  },
  {
    id: "applied",
    label: "Applied Domains",
    short: "Applied",
    secondary: true,
    note: "Areas where the engineering above has been applied.",
    skills: [
      { name: "GRC", evidence: ["ai-compliance-assessment"] },
      { name: "Regulatory Compliance Assessment", evidence: ["ai-compliance-assessment"] },
      { name: "Evidence-Based Evaluation", evidence: ["ai-compliance-assessment"] },
    ],
  },
];

export const professionalGroups: SkillGroup[] = [
  {
    id: "thinking",
    label: "Problem Solving",
    short: "Thinking",
    skills: [
      { name: "Structured Problem Solving", evidence: ["fitbox-diagnostic", "hospital-turnaround"] },
      { name: "Analytical Thinking", evidence: ["hospital-turnaround", "ai-compliance-assessment"] },
      { name: "Critical Thinking", evidence: ["fitbox-diagnostic"] },
      { name: "Research", evidence: ["smart-hajj-earbud", "fitbox-diagnostic"] },
    ],
  },
  {
    id: "analysis",
    label: "Business Analysis",
    short: "Analysis",
    skills: [
      { name: "Requirements Analysis", evidence: ["smart-hajj-earbud", "ai-compliance-assessment"] },
      { name: "Business Analysis", evidence: ["fitbox-diagnostic", "hospital-turnaround"] },
      { name: "Financial Modelling", evidence: ["pepsi-financial-model", "investment-committee"] },
    ],
  },
  {
    id: "communication",
    label: "Communication & Delivery",
    short: "Comms",
    skills: [
      { name: "Technical Documentation", evidence: ["masar-lakehouse", "smart-hajj-earbud"] },
      { name: "Presentation Development", evidence: ["investment-committee", "smart-hajj-earbud"] },
      { name: "Communication", evidence: ["fitbox-diagnostic"] },
      { name: "Team Collaboration", evidence: ["smart-hajj-earbud", "logistics-multi-agent"] },
    ],
  },
];
