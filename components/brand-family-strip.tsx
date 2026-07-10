'use client';

/* eslint-disable @next/next/no-img-element */
import { useTranslations } from 'next-intl';
import { AnimatedSection, StaggerGroup, StaggerItem } from '@/components/animated-section';

const brands = [
  {
    key: 'remobile_eu',
    name: 'Remobile.eu',
    logoSrc: 'https://remobile.eu/logo_remobile.svg',
    href: 'https://remobile.eu',
    descKey: 'remobile_eu_desc',
  },
  {
    key: 'handyswap',
    name: 'HandySwap.com',
    logoSrc: 'https://handyswap.com/images/logo.svg',
    href: 'https://handyswap.com',
    descKey: 'handyswap_desc',
  },
  {
    key: 'remobile_ae',
    name: 'Remobile.ae',
    logoSrc:
      'https://remobile.ae/wp-content/uploads/elementor/thumbs/WLCRvwNuTZOvUxiT-rknj3m8j1up2mkkrwwyn65akj1vlcwxdi59p0q0xde.png',
    href: 'https://remobile.ae',
    descKey: 'remobile_ae_desc',
  },
  {
    key: 'remobileb2b',
    name: 'remobileb2b.com',
    logoSrc: null,
    href: 'https://remobileb2b.com',
    descKey: 'remobile_b2b_desc',
  },
] as const;

export function BrandFamilyStrip() {
  const t = useTranslations('brands_strip');

  return (
    <section className="bg-surface-alt border-y border-border py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-8">
          <p className="text-xs font-mono tracking-[0.15em] uppercase text-ink-muted">
            {t('label')}
          </p>
        </AnimatedSection>

        <StaggerGroup className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {brands.map((brand) => (
            <StaggerItem key={brand.key}>
              <a
                href={brand.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-4 p-5 sm:p-6 bg-surface border border-border rounded hover:border-accent hover:shadow transition-all duration-200"
              >
                {/* Logo area — fixed height for visual alignment */}
                <div className="h-9 flex items-center">
                  {brand.logoSrc ? (
                    <img
                      src={brand.logoSrc}
                      alt={brand.name}
                      className="h-8 w-auto max-w-[130px] object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <span className="font-mono text-sm font-medium text-ink-mid tracking-tight">
                      {brand.name}
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-ink group-hover:text-accent transition-colors duration-150">
                    {brand.name}
                  </p>
                  <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">
                    {t(brand.descKey)}
                  </p>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
