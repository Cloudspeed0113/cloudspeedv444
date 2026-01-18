import Link from "next/link";
import { brokers } from "../../lib/brokers";
import { useLanguage } from "../../components/language-context";

export default function ComparePage() {
  const { t } = useLanguage();
  const sorted = [...brokers].sort((a, b) => a.netCostXAU - b.netCostXAU);

  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">{t.compare.title}</h1>
        <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "1rem" }}>
          {t.compare.subtitle}
        </p>
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>{t.common.broker}</th>
                <th>{t.common.region}</th>
                <th>{t.common.regulation}</th>
                <th>{t.common.minDeposit}</th>
                <th>{t.common.spreadCost} (XAUUSD)</th>
                <th>{t.common.rebate}</th>
                <th>{t.common.netCost}</th>
                <th>{t.common.actions}</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((b) => (
                <tr key={b.id}>
                  <td>{b.name}</td>
                  <td>{b.region}</td>
                  <td>{b.regulations.join(", ")}</td>
                  <td>${b.minDeposit}</td>
                  <td>~${b.spreadXAU.toFixed(1)}/lot</td>
                  <td>-${b.rebateXAU.toFixed(1)}/lot</td>
                  <td>~${b.netCostXAU.toFixed(1)}/lot</td>
                  <td>
                    <Link href={b.website} target="_blank" className="btn btn-primary">
                      {t.common.openWithRebate}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ color: "var(--muted)", fontSize: "0.8rem", marginTop: "0.75rem" }}>
          {t.compare.note}
        </p>
      </div>
    </section>
  );
}
