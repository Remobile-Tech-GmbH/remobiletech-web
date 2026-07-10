'use client';

import { useTranslations } from 'next-intl';
import { AnimatedSection } from '@/components/animated-section';
import { WholesaleForm } from '@/components/wholesale-form';
import { Link } from '@/i18n/routing';

const BULLETS = ['card1', 'card2', 'card3'] as const;

export function WholesaleCallout() {
  const t = useTranslations('wholesale');

  return (
    <section className="bg-bg py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">

          {/* ── Prose ── */}
          <AnimatedSection>
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

            <ul className="flex flex-col gap-3.5 mb-8" role="list">
              {BULLETS.map((k) => (
                <li key={k} className="flex items-start gap-3">
                  <span
                    className="mt-[7px] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed">
                    <span className="font-medium text-ink">{t(`${k}_title`)}</span>
                    <span className="text-ink-muted"> — {t(`${k}_body`)}</span>
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
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

          {/* ── Form ── */}
          <AnimatedSection delay={0.1}>
            <WholesaleForm />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
