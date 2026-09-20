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
            fontSize: "clamp(2rem, 3vw, 2.8rem)",
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
              gridTemplateColumns: "180px 1fr",
              gap: "2.5rem",
              alignItems: "start",
            }}
            className="exp-row"
          >
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.88rem", color: "var(--color-accent)", margin: "0 0 5px", letterSpacing: "0.03em", opacity: 0.85 }}>
                {exp.period}
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: "var(--color-muted)", margin: 0 }}>
                {exp.location}
              </p>
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 600, color: "var(--color-text)", margin: "0 0 5px", letterSpacing: "-0.01em" }}>
                {exp.role}
              </h3>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--color-muted)", margin: "0 0 18px" }}>
                {exp.company}
                <span style={{ opacity: 0.4, margin: "0 8px" }}>·</span>
                {exp.department}
              </p>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                {exp.bullets.map((b, j) => (
                  <li
                    key={j}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.95rem",
                      color: "var(--color-text)",
                      lineHeight: 1.75,
                      paddingLeft: "1.25rem",
                      position: "relative",
                    }}
                  >
                    <span style={{ position: "absolute", left: 0, color: "var(--color-accent)", opacity: 0.7 }}>—</span>
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
