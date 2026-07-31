export const CONSENT_STORAGE_KEY = "rmt-consent";

export type ConsentChoice = {
  essential: true;
  analytics: boolean;
  ts: number;
  v: 1;
};

export function getConsentChoice(): ConsentChoice | null {
  if (typeof window === "undefined") return null;

  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(CONSENT_STORAGE_KEY) ?? "null");
    if (
      typeof value === "object" &&
      value !== null &&
      "essential" in value && value.essential === true &&
      "analytics" in value && typeof value.analytics === "boolean" &&
      "ts" in value && typeof value.ts === "number" &&
      "v" in value && value.v === 1
    ) {
      return value as ConsentChoice;
    }
  } catch {}

  return null;
}

export function saveConsentChoice(analytics: boolean): ConsentChoice {
  const choice: ConsentChoice = { essential: true, analytics, ts: Date.now(), v: 1 };
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(choice));
  return choice;
}

export function clearConsentChoice() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CONSENT_STORAGE_KEY);
}

export function hasAnalyticsConsent(): boolean {
  return getConsentChoice()?.analytics === true;
}
