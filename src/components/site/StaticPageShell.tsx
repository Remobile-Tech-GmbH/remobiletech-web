import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { StaticPageBehaviors } from "./StaticPageBehaviors";

type StaticPage = "about" | "wholesale" | "contact" | "imprint" | "privacy";

export async function StaticPageShell({ locale, page, children }: { locale: string; page: StaticPage; children: ReactNode }) {
  const t = await getTranslations("Home");

  return (
    <>
      <SiteHeader locale={locale} page={page} />
      <main className="subpage" id="main">{children}</main>
      <SiteFooter locale={locale} />
      <StaticPageBehaviors switchDark={t("a11y.switchDark")} switchLight={t("a11y.switchLight")} />
    </>
  );
}
