"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  const cardRef = useRef<HTMLElement>(null);
  const acceptRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

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
    if (!visible) return;

    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.documentElement.classList.add("consent-locked");
    acceptRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !cardRef.current) return;
      const focusable = Array.from(cardRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.documentElement.classList.remove("consent-locked");
      returnFocusRef.current?.focus({ preventScroll: true });
      returnFocusRef.current = null;
    };
  }, [visible]);

  if (!visible) return null;

  const choose = (analytics: boolean) => {
    try { saveConsentChoice(analytics); } catch {}
    setVisible(false);
    window.dispatchEvent(new CustomEvent("rmt:consent-change", { detail: { analytics } }));
  };

  return (
    <div className="consent-layer">
      <div className="consent-layer__backdrop" aria-hidden="true" />
      <section
        className="consent-banner"
        id="consent-banner"
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
      >
        <p>
          {copy}{" "}
          <Link href={`/${locale}/privacy`}>{privacyLink}</Link>
        </p>
        <div className="consent-banner__actions">
          <button ref={acceptRef} type="button" onClick={() => choose(true)}>{acceptAll}</button>
          <button type="button" onClick={() => choose(false)}>{essentialOnly}</button>
        </div>
      </section>
    </div>
  );
}
