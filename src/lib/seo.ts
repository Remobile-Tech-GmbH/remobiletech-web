import type { Metadata } from "next";

const SITE_NAME = "Remobile Tech GmbH";

export function createPageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const localizedPath = `/${locale}${path}`;
  const englishPath = `/en${path}`;
  const germanPath = `/de${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath,
      languages: {
        en: englishPath,
        de: germanPath,
        "x-default": englishPath,
      },
    },
    openGraph: {
      type: "website",
      url: localizedPath,
      title,
      description,
      siteName: SITE_NAME,
      locale: locale === "de" ? "de_DE" : "en_US",
      alternateLocale: locale === "de" ? ["en_US"] : ["de_DE"],
      // A future app/opengraph-image asset is picked up automatically by Next.js.
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      // A future app/twitter-image asset is picked up automatically by Next.js.
    },
  };
}
