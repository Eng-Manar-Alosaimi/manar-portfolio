/**
 * Project & case-study content.
 *
 * Every statement here is sourced from the project repositories, their READMEs,
 * or the documents published on the previous portfolio. When adding a project,
 * keep the same rule: describe what was actually built and what you personally did.
 */

export type ProjectCategory = "ai" | "data" | "consulting";

export type ProjectKind =
  | "Personal project"
  | "Graduation project"
  | "Team course project"
  | "Course project"
  | "Accelerator case simulation";

export type DiagramKey = "earbud" | "grc" | "agents" | "lakehouse" | "fitbox" | "hospital" | "investment" | "pepsi";

export type Link = { label: string; href: string; note?: string };

export type Section = {
  id: string;
  title: string;
  body?: string[];
  bullets?: string[];
  table?: { head: string[]; rows: string[][]; caption?: string };
  figures?: { src: string; alt: string; caption: string; width: number; height: number }[];
  /** Render the project's interactive diagram inside this section. */
  diagram?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  kind: ProjectKind;
  year: string;
  context: string;
  role: string;
  tagline: string;
  summary: string;
  stack: string[];
  metrics: { value: string; label: string }[];
  diagram: DiagramKey;
  links: Link[];
  /** Shown prominently wherever the project is presented. */
  notice?: string;
  sections: Section[];
};

export const categories: Record<ProjectCategory, { label: string; index: string; blurb: string }> = {
  ai: {
    label: "AI & Intelligent Systems",
    index: "A",
    blurb: "On-device inference, LLM applications and agent workflows — from embedded hardware to API-driven services.",
  },
  data: {
    label: "Data Engineering",
    index: "B",
    blurb: "Pipelines that turn raw, messy data into tested, reliable tables for analytics and machine learning.",
  },
  consulting: {
    label: "Applied Analysis — Consulting Cases",
    index: "C",
    blurb:
      "Structured problem-solving applied to business cases during the Boost Accelerator programme. These are training simulations, not client engagements.",
  },
};

const SIMULATION_NOTICE =
  "Accelerator case simulation completed during the Boost Accelerator programme (Arpus Consulting). The company, figures and scenario are part of the training case — this was not a real client engagement.";

export const projects: Project[] = [
  /* ───────────────────────── A. AI & INTELLIGENT SYSTEMS ───────────────────────── */
  {
    slug: "smart-hajj-earbud",
    title: "Smart Hajj Earbud Assistant",
    category: "ai",
    kind: "Graduation project",
    year: "2026",
    context: "Taif University · Computer Engineering · Team of six",
    role: "Technical lead — architecture, component selection, HW/SW integration",
    tagline: "Edge AI wearable combining on-device keyword spotting, vital-sign sensing and SOS alerting.",
    summary:
      "A standalone in-ear assistant designed to support pilgrims during Hajj. An ESP32-S3 runs an on-device keyword-spotting model that triggers translation, while sensors monitor heart rate, SpO₂ and temperature, and a 4G/GPS module sends location and vitals by SMS in an emergency.",
    stack: ["ESP32-S3", "TensorFlow Lite", "CNN", "Python", "Google Colab", "PPG sensor", "MAX30205", "SIM7600E 4G/GPS"],
    metrics: [
      { value: "12,000", label: "Arabic audio samples collected" },
      { value: "29", label: "Hajj-related keywords classified" },
      { value: "~97–99%", label: "Reported train/validation accuracy" },
    ],
    diagram: "earbud",
    links: [
      { label: "GitHub repository", href: "https://github.com/Eng-Manar-Alosaimi/Standalone-Smart-Hajj-Earbud-Assistant-Capstone-Project" },
      {
        label: "Prototype demo video",
        href: "https://drive.google.com/file/d/1hmwNn0QASMDEc8QMWpB2e99zIvRB3RI-/view?usp=drivesdk",
        note: "Google Drive",
      },
    ],
    sections: [
      {
        id: "overview",
        title: "Project overview",
        body: [
          "Millions of pilgrims perform Hajj each year and many face health, physical and language challenges in dense crowds. The project proposes a standalone smart earbud that links pilgrims with medical teams and campaign supervisors.",
          "The device continuously listens for predefined keywords, monitors vital signs and, in an emergency, transmits the pilgrim's location and health data over the cellular network.",
        ],
      },
      {
        id: "problem",
        title: "Problem statement",
        bullets: [
          "Language barriers between pilgrims and Arabic-speaking medical and supervision teams.",
          "Health risks — heat, exhaustion, chronic conditions — that need early detection.",
          "Difficulty locating a pilgrim quickly when help is needed.",
        ],
      },
      {
        id: "objectives",
        title: "Objectives",
        bullets: [
          "Run keyword spotting entirely on a low-power microcontroller (no cloud dependency for detection).",
          "Continuously monitor heart rate, blood oxygen (SpO₂) and body temperature.",
          "Trigger an SOS manually (button) or automatically on a critical reading, sending GPS coordinates and vitals by SMS.",
        ],
      },
      {
        id: "role",
        title: "My role and contributions",
        body: [
          "Graduation project completed by a team of six Computer Engineering students under the supervision of Dr. Shaima Elnazer (May 2026). I led the technical work of the project.",
        ],
        bullets: [
          "Selected the hardware components — the ESP32-S3 processing unit, vital-sign sensors and the 4G/GPS communication module.",
          "Designed the system architecture: how sensing, on-device inference, SOS logic and communication fit together on one microcontroller.",
          "Integrated the hardware with the software — connecting the modules to the firmware and the on-device keyword-spotting model into one working prototype.",
        ],
      },
      {
        id: "architecture",
        title: "System architecture",
        diagram: true,
        body: [
          "The earbud initialises by receiving setup parameters (translation language and supervisor contact) via SMS, then loops through vital-sign monitoring and keyword scanning until it is switched off.",
        ],
        figures: [
          {
            src: "/img/hajj-system-flowchart.png",
            alt: "Flowchart: earbud activation, SMS setup, sensor initialisation, then loops for keyword detection, critical health checks and SOS button handling.",
            caption: "System flowchart — setup, monitoring loop, KWS-triggered translation and SOS logic.",
            width: 663,
            height: 503,
          },
        ],
      },
      {
        id: "implementation",
        title: "Technical implementation",
        bullets: [
          "Processing unit: ESP32-S3 microcontroller, chosen for low-power Edge AI workloads.",
          "Keyword spotting: 12,000 Arabic audio samples for 29 Hajj-related keywords → Mel-spectrogram features → custom CNN (Conv2D + BatchNorm blocks).",
          "Robustness: noise injection and echo simulation to approximate crowd conditions.",
          "Deployment: trained in Google Colab (GPU), converted to TensorFlow Lite to fit the microcontroller's flash memory.",
          "Sensing & comms: PPG sensor (heart rate, SpO₂), MAX30205 temperature sensor, SIM7600E 4G/GPS module for SMS alerts, physical SOS button.",
        ],
        figures: [
          {
            src: "/img/hajj-kws-model-architecture.jpg",
            alt: "Keras model summary of the sequential CNN used for keyword spotting, listing Conv2D, BatchNormalization, pooling and dense layers.",
            caption: "KWS model architecture — sequential CNN.",
            width: 1132,
            height: 1656,
          },
        ],
      },
      {
        id: "tools",
        title: "Tools and technologies",
        bullets: ["ESP32-S3", "TensorFlow / TensorFlow Lite", "Python, Google Colab", "PPG & MAX30205 sensors", "SIM7600E 4G + GPS"],
      },
      {
        id: "testing",
        title: "Testing and validation",
        bullets: [
          "Each hardware and communication module was tested independently before integration.",
          "PPG readings were taken on multiple individuals and compared against standard medical reference ranges.",
          "Temperature readings were compared with the normal human baseline (≈36.5–37.5 °C).",
          "4G/GPS: the system established a network connection and transmitted GPS coordinates and vital signs via SMS.",
          "After integration, the full prototype was tested end-to-end on the ESP32-S3.",
        ],
      },
      {
        id: "results",
        title: "Results",
        body: [
          "The project documentation reports approximately 97–99% keyword classification accuracy, supported by a confusion matrix and loss/accuracy curves from training and validation. This figure describes model performance on the project's own dataset splits — it is not a field measurement in Hajj conditions.",
          "The integrated prototype ran sensor monitoring, translation triggering, GPS tracking and SOS alerting together on the ESP32-S3.",
        ],
      },
      {
        id: "limitations",
        title: "Limitations and future improvements",
        bullets: [
          "No real-world evaluation during Hajj yet; accuracy is from dataset-based validation.",
          "Earbud form factor and battery performance need further design work.",
          "Next steps identified by the team: refine the enclosure, optimise power use, and run field testing.",
        ],
      },
    ],
  },
  {
    slug: "ai-compliance-assessment",
    title: "AI-Powered Compliance Assessment Platform",
    category: "ai",
    kind: "Personal project",
    year: "2026",
    context: "Independent build · Concept to deployment",
    role: "Sole developer — architect, reviewer and validator",
    tagline: "An LLM pipeline that assesses policy documents against regulatory requirements with cited evidence and deterministic scoring.",
    summary:
      "An MVP that reads a PDF policy pack, retrieves the passages relevant to each requirement, asks an LLM for a strictly structured judgement with page-level evidence, and then scores the results deterministically with Pandas. Applied to a regulatory use case: paraphrased SAMA Key Principles of Governance.",
    stack: ["Python", "FastAPI", "Google Gemini API", "PyMuPDF", "Pandas", "React", "TypeScript", "Vercel"],
    metrics: [
      { value: "3", label: "Model fallback chain with retry" },
      { value: "10", label: "Requirements in the test set" },
      { value: "20 → 70 → 100%", label: "Scores on 3 sample policy versions" },
    ],
    diagram: "grc",
    notice:
      "MVP. The 20% → 70% → 100% progression comes from a documented test of three synthetic sample policy versions (ABC Finance Q1–Q3) against 10 paraphrased requirements. It is not a measure of model accuracy, has not been production-validated, and is not endorsed by SAMA.",
    links: [
      { label: "GitHub repository", href: "https://github.com/Eng-Manar-Alosaimi/grc-compliance-platform" },
      {
        label: "Live dashboard",
        href: "https://grc-compliance-dashboard-phi.vercel.app",
        note: "Demo data verified; live uploads call the Gemini API",
      },
    ],
    sections: [
      {
        id: "overview",
        title: "Project overview",
        body: [
          "Checking a policy document against a regulatory framework is slow, manual and hard to trace. This project explores how far an LLM can help — and where deterministic code must take over — by building the full path from PDF upload to an evidence-linked dashboard.",
          "The design principle is separation of concerns: the model only judges one requirement against a few retrieved excerpts and must quote its evidence; all scoring and aggregation is plain, reproducible Python.",
        ],
      },
      {
        id: "problem",
        title: "Problem statement",
        bullets: [
          "LLMs can produce confident but unsupported answers — unacceptable when the output is a compliance finding.",
          "Free-form model output is hard to aggregate or compare across document versions.",
          "Reviewers need to trace every finding back to a page and a quotation.",
        ],
      },
      {
        id: "objectives",
        title: "Objectives",
        bullets: [
          "Force evidence-based judgements: page, section and exact quotation, or an explicit NO_EVIDENCE.",
          "Return a fixed JSON schema for every requirement so results can be computed on.",
          "Keep scoring deterministic and auditable, independent of the model.",
          "Stay resilient to API rate limits and model outages.",
        ],
      },
      {
        id: "role",
        title: "My role and contributions",
        body: [
          "I built this project on my own, from concept and architecture through integration and deployment. I used AI-assisted development tools for parts of the implementation, acting as the architect who defined the design, the reviewer of generated code, and the validator who tested the outputs.",
        ],
        bullets: [
          "Designed the assessment prompt and its rules for reducing hallucination.",
          "Built the FastAPI backend, PDF processing, retrieval, model integration and analytics.",
          "Built the React + TypeScript dashboard and deployed both services to Vercel.",
          "Prepared the three test policy versions and validated the outputs.",
        ],
      },
      {
        id: "architecture",
        title: "System architecture",
        diagram: true,
        body: [
          "Cyan stages involve the language model; orange stages are deterministic code. The model never computes a score — it only returns a structured judgement per requirement.",
        ],
      },
      {
        id: "implementation",
        title: "Technical implementation",
        bullets: [
          "PDF extraction with PyMuPDF, preserving page numbers; text is split into ~800-character paragraph chunks.",
          "Retrieval: keyword overlap between each requirement and the chunks selects the top-3 excerpts.",
          "Prompt rules: assess only from the provided excerpts, return NO_EVIDENCE when nothing supports the requirement, always cite the page.",
          "Fixed JSON schema: requirement_id, status (COMPLIANT | PARTIAL | GAP | NO_EVIDENCE), evidence quote, page, section, reason, recommendation.",
          "Resilience: a fallback chain of three Gemini models with up to three retries on 503/429 errors; unparseable responses are recorded as explicit ERROR results rather than guessed.",
          "Throughput: requirements are assessed in parallel (thread pool of five workers).",
          "Analytics (Pandas): simple assessment score, risk-weighted score (requirement weights 1–5), high-risk gap exposure and per-category breakdown.",
          "Dashboard: KPI cards, quarter-over-quarter trend, category comparison, status distribution, high-risk gaps table and a traceability drill-down per requirement.",
        ],
      },
      {
        id: "tools",
        title: "Tools and technologies",
        bullets: ["Python, FastAPI", "Google Gemini API (google-genai)", "PyMuPDF", "Pandas", "React, TypeScript, Tailwind CSS", "Vercel (frontend and serverless backend)"],
      },
      {
        id: "testing",
        title: "Testing and validation",
        body: [
          "Three synthetic versions of a fictional institution's governance pack (ABC Finance, Q1–Q3 2026) were written with progressively more complete controls, then assessed against the same 10 requirements.",
        ],
        table: {
          head: ["Sample version", "Assessment score", "Risk-weighted score"],
          rows: [
            ["ABC Finance Q1 2026", "20.0%", "18.9%"],
            ["ABC Finance Q2 2026", "70.0%", "70.3%"],
            ["ABC Finance Q3 2026", "100.0%", "100.0%"],
          ],
          caption: "Documented test results from the repository's demo data. Synthetic documents; 10 paraphrased requirements.",
        },
      },
      {
        id: "results",
        title: "Results",
        body: [
          "The pipeline produced a measurable progression that tracked the intended completeness of each sample version, with every finding linked to its source page and quotation. The dashboard's demo mode (Q1–Q3) loads and renders correctly on the live deployment.",
          "This demonstrates the end-to-end design on a small controlled test. It does not establish general accuracy: there is no labelled benchmark yet.",
        ],
      },
      {
        id: "limitations",
        title: "Limitations and future improvements",
        bullets: [
          "Requirements are paraphrased from the SAMA Key Principles, not the official text, and cover 10 items only.",
          "Keyword-overlap retrieval can miss passages phrased differently; semantic (embedding) retrieval would improve recall.",
          "LLM judgements can vary between runs; a labelled evaluation set is needed to measure precision and recall.",
          "Future work: human-in-the-loop review of findings, larger requirement coverage, and evaluation against expert-labelled documents.",
        ],
      },
    ],
  },
  {
    slug: "logistics-multi-agent",
    title: "Logistics Multi-Agent AI System",
    category: "ai",
    kind: "Team course project",
    year: "2026",
    context: "SDAIA Academy course · Team of four",
    role: "Agent architecture design (team of four)",
    tagline: "A LangGraph coordinator that screens, routes and sanitises logistics requests across specialised agents.",
    summary:
      "A prototype that handles shipment tracking, inventory checks, delay monitoring and complaint tickets through one interface. A threat-detection step screens each request, a router delegates it to a specialised agent with its own tool, and a sanitisation step masks personal information before responding.",
    stack: ["Python", "LangGraph", "LangChain", "Groq API", "Gradio", "Google Colab"],
    metrics: [
      { value: "4", label: "Specialised task agents" },
      { value: "2", label: "Guardrail stages (input + output)" },
      { value: "7", label: "Scenario test runs" },
    ],
    diagram: "agents",
    notice:
      "Collaborative team project (forked repository). Sample data in Python structures — not connected to a live logistics provider.",
    links: [{ label: "GitHub repository", href: "https://github.com/Eng-Manar-Alosaimi/Logistics-AI-System" }],
    sections: [
      {
        id: "overview",
        title: "Project overview",
        body: [
          "Logistics requests need different data and actions. Instead of asking one agent to do everything, the system uses a coordinator that delegates each request to a specialised agent, wrapped by input and output guardrails.",
        ],
      },
      {
        id: "problem",
        title: "Problem statement",
        bullets: [
          "Support staff need fast answers across shipments, stock, delays and complaints.",
          "A single general agent is harder to control, test and secure.",
          "User input can contain prompt-injection attempts; responses can leak personal data.",
        ],
      },
      {
        id: "objectives",
        title: "Objectives",
        bullets: [
          "Route each request to the right specialised agent through hierarchical delegation.",
          "Block prompt-injection attempts before routing.",
          "Mask personal information in every response.",
          "Log the route, status and latency of every run.",
        ],
      },
      {
        id: "role",
        title: "My role and contributions",
        body: [
          "Developed collaboratively by a team of four as part of an SDAIA Academy course. My responsibility was designing the agent architecture.",
        ],
        bullets: [
          "Structured the system as a coordinator with specialised agents (hierarchical delegation) instead of a single general-purpose agent.",
          "Defined each agent's responsibility and the tool it calls — tracking, inventory, delay monitoring and complaints.",
          "Placed the guardrails in the flow: threat detection before routing and PII sanitisation before every response.",
        ],
      },
      {
        id: "architecture",
        title: "Agent architecture",
        diagram: true,
        body: [
          "Select an example request to trace its route. Blocked requests end before the router; unsupported requests follow the unknown branch.",
        ],
      },
      {
        id: "implementation",
        title: "Technical implementation",
        table: {
          head: ["Component", "Responsibility", "Tool"],
          rows: [
            ["Threat Detection Agent", "Detects prompt-injection attempts and blocks them", "LLM-based input review"],
            ["Main Router (coordinator)", "Classifies the request and extracts details (e.g. shipment ID)", "LLM-based routing"],
            ["Tracking Agent", "Shipment status, location and ETA", "get_shipment()"],
            ["Inventory Agent", "Product quantity and availability", "check_inventory()"],
            ["Delay Monitor Agent", "Delayed shipments and recorded reasons", "check_delays()"],
            ["Complaints Agent", "Creates a ticket for a valid shipment and non-empty issue", "create_ticket()"],
            ["Response Sanitisation Agent", "Replaces detected personal data with [REDACTED]", "LLM-based output review"],
          ],
        },
        bullets: [
          "LangGraph state graph with conditional edges for security outcome and agent selection.",
          "Inference via Groq (openai/gpt-oss-120b, temperature 0) through LangChain.",
          "Execution wrapper logs start, selected agent, completion/error and elapsed time.",
          "Gradio interface with five example prompts.",
        ],
      },
      {
        id: "tools",
        title: "Tools and technologies",
        bullets: ["Python", "LangGraph", "LangChain / langchain-groq", "Groq API", "Gradio", "Google Colab"],
      },
      {
        id: "testing",
        title: "Testing and validation",
        body: [
          "The notebook runs seven scenario requests: shipment tracking, inventory, delay monitoring, an invalid shipment ID, an invalid complaint, an unsupported request and a prompt-injection attempt. These are example runs, not automated pass/fail assertions.",
        ],
      },
      {
        id: "results",
        title: "Results",
        body: [
          "The workflow routed supported requests to the correct agents, rejected invalid complaints through input validation, and blocked the injection prompt before it reached the router — within the scope of the sample data.",
        ],
      },
      {
        id: "limitations",
        title: "Limitations and future improvements",
        bullets: [
          "Sample data in dictionaries and lists; no live logistics API or database.",
          "Run history is printed to the notebook, not persisted.",
          "Guardrails are course-level safeguards, not production security controls.",
          "Planned: live tracking APIs, database storage, predictive delay detection, Arabic/English support, human-in-the-loop approval.",
        ],
      },
    ],
  },

  /* ───────────────────────── B. DATA ENGINEERING ───────────────────────── */
  {
    slug: "masar-lakehouse",
    title: "Masar Mini-Lakehouse",
    category: "data",
    kind: "Course project",
    year: "2026",
    context: "SDAIA Academy · SDA-DSC-214 Modern Data Engineering for AI Systems",
    role: "Author — built on the course starter repository",
    tagline: "A Bronze → Silver → Gold lakehouse serving both BI and machine learning from one set of trusted tables.",
    summary:
      "A small lakehouse for a fictional Saudi ride-hailing company. Synthetic trips, drivers and GPS pings for five cities are landed raw, cleaned and enforced with dbt and Delta constraints, checked by a data contract, and served as a pseudonymised BI table and a point-in-time training set.",
    stack: ["Apache Spark 3.5", "Delta Lake 3.2", "dbt 1.8", "Apache Kafka 3.7", "Great Expectations", "Python", "Docker"],
    metrics: [
      { value: "~44,371", label: "Trips in the silver table" },
      { value: "7 / 7", label: "Data-contract rules passing" },
      { value: "120", label: "Rows in gold demand mart (5 cities × 24 h)" },
    ],
    diagram: "lakehouse",
    notice: "Teaching lakehouse on one machine with synthetic data — not production-ready.",
    links: [{ label: "GitHub repository", href: "https://github.com/Eng-Manar-Alosaimi/masar_lakehouse" }],
    sections: [
      {
        id: "overview",
        title: "Project overview",
        body: [
          "Masar is a made-up ride-hailing company in Saudi Arabia. The project turns its raw synthetic data into trusted tables that serve both dashboards and machine learning, following the lakehouse pattern: open file formats, a transaction log for reliability, and layers of increasing quality.",
        ],
      },
      {
        id: "problem",
        title: "Problem statement",
        bullets: [
          "Raw operational data arrives in mixed formats (CSV, JSON, streams) with quality issues.",
          "Analytics and ML need the same data but with different guarantees — privacy for BI, point-in-time correctness for training.",
          "Pipelines must be repeatable and recover from failures without corrupting tables.",
        ],
      },
      {
        id: "objectives",
        title: "Objectives",
        bullets: [
          "Land raw data unchanged, then clean and enforce it in layers.",
          "Make tables reliable with constraints, MERGE, time travel and maintenance.",
          "Gate promotion to gold on a data contract.",
          "Serve a BI-safe table without raw IDs and a leakage-free training set.",
        ],
      },
      {
        id: "role",
        title: "My role and contributions",
        body: [
          "Course project built individually across three days of the SDA-DSC-214 course, starting from the course's starter repository.",
        ],
        table: {
          head: ["Day", "Topic", "What I built"],
          rows: [
            ["1", "Bronze and silver", "Landing scripts, profiling, dbt staging and silver models"],
            ["2", "Reliable tables and streaming", "Delta constraints, schema evolution, MERGE, time travel, OPTIMIZE and VACUUM, Kafka → Delta streaming"],
            ["3", "Trust and serving", "Data contract, quality gate, observability, PII retention, gold marts, one-command pipeline, training set, BI-safe table"],
          ],
        },
      },
      {
        id: "architecture",
        title: "Pipeline architecture",
        diagram: true,
        body: ["Select a layer to see what happens there and which code implements it."],
      },
      {
        id: "implementation",
        title: "Technical implementation",
        bullets: [
          "ingest/ — land CSV/JSON into bronze Delta tables and profile them.",
          "dbt staging + silver models with tests; Delta CHECK constraints enforced on silver.",
          "delta/ — schema evolution demo, MERGE upserts, time travel, small-file compaction (OPTIMIZE) and VACUUM.",
          "stream/ — Kafka GPS producer and Spark Structured Streaming ingest with windowed aggregates.",
          "quality/ — data contract, quality gate, observability metrics and PII retention (right-to-erasure).",
          "transform/ — gold demand mart and per-trip features; serve/ — point-in-time training join, leakage drill and pseudonymised BI view.",
          "pipeline.py + Makefile — one-command pipeline: silver → quality gate → gold → maintenance.",
        ],
      },
      {
        id: "tools",
        title: "Tools and technologies",
        bullets: ["Python 3.11, Java 17", "Apache Spark 3.5.1", "Delta Lake 3.2.0", "dbt 1.8 (Spark adapter)", "Apache Kafka 3.7.0 (Docker)", "Great Expectations 0.18", "GitHub Codespaces"],
      },
      {
        id: "testing",
        title: "Testing and validation",
        bullets: [
          "dbt tests on staging and silver models.",
          "Data contract on silver: 7 of 7 rules pass.",
          "Pipeline runs twice with identical counts (idempotent) and recovers after an injected failure.",
          "BI table check: no raw rider or driver IDs; the number of pseudonyms equals the number of riders.",
        ],
      },
      {
        id: "results",
        title: "Results",
        bullets: [
          "Silver: about 44,371 trips (44,364 after the Day 2 erasure of one rider).",
          "Gold demand table: 120 rows (5 cities × 24 hours); gold features: one row per trip.",
          "Two consumers served from the same trusted tables: a BI-safe table and a training set.",
        ],
      },
      {
        id: "limitations",
        title: "Limitations and future improvements",
        bullets: [
          "Single machine and synthetic data.",
          "No real catalog or access control, no scheduler or alerting.",
          "The streaming path is not yet connected to the main pipeline.",
        ],
      },
    ],
  },

  /* ───────────────────────── C. CONSULTING CASES ───────────────────────── */
  {
    slug: "fitbox-diagnostic",
    title: "FitBox — Strategic Diagnostic",
    category: "consulting",
    kind: "Accelerator case simulation",
    year: "2026",
    context: "Boost Accelerator · Retail / consumer subscription case",
    role: "Individual deliverable (prepared by me)",
    tagline: "Root-cause diagnosis of a subscription meal business losing revenue, and a phased recovery roadmap.",
    summary:
      "A fictional Riyadh meal-subscription company shows a 22% sales decline in the case data. The diagnostic separates symptoms from root causes and links the decline to outsourced-delivery misalignment and a commoditised value proposition.",
    stack: ["Hypothesis tree", "Impact × evidence prioritisation", "Value-chain mapping", "Phased roadmap"],
    metrics: [
      { value: "−22%", label: "Sales decline (case data)" },
      { value: "8", label: "Hypotheses tested" },
      { value: "3", label: "Roadmap phases (M0–M9)" },
    ],
    diagram: "fitbox",
    notice: SIMULATION_NOTICE,
    links: [],
    sections: [
      {
        id: "context",
        title: "Business context",
        body: [
          "FitBox (fictional) sells calorie-controlled meal plans in Riyadh at SAR 500–1,200 per month. About 80% of revenue is recurring subscriptions, produced in a central kitchen and delivered by 20 outsourced vans.",
        ],
      },
      {
        id: "problem",
        title: "Problem definition",
        body: ["Why has revenue declined 22%, and where should FitBox focus to restore sustainable subscriber growth — without defaulting to price cuts?"],
      },
      {
        id: "analysis",
        title: "Analysis and methodology",
        diagram: true,
        bullets: [
          "Moved from symptoms (late drops, complaints, stagnant menu metrics) to hypotheses to validated root causes.",
          "Scored eight hypotheses 1–5 on impact and evidence confidence; logistics execution and delivery-model misalignment ranked highest.",
          "Assessed the operating model, supply (3PL incentives and SLA gaps) and demand (lower-priced competitors, menu fatigue).",
        ],
      },
      {
        id: "recommendations",
        title: "Recommendations",
        bullets: [
          "Phase 1 (M0–M3) — Stabilise: real-time courier dashboard, kitchen portion standards.",
          "Phase 2 (M3–M6) — Redesign experience: cohort analytics for churn risk, personalised and rotating menus, renegotiated delivery SLAs.",
          "Phase 3 (M6–M9) — Scale and automate: demand forecasting for batch production, retention targets, expansion on SLA-backed logistics.",
        ],
      },
      {
        id: "deliverables",
        title: "Results and deliverables",
        body: ["An executive-style diagnostic deck moving from situation and methodology to root causes, priority areas and a phased roadmap with KPI targets. Targets in the deck are case-scenario goals, not measured outcomes."],
      },
      {
        id: "contribution",
        title: "My contribution",
        body: ["Prepared the full diagnostic deliverable individually as part of the accelerator programme, which was submitted and reviewed."],
      },
    ],
  },
  {
    slug: "hospital-turnaround",
    title: "Hospital Group — Operational Turnaround",
    category: "consulting",
    kind: "Accelerator case simulation",
    year: "2026",
    context: "Boost Accelerator · Healthcare operations case",
    role: "Case deliverable",
    tagline: "Testing 'the market is competitive' against three years of actuals — and finding an operating-model mismatch.",
    summary:
      "A fictional three-hospital group in Riyadh sees margins fall despite revenue growth. Splitting the consolidated numbers by hospital and separating business model from operating model shows the problem is structural cost, not the market.",
    stack: ["Business model vs. operating model (B2O)", "Hypothesis testing", "Driver-based diagnostic", "Transformation roadmap"],
    metrics: [
      { value: "16.1 → 7.1%", label: "Group operating margin (case data)" },
      { value: "~2×", label: "OpEx growth vs. revenue growth" },
      { value: "43 pt", label: "Margin spread hidden by the average" },
    ],
    diagram: "hospital",
    notice: SIMULATION_NOTICE,
    links: [],
    sections: [
      {
        id: "context",
        title: "Business context",
        body: [
          "A mid-sized group (~440 beds) with three very different sites: a legacy general flagship, a newer premium orthopaedic and spine hospital, and a community growth site in east Riyadh — all reported as one P&L.",
        ],
      },
      {
        id: "problem",
        title: "Problem definition",
        body: ["Leadership attributes falling margins to competition. Is the problem strategy, operations, or both?"],
      },
      {
        id: "analysis",
        title: "Analysis and methodology",
        diagram: true,
        bullets: [
          "Three years of revenue and OpEx: revenue +11.3%, OpEx +23.3% — costs grew about twice as fast every year.",
          "Disaggregation by hospital: 27.0% margin at the specialty site, 5.4% at the flagship, −16.5% at the growth site.",
          "Four operating-model lenses (people, process, technology, governance) applied to each hospital.",
          "Findings: legacy admin overhead at 15% of OpEx at the flagship (≈7% elsewhere); agency/locum staff at 26% of OpEx at the growth site.",
        ],
      },
      {
        id: "recommendations",
        title: "Recommendations",
        bullets: [
          "Delayer the flagship's corporate and admin structure to fit its mid-market positioning.",
          "Rebuild permanent clinical capacity at the growth site to replace high-cost agency labour.",
          "Use the specialty hospital's operating model as the internal benchmark.",
          "Sequence as quick wins → medium-term → structural, tracked by a transformation office.",
        ],
      },
      {
        id: "deliverables",
        title: "Results and deliverables",
        body: ["A one-line diagnosis, hospital-level evidence, a prioritised transformation roadmap and a pro-forma margin view for the case scenario."],
      },
      {
        id: "contribution",
        title: "My contribution",
        body: ["Completed as a structured case deliverable within the accelerator's business-transformation module."],
      },
    ],
  },
  {
    slug: "investment-committee",
    title: "Investment Committee — Healthcare Investment",
    category: "consulting",
    kind: "Accelerator case simulation",
    year: "2026",
    context: "Boost Accelerator · Healthcare investment case",
    role: "Case deliverable — synthesis of a multi-week workstream",
    tagline: "A proceed / don't-proceed recommendation on a hypothetical 150-bed hospital investment.",
    summary:
      "The capstone synthesis of several weeks of case work: market, unit economics, deal structure, financing and a five-year forecast for a hypothetical premium orthopaedic hospital investment framed as a $200M decision under a PPP structure.",
    stack: ["Financial modelling", "Scenario & sensitivity analysis", "Deal structuring", "Executive synthesis"],
    metrics: [
      { value: "3", label: "Scenarios (low / mid / high)" },
      { value: "1.91×", label: "DSCR vs 1.30× covenant (mid case)" },
      { value: "70 / 30", label: "Debt / equity structure" },
    ],
    diagram: "investment",
    notice: SIMULATION_NOTICE,
    links: [],
    sections: [
      {
        id: "context",
        title: "Business context",
        body: [
          "A hypothetical opportunity to develop a 150-bed premium orthopaedic hospital in Riyadh (mid-case CapEx SAR 675mn), evaluated by an investment committee as a $200M decision.",
        ],
      },
      {
        id: "problem",
        title: "Problem definition",
        body: ["Should the investor proceed — and if so, under which structure and with which conditions?"],
      },
      {
        id: "analysis",
        title: "Analysis and methodology",
        diagram: true,
        bullets: [
          "Per-bed economics scaled across low / mid / high cases; mid case used for underwriting.",
          "Two structures compared — Option A (build & operate) vs Option B (partner / JV): partnering cut investor CapEx by roughly 60% (SAR 675mn → 270mn) and transferred construction, clinical and operating risk.",
          "Financing tested at 70/30 debt-equity under a hybrid-revenue PPP.",
          "Five-year forecast with drivers traced to quantified levers, stressed across 3 scenarios and 5 sensitivities.",
        ],
      },
      {
        id: "recommendations",
        title: "Recommendations",
        bullets: [
          "Proceed with conditions via a partner / JV structure.",
          "Key risk: historical actuals show margin compressing as OpEx outgrew revenue — validate cost-flex controls before scaling growth capital.",
        ],
      },
      {
        id: "deliverables",
        title: "Results and deliverables",
        body: ["An investment-committee decision deck: executive summary, decision question, economics, structure, financing, risks and conditions — all within the case scenario."],
      },
      {
        id: "contribution",
        title: "My contribution",
        body: ["Completed the synthesis deck as part of the accelerator's project-structuring module."],
      },
    ],
  },
  {
    slug: "pepsi-financial-model",
    title: "Beverage Distribution — Financial Model",
    category: "consulting",
    kind: "Accelerator case simulation",
    year: "2026",
    context: "Boost Accelerator · FMCG distribution case (Riyadh)",
    role: "Model builder",
    tagline: "An input-driven distribution model with P&L, cash flow, break-even and sensitivity analysis.",
    summary:
      "A five-year financial model for a hypothetical soft-drink distribution operation in Riyadh (the case brief references Pepsi Cola distribution). Editable assumptions flow through a monthly P&L, annual cash flows, NPV/IRR, break-even and a price × volume sensitivity grid.",
    stack: ["Excel modelling", "P&L & cash flow", "NPV / IRR", "Break-even", "Sensitivity analysis"],
    metrics: [
      { value: "25.9%", label: "Base-case gross margin" },
      { value: "~1.32M", label: "Break-even cans / month" },
      { value: "+32%", label: "Break-even vs planned volume" },
    ],
    diagram: "pepsi",
    notice: SIMULATION_NOTICE,
    links: [],
    sections: [
      {
        id: "context",
        title: "Business context",
        body: ["A distributor buys cans at SAR 1.00 and sells to retailers at SAR 1.50, planning 1,000,000 cans per month with warehouse, sales, marketing and logistics costs."],
      },
      {
        id: "problem",
        title: "Problem definition",
        body: ["Is the planned operation viable, and how sensitive is it to price and volume?"],
      },
      {
        id: "analysis",
        title: "Analysis and methodology",
        diagram: true,
        bullets: [
          "Assumption sheet with editable inputs; all other cells are formulas.",
          "Monthly steady-state P&L → depreciation, EBIT, tax, net profit.",
          "Five-year cash flows with working-capital recovery, NPV at 10%, IRR and payback.",
          "Break-even volume (cash costs only, and including depreciation) and a price × volume EBITDA sensitivity table.",
        ],
      },
      {
        id: "recommendations",
        title: "Recommendations",
        bullets: [
          "At planned volume the operation does not cover its fixed costs: break-even is ~1.32M cans/month, about 32% above plan.",
          "Viability depends on raising volume or price, or reducing fixed operating costs — the sensitivity grid shows which combinations close the gap.",
        ],
      },
      {
        id: "deliverables",
        title: "Results and deliverables",
        body: ["A working, input-driven financial model and a summary of assumptions, outputs and break-even findings."],
      },
      {
        id: "contribution",
        title: "My contribution",
        body: ["Built the model and its summary as part of the accelerator's financial-modelling module."],
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectsBy = (c: ProjectCategory) => projects.filter((p) => p.category === c);
