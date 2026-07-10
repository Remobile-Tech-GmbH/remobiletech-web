/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/page-hero';
import { StaggerGroup, StaggerItem } from '@/components/animated-section';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'brands_page' });
  return { title: t('meta_title') };
}

const brands = [
  {
    key: 'remobile_eu',
    logoSrc: 'https://remobile.eu/logo_remobile.svg',
    href: 'https://remobile.eu',
    live: true,
  },
  {
    key: 'handyswap',
    logoSrc: 'https://handyswap.com/images/logo.svg',
    href: 'https://handyswap.com',
    live: true,
  },
  {
    key: 'remobile_ae',
    logoSrc:
      'https://remobile.ae/wp-content/uploads/elementor/thumbs/WLCRvwNuTZOvUxiT-rknj3m8j1up2mkkrwwyn65akj1vlcwxdi59p0q0xde.png',
    href: 'https://remobile.ae',
    live: true,
  },
  {
    key: 'remobileb2b',
    logoSrc: null,
    href: 'https://remobileb2b.com',
    live: false,
  },
] as const;

export default async function BrandsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'brands_page' });

  return (
    <>
      <PageHero
        eyebrow={t('hero_eyebrow')}
        headline={t('hero_headline')}
        body={t('hero_body')}
      />

      <section className="bg-bg py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerGroup className="grid sm:grid-cols-2 gap-5">
            {brands.map((brand) => {
              const k = brand.key;
              const ctaText = t(`${k}_cta`);
              return (
                <StaggerItem key={k}>
                  <div className="h-full flex flex-col border border-border rounded bg-surface p-7 sm:p-8 hover:border-accent hover:shadow transition-all duration-200">
                    {/* Logo */}
                    <div className="h-10 flex items-center mb-6">
                      {brand.logoSrc ? (
                        <img
                          src={brand.logoSrc}
                          alt={t(`${k}_headline`)}
                          className="h-9 w-auto max-w-[160px] object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <span className="font-mono text-base font-medium text-ink-mid">
                          {t(`${k}_headline`)}
                        </span>
                      )}
                    </div>

                    <span className="inline-block self-start px-2.5 py-0.5 bg-surface-alt text-ink-muted text-xs font-mono rounded-sm mb-3">
                      {t(`${k}_tag`)}
                    </span>

                    <h2 className="font-display font-medium text-ink text-xl mb-3">
                      {t(`${k}_headline`)}
                    </h2>

                    <p className="text-sm text-ink-mid leading-relaxed flex-1 mb-7">
                      {t(`${k}_body`)}
                    </p>

                    {brand.live ? (
                      <a
                        href={brand.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-deep transition-colors duration-150"
                      >
                        {ctaText}
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-sm text-ink-muted font-mono">
                        {ctaText}
                      </span>
                    )}
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
