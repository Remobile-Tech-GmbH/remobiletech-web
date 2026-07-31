import type { Metadata, Viewport } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { routing } from "@/i18n/routing";
import "../globals.css";
import "@/styles/home.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://remobiletech.com"),
  applicationName: "Remobile Tech GmbH",
};

export const viewport: Viewport = {
  themeColor: "#022F50",
};

const themeScript = `
/* Theme resolution runs in <head> before the body can paint, so the correct
   palette is in place on the very first paint — no flash of the wrong theme.
   Order: explicit user choice (localStorage) → light. The system preference is
   consulted only when the visitor has explicitly chosen Device. */
(function () {
  var t = null;
  try { t = window.localStorage.getItem('rmt-theme'); } catch (e) {}
  if (t !== 'light' && t !== 'dark' && t !== 'system') { t = 'light'; }
  var resolved = t === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : t === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', resolved);
  document.documentElement.setAttribute('data-theme-preference', t);
  /* the route map's nodes only start hidden when there is JS to reveal them */
  document.documentElement.className += ' has-js';
}());`;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Remobile Tech GmbH",
  url: "https://remobiletech.com",
  email: "hallo@remobiletech.com",
  telephone: "+43 660 2717591",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jordangasse 7/12",
    postalCode: "1010",
    addressLocality: "Vienna",
    addressCountry: "AT",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const consent = await getTranslations({ locale, namespace: "Consent" });

  return (
    <html lang={locale} data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={null}>
          {children}
          <ConsentBanner
            locale={locale}
            ariaLabel={consent("ariaLabel")}
            copy={consent("copy")}
            privacyLink={consent("privacyLink")}
            acceptAll={consent("acceptAll")}
            essentialOnly={consent("essentialOnly")}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
