import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />

      <main
        style={{ marginLeft: 0, padding: "0 0 0 48px" }}
        className="main-content"
      >
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <Contact />

        <footer
          style={{
            borderTop: "1px solid var(--color-border)",
            padding: "24px 48px 24px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--color-muted)" }}>
            © 2026 Girum Kenenisa Desissa
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--color-muted)", opacity: 0.45 }}>
            Built with Next.js · Deployed on Vercel
          </span>
        </footer>
      </main>

      <style>{`
        @media (min-width: 1024px) {
          .main-content { margin-left: 220px !important; }
        }
        @media (max-width: 1023px) {
          .main-content { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </>
  );
}
