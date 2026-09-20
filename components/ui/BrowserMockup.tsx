"use client";

import Image from "next/image";

type Props = {
  alt: string;
  src?: string;
};

export default function BrowserMockup({ alt, src }: Props) {
  return (
    <div
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "2px",
        overflow: "hidden",
        background: "var(--color-surface)",
      }}
    >
      {/* Browser chrome bar */}
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
        {/* Traffic-light dots — in site palette, not macOS colors */}
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            border: "1px solid var(--color-border)",
            display: "inline-block",
          }}
        />
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            border: "1px solid var(--color-border)",
            display: "inline-block",
          }}
        />
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            border: "1px solid rgba(232,168,87,0.3)",
            background: "rgba(232,168,87,0.08)",
            display: "inline-block",
          }}
        />
        {/* Fake address bar */}
        <div
          style={{
            marginLeft: 8,
            flex: 1,
            height: 16,
            borderRadius: "1px",
            border: "1px solid var(--color-border)",
            background: "rgba(255,255,255,0.03)",
          }}
        />
      </div>

      {/* Content area */}
      <div
        style={{
          position: "relative",
          aspectRatio: "16/9",
          width: "100%",
          background: "var(--color-bg)",
        }}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          /* Placeholder: crosshatch + label */
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {/* Subtle crosshatch lines */}
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                opacity: 0.04,
              }}
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="crosshatch"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="20"
                    y2="20"
                    stroke="#e8e6e1"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="20"
                    y1="0"
                    x2="0"
                    y2="20"
                    stroke="#e8e6e1"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#crosshatch)" />
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
        )}
      </div>
    </div>
  );
}
