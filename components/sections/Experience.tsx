"use client";

import FadeIn from "@/components/ui/FadeIn";

const experiences = [
  {
    role: "Software Engineering Intern",
    company: "Ethiopian Airlines",
    department: "Application Design and Delivery",
    period: "Mar 2025 – Jun 2025",
    location: "Addis Ababa, Ethiopia",
    bullets: [
      "Built a centralised project tracking and reporting system in C# / ASP.NET Core.",
      "Integrated Jira and Azure DevOps data via background sync jobs into a unified relational database.",
      "Fed structured project-management reports consumed by department leadership.",
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        padding: "100px 48px 100px 0",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <FadeIn>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
            fontWeight: 700,
            color: "var(--color-text)",
            margin: "0 0 3rem",
            letterSpacing: "-0.02em",
          }}
        >
          Experience
        </h2>
      </FadeIn>

      {experiences.map((exp, i) => (
        <FadeIn key={i} delay={0.07}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "160px 1fr",
              gap: "2rem",
              alignItems: "start",
            }}
            className="exp-row"
          >
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--color-accent)", margin: "0 0 4px", letterSpacing: "0.04em", opacity: 0.85 }}>
                {exp.period}
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--color-muted)", margin: 0 }}>
                {exp.location}
              </p>
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", fontWeight: 600, color: "var(--color-text)", margin: "0 0 3px", letterSpacing: "-0.01em" }}>
                {exp.role}
              </h3>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--color-muted)", margin: "0 0 14px" }}>
                {exp.company}
                <span style={{ opacity: 0.4, margin: "0 6px" }}>·</span>
                {exp.department}
              </p>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "7px" }}>
                {exp.bullets.map((b, j) => (
                  <li
                    key={j}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.78rem",
                      color: "var(--color-text)",
                      lineHeight: 1.65,
                      paddingLeft: "1.1rem",
                      position: "relative",
                    }}
                  >
                    <span style={{ position: "absolute", left: 0, color: "var(--color-accent)", opacity: 0.7, fontSize: "0.7rem" }}>—</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>
      ))}

      <style>{`
        @media (max-width: 560px) {
          .exp-row { grid-template-columns: 1fr !important; gap: 0.75rem !important; }
        }
      `}</style>
    </section>
  );
}
