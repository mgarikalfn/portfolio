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
            fontSize: "clamp(2rem, 3vw, 2.8rem)",
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
          style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "2.5rem", alignItems: "start" }}
          className="edu-row"
        >
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.88rem", color: "var(--color-accent)", margin: "0 0 5px", letterSpacing: "0.03em", opacity: 0.85 }}>
              2022 – 2026
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: "var(--color-muted)", margin: 0 }}>
              Haramaya, Ethiopia
            </p>
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 600, color: "var(--color-text)", margin: "0 0 6px", letterSpacing: "-0.01em" }}>
              BSc Software Engineering
            </h3>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--color-muted)", margin: "0 0 18px" }}>
              Haramaya University
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                border: "1px solid var(--color-border)",
                padding: "7px 16px",
                borderRadius: "1px",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: "var(--color-muted)", letterSpacing: "0.06em" }}>CGPA</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.05rem", fontWeight: 700, color: "var(--color-accent)", letterSpacing: "0.04em" }}>3.77 / 4.00</span>
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
