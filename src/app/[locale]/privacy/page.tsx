import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { StaticPageShell } from "@/components/site/StaticPageShell";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Privacy");

  return (
    <StaticPageShell locale={locale}>
      <section className="legal-page">
        <div className="container legal-wrap legal-wrap--privacy">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1>{t("title")}</h1>
          <p className="legal-updated">{t("lastUpdated")}</p>
          <p className="legal-intro">{t("intro")}</p>
          <div className="legal-sections legal-sections--numbered">
            {(["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"] as const).map((section) => (
              <section key={section}>
                <h2>{t(`${section}Heading`)}</h2>
                <p>{t(`${section}Body`)}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </StaticPageShell>
  );
}
