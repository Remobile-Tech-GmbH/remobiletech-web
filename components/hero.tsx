import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export async function Hero({ locale }: { locale: string }) {
  const t = await getTranslations('hero');

  return (
    <section className="bg-bg pt-24 pb-20 sm:pt-32 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="inline-block px-3 py-1 bg-accent-muted text-accent text-xs font-mono font-medium tracking-widest uppercase rounded-sm">
              {t('eyebrow')}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-ink leading-[1.08] tracking-tight mb-7"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            {t('headline')}
          </h1>

          {/* Body */}
          <p className="text-lg sm:text-xl text-ink-mid leading-relaxed max-w-2xl mb-10">
            {t('body')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-nav-bg font-medium rounded hover:bg-accent-deep transition-colors duration-[150ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              {t('cta_primary')}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/brands"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-border-strong text-ink font-medium rounded hover:border-ink-mid hover:text-ink transition-colors duration-[150ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
            >
              {t('cta_secondary')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
