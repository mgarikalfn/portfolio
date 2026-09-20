import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Girum Kenenisa — Full Stack Software Developer",
  description:
    "Portfolio of Girum Kenenisa Desissa, a Full Stack Software Developer from Addis Ababa building SaaS platforms, enterprise systems, and microservices.",
  keywords: [
    "Full Stack Developer",
    "Software Engineer",
    "Next.js",
    "TypeScript",
    "React",
    "ASP.NET Core",
    "Addis Ababa",
    "Ethiopia",
  ],
  authors: [{ name: "Girum Kenenisa Desissa" }],
  openGraph: {
    title: "Girum Kenenisa — Full Stack Software Developer",
    description:
      "Portfolio of Girum Kenenisa Desissa, building SaaS platforms, enterprise systems, and microservices.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
