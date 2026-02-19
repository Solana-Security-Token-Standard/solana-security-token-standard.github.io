# SSTS Developer Documentation Site

This repository hosts the SSTS documentation website.

## Stack

- Next.js (App Router)
- Markdoc content pages (`src/app/**/page.md`)
- Tailwind CSS (Tailwind Plus Syntax template foundation)

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

## Content locations

- Site navigation: `src/lib/navigation.ts`
- Home page: `src/app/page.md`
- Docs pages: `src/app/docs/**/page.md`
