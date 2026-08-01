"use client";

import { useEffect } from "react";

type ThemePreference = "light" | "dark" | "system";

export function StaticPageBehaviors() {
  useEffect(() => {
    const root = document.documentElement;
    const header = document.getElementById("site-header");
    const nav = document.getElementById("nav-menu");
    const toggle = document.getElementById("nav-toggle");
    const themeButton = document.getElementById("theme-toggle");
    const progress = document.getElementById("progress");
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (!header || !nav || !toggle) return;

    const cleanups: Array<() => void> = [];
    const listen = (target: EventTarget, type: string, listener: EventListener) => {
      target.addEventListener(type, listener);
      cleanups.push(() => target.removeEventListener(type, listener));
    };
    /* The open menu is a full-screen panel below the header, so the page behind
       it must not scroll. Same lock the wholesale modal uses. */
    const setMenu = (open: boolean) => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      root.classList.toggle("nav-locked", open);
    };
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      progress?.style.setProperty("--sp", value.toFixed(4));
    };
    let themePreference: ThemePreference = "light";
    const storedTheme = (): ThemePreference => {
      try {
        const value = window.localStorage.getItem("rmt-theme");
        if (value === "light" || value === "dark" || value === "system") return value;
      } catch {}
      return "light";
    };
    const applyTheme = (preference: ThemePreference, persist: boolean) => {
      themePreference = preference;
      const resolved = preference === "system" ? (darkQuery.matches ? "dark" : "light") : preference;
      root.setAttribute("data-theme", resolved);
      root.setAttribute("data-theme-preference", preference);
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", resolved === "dark" ? "#05192A" : "#022F50");
      if (themeButton) {
        themeButton.querySelectorAll<HTMLElement>("[data-theme-option]").forEach((option) => {
          const selected = option.dataset.themeOption === preference;
          option.setAttribute("aria-checked", selected ? "true" : "false");
          option.tabIndex = selected ? 0 : -1;
        });
      }
      if (persist) {
        try { window.localStorage.setItem("rmt-theme", preference); } catch {}
      }
    };

    listen(toggle, "click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
    listen(nav, "click", (event) => {
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (anchor) setMenu(false);
    });
    listen(document, "click", (event) => {
      const target = event.target as Node | null;
      if (target && !nav.contains(target) && !toggle.contains(target)) setMenu(false);
    });
    listen(document, "keydown", (event) => {
      if ((event as KeyboardEvent).key === "Escape") setMenu(false);
    });
    listen(window, "resize", () => { if (window.innerWidth > 900) setMenu(false); });
    listen(window, "scroll", updateProgress);

    if (themeButton) {
      listen(themeButton, "click", (event) => {
        const option = (event.target as Element | null)?.closest<HTMLElement>("[data-theme-option]");
        const preference = option?.dataset.themeOption;
        if (preference === "light" || preference === "dark" || preference === "system") applyTheme(preference, true);
      });
      listen(themeButton, "keydown", (event) => {
        const keyboardEvent = event as KeyboardEvent;
        if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(keyboardEvent.key)) return;
        const options = Array.from(themeButton.querySelectorAll<HTMLElement>("[data-theme-option]"));
        const current = options.indexOf(document.activeElement as HTMLElement);
        if (current < 0) return;
        keyboardEvent.preventDefault();
        const direction = keyboardEvent.key === "ArrowLeft" || keyboardEvent.key === "ArrowUp" ? -1 : 1;
        const next = options[(current + direction + options.length) % options.length];
        const preference = next.dataset.themeOption as ThemePreference;
        applyTheme(preference, true);
        next.focus();
      });
    }

    const onSchemeChange = () => {
      if (themePreference === "system") applyTheme("system", false);
    };
    listen(darkQuery, "change", onSchemeChange);

    applyTheme(storedTheme(), false);
    updateProgress();
    return () => {
      cleanups.forEach((cleanup) => cleanup());
      root.classList.remove("nav-locked");
    };
  }, []);

  return null;
}
