import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/page-hero';
import { AnimatedSection, StaggerGroup, StaggerItem } from '@/components/animated-section';
import { WholesaleForm } from '@/components/wholesale-form';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'wholesale_page' });
  return { title: t('meta_title') };
}

const STEPS = ['step1', 'step2', 'step3', 'step4'] as const;
const SUPPLY_ITEMS = ['supply_item1', 'supply_item2', 'supply_item3', 'supply_item4'] as const;
const FACTS = [
  { icon: '🇩🇪🇦🇹🇨🇭🇧🇪🇳🇱🇱🇺', key: 'fact1_label' },
  { icon: '📄', key: 'fact2_label' },
  { icon: '📦', key: 'fact3_label' },
  { icon: '⚡', key: 'fact4_label' },
] as const;

export default async function WholesalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'wholesale_page' });

  return (
    <>
      <PageHero
        eyebrow={t('hero_eyebrow')}
        headline={t('hero_headline')}
        body={t('hero_body')}
      />

      {/* How it works */}
      <section className="bg-surface py-20 sm:py-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <span className="inline-block px-3 py-1 bg-accent-muted text-accent text-xs font-mono tracking-[0.12em] uppercase rounded-sm mb-4">
              {t('how_tag')}
            </span>
            <h2
              className="font-display font-bold text-ink leading-tight tracking-tight"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
            >
              {t('how_headline')}
            </h2>
          </AnimatedSection>

          <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((k) => (
              <StaggerItem key={k}>
                <div className="p-6 rounded border border-border bg-bg h-full">
                  <p className="font-mono text-2xl font-medium text-accent mb-4 tabular-nums">
                    {t(`${k}_number`)}
                  </p>
                  <p className="font-medium text-ink mb-2">{t(`${k}_title`)}</p>
                  <p className="text-sm text-ink-mid leading-relaxed">{t(`${k}_body`)}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* What we supply */}
      <section className="bg-bg py-20 sm:py-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">
            <AnimatedSection>
              <span className="inline-block px-3 py-1 bg-accent-muted text-accent text-xs font-mono tracking-[0.12em] uppercase rounded-sm mb-6">
                {t('supply_tag')}
              </span>
              <h2
                className="font-display font-bold text-ink leading-tight tracking-tight mb-8"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
              >
                {t('supply_headline')}
              </h2>
              <ul className="flex flex-col gap-4" role="list">
                {SUPPLY_ITEMS.map((k) => (
                  <li key={k} className="flex items-start gap-3">
                    <span className="mt-[7px] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span className="text-ink-mid leading-relaxed">{t(k)}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="rounded border border-border bg-surface p-6 sm:p-7">
              <div className="flex flex-col gap-4">
                {FACTS.map((fact) => (
                  <div key={fact.key} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
                    <span className="text-xl shrink-0" aria-hidden="true">{fact.icon}</span>
                    <span className="text-sm text-ink-mid">{t(fact.key)}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Inquiry form */}
      <section className="bg-surface-alt py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">
            <AnimatedSection>
              <span className="inline-block px-3 py-1 bg-accent-muted text-accent text-xs font-mono tracking-[0.12em] uppercase rounded-sm mb-6">
                {t('inquiry_tag')}
              </span>
              <h2
                className="font-display font-bold text-ink leading-tight tracking-tight"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
              >
                {t('inquiry_headline')}
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <WholesaleForm />
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
