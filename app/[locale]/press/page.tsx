import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/page-hero';
import { AnimatedSection } from '@/components/animated-section';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'press_page' });
  return { title: t('meta_title') };
}

export default async function PressPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'press_page' });

  return (
    <>
      <PageHero
        eyebrow={t('hero_eyebrow')}
        headline={t('hero_headline')}
        body={t('hero_body')}
      />

      <section className="bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Press contact */}
            <AnimatedSection>
              <div className="border border-border rounded bg-bg p-6 h-full">
                <p className="text-xs font-mono tracking-[0.12em] uppercase text-ink-muted mb-5">
                  {t('contact_tag')}
                </p>
                <p className="font-medium text-ink">{t('contact_name')}</p>
                <p className="text-sm text-ink-muted mb-4">{t('contact_title')}</p>
                <a
                  href={`mailto:${t('contact_email')}`}
                  className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-deep transition-colors duration-150"
                >
                  {t('contact_email')}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M1.5 6h9M7 2.5L10.5 6 7 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </AnimatedSection>

            {/* Brand assets */}
            <AnimatedSection delay={0.06}>
              <div className="border border-border rounded bg-bg p-6 h-full">
                <p className="text-xs font-mono tracking-[0.12em] uppercase text-ink-muted mb-5">
                  {t('kit_tag')}
                </p>
                <p className="text-sm text-ink-mid leading-relaxed mb-5">
                  {t('kit_body')}
                </p>
                <span className="inline-block text-xs font-mono text-ink-muted border border-border rounded px-3 py-1.5">
                  Coming soon
                </span>
              </div>
            </AnimatedSection>

            {/* Coverage */}
            <AnimatedSection delay={0.12}>
              <div className="border border-border rounded bg-bg p-6 h-full">
                <p className="text-xs font-mono tracking-[0.12em] uppercase text-ink-muted mb-5">
                  {t('coverage_tag')}
                </p>
                <p className="text-sm text-ink-muted">{t('coverage_empty')}</p>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>
    </>
  );
}
