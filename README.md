# Arsec website

React 19 + Next.js 15 App Router website based on the uploaded SaasFlow theme, with page structure from `src/Arsec_Page.xlsx` and branding from `src/Favicon.svg` / `src/Favicon.png`.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. For production, run `npm run build` then `npm start`.

## Content and routes

`src/content/pages.ts` is the central content registry. It contains every workbook section and page, with nested routes for Products, Solutions, What We Do / Capabilities, Partners / Technology Partners, and Resources. Three original introductory articles supplement the requested Blog page.

- `src/app/page.tsx`: Arsec homepage.
- `src/app/[...slug]/page.tsx`: statically generated overview, product, solution, capability, platform, resource, and article pages.
- `src/components/SiteChrome.tsx`: shared navigation, footer, searchable knowledge base, and enquiry forms.
- `src/styles/globals.css`: responsive SaasFlow-inspired green styling and local fonts.
- `public/brand/arsec.svg`: supplied Arsec mark.

The 21 Apex Systems links embedded in the workbook were reviewed as topic references. Their URLs are preserved in the `reference` property of the corresponding pages. Copy is adapted for Arsec; the reference company's customer counts, employees, offices, awards, proprietary products, and partner certifications are not attributed to Arsec.

## Content requiring owner input

The workbook gives titles but does not specify product availability, technical specifications, contact destinations, open jobs, leadership biographies, or office addresses. The relevant pages explain these missing details without inventing them. Technology ecosystem pages do not assert confirmed vendor partnership status.

Contact and career forms validate fields and download a prepared text enquiry. They do not send or store submissions. Connect a confirmed email destination, CRM, or form backend before enabling online delivery.

Set `NEXT_PUBLIC_SITE_URL` to the real deployment origin to generate a sitemap covering every route. Without it, no placeholder domain is published.

## Validation

```sh
npm run typecheck
npm run build
npm start
node scripts/check-site.mjs
```

The route check uses the successful production build manifest to request every generated page and all linked local resources. It also checks internal links and a missing-page response. Browser visual verification depends on an available connected browser.

Retain the original theme and font licenses when distributing or publishing these assets.

## Product experience redesign

The homepage, Products overview, and all four product pages now use a clean SaaS visual system inspired by the presentation approach of Zoho's People, Recruit, Campaigns, and Payroll websites. Arsec's original branding is used; no Zoho copy, dashboard screenshots, metrics, customer claims, or logo assets are reproduced.

- `src/content/products.ts`: product-specific content and design tokens for Recruit (ATS), People (HRMS), Campaigns (Mass Mail), and Payroll.
- `src/components/ProductExperience.tsx`: product landing pages, product family overview, feature sections, workflow steps, FAQs, and linked product navigation.
- `src/components/ProductDashboard.tsx`: interactive frontend previews with fictional sample records. Candidate search and stage movement; HR department filters and leave decisions; email template editing and session-only draft saving; payroll review, payslip selection, and CSV export.
- `src/styles/products.css`: product pages and dashboard layouts with responsive breakpoints.
- `public/brand/arsec-logo.svg`: full logo copied from the supplied `src/Arsec.svg`.

Dashboard changes are browser-memory-only and reset on reload. There are no email sends, payroll payments, external approvals, or database writes. Product previews illustrate proposed workflows, not verified production features. Both preview tab controls support arrow keys, Home, and End.
