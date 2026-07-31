"use client";

import { useEffect } from "react";

export function StaticPageBehaviors({ switchDark, switchLight }: { switchDark: string; switchLight: string }) {
  useEffect(() => {
    const root = document.documentElement;
    const header = document.getElementById("site-header");
    const nav = document.getElementById("nav-menu");
    const toggle = document.getElementById("nav-toggle");
    const themeButton = document.getElementById("theme-toggle");
    const progress = document.getElementById("progress");
    if (!header || !nav || !toggle) return;

    const cleanups: Array<() => void> = [];
    const listen = (target: EventTarget, type: string, listener: EventListener) => {
      target.addEventListener(type, listener);
      cleanups.push(() => target.removeEventListener(type, listener));
    };
    const setMenu = (open: boolean) => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      progress?.style.setProperty("--sp", value.toFixed(4));
    };

    listen(toggle, "click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
    listen(nav, "click", (event) => {
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (anchor?.getAttribute("aria-disabled") === "true") event.preventDefault();
      else if (anchor) setMenu(false);
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
      listen(themeButton, "click", () => {
        const theme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", theme);
        themeButton.setAttribute("aria-label", theme === "dark" ? switchLight : switchDark);
        themeButton.setAttribute("title", theme === "dark" ? switchLight : switchDark);
        try { window.localStorage.setItem("rmt-theme", theme); } catch {}
      });
    }

    updateProgress();
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [switchDark, switchLight]);

  return null;
}
