export type SkillGroup = {
  category: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript", "C#", "Python", "Java", "SQL", "HTML", "CSS"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "TanStack Query"],
  },
  {
    category: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "ASP.NET Core",
      "FastAPI",
      "JWT",
      "RBAC",
      "Microservices",
      "Event-Driven Architecture",
    ],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "SQL Server", "Prisma", "Entity Framework Core", "SQLModel"],
  },
  {
    category: "Architecture",
    skills: [
      "Clean Architecture",
      "DDD",
      "CQRS",
      "Repository Pattern",
      "Multi-Tenant SaaS",
    ],
  },
  {
    category: "Tools & DevOps",
    skills: [
      "Git",
      "GitHub Actions (CI/CD)",
      "Docker",
      "Google Cloud Platform (GCP)",
      "Swagger/OpenAPI",
      "Postman",
      "Pytest",
    ],
  },
];
