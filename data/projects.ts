export type ProjectImage = {
  src?: string;
  alt: string;
};

export type Project = {
  id: string;
  name: string;
  whatItSolves: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl: string;
  images: ProjectImage[];
  keyDecisions: string[];
  /** If true, renders AuthSequence diagram instead of image carousel */
  isSequenceDiagram?: boolean;
};

export const projects: Project[] = [
  {
    id: "afaan-lisan",
    name: "Afaan Lisan",
    whatItSolves:
      "A gamified Duolingo-style platform for learning Afaan Oromo — filling a gap where almost no digital learning resource exists for the language.",
    description:
      "SM-2 spaced repetition, AI-generated pronunciation audio, listening / reading / writing / speaking tests, quizzes, leaderboards, streaks, peer chat, and certification.",
    tech: ["TypeScript", "React", "Node.js", "Express.js", "PostgreSQL"],
    liveUrl: "https://bllp-frontend.vercel.app/",
    githubUrl: "https://github.com/mgarikalfn/BLLP-frontend",
    images: [
      { src:"/projects/affan-screen-1.png",alt: "Afaan Lisan — dashboard overview" },
      { src:"/projects/afaan-screen-2.png",alt: "Afaan Lisan — lesson interface with spaced repetition" },
      { src:"/projects/afaan-screen-3.png", alt: "Afaan Lisan — leaderboard and streak tracking" },
    ],
    keyDecisions: [
      "Chose SM-2 spaced repetition over a simple review queue because it minimises total review time for the learner — the algorithm schedules harder cards more frequently, so retention improves without increasing daily practice time.",
      "Generated pronunciation audio via AI (text-to-speech) rather than recording a human voice corpus, which would have been prohibitively expensive. This let us cover the full vocabulary at launch and iterate on quality over time.",
      "Modelled the peer-chat feature as a separate service sharing the same PostgreSQL instance rather than a third-party chat SDK — keeping PII within our own infrastructure and avoiding vendor lock-in at this stage.",
    ],
  },
  {
    id: "project-tracker",
    name: "ProjectTracker",
    whatItSolves:
      "Centralised visibility into project health across external PM tools — giving leadership a single source of truth instead of juggling Jira dashboards and manual reports.",
    description:
      "Clean Architecture + DDD backend with CQRS and MediatR. Jira API integration via background sync services. A risk-scoring engine that scores each project on completion rate, burn rate, blockers, and recent activity.",
    tech: ["C#", "ASP.NET Core", "Entity Framework Core", "SQL Server", "MediatR", "CQRS", "Jira API"],
    githubUrl: "https://github.com/mgarikalfn/projectTrackerSystem",
    images: [
     
      {  src:"/projects/pg-1.png",alt: "ProjectTracker — project health dashboard" },
      {  src:"/projects/pg-2.png",alt: "ProjectTracker — risk scoring breakdown" },
    ],
    keyDecisions: [
      "Applied CQRS with MediatR to cleanly separate the read path (reporting queries that aggregate across projects) from the write path (sync jobs mutating state). This made it trivial to optimise each side independently — the read path uses compiled EF Core queries, the write path uses explicit transactions.",
      "Background sync jobs poll Jira on a configurable interval rather than using webhooks, because the deployment environment (an on-premise server at Ethiopian Airlines) cannot receive inbound HTTP from Jira's cloud. Pull-based sync was the only viable architecture.",
      "Designed the risk-scoring engine as a pure domain function — no I/O, deterministic output from a ProjectSnapshot value object — so it can be unit-tested in complete isolation and the formula can be adjusted without touching persistence code.",
    ],
  },
  {
    id: "auth-service",
    name: "Auth Service",
    whatItSolves:
      "Centralised identity for a multi-tenant SaaS ecosystem. There is no traditional UI — the interface IS the API design.",
    description:
      "JWT auth with organisation-scoped access tokens, refresh-token rotation with reuse detection, rate limiting, Docker containerisation, GitHub Actions CI/CD, deployed to a GCP VM.",
    tech: ["Python", "FastAPI", "SQLModel", "PostgreSQL", "JWT", "Docker", "GitHub Actions", "Pytest"],
    githubUrl: "https://github.com/mgarikalfn/auth-service",
    images: [],
    isSequenceDiagram: true,
    keyDecisions: [
      "Scoped access tokens to the organisation (tenant) at issuance rather than filtering at the resource layer — this means the token itself is the authority boundary, so any downstream service can validate access without a database round-trip.",
      "Implemented refresh-token rotation with reuse detection: each refresh token is single-use and its replacement is stored alongside a reference to the original. If the same token is presented twice, the entire token family is revoked immediately — this is the OWASP-recommended defence against token theft.",
      "Containerised from day one and drove the deployment through GitHub Actions (lint → test → build image → push to GCR → deploy to GCP VM) so that every push to main is automatically validated and a broken build can never reach production.",
    ],
  },
  {
    id: "kinetix",
    name: "Kinetix",
    whatItSolves:
      "Modern, fast project tracking with a Linear-inspired UI — Kanban boards, data tables, calendars, and telemetry logs in one workspace.",
    description:
      "OAuth-based authentication via Appwrite, real-time Kanban board, filterable data tables, calendar view for deadlines, and an activity telemetry log.",
    tech: ["Next.js 16", "React", "Appwrite", "OAuth"],
    liveUrl: "https://project-managment-ujod.vercel.app/",
    githubUrl: "https://github.com/mgarikalfn/Kinetix",
    images: [
      { src:"/projects/project-screen-1.png",alt: "Kinetix — Kanban board view" },
      {src:"/projects/project-screen-2.png",alt: "Kinetix — data table with filters" },
     
    ],
    keyDecisions: [
      "Used Appwrite as the BaaS layer specifically because it is self-hostable — the client can migrate off the managed cloud to their own infrastructure without changing a line of application code, which was a hard requirement from the brief.",
      "Chose Next.js App Router over a pure SPA because the project list and board metadata are frequently shared links — having server-rendered HTML means those links are previewable in Slack/email without a JavaScript round-trip.",
      "Modelled board state as a flat array of tasks with an explicit `columnId` rather than nested column objects, which makes drag-and-drop reordering a single array mutation and keeps the Appwrite document schema flat and easy to query.",
    ],
  },
];
