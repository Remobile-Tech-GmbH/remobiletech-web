import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { StaticPageBehaviors } from "./StaticPageBehaviors";

type StaticPage = "about" | "wholesale" | "contact" | "imprint" | "privacy";

export async function StaticPageShell({ locale, page, children }: { locale: string; page: StaticPage; children: ReactNode }) {
  return (
    <>
      <SiteHeader locale={locale} page={page} />
      <main className="subpage" id="main">{children}</main>
      <SiteFooter locale={locale} />
      <StaticPageBehaviors />
    </>
  );
}
