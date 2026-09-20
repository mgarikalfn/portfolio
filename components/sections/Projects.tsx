"use client";

import { projects } from "@/data/projects";
import ProjectSection from "@/components/sections/ProjectSection";
import FadeIn from "@/components/ui/FadeIn";

export default function Projects() {
  return (
    <section
      id="projects"
      style={{
        padding: "100px 48px 100px 0",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <FadeIn>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.82rem",
            color: "var(--color-accent)",
            letterSpacing: "0.08em",
            marginBottom: "0.5rem",
            opacity: 0.7,
          }}
        >
          // selected work
        </p>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 3vw, 2.8rem)",
            fontWeight: 700,
            color: "var(--color-text)",
            margin: "0 0 0.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          Projects
        </h2>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "1rem",
            color: "var(--color-muted)",
            marginBottom: "3rem",
            maxWidth: "560px",
            lineHeight: 1.75,
          }}
        >
          Each project below is a case study — expand{" "}
          <span style={{ color: "var(--color-accent)" }}>[ Key Decisions ]</span> to read
          the engineering reasoning behind the choices that mattered.
        </p>
      </FadeIn>

      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {projects.map((project, i) => (
          <FadeIn key={project.id} delay={i * 0.06}>
            <ProjectSection project={project} index={i} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
