import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ProcessReel } from "@/components/media/ProcessReel";
import { StaticPageShell } from "@/components/site/StaticPageShell";
import { routing } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact.meta" });
  return createPageMetadata({ locale, path: "/contact", title: t("title"), description: t("description") });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  return (
    <StaticPageShell locale={locale} page="contact">
      <section className="subpage-hero subpage-hero--compact">
        <div className="container narrow-copy">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1>{t("title")}</h1>
          <p className="subpage-hero__lede">{t("intro")}</p>
        </div>
      </section>

      <section className="subpage-section contact-section">
        <div className="container contact-grid">
          <article className="contact-card">
            <p className="contact-card__label">{t("emailLabel")}</p>
            <a className="contact-card__link" href="mailto:hallo@remobiletech.com">hallo@remobiletech.com</a>
          </article>
          <article className="contact-card">
            <p className="contact-card__label">{t("phoneLabel")}</p>
            {/* TODO(vladimir): confirm digits against Slack */}
            <a className="contact-card__link" href="tel:+436602717591">+43 660 2717591</a>
            <a className="contact-card__secondary" href="https://wa.me/436602717591">{t("whatsAppLabel")}</a>
          </article>
          <article className="contact-card contact-card--press">
            <p className="contact-card__label">{t("pressTitle")}</p>
            <p>{t("pressBody")}</p>
            <a className="textlink" href="mailto:hallo@remobiletech.com">hallo@remobiletech.com</a>
          </article>
        </div>
      </section>

      <section className="subpage-section media-section">
        <div className="container">
          <p className="eyebrow">{t("mediaEyebrow")}</p>
          <h2>{t("mediaTitle")}</h2>
          <ProcessReel caption={t("mediaCaption")} playLabel={t("mediaPlay")} pauseLabel={t("mediaPause")} />
        </div>
      </section>
    </StaticPageShell>
  );
}
