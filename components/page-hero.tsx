interface PageHeroProps {
  eyebrow?: string;
  headline: string;
  body?: string;
}

export function PageHero({ eyebrow, headline, body }: PageHeroProps) {
  return (
    <section className="bg-bg pt-16 pb-14 sm:pt-20 sm:pb-16 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow && (
            <span className="inline-block px-3 py-1 bg-accent-muted text-accent text-xs font-mono tracking-[0.12em] uppercase rounded-sm mb-6">
              {eyebrow}
            </span>
          )}
          <h1
            className="font-display font-bold text-ink leading-tight tracking-tight"
            style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)' }}
          >
            {headline}
          </h1>
          {body && (
            <p className="text-lg text-ink-mid leading-relaxed mt-5 max-w-2xl">
              {body}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
