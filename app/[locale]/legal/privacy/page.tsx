import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy_page' });
  return { title: t('meta_title') };
}

const SECTIONS = [
  's1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9',
] as const;

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy_page' });

  return (
    <div className="bg-bg min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <h1 className="font-display font-bold text-ink text-3xl sm:text-4xl mb-2">
          {t('headline')}
        </h1>
        <p className="text-xs font-mono text-ink-muted mb-8">{t('last_updated')}</p>

        <p className="text-ink-mid leading-relaxed mb-12">{t('intro')}</p>

        {/* Sections */}
        <div className="flex flex-col gap-10">
          {SECTIONS.map((k) => (
            <div key={k} className="border-t border-border pt-8">
              <h2 className="font-display font-medium text-ink text-lg mb-3">
                {t(`${k}_heading`)}
              </h2>
              <p className="text-sm text-ink-mid leading-relaxed">
                {t(`${k}_body`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
