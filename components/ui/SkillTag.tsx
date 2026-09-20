"use client";

type Props = {
  label: string;
};

export default function SkillTag({ label }: Props) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.75rem",
        color: "var(--color-muted)",
        border: "1px solid var(--color-border)",
        padding: "2px 8px",
        borderRadius: "1px",
        display: "inline-block",
        transition: "color 0.15s, border-color 0.15s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLSpanElement).style.color = "var(--color-accent)";
        (e.currentTarget as HTMLSpanElement).style.borderColor =
          "rgba(232,168,87,0.4)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLSpanElement).style.color = "var(--color-muted)";
        (e.currentTarget as HTMLSpanElement).style.borderColor =
          "var(--color-border)";
      }}
    >
      {label}
    </span>
  );
}
