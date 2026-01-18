import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { LanguageProvider } from "../components/language-context";
import { Navbar } from "../components/navbar";

export const metadata: Metadata = {
  title: "Cloud Speed – Global Rebate & Cost Compare",
  description: "Cloud Speed helps traders compare multi-broker trading costs and rebates without touching client funds."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <footer className="footer container">
            <span>© {new Date().getFullYear()} Cloud Speed. All rights reserved.</span>
            <span>Cloud Speed is not a broker and does not hold client funds.</span>
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
