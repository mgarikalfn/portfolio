"use client";

import { skillGroups } from "@/data/skills";
import FadeIn from "@/components/ui/FadeIn";

export default function Skills() {
  return (
    <section
      id="skills"
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
          Skills
        </h2>
      </FadeIn>

      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {skillGroups.map((group, i) => (
          <FadeIn key={group.category} delay={i * 0.06}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                gap: "1.5rem",
                alignItems: "start",
                padding: "1.5rem 0",
                borderBottom: "1px solid var(--color-border)",
              }}
              className="skill-row"
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  color: "var(--color-muted)",
                  letterSpacing: "0.04em",
                  paddingTop: "3px",
                }}
              >
                {group.category}
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {group.skills.map((skill) => (
                  <SkillTag key={skill} label={skill} />
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <style>{`
        @media (max-width: 520px) {
          .skill-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function SkillTag({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.88rem",
        color: "var(--color-muted)",
        border: "1px solid var(--color-border)",
        padding: "3px 10px",
        borderRadius: "1px",
        transition: "color 0.15s, border-color 0.15s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLSpanElement).style.color = "var(--color-accent)";
        (e.currentTarget as HTMLSpanElement).style.borderColor = "rgba(45,212,191,0.35)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLSpanElement).style.color = "var(--color-muted)";
        (e.currentTarget as HTMLSpanElement).style.borderColor = "var(--color-border)";
      }}
    >
      {label}
    </span>
  );
}
