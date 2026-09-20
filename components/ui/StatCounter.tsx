"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  label: string;
  value: number | null;
  suffix?: string;
};

type GitHubUser = {
  public_repos: number;
};

function useCountUp(target: number | null, active: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const duration = 1200; // ms

  useEffect(() => {
    if (!active || target === null) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      setCount(target);
      return;
    }

    startRef.current = null;

    const step = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, active]);

  return count;
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const count = useCountUp(stat.value, active);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        minWidth: 100,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "1.75rem",
          fontWeight: 700,
          color: "var(--color-accent)",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        {stat.value === null ? "—" : `${count}${stat.suffix ?? ""}`}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.68rem",
          color: "var(--color-muted)",
          letterSpacing: "0.08em",
          textTransform: "lowercase",
        }}
      >
        {stat.label}
      </span>
    </div>
  );
}

export default function StatCounter() {
  const [repos, setRepos] = useState<number | null>(null);
  const [containerVisible, setContainerVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch GitHub data client-side
  useEffect(() => {
    fetch("https://api.github.com/users/mgarikalfn", {
      headers: { Accept: "application/vnd.github.v3+json" },
    })
      .then((r) => {
        if (!r.ok) throw new Error("GitHub API error");
        return r.json() as Promise<GitHubUser>;
      })
      .then((data) => setRepos(data.public_repos))
      .catch(() => {
        // Graceful fallback — leave as null, renders "—"
      });
  }, []);

  // IntersectionObserver to trigger count-up
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setContainerVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats: Stat[] = [
    { label: "public repos", value: repos },
    { label: "deployed projects", value: 3 },
    { label: "building since", value: 2022, suffix: "" },
  ];

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        gap: "2.5rem",
        flexWrap: "wrap",
        paddingTop: "2rem",
        marginTop: "2rem",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      {stats.map((stat) => (
        <StatItem key={stat.label} stat={stat} active={containerVisible} />
      ))}
    </div>
  );
}
