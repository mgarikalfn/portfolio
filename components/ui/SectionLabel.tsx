"use client";

type Props = {
  children: string;
};

/**
 * Small monospace command-line-style label above section headings.
 * e.g. <SectionLabel>// projects</SectionLabel>
 * Used sparingly — one or two instances site-wide only.
 */
export default function SectionLabel({ children }: Props) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.72rem",
        color: "var(--color-accent)",
        letterSpacing: "0.1em",
        display: "block",
        marginBottom: "0.5rem",
        opacity: 0.75,
      }}
    >
      {children}
    </span>
  );
}
