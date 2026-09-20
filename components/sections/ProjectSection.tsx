"use client";

import ImageCarousel from "@/components/ui/ImageCarousel";
import KeyDecisions from "@/components/ui/KeyDecisions";
import AuthSequence from "@/components/ui/AuthSequence";
import FadeIn from "@/components/ui/FadeIn";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  index: number;
};

export default function ProjectSection({ project, index }: Props) {
  return (
    <article
      className="project-section-hover"
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "2px",
        background: "var(--color-surface)",
        marginBottom: "2rem",
        overflow: "hidden",
      }}
    >
      {/* Header bar: number + name */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "1rem",
          padding: "20px 28px 0",
          borderBottom: "1px solid var(--color-border)",
          paddingBottom: "16px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            color: "var(--color-accent)",
            opacity: 0.7,
            letterSpacing: "0.1em",
            flexShrink: 0,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
            fontWeight: 700,
            color: "var(--color-text)",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          {project.name}
        </h3>
      </div>

      {/* Body: two columns on desktop, stacked on mobile */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}
        className="project-body"
      >
        {/* Left: text content */}
        <div
          style={{
            padding: "24px 28px",
            borderRight: "1px solid var(--color-border)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
          className="project-left"
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--color-accent)",
                letterSpacing: "0.1em",
                margin: "0 0 6px",
                opacity: 0.7,
              }}
            >
              // what this solves
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.82rem",
                color: "var(--color-text)",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {project.whatItSolves}
            </p>
          </div>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              color: "var(--color-muted)",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {project.description}
          </p>

          {/* Tech tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {project.tech.map((t) => (
              <TechTag key={t} label={t} />
            ))}
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", marginTop: "auto", paddingTop: "0.5rem" }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bracket-link"
                aria-label={`Live demo of ${project.name}`}
              >
                [ Live Demo ]
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bracket-link"
              style={{ color: "var(--color-muted)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--color-text)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--color-muted)")}
              aria-label={`GitHub repository for ${project.name}`}
            >
              [ GitHub ]
            </a>
          </div>

          <KeyDecisions decisions={project.keyDecisions} />
        </div>

        {/* Right: carousel or sequence diagram */}
        <div
          style={{
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
          className="project-right"
        >
          {project.isSequenceDiagram ? (
            <div>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--color-accent)",
                  letterSpacing: "0.1em",
                  margin: "0 0 12px",
                  opacity: 0.7,
                }}
              >
                // auth flow — animated sequence diagram
              </p>
              <AuthSequence />
            </div>
          ) : (
            <ImageCarousel images={project.images} projectName={project.name} />
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .project-body { grid-template-columns: 1fr !important; }
          .project-left { border-right: none !important; border-bottom: 1px solid var(--color-border); }
        }
      `}</style>
    </article>
  );
}

function TechTag({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.68rem",
        color: "var(--color-muted)",
        border: "1px solid var(--color-border)",
        padding: "2px 8px",
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
