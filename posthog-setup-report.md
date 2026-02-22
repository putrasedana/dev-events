<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the **DevEvent** Next.js App Router application. Here's a summary of all changes made:

## Files created

- **`instrumentation-client.ts`** — Client-side PostHog initialization using Next.js 15.3+ `instrumentation-client` convention. Initializes `posthog-js` with a reverse proxy host, error tracking (`capture_exceptions`), and debug mode in development.
- **`lib/posthog-server.ts`** — Server-side PostHog client singleton using `posthog-node`, configured for immediate event flushing (`flushAt: 1`, `flushInterval: 0`) suitable for short-lived Next.js server functions.

## Files modified

- **`next.config.ts`** — Added reverse proxy rewrites for PostHog ingestion (`/ingest/*` → `us.i.posthog.com`) and static assets, plus `skipTrailingSlashRedirect: true` to support PostHog API requests.
- **`components/ExploreBtn.tsx`** — Added `posthog-js` import and `explore_events_clicked` capture in the button's click handler.
- **`components/EventCard.tsx`** — Made component a client component (`"use client"`), added `posthog-js` import, and `event_card_clicked` capture on link click with rich properties (title, slug, location, date).

## Environment variables

The following were written to `.env.local`:
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`

## Packages installed

- `posthog-js` — Client-side analytics SDK
- `posthog-node` — Server-side analytics SDK

---

## Events instrumented

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the "Explore Events" button to scroll to the event listing | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks an event card to view details; captures `event_title`, `event_slug`, `event_location`, `event_date` | `components/EventCard.tsx` |

---

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- 📊 **Dashboard — Analytics basics**: https://us.posthog.com/project/319655/dashboard/1297234
  - 📈 [User Engagement Trend](https://us.posthog.com/project/319655/insights/35quGEbn) — Daily volume of explore clicks and event card clicks
  - 🔽 [Event Discovery Funnel](https://us.posthog.com/project/319655/insights/viGTRNlD) — Conversion from "Explore Events" click → event card click
  - 🏆 [Most Clicked Events](https://us.posthog.com/project/319655/insights/pjwM9MTG) — Horizontal bar chart of event cards ranked by click volume
  - 🗺️ [Clicks by Event Location](https://us.posthog.com/project/319655/insights/r7Wd2tIh) — Pie chart breakdown of click interest by city
  - 👥 [Daily Active Users](https://us.posthog.com/project/319655/insights/rEWo42xz) — Unique daily users interacting with explore and event cards

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
