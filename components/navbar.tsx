'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const navLinks = [
    { href: '/about' as const, label: t('about') },
    { href: '/brands' as const, label: t('brands') },
    { href: '/wholesale' as const, label: t('wholesale') },
    { href: '/press' as const, label: t('press') },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full bg-nav-bg border-b border-nav-border">
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded">
          <img
            src="/logos/remobiletech-logo-dark.svg"
            alt="Remobile Tech GmbH"
            className="h-8 w-auto"
            width={160}
            height={32}
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-body text-nav-ink hover:text-accent transition-colors duration-[150ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              {link.label}
            </Link>
          ))}

          {/* Language switcher */}
          <div className="flex items-center gap-1 text-xs font-mono ml-1">
            <Link
              href={pathname}
              locale="en"
              className={`px-1.5 py-0.5 rounded transition-colors duration-[150ms] ${
                locale === 'en' ? 'text-accent' : 'text-nav-muted hover:text-nav-ink'
              }`}
            >
              EN
            </Link>
            <span className="text-nav-border select-none">|</span>
            <Link
              href={pathname}
              locale="de"
              className={`px-1.5 py-0.5 rounded transition-colors duration-[150ms] ${
                locale === 'de' ? 'text-accent' : 'text-nav-muted hover:text-nav-ink'
              }`}
            >
              DE
            </Link>
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            className="px-4 py-2 bg-accent text-nav-bg text-sm font-medium rounded hover:bg-accent-deep transition-colors duration-[150ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-nav-bg"
          >
            {t('contact')}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-nav-ink p-2 -mr-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={drawerOpen}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      {/* Mobile drawer — plain CSS transition, no Framer Motion */}
      <div
        className={`fixed inset-0 z-50 bg-nav-bg flex flex-col md:hidden transition-transform duration-300 ease-[var(--ease)] ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-nav-border shrink-0">
          <Link href="/" onClick={() => setDrawerOpen(false)}>
            <img
              src="/logos/remobiletech-logo-dark.svg"
              alt="Remobile Tech GmbH"
              className="h-8 w-auto"
              width={160}
              height={32}
            />
          </Link>
          <button
            onClick={() => setDrawerOpen(false)}
            className="text-nav-ink p-2 -mr-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Close navigation menu"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <line x1="5" y1="5" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="17" y1="5" x2="5" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Drawer links */}
        <div className="flex flex-col flex-1 overflow-y-auto px-4 py-6">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg text-nav-ink py-3.5 border-b border-nav-border hover:text-accent transition-colors duration-[150ms]"
                onClick={() => setDrawerOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8 flex flex-col gap-4">
            <Link
              href="/contact"
              className="block w-full text-center px-4 py-3.5 bg-accent text-nav-bg font-medium rounded hover:bg-accent-deep transition-colors duration-[150ms]"
              onClick={() => setDrawerOpen(false)}
            >
              {t('contact')}
            </Link>

            <div className="flex items-center gap-3 text-sm">
              <Link
                href={pathname}
                locale="en"
                className={locale === 'en' ? 'text-accent font-medium' : 'text-nav-muted'}
                onClick={() => setDrawerOpen(false)}
              >
                English
              </Link>
              <span className="text-nav-border">·</span>
              <Link
                href={pathname}
                locale="de"
                className={locale === 'de' ? 'text-accent font-medium' : 'text-nav-muted'}
                onClick={() => setDrawerOpen(false)}
              >
                Deutsch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
