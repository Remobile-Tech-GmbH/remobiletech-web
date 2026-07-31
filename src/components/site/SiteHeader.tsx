import Link from "next/link";
import { getTranslations } from "next-intl/server";

type SiteHeaderProps = {
  locale: string;
  page: "home" | "about" | "wholesale" | "contact" | "imprint" | "privacy";
  usesInlineLogo?: boolean;
};

function BrandLogo({ usesInlineLogo = false }: { usesInlineLogo?: boolean }) {
  if (usesInlineLogo) {
    return (
      <svg className="logo" viewBox="0 0 1241 305" role="img" aria-label="Remobile Tech GmbH">
        <use href="#rmt-logo" />
      </svg>
    );
  }

  return <span className="logo logo--mask" role="img" aria-label="Remobile Tech GmbH" />;
}

export async function SiteHeader({ locale, page, usesInlineLogo }: SiteHeaderProps) {
  const t = await getTranslations("Home");
  const homeHref = `/${locale}`;
  const currentPath = page === "home" ? "" : `/${page}`;

  return (
    <header className={`site-header${page === "home" ? "" : " is-solid"}`} id="site-header">
      <div className="container header-inner">
        <Link className="brand" href={homeHref} aria-label={t("a11y.homeLabel")}>
          <BrandLogo usesInlineLogo={usesInlineLogo} />
        </Link>

        <div className="header-controls">
          <nav className="nav" id="nav-menu" aria-label={t("a11y.primaryNav")}>
            <ul className="nav-links">
              <li><Link href={homeHref} data-nav={page === "home" ? "top" : undefined} aria-current={page === "home" ? "page" : undefined}>{t("nav.home")}</Link></li>
              <li><Link href={`${homeHref}/about`} data-nav={page === "home" ? "about" : undefined} aria-current={page === "about" ? "page" : undefined}>{t("nav.about")}</Link></li>
              <li><Link href={`${homeHref}/wholesale`} aria-current={page === "wholesale" ? "page" : undefined}>{t("nav.wholesale")}</Link></li>
              <li><Link href={`${homeHref}/contact`} aria-current={page === "contact" ? "page" : undefined}>{t("nav.contact")}</Link></li>
            </ul>
            <div className="lang" role="group" aria-label={t("a11y.language")}>
              <Link className={locale === "en" ? "on" : undefined} href={`/en${currentPath}`} hrefLang="en" aria-current={locale === "en" ? "page" : undefined}>{t("nav.englishCode")}</Link>
              <Link className={locale === "de" ? "on" : undefined} href={`/de${currentPath}`} hrefLang="de" aria-current={locale === "de" ? "page" : undefined}>{t("nav.germanCode")}</Link>
            </div>
          </nav>

          <button className="theme-toggle" id="theme-toggle" type="button" aria-label={t("a11y.switchDark")} aria-pressed={false} title={t("a11y.switchDark")}>
            <svg className="tt-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="M20.4 14.6A8.6 8.6 0 0 1 9.4 3.6a8.6 8.6 0 1 0 11 11Z" />
            </svg>
            <svg className="tt-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <circle cx="12" cy="12" r="4.1" />
              <path d="M12 2.2v2.3M12 19.5v2.3M4.1 4.1l1.6 1.6M18.3 18.3l1.6 1.6M2.2 12h2.3M19.5 12h2.3M4.1 19.9l1.6-1.6M18.3 5.7l1.6-1.6" />
            </svg>
          </button>

          <button className="nav-toggle" id="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-menu" aria-label={t("a11y.menu")}>
            <span className="bars" aria-hidden="true"><i /><i /><i /></span>
          </button>
        </div>
        <div className="progress" id="progress" aria-hidden="true" />
      </div>
    </header>
  );
}

export { BrandLogo };
