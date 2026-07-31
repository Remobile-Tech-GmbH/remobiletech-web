"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { clearConsentChoice, getConsentChoice, saveConsentChoice } from "@/lib/consent";

type ConsentBannerProps = {
  locale: string;
  ariaLabel: string;
  copy: string;
  privacyLink: string;
  acceptAll: string;
  essentialOnly: string;
};

export function ConsentBanner({
  locale,
  ariaLabel,
  copy,
  privacyLink,
  acceptAll,
  essentialOnly,
}: ConsentBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const openBanner = () => {
      try { clearConsentChoice(); } catch {}
      setVisible(true);
    };
    const handleSettingsClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (target?.closest("[data-consent-settings]")) openBanner();
    };

    const initialization = window.setTimeout(() => setVisible(!getConsentChoice()), 0);
    document.addEventListener("click", handleSettingsClick);
    return () => {
      window.clearTimeout(initialization);
      document.removeEventListener("click", handleSettingsClick);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("has-consent-banner", visible);
    return () => document.documentElement.classList.remove("has-consent-banner");
  }, [visible]);

  if (!visible) return null;

  const choose = (analytics: boolean) => {
    try { saveConsentChoice(analytics); } catch {}
    setVisible(false);
    window.dispatchEvent(new CustomEvent("rmt:consent-change", { detail: { analytics } }));
  };

  return (
    <section className="consent-banner" id="consent-banner" role="region" aria-label={ariaLabel}>
      <p>
        {copy}{" "}
        <Link href={`/${locale}/privacy`}>{privacyLink}</Link>
      </p>
      <div className="consent-banner__actions">
        <button type="button" onClick={() => choose(true)}>{acceptAll}</button>
        <button type="button" onClick={() => choose(false)}>{essentialOnly}</button>
      </div>
    </section>
  );
}
