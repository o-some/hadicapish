# Vectora Academic — Hadi Capish

Premium English-language tutoring funnel built from `hadi_capish_caf_website_briefing_v3.md`.

## Local preview

```bash
npm install
npm run dev
```

`npm run build:preview` creates a testable preview. `npm run build` is intentionally blocked until production contact data, legal approval, image rights, payments, calendar and email configuration are complete.

## Architecture

- Static, accessible frontend suitable for GitHub Pages.
- Central prices, VAT, capacity, claims and contact data in `assets/js/config.js`.
- Booking UI uses a strict adapter boundary. No secret keys are stored client-side.
- Production checkout, double-booking protection, capacity checks, reminders and Meet links require a server-side API.
- All Hadi portraits are AI-created preview assets derived from the supplied identity reference and remain blocked from public release until written approval.

## Release

Run `npm run check:release`. Do not enable public GitHub Pages while the gate fails.
