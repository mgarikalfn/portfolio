"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const navItems = [
  { id: "hero",       label: "01 — Home" },
  { id: "projects",   label: "02 — Projects" },
  { id: "skills",     label: "03 — Skills" },
  { id: "experience", label: "04 — Experience" },
  { id: "education",  label: "05 — Education" },
  { id: "contact",    label: "06 — Contact" },
];

export default function Nav() {
  const [active, setActive]         = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef  = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(44);

  /* ── Active section tracking ── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── Measure header height for dropdown positioning ── */
  useEffect(() => {
    const measure = () => {
      if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* ── Close on outside click ── */
  useEffect(() => {
    if (!mobileOpen) return;

    const handler = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      // Keep open if click is inside the header or the dropdown itself
      if (headerRef.current?.contains(target)) return;
      if (dropdownRef.current?.contains(target)) return;
      setMobileOpen(false);
    };

    // Use capture so this fires before anything else
    document.addEventListener("mousedown", handler, true);
    document.addEventListener("touchstart", handler, { capture: true, passive: true });
    return () => {
      document.removeEventListener("mousedown", handler, true);
      document.removeEventListener("touchstart", handler, true);
    };
  }, [mobileOpen]);

  /* ── Close on scroll (after the menu is open) ── */
  useEffect(() => {
    if (!mobileOpen) return;
    const onScroll = () => setMobileOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  /* ── Close on Escape ── */
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  /* ── Scroll to section + close menu ── */
  const scrollTo = useCallback((id: string) => {
    // Close first, then scroll — avoids the menu blocking the viewport shift
    setMobileOpen(false);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  return (
    <>
      {/* ── Desktop: fixed left sidebar ── */}
      <nav
        aria-label="Site navigation"
        style={{
          position: "fixed",
          top: 0, left: 0,
          height: "100vh",
          width: "220px",
          borderRight: "1px solid var(--color-border)",
          background: "var(--color-bg)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 28px",
          zIndex: 100,
        }}
        className="hidden lg:flex"
      >
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.68rem",
          color: "var(--color-accent)",
          letterSpacing: "0.14em",
          marginBottom: "2.5rem",
        }}>
          GKD<span style={{ opacity: 0.5 }}> /</span>
          <span className="cursor-blink" aria-hidden="true" style={{ marginLeft: 2 }} />
        </div>

        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "2px" }}>
          {navItems.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.04em",
                    color: isActive ? "var(--color-accent)" : "var(--color-muted)",
                    padding: "6px 0",
                    textAlign: "left",
                    width: "100%",
                    transition: "color 0.15s",
                    position: "relative",
                  }}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <span style={{
                      position: "absolute",
                      left: -14, top: "50%",
                      transform: "translateY(-50%)",
                      width: 6, height: 1,
                      background: "var(--color-accent)",
                      display: "block",
                    }} />
                  )}
                  {label}
                </button>
              </li>
            );
          })}
        </ul>

        <div style={{
          marginTop: "auto",
          paddingTop: "2.5rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          color: "var(--color-muted)",
          lineHeight: 1.7,
          opacity: 0.5,
        }}>
          Addis Ababa, ET
        </div>
      </nav>

      {/* ── Mobile: sticky top bar ── */}
      <header
        ref={headerRef}
        style={{
          position: "sticky",
          top: 0,
          background: "rgba(13,13,15,0.96)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid var(--color-border)",
          zIndex: 110,        /* above dropdown (99) and backdrop (98) */
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "11px 20px",
        }}
        className="lg:hidden"
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-accent)", letterSpacing: "0.12em" }}>
          GKD
          <span className="cursor-blink" aria-hidden="true" style={{ marginLeft: 2, width: 6, height: "0.85em" }} />
        </span>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          style={{
            background: "none",
            border: "1px solid var(--color-border)",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--color-muted)",
            padding: "4px 10px",
            borderRadius: "1px",
            letterSpacing: "0.04em",
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
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-dropdown"
        >
          {mobileOpen ? "[ close ]" : "[ menu ]"}
        </button>
      </header>

      {/* ── Backdrop: tapping outside closes the menu ── */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 98,
            /* transparent — just an invisible tap target */
          }}
          aria-hidden="true"
          className="lg:hidden"
        />
      )}

      {/* ── Mobile dropdown ── */}
      {mobileOpen && (
        <div
          id="mobile-nav-dropdown"
          ref={dropdownRef}
          style={{
            position: "fixed",
            top: headerHeight,
            left: 0,
            right: 0,
            background: "var(--color-surface)",
            borderBottom: "1px solid var(--color-border)",
            zIndex: 109,      /* below header (110), above backdrop (98) */
            padding: "10px 20px 14px",
          }}
          className="lg:hidden"
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 0 }}>
            {navItems.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.78rem",
                      color: isActive ? "var(--color-accent)" : "var(--color-text)",
                      padding: "11px 0",
                      textAlign: "left",
                      width: "100%",
                      letterSpacing: "0.04em",
                      borderBottom: "1px solid var(--color-border)",
                      transition: "color 0.15s",
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {isActive && (
                      <span style={{ color: "var(--color-accent)", marginRight: "6px", fontSize: "0.55rem" }}>▶</span>
                    )}
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
