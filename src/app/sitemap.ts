import type { MetadataRoute } from "next";

const BASE_URL = "https://remobiletech.com";
const paths = ["", "/about", "/wholesale", "/contact", "/imprint", "/privacy"] as const;
const locales = ["en", "de"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) => {
    const languages = {
      en: `${BASE_URL}/en${path}`,
      de: `${BASE_URL}/de${path}`,
      "x-default": `${BASE_URL}/en${path}`,
    };

    return locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${path}`,
      alternates: { languages },
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : path === "/wholesale" ? 0.9 : 0.7,
    }));
  });
}
