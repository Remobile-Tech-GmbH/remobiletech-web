import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { StaticPageBehaviors } from "./StaticPageBehaviors";

export async function StaticPageShell({ locale, active, children }: { locale: string; active?: "wholesale" | "contact"; children: ReactNode }) {
  const t = await getTranslations("Home");

  return (
    <>
      <a className="skip" href="#main">{t("a11y.skip")}</a>
      <SiteHeader locale={locale} active={active} />
      <main className="subpage" id="main">{children}</main>
      <SiteFooter locale={locale} />
      <StaticPageBehaviors switchDark={t("a11y.switchDark")} switchLight={t("a11y.switchLight")} />
    </>
  );
}
