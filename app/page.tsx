import Link from "next/link";
import { brokers } from "../lib/brokers";
import { useLanguage } from "../components/language-context";

function Hero() {
  const { t } = useLanguage();
  const top = [...brokers].sort((a, b) => a.netCostXAU - b.netCostXAU)[0];

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <h1 className="hero-title">{t.home.heroTitle}</h1>
          <p className="hero-subtitle">{t.home.heroSubtitle}</p>
          <div className="hero-badges">
            <span className="badge">{t.home.pillars.cost}</span>
            <span className="badge">{t.home.pillars.independent}</span>
            <span className="badge">{t.home.pillars.multibroker}</span>
          </div>
          <div className="hero-cta">
            <Link href="/compare" className="btn btn-primary">
              {t.home.ctaPrimary}
            </Link>
            <Link href="/insights" className="btn">
              {t.home.ctaSecondary}
            </Link>
          </div>
          <p className="hero-note">{t.home.disclaimer}</p>
        </div>
        <div>
          <div className="card">
            <div className="card-title">{t.home.snapshotTitle}</div>
            <div className="card-text">{t.home.snapshotSubtitle}</div>
            <div style={{ marginTop: "1rem", fontSize: "0.85rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                <span>{t.home.instrumentLabel}</span>
                <span>XAUUSD</span>
              </div>
              {top && (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                    <span>{t.home.bestBrokerLabel}</span>
                    <span>{top.name}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                    <span>{t.common.spreadCost}</span>
                    <span>~${top.spreadXAU.toFixed(1)} / lot</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                    <span>{t.common.rebate}</span>
                    <span>-${top.rebateXAU.toFixed(1)} / lot</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.35rem", fontWeight: 600 }}>
                    <span>{t.common.netCost}</span>
                    <span>~${top.netCostXAU.toFixed(1)} / lot</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const { t } = useLanguage();
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">{t.home.howItWorksTitle}</h2>
        <div className="grid-3">
          <div className="card">
            <div className="card-title">1. {t.home.how.steps[0].title}</div>
            <div className="card-text">{t.home.how.steps[0].text}</div>
          </div>
          <div className="card">
            <div className="card-title">2. {t.home.how.steps[1].title}</div>
            <div className="card-text">{t.home.how.steps[1].text}</div>
          </div>
          <div className="card">
            <div className="card-title">3. {t.home.how.steps[2].title}</div>
            <div className="card-text">{t.home.how.steps[2].text}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhoFor() {
  const { t } = useLanguage();
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">{t.home.whoTitle}</h2>
        <div className="grid-3">
          <div className="card">
            <div className="card-title">{t.home.who.traders.title}</div>
            <div className="card-text">{t.home.who.traders.text}</div>
          </div>
          <div className="card">
            <div className="card-title">{t.home.who.ea.title}</div>
            <div className="card-text">{t.home.who.ea.text}</div>
          </div>
          <div className="card">
            <div className="card-title">{t.home.who.ib.title}</div>
            <div className="card-text">{t.home.who.ib.text}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Modules() {
  const { t } = useLanguage();
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">{t.home.modulesTitle}</h2>
        <div className="grid-3">
          <div className="card">
            <div className="card-title">{t.modules.compare.title}</div>
            <div className="card-text">{t.modules.compare.text}</div>
          </div>
          <div className="card">
            <div className="card-title">{t.modules.insights.title}</div>
            <div className="card-text">{t.modules.insights.text}</div>
          </div>
          <div className="card">
            <div className="card-title">{t.modules.brokers.title}</div>
            <div className="card-text">{t.modules.brokers.text}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <WhoFor />
      <Modules />
    </>
  );
}
