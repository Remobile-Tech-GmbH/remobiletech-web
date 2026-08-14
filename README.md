# remobiletech.com

Corporate website for **Remobile Tech GmbH** (Vienna, Austria), a mobile-device retailer and
wholesaler serving B2C and B2B customers across Europe.

Bilingual (English / German), statically rendered, with a wholesale inquiry form that delivers
by email.

---

## Stack

| | |
|---|---|
| Framework | Next.js 16.2 (App Router) |
| Runtime | Node.js 24 |
| UI | React 19, Tailwind CSS 4, plain CSS modules in `src/styles/` |
| i18n | next-intl 4 — `en` (default) and `de` |
| Animation | Motion 12 (`motion/react`) |
| Validation | Zod 4 |
| Email | Resend (wholesale inquiries) |

## Running it locally

Requires Node.js 24.

```bash
npm install
npm run dev
```

Open http://localhost:3000 — you'll be redirected to `/en`.

Other commands:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values. All three are only needed for the
wholesale inquiry form.

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key. When unset, submissions are logged to the console in development instead of sent. |
| `INQUIRY_TO` | Where inquiries are delivered. Defaults to `hallo@remobiletech.com`. |
| `INQUIRY_FROM` | Sender address. Must be a domain verified in Resend. Defaults to `website@remobiletech.com`. |

The form works without a key in development — it just won't send anything. In production,
a missing key returns a friendly error asking the visitor to email directly.

## Project structure

```
src/
├── app/
│   ├── [locale]/           the pages — one folder per route
│   │   ├── page.tsx           homepage
│   │   ├── about/             about the company
│   │   ├── wholesale/         wholesale offering
│   │   ├── contact/           contact + inquiry form
│   │   ├── imprint/           Impressum (legally required in AT/DE)
│   │   └── privacy/           privacy policy
│   ├── api/inquiry/        POST endpoint behind the inquiry form
│   ├── robots.ts           /robots.txt
│   ├── sitemap.ts          /sitemap.xml
│   └── globals.css
├── components/
│   ├── site/               header, footer, shared page shell
│   ├── home/               homepage sections and scroll behaviour
│   ├── inquiry/            the inquiry form
│   └── consent/            GDPR cookie-consent banner
├── i18n/                   locale config and request handling
├── lib/                    SEO metadata helpers, consent storage
├── styles/                 homepage stylesheet
└── proxy.ts                locale routing (redirects `/` to `/en`)

messages/
├── en.json                 all English copy
└── de.json                 all German copy

public/
└── remobile-tech-logo.svg
```

## Editing the text

**Almost no copy lives in the components** — it's all in `messages/en.json` and
`messages/de.json`, grouped by page (`Home`, `About`, `Wholesale`, `Contact`, `Imprint`,
`Privacy`, `Consent`). To change wording, edit those two files; no code changes needed.

The two files must always have **exactly the same keys**. If a key exists in one and not the
other, the build will fail on the missing locale.

## URLs and languages

Every page exists under both locales:

- `remobiletech.com/en/...` — English
- `remobiletech.com/de/...` — German

`/` redirects to `/en`. The language switcher is in the site header (and the mobile menu).
Canonical URLs, `hreflang` alternates, Open Graph tags and the sitemap are generated
automatically from `src/lib/seo.ts` — pages only supply their own title and description.

## Deployment

The site is a standard Next.js app and deploys to Vercel with no configuration: import the
repository, set the three environment variables above, and deploy. Any host that runs Node 24
works too (`npm run build` then `npm run start`).

The production domain is hardcoded as `https://remobiletech.com` in `src/app/sitemap.ts`,
`src/app/robots.ts` and `src/app/[locale]/layout.tsx`. If the site is ever served from a
different domain, update it in those three places so canonical URLs and the sitemap stay
correct.

## Privacy and consent

A consent banner gates non-essential storage and appears on first visit; the choice is stored
locally in the browser. The site sets no advertising or analytics cookies out of the box — if
analytics is added later, load it behind the existing consent check in `src/lib/consent.ts`.

## History

The current site was rebuilt from scratch in July 2026. The repository's earlier contents are
preserved under the tag `legacy-client-2026-07-10` and can be inspected at any time:

```bash
git checkout legacy-client-2026-07-10
```
