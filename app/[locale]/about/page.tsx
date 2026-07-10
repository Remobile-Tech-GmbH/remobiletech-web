import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { PageHero } from '@/components/page-hero';
import { AnimatedSection } from '@/components/animated-section';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about_page' });
  return { title: t('meta_title') };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about_page' });

  const entityRows = [
    { label: t('entity_label_name'),     value: t('entity_name') },
    { label: t('entity_label_address'),  value: `${t('entity_address_line1')}, ${t('entity_address_line2')}` },
    { label: t('entity_label_uid'),      value: t('entity_uid') },
    { label: t('entity_label_tax'),      value: t('entity_tax') },
    { label: t('entity_label_director'), value: t('entity_director') },
  ];

  return (
    <>
      <PageHero
        eyebrow={t('hero_eyebrow')}
        headline={t('hero_headline')}
        body={t('hero_body')}
      />

      {/* Story + Entity */}
      <section className="bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_340px] gap-12 xl:gap-20 items-start">

            {/* Story */}
            <AnimatedSection>
              <span className="inline-block px-3 py-1 bg-accent-muted text-accent text-xs font-mono tracking-[0.12em] uppercase rounded-sm mb-6">
                {t('story_tag')}
              </span>
              <h2
                className="font-display font-bold text-ink leading-tight tracking-tight mb-6"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
              >
                {t('story_headline')}
              </h2>
              <div className="flex flex-col gap-5 text-ink-mid leading-relaxed">
                <p>{t('story_p1')}</p>
                <p>{t('story_p2')}</p>
              </div>
            </AnimatedSection>

            {/* Entity card */}
            <AnimatedSection delay={0.1}>
              <div className="rounded border border-border bg-surface-alt p-6 sm:p-7">
                <p className="text-xs font-mono tracking-[0.12em] uppercase text-ink-muted mb-5">
                  {t('entity_tag')}
                </p>
                <dl className="flex flex-col gap-3.5">
                  {entityRows.map((row) => (
                    <div key={row.label} className="grid grid-cols-[120px_1fr] gap-2 text-sm">
                      <dt className="text-ink-muted shrink-0">{row.label}</dt>
                      <dd className="text-ink font-medium">{row.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 pt-5 border-t border-border">
                  <Link
                    href="/legal/imprint"
                    className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-deep transition-colors duration-150"
                  >
                    {t('imprint_link')}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-bg py-20 sm:py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <span className="inline-block px-3 py-1 bg-accent-muted text-accent text-xs font-mono tracking-[0.12em] uppercase rounded-sm mb-10">
              {t('leadership_tag')}
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.06} className="max-w-xl">
            <div className="border border-border rounded bg-surface p-7 sm:p-8">
              <p className="font-display font-medium text-ink text-xl mb-0.5">
                {t('director_name')}
              </p>
              <p className="text-sm text-ink-muted mb-5">{t('director_title')}</p>
              <p className="text-ink-mid leading-relaxed text-sm">{t('director_bio')}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
