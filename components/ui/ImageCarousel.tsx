"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import type { ProjectImage } from "@/data/projects";

type Props = {
  images: ProjectImage[];
  projectName: string;
};

function Placeholder() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-bg)",
      }}
    >
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }}
        aria-hidden="true"
      >
        <defs>
          <pattern id="xhatch" width="20" height="20" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="20" y2="20" stroke="#e8e6e1" strokeWidth="0.5" />
            <line x1="20" y1="0" x2="0" y2="20" stroke="#e8e6e1" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#xhatch)" />
      </svg>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          color: "var(--color-muted)",
          letterSpacing: "0.08em",
          position: "relative",
          zIndex: 1,
        }}
      >
        // screenshot placeholder
      </span>
    </div>
  );
}

export default function ImageCarousel({ images, projectName }: Props) {
  const [current, setCurrent] = useState(0);
  const touchStart = useRef<number | null>(null);

  const count = images.length;
  const prev = () => setCurrent((c) => (c - 1 + count) % count);
  const next = () => setCurrent((c) => (c + 1) % count);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 40) {
      delta < 0 ? next() : prev();
    }
    touchStart.current = null;
  };

  if (count === 0) return null;

  const img = images[current];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {/* Browser chrome frame */}
      <div
        style={{
          border: "1px solid var(--color-border)",
          borderRadius: "2px",
          overflow: "hidden",
          background: "var(--color-surface)",
        }}
      >
        {/* Chrome bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 12px",
            borderBottom: "1px solid var(--color-border)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: "50%", border: "1px solid var(--color-border)", display: "inline-block" }} />
          <span style={{ width: 7, height: 7, borderRadius: "50%", border: "1px solid var(--color-border)", display: "inline-block" }} />
          <span style={{ width: 7, height: 7, borderRadius: "50%", border: "1px solid rgba(45,212,191,0.25)", background: "rgba(45,212,191,0.07)", display: "inline-block" }} />
          <div style={{ marginLeft: 8, flex: 1, height: 14, borderRadius: "1px", border: "1px solid var(--color-border)", background: "rgba(255,255,255,0.03)" }} />
        </div>

        {/* Image area */}
        <div
          style={{ position: "relative", width: "100%", overflow: "hidden", background: "var(--color-bg)" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {img.src ? (
            <Image
              src={img.src}
              alt={img.alt}
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, 55vw"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                transition: "opacity 0.25s",
              }}
            />
          ) : (
            <div style={{ aspectRatio: "16/9", position: "relative" }}>
              <Placeholder />
            </div>
          )}
        </div>
      </div>

      {/* Controls row */}
      {count > 1 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Pagination dots */}
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to image ${i + 1} of ${count} for ${projectName}`}
                style={{
                  width: i === current ? 16 : 6,
                  height: 6,
                  borderRadius: "1px",
                  background: i === current ? "var(--color-accent)" : "var(--color-border)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "width 0.2s, background 0.2s",
                }}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div style={{ display: "flex", gap: "6px" }}>
            <button
              onClick={prev}
              aria-label={`Previous image for ${projectName}`}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--color-muted)",
                background: "none",
                border: "1px solid var(--color-border)",
                padding: "3px 10px",
                borderRadius: "1px",
                cursor: "pointer",
                transition: "color 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--color-accent)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(45,212,191,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--color-muted)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border)";
              }}
            >
              &#8249;
            </button>
            <button
              onClick={next}
              aria-label={`Next image for ${projectName}`}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--color-muted)",
                background: "none",
                border: "1px solid var(--color-border)",
                padding: "3px 10px",
                borderRadius: "1px",
                cursor: "pointer",
                transition: "color 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--color-accent)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(45,212,191,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--color-muted)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border)";
              }}
            >
              &#8250;
            </button>
          </div>
        </div>
      )}

      {/* Alt text label */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          color: "var(--color-muted)",
          margin: 0,
          opacity: 0.6,
        }}
      >
        {img.alt}
      </p>
    </div>
  );
}
