import { useLanguage } from "../../components/language-context";

export default function LoginPage() {
  const { t } = useLanguage();
  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">{t.auth.loginTitle}</h1>
        <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{t.auth.loginSubtitle}</p>
        <div className="card" style={{ marginTop: "1rem" }}>
          <div className="card-text">{t.auth.loginPlaceholder}</div>
        </div>
      </div>
    </section>
  );
}
