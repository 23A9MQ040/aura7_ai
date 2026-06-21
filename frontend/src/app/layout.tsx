import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURA — Adaptive Universal Reasoning Assistant",
  description: "A personal AI ecosystem that learns, reasons, plans, and acts with you. AURA is a multi-agent intelligence platform with privacy-first design.",
  keywords: ["AI", "Agentic AI", "Multi-Agent", "Personal AI", "Reasoning Assistant", "Machine Learning"],
  authors: [{ name: "AURA Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
