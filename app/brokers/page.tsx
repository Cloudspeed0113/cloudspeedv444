import Link from "next/link";
import { brokers } from "../../lib/brokers";
import { useLanguage } from "../../components/language-context";

export default function BrokersPage() {
  const { t } = useLanguage();

  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">{t.brokers.title}</h1>
        <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "1rem" }}>
          {t.brokers.subtitle}
        </p>
        <div className="grid-3">
          {brokers.map((b) => (
            <div key={b.id} className="card">
              <div className="card-title">{b.name}</div>
              <div className="card-text" style={{ marginBottom: "0.5rem" }}>
                {b.region} · {b.regulations.join(", ")}
              </div>
              <div className="card-text" style={{ marginBottom: "0.5rem" }}>
                {t.common.spreadCost}: ~${b.spreadXAU.toFixed(1)}/lot XAUUSD
              </div>
              <div className="card-text" style={{ marginBottom: "0.5rem" }}>
                {t.common.rebate}: -${b.rebateXAU.toFixed(1)}/lot
              </div>
              <div className="card-text" style={{ marginBottom: "0.75rem" }}>
                {t.common.netCost}: ~${b.netCostXAU.toFixed(1)}/lot
              </div>
              <Link href={b.website} target="_blank" className="btn btn-primary">
                {t.common.openWithRebate}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
