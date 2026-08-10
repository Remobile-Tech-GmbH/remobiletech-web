import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { AboutDeviceVisual } from "@/components/home/AboutDeviceVisual";
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
  const t = await getTranslations({ locale, namespace: "About.meta" });
  return createPageMetadata({ locale, path: "/about", title: t("title"), description: t("description") });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("About");

  return (
    <StaticPageShell locale={locale} page="about">
      <section className="about-page">
        <div className="container about-page__grid">
          <div className="about-page__copy">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h1>{t("title")}</h1>
            <p className="lede-serif">{t("intro")}</p>
            <p className="about-page__body">{t("body")}</p>
          </div>
          <AboutDeviceVisual />
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
