"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* ─── Layout constants ─── */
const W = 680;
const H = 460;
const ACTOR_Y = 30;
const ACTOR_H = 36;
const ACTOR_W = 130;
const LINE_Y_START = ACTOR_Y + ACTOR_H;
const LINE_Y_END = H - 20;

const ACTORS = [
  { id: "client",   label: "Client",            x: 30 },
  { id: "server",   label: "Auth Server",        x: 270 },
  { id: "resource", label: "Protected Resource", x: 510 },
] as const;

const CYAN  = "#2DD4BF";
const AMBER = "#F59E0B";
const MUTED = "rgba(232,230,225,0.35)";
const SURFACE = "#141416";
const BORDER  = "rgba(255,255,255,0.08)";
const TEXT    = "#e8e6e1";

type Arrow = {
  from: number;
  to: number;
  y: number;
  label: string;
  sublabel?: string;
  color?: string;
  dashed?: boolean;
};

const stepY = (i: number) => LINE_Y_START + 28 + i * 52;

const ARROWS: Arrow[] = [
  { from: 0, to: 1, y: stepY(0), label: "POST /auth/login",        sublabel: "{ email, password }",              color: CYAN  },
  { from: 1, to: 0, y: stepY(1), label: "200 OK",                  sublabel: "access_token + refresh_token",     color: CYAN,  dashed: true },
  { from: 0, to: 2, y: stepY(2), label: "GET /api/resource",       sublabel: "Authorization: Bearer <access>",   color: CYAN  },
  { from: 1, to: 0, y: stepY(3), label: "200 OK — resource data",                                                color: CYAN,  dashed: true },
  { from: 0, to: 1, y: stepY(4), label: "POST /auth/refresh",      sublabel: "{ refresh_token } (access expired)", color: MUTED },
  { from: 1, to: 0, y: stepY(5), label: "200 OK — new token pair", sublabel: "old refresh invalidated",          color: CYAN,  dashed: true },
  { from: 0, to: 1, y: stepY(6), label: "POST /auth/refresh",      sublabel: "REUSED token detected",            color: AMBER },
  { from: 1, to: 0, y: stepY(7), label: "401 — session revoked",   sublabel: "entire token family invalidated",  color: AMBER, dashed: true },
];

const CX = ACTORS.map((a) => a.x + ACTOR_W / 2);

/* ─── Mobile step list items ─── */
const MOBILE_STEPS = [
  { label: "Client → POST /auth/login",                 detail: "email + password",                        color: CYAN  },
  { label: "Auth Server → 200 OK",                      detail: "access_token + refresh_token issued",     color: CYAN  },
  { label: "Client → GET /protected resource",          detail: "Authorization: Bearer <access>",          color: CYAN  },
  { label: "Auth Server → 200 OK",                      detail: "resource data returned",                  color: CYAN  },
  { label: "Client → POST /auth/refresh",               detail: "access_token expired; sends refresh",     color: MUTED },
  { label: "Auth Server → 200 OK",                      detail: "new token pair issued; old invalidated",  color: CYAN  },
  { label: "⚠ Client → POST /auth/refresh",             detail: "reused/stolen refresh token detected",    color: AMBER },
  { label: "⚠ Auth Server → 401 Unauthorized",          detail: "entire token family revoked",             color: AMBER },
];

/* ─── Arrow component for SVG diagram ─── */
function ArrowLine({ arrow, visible }: { arrow: Arrow; visible: boolean }) {
  const x1 = CX[arrow.from];
  const x2 = CX[arrow.to];
  const isLeft = x2 < x1;
  const color = arrow.color ?? CYAN;

  return (
    <AnimatePresence>
      {visible && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
          <motion.line
            x1={x1} y1={arrow.y} x2={x2} y2={arrow.y}
            stroke={color} strokeWidth={1.5}
            strokeDasharray={arrow.dashed ? "5 4" : undefined}
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }}
          />
          <polygon
            points={
              isLeft
                ? `${x2},${arrow.y} ${x2+8},${arrow.y-4} ${x2+8},${arrow.y+4}`
                : `${x2},${arrow.y} ${x2-8},${arrow.y-4} ${x2-8},${arrow.y+4}`
            }
            fill={color}
          />
          <motion.text x={(x1+x2)/2} y={arrow.y-7} textAnchor="middle" fill={color}
            fontSize={10} fontFamily="'JetBrains Mono', monospace"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, delay: 0.2 }}>
            {arrow.label}
          </motion.text>
          {arrow.sublabel && (
            <motion.text x={(x1+x2)/2} y={arrow.y+16} textAnchor="middle"
              fill="#6b6966" fontSize={8.5} fontFamily="'JetBrains Mono', monospace"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, delay: 0.25 }}>
              {arrow.sublabel}
            </motion.text>
          )}
        </motion.g>
      )}
    </AnimatePresence>
  );
}

/* ─── Shared animation logic hook ─── */
function useSequenceState() {
  const [step, setStep] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startAnimation = () => {
    if (shouldReduceMotion) { setStep(ARROWS.length - 1); return; }
    setStep(0);
  };

  const replay = () => {
    setStep(-1);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => startAnimation(), 150);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && step === -1) { startAnimation(); observer.unobserve(el); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (step < 0 || step >= ARROWS.length - 1 || shouldReduceMotion) return;
    timerRef.current = setTimeout(() => setStep((s) => s + 1), 480);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [step, shouldReduceMotion]);

  return { step, replay, containerRef };
}

/* ─── Mobile: vertical step list ─── */
function MobileSequence() {
  const { step, replay, containerRef } = useSequenceState();

  return (
    <div ref={containerRef} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Legend />
      <div
        style={{
          border: "1px solid var(--color-border)",
          borderRadius: "2px",
          background: SURFACE,
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "0",
        }}
      >
        {MOBILE_STEPS.map((s, i) => (
          <AnimatePresence key={i}>
            {step >= i && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingBottom: "10px",
                  marginBottom: i < MOBILE_STEPS.length - 1 ? "10px" : 0,
                  borderBottom: i < MOBILE_STEPS.length - 1 ? `1px solid ${BORDER}` : "none",
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: s.color, lineHeight: 1.45 }}>
                  {s.label}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "#6b6966", marginTop: "2px" }}>
                  {s.detail}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
        {step === -1 && (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#6b6966" }}>
            scroll to play…
          </span>
        )}
      </div>
      <ReplayButton onClick={replay} />
    </div>
  );
}

/* ─── Desktop: full SVG diagram ─── */
function DesktopSequence() {
  const { step, replay, containerRef } = useSequenceState();

  return (
    <div ref={containerRef} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Legend />
      <div style={{ border: `1px solid ${BORDER}`, borderRadius: "2px", background: SURFACE, overflowX: "auto" }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          style={{ display: "block", minWidth: 480 }}
          aria-label="JWT authentication sequence diagram"
          role="img"
        >
          {ACTORS.map((actor) => (
            <g key={actor.id}>
              <rect x={actor.x} y={ACTOR_Y} width={ACTOR_W} height={ACTOR_H} rx={1} fill={SURFACE} stroke={BORDER} strokeWidth={1} />
              <text x={actor.x+ACTOR_W/2} y={ACTOR_Y+ACTOR_H/2+4} textAnchor="middle" fill={TEXT} fontSize={11} fontFamily="'JetBrains Mono', monospace" fontWeight="600">
                {actor.label}
              </text>
              <line x1={actor.x+ACTOR_W/2} y1={ACTOR_Y+ACTOR_H} x2={actor.x+ACTOR_W/2} y2={LINE_Y_END} stroke={BORDER} strokeWidth={1} strokeDasharray="4 3" />
            </g>
          ))}

          {step >= 6 && (
            <motion.text x={W/2} y={stepY(6)-14} textAnchor="middle" fill={AMBER}
              fontSize={9} fontFamily="'JetBrains Mono', monospace" opacity={0.75}
              initial={{ opacity: 0 }} animate={{ opacity: 0.75 }}>
              // token reuse detected — security branch
            </motion.text>
          )}

          {ARROWS.map((arrow, i) => (
            <ArrowLine key={i} arrow={arrow} visible={step >= i} />
          ))}
        </svg>
      </div>
      <ReplayButton onClick={replay} />
    </div>
  );
}

/* ─── Main export: renders mobile or desktop based on container width ─── */
export default function AuthSequence() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobile ? <MobileSequence /> : <DesktopSequence />;
}

/* ─── Shared sub-components ─── */
function Legend() {
  return (
    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
      <LegendItem color={CYAN}  label="Happy path" />
      <LegendItem color={AMBER} label="Token reuse detected" />
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <span style={{ width: 18, height: 2, background: color, display: "inline-block", borderRadius: "1px" }} />
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#6b6966", letterSpacing: "0.04em" }}>
        {label}
      </span>
    </div>
  );
}

function ReplayButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        alignSelf: "flex-start",
        fontFamily: "var(--font-mono)",
        fontSize: "0.72rem",
        color: "var(--color-muted)",
        background: "none",
        border: "1px solid var(--color-border)",
        padding: "5px 14px",
        borderRadius: "1px",
        cursor: "pointer",
        letterSpacing: "0.05em",
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
      [ Replay ]
    </button>
  );
}
