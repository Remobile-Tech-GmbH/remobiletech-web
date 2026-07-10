import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'imprint_page' });
  return { title: t('meta_title') };
}

const ROWS = [
  'company',
  'address',
  'uid',
  'tax',
  'director',
  'purpose',
  'contact',
  'authority',
] as const;

export default async function ImprintPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'imprint_page' });

  const dataRows: { label: string; value: React.ReactNode }[] = [
    { label: t('label_company'),   value: t('company_value') },
    {
      label: t('label_address'),
      value: (
        <>
          {t('address_line1')}
          <br />
          {t('address_line2')}
        </>
      ),
    },
    { label: t('label_uid'),       value: t('uid_value') },
    { label: t('label_tax'),       value: t('tax_value') },
    { label: t('label_director'),  value: t('director_value') },
    { label: t('label_purpose'),   value: t('purpose_value') },
    {
      label: t('label_contact'),
      value: (
        <a
          href={`mailto:${t('contact_value')}`}
          className="text-accent hover:text-accent-deep transition-colors duration-150"
        >
          {t('contact_value')}
        </a>
      ),
    },
    { label: t('label_authority'), value: t('authority_value') },
  ];

  const sections = [
    { heading: t('disclaimer_heading'), body: t('disclaimer_body') },
    { heading: t('links_heading'),      body: t('links_body') },
    { heading: t('copyright_heading'),  body: t('copyright_body') },
  ];

  return (
    <div className="bg-bg min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 className="font-display font-bold text-ink text-3xl sm:text-4xl mb-2">
          {t('headline')}
        </h1>
        <p className="text-sm text-ink-muted mb-10">{t('subheading')}</p>

        {/* Entity table */}
        <div className="border border-border rounded bg-surface overflow-hidden mb-12">
          <dl>
            {dataRows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-[160px_1fr] gap-4 px-6 py-4 text-sm ${
                  i < dataRows.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <dt className="text-ink-muted">{row.label}</dt>
                <dd className="text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Disclaimer sections */}
        <div className="flex flex-col gap-8">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-display font-medium text-ink text-lg mb-3">{s.heading}</h2>
              <p className="text-sm text-ink-mid leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
