"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TypingEffect from "@/components/ui/TypingEffect";
import StatCounter from "@/components/ui/StatCounter";
import { RESUME_URL } from "@/data/resume";

const POSITIONING_LINE =
  "I build multi-tenant SaaS platforms, enterprise systems, and authentication microservices across .NET, Node.js, and Python.";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 48px 80px 0",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "5rem",
          alignItems: "start",
          width: "100%",
          maxWidth: "960px",
        }}
        className="hero-grid"
      >
        {/* ── Left: text ── */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              color: "var(--color-muted)",
              letterSpacing: "0.08em",
              marginBottom: "1.25rem",
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.4s",
            }}
          >
            Addis Ababa, Ethiopia · girumkenenisa@gmail.com
          </p>

          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              fontWeight: 700,
              lineHeight: 1.12,
              color: "var(--color-text)",
              margin: "0 0 1.1rem",
              letterSpacing: "-0.01em",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s 0.1s, transform 0.5s 0.1s",
            }}
          >
            Girum Kenenisa
            <br />
            Desissa
          </h1>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              color: "var(--color-muted)",
              letterSpacing: "0.03em",
              marginBottom: "1.5rem",
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.5s 0.18s",
            }}
          >
            Full Stack Software Developer
          </p>

          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              color: "var(--color-text)",
              lineHeight: 1.75,
              maxWidth: "560px",
              marginBottom: "2.5rem",
              minHeight: "3.5rem",
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.3s 0.3s",
            }}
          >
            {mounted && <TypingEffect text={POSITIONING_LINE} speed={22} />}
          </div>

          <div
            style={{
              display: "flex",
              gap: "1.25rem",
              flexWrap: "wrap",
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.5s 0.35s",
            }}
          >
            <CtaLink
              href="#projects"
              label="[ View Work ]"
              primary
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
            />
            <CtaLink
              href="#contact"
              label="[ Contact ]"
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
            />
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.92rem",
                letterSpacing: "0.05em",
                textDecoration: "none",
                color: "var(--color-muted)",
                border: "1px solid var(--color-border)",
                padding: "10px 22px",
                borderRadius: "1px",
                display: "inline-block",
                transition: "background 0.15s, color 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "var(--color-text)";
                el.style.borderColor = "rgba(255,255,255,0.2)";
                el.style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "var(--color-muted)";
                el.style.borderColor = "var(--color-border)";
                el.style.background = "transparent";
              }}
            >
              [ Resume ]
            </a>
          </div>

          <StatCounter />
        </div>

        {/* ── Right: profile photo ── */}
        <div
          style={{
            width: 192,
            height: 192,
            border: "1px solid var(--color-border)",
            borderRadius: "2px",
            background: "var(--color-surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.5s 0.2s",
          }}
          className="profile-box"
        >
          <ProfilePhoto />
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .profile-box { display: none !important; }
        }
        @media (max-width: 1023px) {
          #hero { padding-left: 0 !important; }
        }
      `}</style>
    </section>
  );
}

function CtaLink({
  href, label, primary = false, onClick,
}: {
  href: string; label: string; primary?: boolean; onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={(e) => { if (onClick) { e.preventDefault(); onClick(); } }}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.92rem",
        letterSpacing: "0.05em",
        textDecoration: "none",
        color: primary ? "var(--color-accent)" : "var(--color-muted)",
        border: `1px solid ${primary ? "var(--color-accent)" : "var(--color-border)"}`,
        padding: "10px 22px",
        borderRadius: "1px",
        display: "inline-block",
        transition: "background 0.15s, color 0.15s, border-color 0.15s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.background = primary ? "var(--color-accent-dim)" : "rgba(255,255,255,0.04)";
        if (!primary) { el.style.color = "var(--color-text)"; el.style.borderColor = "rgba(255,255,255,0.2)"; }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.background = "transparent";
        if (!primary) { el.style.color = "var(--color-muted)"; el.style.borderColor = "var(--color-border)"; }
      }}
    >
      {label}
    </a>
  );
}

function ProfilePhoto() {
  const [hasImage, setHasImage] = useState(true);
  if (!hasImage) {
    return (
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.5rem", color: "var(--color-muted)", letterSpacing: "0.05em" }}>
        GKD
      </span>
    );
  }
  return (
    <Image
      src="/profile.jpg"
      alt="Girum Kenenisa Desissa"
      fill
      style={{ objectFit: "cover" }}
      onError={() => setHasImage(false)}
      priority
    />
  );
}
