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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="M20.5 13.1a8.6 8.6 0 1 1-9.6-9.6 4.1 4.1 0 0 0 4.6 4.6 4.1 4.1 0 0 0 5 5Z" />
              <circle cx="8.2" cy="13.2" r=".8" fill="currentColor" stroke="none" />
              <circle cx="11.2" cy="17" r=".8" fill="currentColor" stroke="none" />
              <circle cx="15.1" cy="13.9" r=".8" fill="currentColor" stroke="none" />
            </svg>
            {t("footer.cookieSettings")}
          </button>
          <span className="sep" aria-hidden="true">·</span>
          <div className="footer-theme-toggle" id="theme-toggle" role="radiogroup" aria-label={t("a11y.themeGroup")}>
            <button type="button" role="radio" aria-checked="true" aria-label={t("a11y.themeLight")} title={t("a11y.themeLight")} data-theme-option="light" tabIndex={0}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="4.1" />
                <path d="M12 2.2v2.3M12 19.5v2.3M4.1 4.1l1.6 1.6M18.3 18.3l1.6 1.6M2.2 12h2.3M19.5 12h2.3M4.1 19.9l1.6-1.6M18.3 5.7l1.6-1.6" />
              </svg>
            </button>
            <button type="button" role="radio" aria-checked="false" aria-label={t("a11y.themeDark")} title={t("a11y.themeDark")} data-theme-option="dark" tabIndex={-1}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <path d="M20.4 14.6A8.6 8.6 0 0 1 9.4 3.6a8.6 8.6 0 1 0 11 11Z" />
              </svg>
            </button>
            <button type="button" role="radio" aria-checked="false" aria-label={t("a11y.themeSystem")} title={t("a11y.themeSystem")} data-theme-option="system" tabIndex={-1}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <rect x="3.1" y="4.2" width="17.8" height="12.2" rx="1.8" />
                <path d="M8.2 20h7.6M12 16.5V20" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
