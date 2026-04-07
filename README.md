# VERO — Implementation Approach
### Theme: "Perfect for Your Worker"
> What to build, how to build it, what to watch out for.

---

## What We're Actually Starting From

Before getting into what to add, here is an honest read of what already exists and what is missing.

**Already working:**
- Trigger engine fires correctly — weather, AQI, platform blackout, social disruption all validated
- Payout engine processes intervals in the background with shift overlap, weekly cap, and activation window checks
- One fraud check exists: `RiderActivityLog` — rider must have a logged activity in the zone within 30 minutes of the trigger
- Admin dashboard endpoint returns loss ratio, active disruptions, recent payouts
- Rider dashboard returns R-score, premium comparison, payout history
- Mock API layer simulates all four external data sources realistically
- Simulator page lets you fire triggers manually and see results

**What is missing or incomplete:**
- Fraud detection is a single activity-log check — the GPS spoofing, cross-city registration abuse, and coordinated ring detection described in the README are not implemented
- Zone-level premium differentiation within a city is not applied — a Chennai rider in Adyar and a Chennai rider in T.Nagar pay the same premium because `compute_coverage_and_premium` uses city-level risk, not zone-level risk
- Payment gateway integration is absent — the Payment page activates a policy directly without any Razorpay or UPI flow
- Admin dashboard has no predictive analytics — it shows current state only, no next-week forecast
- Worker dashboard has no "earnings protected" summary — it shows payout history but not a clear "you saved ₹X this week" framing
- No admin frontend page exists — the `/dashboards/admin/summary` endpoint exists but there is no UI for it

---

## 1. Advanced Fraud Detection

### What the problem actually is

Three distinct fraud vectors need to be addressed:

**Vector 1 — GPS spoofing (fake zone presence)**
A rider registers in Bengaluru (higher risk multiplier, higher potential payout) but is physically in Hyderabad. They spoof their GPS to appear in a Bengaluru zone during a trigger event.

**Vector 2 — Cross-city registration abuse**
A rider deliberately registers in a high-risk city zone to get higher coverage, while actually working in a lower-risk city. This is not GPS spoofing — it is registration fraud at onboarding.

**Vector 3 — Coordinated ring (temporal clustering)**
500 riders in the same zone all trigger payouts within a narrow time window simultaneously, while no actual delivery slowdown is detectable in that zone.

### Approach

**For GPS spoofing and zone presence:**

The current system has one check: `RiderActivityLog` must have an entry for the rider in the zone within 30 minutes. This is the right foundation but it is too easy to fake — a single log entry can be manufactured.

The approach is to make zone presence harder to fake by requiring *behavioral consistency*, not just presence:

- Track `RiderActivityLog` entries over the past 7 days per zone, not just the last 30 minutes
- A rider who has zero or near-zero historical activity in a zone but suddenly appears during a trigger event is flagged
- This is a `fraud_score` field added to the payout record — not an outright block, but a flag for review
- The score is computed as: `(activity_entries_in_zone_last_7d / avg_zone_activity_last_7d)` — a ratio below 0.2 flags the payout

The key insight: you cannot fake a week of delivery history in a zone. A spoofer who just registered or just moved zones has no history. A genuine rider who works that zone every day has plenty.

**For cross-city registration abuse:**

At registration, the rider declares their city. The zone they pick must belong to that city — this is already enforced by the zone picker (zones are filtered by city). The gap is that nothing stops a rider from declaring "Bengaluru" while actually working in Hyderabad.

The approach: when a rider logs activity (the `POST /tracking/activity` call that already exists), record the zone. If a rider's activity logs over 4+ weeks consistently show a different city's zones than their registered city, flag the profile for review. This is a passive detection — it does not block payouts immediately, it surfaces an anomaly.

**For coordinated ring detection:**

The Isolation Forest model described in the README is Phase 2 (requires real training data). For the MVP, a rule-based version is sufficient and demonstrable:

- When a trigger event fires, count how many riders in the zone triggered within the same 15-minute window
- Compare this to the zone's historical average trigger rate (seeded as a baseline)
- If the count exceeds 3× the historical average, mark the event as `ring_candidate = true` in `TriggerEvent.event_metadata`
- Payouts for ring-candidate events are flagged but not blocked — they appear in the admin dashboard under "Fraud Flags"

**What this looks like in the codebase:**

- Add `fraud_score` (Numeric) to the `Payout` model
- Add `ring_candidate` flag to `TriggerEvent.event_metadata` (already JSONB — no schema change needed)
- In `payout_engine.py`, compute fraud score per rider before creating the payout record
- In `trigger_engine.py`, compute ring detection before queuing payouts
- Admin dashboard endpoint surfaces flagged payouts and ring-candidate events

**Pros:**
- No GPS hardware required — purely behavioral, works in a demo environment
- Builds on existing `RiderActivityLog` infrastructure
- Rule-based ring detection is explainable and demonstrable without ML training data
- Does not block genuine riders — flags for review, preserving the "honest riders are insulated" promise from the README

**Cons:**
- Week-1 riders have no history, so the zone consistency check cannot apply to them — they get a neutral fraud score by default
- Ring detection threshold (3× average) is a heuristic — in production this would be tuned on real data
- Cross-city detection is passive — it surfaces anomalies after the fact, not at registration time

---

## 2. Zone-Level Premium Differentiation

### What the problem actually is

`compute_coverage_and_premium` in `auth.py` uses `city.default_risk_multiplier` for all riders in a city. But `GeoZone` already has `base_risk_multiplier` per zone. A Chennai rider in Adyar (zone risk 1.25) and a Chennai rider in T.Nagar (zone risk 1.20) pay the same premium. The data is there — it is just not being used.

### Approach

The fix is a one-line change in `compute_coverage_and_premium`: replace `city.default_risk_multiplier` with `zone.base_risk_multiplier` when a zone is available, falling back to city-level when it is not.

```
Risk Multiplier = zone.base_risk_multiplier  (if zone exists)
               = city.default_risk_multiplier (fallback for new users with no zone)
```

This immediately makes premiums zone-specific. A rider in Connaught Place (Delhi, 1.20×) pays differently from a rider in Lajpat Nagar (Delhi, 1.15×). The difference is small but real and demonstrable.

**For the cross-city registration fraud vector:** zone-level premiums also make the fraud less attractive. If a rider registers in Bengaluru Indiranagar (1.15×) but works in Hyderabad Central (1.05×), they are paying a higher premium for a zone they do not actually work in — the fraud costs them money rather than saving it.

**What this looks like in the codebase:**

- Modify `compute_coverage_and_premium` in `auth.py` to accept zone and use `zone.base_risk_multiplier`
- Update all callers: `dashboards.py` (rider dashboard), `policies.py` (quote endpoint), `insurance.py`
- The zone is already fetched in `dashboards.py` — it just needs to be passed through

**Pros:**
- Minimal code change — the data model already supports this
- Immediately visible in the demo: log in as Deepa (Chennai T.Nagar) vs a rider in Adyar and see different premiums
- Makes the fraud economics worse for cross-city abusers

**Cons:**
- Week 1–4 riders use city-level defaults per the README spec — zone-level only kicks in from week 5. This means the differentiation is only visible for returning demo riders, not new registrations
- Zone risk multipliers are currently seeded as static values — in production these would update weekly based on forecast data

---

## 3. Payment Gateway Integration (Razorpay Test Mode)

### What the problem actually is

The Payment page currently calls `POST /policies/purchase` directly. There is no payment step — the policy just activates. For the demo, this needs to show a real payment flow even if no money moves.

### Approach

**Why Razorpay over Stripe or UPI simulator:**

Razorpay has a proper test mode with a JavaScript SDK that works in a browser without any server-side webhook setup. Stripe requires webhook configuration. A raw UPI simulator would be custom-built. Razorpay test mode is the fastest path to a working demo.

**The flow:**

1. Rider clicks "Activate Protection" on the Payment page
2. Frontend calls `POST /policies/create-order` — backend creates a Razorpay order via the Razorpay API (test keys) and returns `order_id` and `amount`
3. Frontend opens the Razorpay checkout modal using the Razorpay JS SDK (loaded via CDN in `index.html`)
4. Rider completes payment in the modal using Razorpay test card/UPI credentials
5. Razorpay calls `payment.success` handler in the frontend with `razorpay_payment_id`, `razorpay_order_id`, `razorpay_signature`
6. Frontend calls `POST /policies/verify-payment` with those three values
7. Backend verifies the HMAC signature using the Razorpay secret key, then activates the policy
8. Rider lands on dashboard with active policy

**For payouts (simulated):**

Real Razorpay payouts require a business account and KYC. For the demo, the payout engine continues to write `Payout` records with `status = SUCCESS` as it does now — but the dashboard and claims page display these as "Transferred to UPI: {rider.upi_id}" with a mock transaction reference. This is honest simulation — it shows the flow without claiming real money moved.

**What this looks like in the codebase:**

- Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to `.env` (test keys from Razorpay dashboard — free to create)
- Add `razorpay` Python package to `requirements.txt`
- Add two new endpoints to `policies.py`: `POST /policies/create-order` and `POST /policies/verify-payment`
- Modify `Payment.jsx` to load Razorpay SDK and open the checkout modal instead of calling purchase directly
- Payout display in `Claims.jsx` adds a mock UPI reference number alongside each payout record

**Pros:**
- Razorpay test mode is free, requires no real money, and produces a realistic checkout experience
- HMAC signature verification is real cryptographic validation — not just a mock
- The flow is identical to production — only the keys change
- Demonstrates the full payment lifecycle to evaluators

**Cons:**
- Requires a Razorpay account (free to create, takes 5 minutes)
- Test mode checkout modal looks slightly different from production (has a "Test Mode" banner)
- Razorpay SDK loads from CDN — requires internet connection during demo
- Payout side remains simulated — cannot demonstrate real UPI transfers without business KYC

---

## 4. Live Trigger Integration (Real API Calls)

### What the problem actually is

All four trigger types currently use `mock_api.py` — static hardcoded data. The README specifies OpenWeatherMap, Tomorrow.io, IQAir, and DownDetector as real sources. For the demo, at least one trigger type should pull live data.

### Approach

**Which trigger to make live first:**

Weather (OpenWeatherMap) is the easiest — free tier, no approval required, returns data for Indian cities immediately. AQI via IQAir also has a free tier. Platform outage (DownDetector) requires scraping which is fragile. Social disruption (NewsAPI) requires a key but is straightforward.

**Recommended: Weather + AQI live, Platform + Social remain mock**

OpenWeatherMap free tier gives current weather for any city. The call is:
```
GET https://api.openweathermap.org/data/2.5/weather?q={city}&appid={key}
```
This returns rainfall (in `rain.1h`), wind speed, and weather condition — exactly what the trigger engine needs.

IQAir free tier gives AQI for Indian cities:
```
GET https://api.airvisual.com/v2/city?city={city}&state={state}&country=India&key={key}
```

**The integration approach:**

- Add `OPENWEATHER_API_KEY` and `IQAIR_API_KEY` to `.env`
- In `mock_api.py`, add a `USE_LIVE_APIS` flag (read from env)
- When `USE_LIVE_APIS=true`, `fetch_weather` and `fetch_aqi` make real HTTP calls; when false, they return the existing mock data
- The trigger engine does not change — it consumes the same dict structure regardless of source
- If the live API call fails (network error, rate limit), fall back to mock data silently

This means the demo works offline (mock mode) and online (live mode) with a single env variable toggle.

**For DownDetector (platform outage):**

DownDetector does not have a public API. The README mentions a "custom scraper." For the demo, the mock data is sufficient and honest — the README explicitly says this is the source. A real scraper would parse the DownDetector status page HTML, which is fragile and not worth building for a hackathon.

**Pros:**
- Live weather and AQI data makes the demo genuinely real — if it is raining in Delhi during the demo, the trigger fires on real data
- Fallback to mock means the demo never breaks due to API issues
- Free tier keys are sufficient for demo volume
- No change to trigger engine architecture

**Cons:**
- OpenWeatherMap free tier has a 60 calls/minute limit — fine for demo, not for production
- Live data means trigger thresholds may not be met during the demo (it might not be raining) — mock mode remains necessary for reliable demos
- IQAir free tier is 10,000 calls/month — sufficient but requires monitoring
- Zone-level granularity from OpenWeatherMap is city-level, not pin-code level — the zone-specific data in mock_api.py is more granular than what the free API provides

---

## 5. Intelligent Dashboard

### Worker Dashboard — "Earnings Protected"

**What is missing:**

The current rider dashboard shows payout history as a list of amounts. It does not frame this as "income protected" — the core value proposition. A rider should see: "This week, VERO protected ₹162 of your income."

**What to add:**

- "Earnings Protected This Week" — sum of payouts in the current policy week, displayed prominently as a hero number
- "Total Saved Since Joining" — cumulative payouts received vs cumulative premiums paid, showing net benefit
- "Coverage Utilization" — cap used vs cap available, already partially shown but needs clearer framing
- "Your Zone Risk This Week" — the risk multiplier for their zone, with a plain-language explanation ("Your zone has a 1.25× risk rating — disruptions are more likely here")
- "Next Disruption Probability" — a simple forecast based on the zone's risk multiplier and any upcoming weather signals (this can be rule-based: high multiplier + bad forecast week = "High" probability)

All of this data is already available from the existing `/dashboards/rider/me` endpoint — it is a frontend framing change, not a backend change.

### Admin Dashboard — Loss Ratios + Predictive Analytics

**What is missing:**

The admin endpoint exists (`/dashboards/admin/summary`) but there is no frontend page for it. The endpoint returns loss ratio, active disruptions, and recent payouts — but no predictive analytics.

**What to add to the backend:**

A new endpoint `GET /dashboards/admin/predictive` that returns:

- Next week's expected claim volume per zone — based on zone risk multiplier × number of active policies in that zone × historical trigger frequency
- Expected loss ratio for next week — (expected claims) / (expected premium revenue)
- Zones at highest risk next week — ranked by expected claim volume
- Rider segments most likely to claim — new users (week 1–2, fixed 40% coverage) vs returning users (higher coverage, more history)

This is deterministic math, not ML — it uses the existing zone risk multipliers and policy counts. The formula:

```
Expected claims next week (zone Z) =
  active_policies_in_zone(Z)
  × zone_risk_multiplier(Z)
  × historical_trigger_rate(Z)   ← seeded as a baseline per zone
  × avg_payout_per_event(Z)      ← derived from existing payout history
```

**What to add to the frontend:**

A new `/admin` route (no auth required for demo — admin login is out of scope) with:

- Network health panel: total riders, active policies, loss ratio gauge (target 0.40–0.60)
- Live disruptions: active trigger events with zone, type, riders affected
- Fraud flags: payouts with fraud_score above threshold, ring-candidate events
- Predictive panel: next week's expected claims by zone, risk heatmap (text-based for demo — a table ranked by risk, not a map)
- Premium vs payout chart: weekly bars showing revenue collected vs claims paid (using existing payout and policy data)

**Pros:**
- Worker dashboard changes are frontend-only — no backend work needed
- Admin predictive analytics uses deterministic math — no ML training data required
- Loss ratio is already computed in the backend — just needs to be surfaced in a UI
- Fraud flags surface the fraud detection work from section 1 — the two features reinforce each other

**Cons:**
- Predictive analytics accuracy depends on the quality of seeded baseline trigger rates — with synthetic data, the numbers will look plausible but not calibrated
- Admin dashboard has no authentication — acceptable for a hackathon demo, not for production
- "Next disruption probability" on the worker dashboard is a risk multiplier proxy, not a real forecast — it will not change day-to-day without live weather integration

---

## Workflow Summary

Here is the order to build these in, from least to most complex:

### Step 1 — Zone-level premiums (30 minutes)
Fix `compute_coverage_and_premium` to use zone risk multiplier. Update callers. Immediately visible in demo — different premiums for different zones in the same city.

### Step 2 — Worker dashboard framing (1–2 hours)
Add "Earnings Protected This Week" and "Total Saved" to the existing Dashboard.jsx. All data is already in the API response. Pure frontend work.

### Step 3 — Fraud detection (2–3 hours)
Add `fraud_score` to Payout model. Add zone consistency check in payout_engine.py. Add ring detection in trigger_engine.py. Surface flags in admin endpoint.

### Step 4 — Admin dashboard frontend (2–3 hours)
New `/admin` route in React. Calls existing `/dashboards/admin/summary`. Add predictive endpoint to backend. Display loss ratio, fraud flags, predictive table.

### Step 5 — Razorpay payment integration (2–3 hours)
Add Razorpay keys to env. Add create-order and verify-payment endpoints. Modify Payment.jsx to open Razorpay modal. Add mock UPI reference to payout display.

### Step 6 — Live API integration (1–2 hours, optional)
Add `USE_LIVE_APIS` flag. Implement live fetch_weather and fetch_aqi with fallback. Test with real keys.

---

## What to Prioritize for the Demo

If time is limited, the order of impact for evaluators is:

1. **Zone-level premiums** — immediately visible, zero risk, proves the system is genuinely personalized
2. **Razorpay payment** — the most visible "wow" moment for evaluators — a real checkout modal
3. **Admin dashboard frontend** — loss ratio and fraud flags are exactly what the theme asks for
4. **Worker dashboard framing** — "earnings protected" is the emotional core of the product
5. **Fraud detection** — important for the theme but invisible unless you look at the data
6. **Live APIs** — impressive but risky if the demo environment has no internet

---

## Risks and Mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Razorpay test mode checkout fails during demo | Low | Keep direct-purchase fallback in Payment.jsx behind a toggle |
| Live API rate limit hit during demo | Medium | `USE_LIVE_APIS=false` by default; enable only when demonstrating |
| Fraud score computation slows down payout processing | Low | Fraud score is a simple ratio — microseconds to compute |
| Admin dashboard has no auth — evaluator concern | Low | Add a note in the UI: "Admin view — demo only, no auth required" |
| Zone risk multipliers are static — evaluator asks why they don't change | Medium | Explain the Sunday recalculation design; show the multiplier values differ by zone |
| Predictive analytics numbers look made up | Medium | Show the formula in the UI tooltip — deterministic math is more credible than a black box |
