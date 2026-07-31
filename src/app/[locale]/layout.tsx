import type { Metadata, Viewport } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import "@/styles/home.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://remobiletech.com"),
};

export const viewport: Viewport = {
  themeColor: "#022F50",
};

const themeScript = `
/* Theme resolution runs before the stylesheet is parsed, so the correct palette
   is in place on the very first paint — no flash of the wrong theme.
   Order: explicit user choice (localStorage) → light.
   The OS preference is deliberately not consulted while the theme control is
   parked: the page opens light for everyone. Restore the commented line below
   to follow the visitor's system setting again. */
(function () {
  var t = null;
  try { t = window.localStorage.getItem('rmt-theme'); } catch (e) {}
  if (t !== 'light' && t !== 'dark') {
    t = 'light';
    /* t = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'; */
  }
  document.documentElement.setAttribute('data-theme', t);
  /* the route map's nodes only start hidden when there is JS to reveal them */
  document.documentElement.className += ' has-js';
}());`;

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

  return (
    <html lang={locale} data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <NextIntlClientProvider messages={null}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
