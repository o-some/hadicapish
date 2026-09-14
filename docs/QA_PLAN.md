# QA plan

- Viewports: 390×844, 768×1024, 1024×768, 1440×900
- Keyboard: skip link, navigation, pricing toggles, wizard choices, dialog close
- Motion: `prefers-reduced-motion: reduce`
- Functional: five-step qualification flow, required fields, waitlist switch, central pricing
- Time: browser local zone shown alongside `Europe/Berlin`; live inventory remains blocked until calendar API exists
- Release: `npm run build` must fail while placeholders and approvals remain
- Security: no secrets, card data or payment tokens in frontend; server adapter required
- SEO: titles/descriptions, semantic headings, structured data, noindex/robots on preview
