import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { BrandLogo } from "./SiteHeader";

export async function SiteFooter({ locale, usesInlineLogo = false }: { locale: string; usesInlineLogo?: boolean }) {
  const t = await getTranslations("Home");

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand"><BrandLogo usesInlineLogo={usesInlineLogo} /></div>
        <div className="footer-legal">
          <span>{t("footer.copyright")}</span>
          <span className="sep" aria-hidden="true">·</span>
          <Link href={`/${locale}/imprint`}>{t("footer.imprint")}</Link>
          <span className="sep" aria-hidden="true">·</span>
          <Link href={`/${locale}/privacy`}>{t("footer.privacy")}</Link>
          <span className="sep" aria-hidden="true">·</span>
          <button className="footer-cookie-settings" type="button" data-consent-settings aria-controls="consent-banner">
            {t("footer.cookieSettings")}
          </button>
          <span className="sep" aria-hidden="true">·</span>
          <button className="footer-theme-toggle" id="theme-toggle" type="button" aria-label={t("a11y.switchDark")} aria-pressed={false} title={t("a11y.switchDark")}>
            <span className="footer-theme-toggle__icon" aria-hidden="true">
              <svg className="tt-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                <path d="M20.4 14.6A8.6 8.6 0 0 1 9.4 3.6a8.6 8.6 0 1 0 11 11Z" />
              </svg>
              <svg className="tt-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                <circle cx="12" cy="12" r="4.1" />
                <path d="M12 2.2v2.3M12 19.5v2.3M4.1 4.1l1.6 1.6M18.3 18.3l1.6 1.6M2.2 12h2.3M19.5 12h2.3M4.1 19.9l1.6-1.6M18.3 5.7l1.6-1.6" />
              </svg>
            </span>
            <span data-theme-label>{t("footer.themeDark")}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
