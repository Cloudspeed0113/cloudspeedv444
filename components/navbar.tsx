"use client";

import Link from "next/link";
import { useLanguage } from "./language-context";

export function Navbar() {
  const { lang, setLanguage, t } = useLanguage();

  const languages: { code: typeof lang; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "zh-CN", label: "简体" },
    { code: "zh-TW", label: "繁體" },
    { code: "vi", label: "VI" },
    { code: "th", label: "TH" },
    { code: "az", label: "AZ" }
  ];

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <div className="nav-left">
          <span className="logo">CLOUD SPEED</span>
          <nav className="nav-links">
            <Link href="/">{t.nav.home}</Link>
            <Link href="/compare">{t.nav.compare}</Link>
            <Link href="/insights">{t.nav.insights}</Link>
            <Link href="/brokers">{t.nav.brokers}</Link>
          </nav>
        </div>
        <div className="nav-right">
          <Link href="/login" className="btn">
            {t.nav.login}
          </Link>
          <Link href="/signup" className="btn btn-primary">
            {t.nav.getStarted}
          </Link>
          <select
            value={lang}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="btn"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}
