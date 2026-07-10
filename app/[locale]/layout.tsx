import type { Metadata } from 'next';
import { DM_Sans, Inter, JetBrains_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Navbar } from '@/components/navbar';
import '@/app/globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Remobile Tech GmbH',
    template: '%s — Remobile Tech GmbH',
  },
  description:
    'Vienna-based holding company behind Remobile.eu, HandySwap.com, and Remobile.ae. B2B wholesale supplier of refurbished and new mobile phones across Europe.',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'de')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${dmSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body bg-bg text-ink antialiased min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="bg-nav-bg border-t border-nav-border">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
              <img
                src="/logos/remobiletech-logo-dark.svg"
                alt="Remobile Tech GmbH"
                className="h-8 w-auto mb-10"
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
                <div>
                  <p className="text-nav-ink font-medium mb-3">Company</p>
                  <ul className="space-y-2 text-nav-muted">
                    <li><a href={`/${locale}/about`} className="hover:text-nav-ink transition-colors duration-[150ms]">About</a></li>
                    <li><a href={`/${locale}/press`} className="hover:text-nav-ink transition-colors duration-[150ms]">Press</a></li>
                    <li><a href={`/${locale}/contact`} className="hover:text-nav-ink transition-colors duration-[150ms]">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <p className="text-nav-ink font-medium mb-3">Brands</p>
                  <ul className="space-y-2 text-nav-muted">
                    <li><a href="https://remobile.eu" className="hover:text-nav-ink transition-colors duration-[150ms]">Remobile.eu</a></li>
                    <li><a href="https://handyswap.com" className="hover:text-nav-ink transition-colors duration-[150ms]">HandySwap.com</a></li>
                    <li><a href="https://remobile.ae" className="hover:text-nav-ink transition-colors duration-[150ms]">Remobile.ae</a></li>
                  </ul>
                </div>
                <div>
                  <p className="text-nav-ink font-medium mb-3">Wholesale</p>
                  <ul className="space-y-2 text-nav-muted">
                    <li><a href={`/${locale}/wholesale`} className="hover:text-nav-ink transition-colors duration-[150ms]">How it works</a></li>
                    <li><a href={`/${locale}/contact`} className="hover:text-nav-ink transition-colors duration-[150ms]">Become a partner</a></li>
                  </ul>
                </div>
                <div>
                  <p className="text-nav-ink font-medium mb-3">Legal</p>
                  <ul className="space-y-2 text-nav-muted">
                    <li><a href={`/${locale}/legal/privacy`} className="hover:text-nav-ink transition-colors duration-[150ms]">Privacy policy</a></li>
                    <li><a href={`/${locale}/legal/imprint`} className="hover:text-nav-ink transition-colors duration-[150ms]">Imprint</a></li>
                  </ul>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-nav-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-nav-muted">
                <p>© {new Date().getFullYear()} Remobile Tech GmbH, Vienna</p>
                <div className="flex items-center gap-3">
                  <a href="/en" className={locale === 'en' ? 'text-accent' : 'hover:text-nav-ink transition-colors duration-[150ms]'}>EN</a>
                  <span>·</span>
                  <a href="/de" className={locale === 'de' ? 'text-accent' : 'hover:text-nav-ink transition-colors duration-[150ms]'}>DE</a>
                </div>
              </div>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
