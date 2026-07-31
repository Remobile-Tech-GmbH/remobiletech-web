import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/inquiry/InquiryForm";
import { StaticPageShell } from "@/components/site/StaticPageShell";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Wholesale.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function WholesalePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Wholesale");
  const form = await getTranslations("Home.modal");

  return (
    <StaticPageShell locale={locale} active="wholesale">
      <section className="subpage-hero subpage-hero--wholesale">
        <div className="container subpage-hero__grid">
          <div>
            <p className="eyebrow">{t("eyebrow")}</p>
            <h1>{t("title")}</h1>
            <p className="subpage-hero__lede">{t("intro")}</p>
          </div>
          <div className="supply-card">
            <ul className="supply-list">
              {(["bullet1", "bullet2", "bullet3"] as const).map((key) => (
                <li key={key}><span aria-hidden="true" />{t(key)}</li>
              ))}
            </ul>
            <div className="supply-markets">
              <span>{t("focusLabel")}</span>
              <p>{t("focusMarkets")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="subpage-section inquiry-section">
        <div className="container inquiry-layout">
          <div className="inquiry-intro">
            <p className="eyebrow">{t("formEyebrow")}</p>
            <h2>{t("formTitle")}</h2>
            <p>{t("formBody")}</p>
          </div>
          <InquiryForm labels={{
            name: form("name"), company: form("company"), email: form("email"), message: form("message"),
            submit: form("submit"), sending: form("sending"), success: form("success"), failure: form("failure"),
            requiredName: form("errors.requiredName"), requiredEmail: form("errors.requiredEmail"), invalidEmail: form("errors.invalidEmail"),
          }} />
        </div>
      </section>
    </StaticPageShell>
  );
}
