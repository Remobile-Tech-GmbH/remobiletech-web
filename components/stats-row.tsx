'use client';

import { useTranslations } from 'next-intl';
import { StaggerGroup, StaggerItem } from '@/components/animated-section';

export function StatsRow() {
  const t = useTranslations('stats');

  const stats = [
    { value: t('brands_value'),    label: t('brands_label') },
    { value: t('countries_value'), label: t('countries_label') },
    { value: t('units_value'),     label: t('units_label') },
    { value: t('since_value'),     label: t('since_label') },
  ];

  return (
    <section className="bg-surface border-y border-border py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StaggerGroup className="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <p
                className="font-mono text-3xl sm:text-4xl font-medium text-ink tracking-tight tabular-nums"
                aria-label={`${stat.value} ${stat.label}`}
              >
                {stat.value}
              </p>
              <p className="text-sm text-ink-muted mt-1.5">{stat.label}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
