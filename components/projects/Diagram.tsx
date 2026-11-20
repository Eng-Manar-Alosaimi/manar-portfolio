"use client";

import type { DiagramKey } from "@/data/projects";
import { AgentGraph } from "./diagrams/AgentGraph";
import { BreakEven, DecisionTree, IssueTree, MarginSpread } from "./diagrams/ConsultingDiagrams";
import { EarbudSystem } from "./diagrams/EarbudSystem";
import { GrcArchitecture } from "./diagrams/GrcArchitecture";
import { LakehousePipeline } from "./diagrams/LakehousePipeline";

export function Diagram({ k, compact = false }: { k: DiagramKey; compact?: boolean }) {
  switch (k) {
    case "earbud":
      return <EarbudSystem compact={compact} />;
    case "grc":
      return <GrcArchitecture compact={compact} />;
    case "agents":
      return <AgentGraph compact={compact} />;
    case "lakehouse":
      return <LakehousePipeline compact={compact} />;
    case "fitbox":
      return <IssueTree />;
    case "hospital":
      return <MarginSpread />;
    case "investment":
      return <DecisionTree />;
    case "pepsi":
      return <BreakEven />;
  }
}
