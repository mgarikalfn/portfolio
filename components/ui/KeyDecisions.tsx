"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  decisions: string[];
};

export default function KeyDecisions({ decisions }: Props) {
  const [open, setOpen] = useState(false);

  if (!decisions.length) return null;

  return (
    <div
      style={{
        borderTop: "1px solid var(--color-border)",
        paddingTop: "1rem",
        marginTop: "0.5rem",
      }}
    >
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--color-accent)",
          letterSpacing: "0.05em",
          padding: 0,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          transition: "opacity 0.15s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.75")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
        aria-expanded={open}
      >
        <span
          style={{
            display: "inline-block",
            transition: "transform 0.2s",
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            fontSize: "0.6rem",
            lineHeight: 1,
          }}
        >
          ▶
        </span>
        [ Key Decisions ]
      </button>

      {/* Animated content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="decisions"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: "hidden" }}
          >
            <ul
              style={{
                margin: "1rem 0 0",
                padding: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
              }}
            >
              {decisions.map((decision, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.78rem",
                    color: "var(--color-text)",
                    lineHeight: 1.7,
                    paddingLeft: "1.25rem",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "0.1em",
                      color: "var(--color-accent)",
                      fontSize: "0.7rem",
                    }}
                  >
                    —
                  </span>
                  {decision}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
