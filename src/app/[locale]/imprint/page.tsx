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
  const t = await getTranslations({ locale, namespace: "Imprint.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ImprintPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Imprint");
  const rows = [
    [t("labelCompany"), t("company")],
    [t("labelAddress"), t("address")],
    [t("labelUid"), t("uid")],
    [t("labelTax"), t("tax")],
    [t("labelDirector"), t("director")],
    [t("labelPurpose"), t("purpose")],
    [t("labelContact"), `${t("email")} · ${t("phone")}`],
    [t("labelAuthority"), t("authority")],
  ];

  return (
    <StaticPageShell locale={locale}>
      <section className="legal-page">
        <div className="container legal-wrap">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1>{t("title")}</h1>
          <p className="legal-subheading">{t("subheading")}</p>
          <dl className="legal-table">
            {rows.map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
          <div className="legal-sections">
            {(["disclaimer", "links", "copyright"] as const).map((section) => (
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
