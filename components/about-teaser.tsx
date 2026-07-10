'use client';

import { useTranslations } from 'next-intl';
import { AnimatedSection } from '@/components/animated-section';
import { Link } from '@/i18n/routing';

export function AboutTeaser() {
  const t = useTranslations('about_teaser');

  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-2xl mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-accent-muted text-accent text-xs font-mono tracking-[0.12em] uppercase rounded-sm mb-6">
            {t('tag')}
          </span>
          <h2
            className="font-display font-bold text-ink leading-tight tracking-tight mb-5"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
          >
            {t('headline')}
          </h2>
          <p className="text-lg text-ink-mid leading-relaxed mb-8">
            {t('body')}
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-deep transition-colors duration-150"
          >
            {t('cta')}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M2.5 7h9M8 3.5L11.5 7 8 10.5"
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
