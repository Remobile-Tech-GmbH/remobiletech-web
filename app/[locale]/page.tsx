import { Hero } from '@/components/hero';
import { BrandFamilyStrip } from '@/components/brand-family-strip';
import { StatsRow } from '@/components/stats-row';
import { WholesaleCallout } from '@/components/wholesale-callout';
import { AboutTeaser } from '@/components/about-teaser';
import { PreFooterCTA } from '@/components/pre-footer-cta';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Hero locale={locale} />
      <BrandFamilyStrip />
      <StatsRow />
      <WholesaleCallout />
      <AboutTeaser />
      <PreFooterCTA />
    </>
  );
}
