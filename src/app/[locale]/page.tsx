import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          {t("eyebrow")}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-5 text-lg leading-8 text-zinc-600">
          {t("description")}
        </p>
      </div>
    </main>
  );
}
