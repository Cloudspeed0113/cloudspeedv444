import { useLanguage } from "../../components/language-context";

export default function InsightsPage() {
  const { t } = useLanguage();

  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">{t.insights.title}</h1>
        <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "1rem" }}>
          {t.insights.subtitle}
        </p>
        <div className="card" style={{ marginBottom: "1rem" }}>
          <div className="card-title">{t.insights.marketViewTitle}</div>
          <div className="card-text">{t.insights.marketViewText}</div>
          <div
            style={{
              marginTop: "1rem",
              borderRadius: "0.75rem",
              border: "1px solid var(--border)",
              minHeight: "220px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.8rem",
              color: "var(--muted)"
            }}
          >
            {t.insights.chartPlaceholder}
          </div>
        </div>
        <div className="grid-3">
          <div className="card">
            <div className="card-title">{t.insights.blocks.costTitle}</div>
            <div className="card-text">{t.insights.blocks.costText}</div>
          </div>
          <div className="card">
            <div className="card-title">{t.insights.blocks.executionTitle}</div>
            <div className="card-text">{t.insights.blocks.executionText}</div>
          </div>
          <div className="card">
            <div className="card-title">{t.insights.blocks.riskTitle}</div>
            <div className="card-text">{t.insights.blocks.riskText}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
