import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { BrandLogo } from "./SiteHeader";

export async function SiteFooter({ locale, usesInlineLogo = false }: { locale: string; usesInlineLogo?: boolean }) {
  const t = await getTranslations("Home.footer");

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand"><BrandLogo usesInlineLogo={usesInlineLogo} /></div>
        <p className="footer-legal">
          <span>{t("copyright")}</span>
          <span className="sep" aria-hidden="true">·</span>
          <Link href={`/${locale}/imprint`}>{t("imprint")}</Link>
          <span className="sep" aria-hidden="true">·</span>
          <Link href={`/${locale}/privacy`}>{t("privacy")}</Link>
        </p>
      </div>
    </footer>
  );
}
