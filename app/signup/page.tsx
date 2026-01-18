import { useLanguage } from "../../components/language-context";

export default function SignupPage() {
  const { t } = useLanguage();
  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">{t.auth.signupTitle}</h1>
        <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{t.auth.signupSubtitle}</p>
        <div className="card" style={{ marginTop: "1rem" }}>
          <div className="card-text">{t.auth.signupPlaceholder}</div>
        </div>
      </div>
    </section>
  );
}
