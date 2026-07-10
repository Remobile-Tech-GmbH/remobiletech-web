'use client';

import { useTranslations } from 'next-intl';
import { AnimatedSection } from '@/components/animated-section';
import { Link } from '@/i18n/routing';

export function PreFooterCTA() {
  const t = useTranslations('cta_band');

  return (
    <section className="bg-surface-alt border-t border-border py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-xl mx-auto text-center">
          <h2
            className="font-display font-bold text-ink leading-tight tracking-tight mb-8"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
          >
            {t('headline')}
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-nav-bg font-medium rounded hover:bg-accent-deep transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {t('cta')}
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path
                d="M3 7.5h9M8.5 3.5l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
