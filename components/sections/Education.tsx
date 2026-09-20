"use client";

import FadeIn from "@/components/ui/FadeIn";

export default function Education() {
  return (
    <section
      id="education"
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
          Education
        </h2>
      </FadeIn>

      <FadeIn delay={0.07}>
        <div
          style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "2rem", alignItems: "start" }}
          className="edu-row"
        >
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--color-accent)", margin: "0 0 4px", letterSpacing: "0.04em", opacity: 0.85 }}>
              2022 – 2026
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--color-muted)", margin: 0 }}>
              Haramaya, Ethiopia
            </p>
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", fontWeight: 600, color: "var(--color-text)", margin: "0 0 4px", letterSpacing: "-0.01em" }}>
              BSc Software Engineering
            </h3>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--color-muted)", margin: "0 0 14px" }}>
              Haramaya University
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                border: "1px solid var(--color-border)",
                padding: "5px 12px",
                borderRadius: "1px",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-muted)", letterSpacing: "0.06em" }}>CGPA</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", fontWeight: 700, color: "var(--color-accent)", letterSpacing: "0.04em" }}>3.77 / 4.00</span>
            </div>
          </div>
        </div>
      </FadeIn>

      <style>{`
        @media (max-width: 560px) {
          .edu-row { grid-template-columns: 1fr !important; gap: 0.75rem !important; }
        }
      `}</style>
    </section>
  );
}
