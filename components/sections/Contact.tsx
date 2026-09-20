"use client";

import FadeIn from "@/components/ui/FadeIn";

const EMAIL = "girumkenenisa@gmail.com";
const GITHUB = "https://github.com/mgarikalfn";
const PHONE = "+251 942 549 660";

export default function Contact() {
  return (
    <section
      id="contact"
      style={{ padding: "100px 48px 120px 0" }}
    >
      <FadeIn>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: "var(--color-accent)", letterSpacing: "0.08em", marginBottom: "0.5rem", opacity: 0.7 }}>
          // get in touch
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
          Contact
        </h2>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--color-muted)", marginBottom: "3rem", maxWidth: "480px", lineHeight: 1.75 }}>
          Open to full-time roles, freelance work, and interesting collaborations.
        </p>
      </FadeIn>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "4rem", alignItems: "start" }}
        className="contact-grid"
      >
        {/* Form */}
        <FadeIn delay={0.06}>
          <form
            action={`mailto:${EMAIL}`}
            method="get"
            encType="text/plain"
            style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}
          >
            <FormField id="contact-name" name="subject" label="name" type="text" placeholder="Your name" />
            <FormField id="contact-email" name="from" label="email" type="email" placeholder="your@email.com" />
            <div>
              <label htmlFor="contact-message" style={labelStyle}>message</label>
              <textarea
                id="contact-message"
                name="body"
                rows={5}
                placeholder="What's on your mind?"
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = "rgba(45,212,191,0.5)")}
                onBlur={(e) => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = "var(--color-border)")}
              />
            </div>
            <button
              type="submit"
              style={{
                alignSelf: "flex-start",
                fontFamily: "var(--font-mono)",
                fontSize: "0.92rem",
                color: "var(--color-accent)",
                border: "1px solid var(--color-accent)",
                background: "transparent",
                padding: "11px 26px",
                borderRadius: "1px",
                cursor: "pointer",
                letterSpacing: "0.05em",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--color-accent-dim)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
            >
              Send Message
            </button>
          </form>
        </FadeIn>

        {/* Direct links panel */}
        <FadeIn delay={0.12}>
          <div style={{ border: "1px solid var(--color-border)", borderRadius: "2px", padding: "28px", background: "var(--color-surface)", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--color-muted)", margin: 0, letterSpacing: "0.08em" }}>direct links</p>
            <DirectLink label="email" href={`mailto:${EMAIL}`} text={EMAIL} />
            <DirectLink label="github" href={GITHUB} text="github.com/mgarikalfn" external />
            <DirectLink label="phone" href={`tel:${PHONE.replace(/\s/g, "")}`} text={PHONE} />
          </div>
        </FadeIn>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.82rem",
  color: "var(--color-muted)",
  display: "block",
  marginBottom: "8px",
  letterSpacing: "0.06em",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "1px",
  padding: "12px 16px",
  fontFamily: "var(--font-mono)",
  fontSize: "0.95rem",
  color: "var(--color-text)",
  outline: "none",
  transition: "border-color 0.15s",
};

function FormField({ id, name, label, type, placeholder }: {
  id: string; name: string; label: string; type: string; placeholder: string;
}) {
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>{label}</label>
      <input
        id={id} name={name} type={type} placeholder={placeholder}
        style={inputStyle}
        onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "rgba(45,212,191,0.5)")}
        onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "var(--color-border)")}
      />
    </div>
  );
}

function DirectLink({ label, href, text, external = false }: {
  label: string; href: string; text: string; external?: boolean;
}) {
  return (
    <div>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-muted)", margin: "0 0 4px", letterSpacing: "0.08em" }}>{label}</p>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.92rem",
          color: "var(--color-text)",
          textDecoration: "none",
          borderBottom: "1px solid var(--color-border)",
          paddingBottom: "1px",
          transition: "color 0.15s, border-color 0.15s",
          wordBreak: "break-all",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-accent)";
          (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(45,212,191,0.4)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-text)";
          (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-border)";
        }}
      >
        {text}
      </a>
    </div>
  );
}
