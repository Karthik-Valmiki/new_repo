# GigShield — AI-Powered Parametric Insurance for Food Delivery Partners

> Guidewire DEVTrails 2026 | Phase 1 Submission

---

## The Problem

India's food delivery partners (Zomato, Swiggy) earn between ₹5,000–₹8,000 per week, paid per delivery with no fixed salary. Their income is entirely dependent on being on the road. When external disruptions hit — a sudden downpour, a heatwave, an AQI spike, a local curfew — deliveries stop. Demand collapses. Earnings go to zero.

This isn't occasional. Heavy rain events in metros occur 30–40 times annually during monsoon. Each event wipes 20–30% of that week's income. There is no safety net. No insurance product exists for this. Workers absorb the entire loss.

**GigShield changes that.** A parametric insurance platform that detects disruptions automatically, validates worker activity in real time, and credits lost income to the worker's wallet — every 10 minutes, without a single manual claim.

---

## Persona and Scenario

### Who We Are Building For

**Ravi, 28 — Swiggy Delivery Partner, Hyderabad**

- Works 9–11 hours/day, 6 days a week
- Earns approximately ₹80/hour, fully variable
- Operates in 2–3 fixed delivery zones
- Has no financial buffer; week-to-week income = week-to-week survival
- Has never filed an insurance claim in his life and doesn't know how to

### Scenario Without GigShield

It's a Tuesday evening — peak dinner hours. Rain begins at 6:45 PM, intensity: 65 mm/hour. The Swiggy app goes quiet. No new orders. Ravi waits under a petrol station canopy for 90 minutes. He earns ₹0 during what should have been his best earning window of the day. He does this 3–4 times a month during monsoon season. No one compensates him.

### Scenario With GigShield

At 6:47 PM, GigShield's trigger engine detects rainfall crossing the 50 mm/hour threshold across two independent data sources. Ravi's GPS confirms he is within his registered zone. His app session is active. A delivery attempt was logged 18 minutes ago.

At 6:50 PM — ₹13.3 credited to wallet.
At 7:00 PM — ₹13.3 credited.
At 7:10 PM — ₹13.3 credited.

By 8:15 PM when the rain stops, Ravi has received ₹93.1 — compensating approximately 60% of his lost earning window. No form filled. No call made. No claim submitted.

---

## Application Workflow

```
Worker Registration and KYC
        ↓
Risk Profiling (Zone + Behavior + History)
        ↓
Weekly Premium Calculation (AI-driven multiplier)
        ↓
Policy Purchase (Sunday window only)
        ↓
Policy Activation (24-hour delay — adverse selection guard)
        ↓
Continuous Trigger Monitoring (every 10 minutes via external APIs)
        ↓
Disruption Detected → Multi-source consensus check
        ↓
Activity Validation (GPS + Session + Delivery Attempt)
        ↓
Fraud Scoring (real-time, per interval)
        ↓
Interval Payout Calculation (every 10 minutes during disruption)
        ↓
Instant Wallet Credit
```

---

## Weekly Premium Model

Gig workers are paid weekly and think in weekly cycles. The premium model is designed to match that — affordable, transparent, and recalculated each week based on real risk.

### Core Formula

```
Weekly Premium = Base Rate x Risk Multiplier
```

### Base Rate

The Base Rate is a system-level constant representing the expected payout cost in the lowest-risk scenario, plus an operational margin.

```
Avg weekly income           = ₹5,600
Hourly income               = ₹80
Avg disruption (low-risk)   = 5 hours/week
Disruption probability      = 10%

Expected weekly payout      = 80 x 5 x 0.1 = ₹40
Base Rate                   = ₹50  (₹40 expected payout + ₹10 margin)
```

### Risk Multiplier

The Risk Multiplier is calculated per user, per week, and adjusts the Base Rate based on four real-world factors.

```
Risk Multiplier = Location Risk x Weather Risk x Behavior Risk x Claim Risk
```

| Component | What It Captures |
|---|---|
| Location Risk | Whether the worker operates in a flood-prone or high-AQI zone |
| Weather Risk | Forecast-based disruption probability for the coming week |
| Behavior Risk | Worker's active hours consistency — irregular workers carry higher risk |
| Claim Risk | Historical payout frequency for this worker |

### Example Premium Calculation

```
Base Rate    = ₹50
Multiplier   = 1.4  (moderate risk zone, active monsoon forecast)
Premium      = ₹70/week
```

For a worker earning ₹5,600/week, this is 1.25% of weekly income — less than the cost of one skipped meal.

---

## Parametric Trigger Definitions

GigShield does not wait for workers to report disruptions. Triggers fire automatically when measurable environmental thresholds are crossed.

| Disruption Type | Trigger Threshold |
|---|---|
| Heavy Rainfall | >= 50 mm/hour |
| Extreme Heat | >= 40 degrees C |
| Severe AQI | >= 300 (Hazardous category) |
| Flood Advisory | Binary — official government alert |
| Local Curfew / Zone Closure | Binary — verified official notification |

### Data Sources

- OpenWeather API (primary)
- IMD — India Meteorological Department (secondary / validation)
- OpenAQ (AQI monitoring)
- Government and municipal alert feeds (curfew and flood advisories)

### Consensus Rule

A trigger activates only when at least two independent data sources confirm the threshold is crossed. A single API reporting anomalous data does not trigger a payout. This multi-source validation is the foundation of the system's reliability and false-positive resistance.

---

## Interval-Based Payout Model

This is GigShield's core design innovation.

Traditional insurance waits for a disruption to end, then calculates and disburses a lump sum. This creates delays, disputes about when a disruption started or ended, and leaves workers with nothing while the event is ongoing.

GigShield pays in fixed 10-minute intervals throughout the disruption. As long as the trigger condition holds and the worker remains active and validated, a payout is issued every 10 minutes — money moves in real time, as income is being lost.

### Payout Formula

```
Interval Payout = (Hourly Income / 6) x Eligibility

Hourly income  = ₹80
Per interval   = ₹13.3 every 10 minutes
```

### Worked Example — 30-Minute Rain Event

| Time Window | Trigger Active | Worker Eligible | Payout |
|---|---|---|---|
| 6:50 – 7:00 PM | Yes | Yes | ₹13.3 |
| 7:00 – 7:10 PM | Yes | Yes | ₹13.3 |
| 7:10 – 7:20 PM | Yes | Yes | ₹13.3 |
| Total | | | ₹40 |

Coverage cap: Payouts are limited to 50–60% of weekly income. This prevents moral hazard, keeps premiums affordable, and ensures pool sustainability.

---

## Activity Validation

Before any interval payout is issued, the worker must satisfy all three conditions simultaneously in the current window:

```
1. GPS coordinates fall within the registered delivery zone
2. App session is active at time of check
3. At least one delivery attempt logged in the last 30 minutes
```

A worker who has gone home for the day, despite a live disruption in their zone, does not receive a payout.

---

## Fraud Detection System

### Fraud Score Model

```
Fraud Score = w1*(GPS zone mismatch)
            + w2*(No activity signal)
            + w3*(Historical claim anomaly)
            + w4*(Device integrity flag)
```

Weights are calibrated based on observed fraud patterns. The model runs at every payout interval check.

### Decision Logic

| Score Band | Action |
|---|---|
| Low (0.0 – 0.3) | Automatic payout proceeds |
| Medium (0.3 – 0.7) | Payout held; manual review triggered |
| High (0.7 – 1.0) | Payout blocked; account flagged |

### Fraud Scenarios Covered

- GPS spoofing (fake location to appear within zone)
- Session spoofing (app kept open with no real delivery activity)
- Duplicate claim submission across devices
- Coordinated fraud (multiple accounts sharing the same device fingerprint)

---

## Adverse Selection Prevention

Without guardrails, workers would purchase policies only when they know a storm is approaching — destroying the risk pool's economics. Three mechanisms prevent this:

1. **Sunday-only purchase window** — policies can only be bought on Sundays, before the week begins
2. **24-hour activation delay** — policy goes live Monday morning, not immediately after purchase
3. **Dynamic pricing** — the Weather Risk multiplier increases in weeks with high-risk forecasts, making adverse selection financially unattractive

---

## AI/ML Integration Plan

### 1. Risk Prediction Model

Used to calculate the Weather Risk and Location Risk components of the multiplier.

- Inputs: Historical weather data per zone, historical disruption frequency, seasonal patterns
- Output: Disruption probability for the coming week (0–1 score)
- Approach: LightGBM classifier trained on historical IMD weather data and claim patterns
- Cadence: Runs every Sunday to recalculate each active policy's multiplier for the coming week

### 2. Dynamic Pricing Engine

Ensures premiums remain actuarially sound week over week.

- Adjusts the Risk Multiplier based on incoming forecast data, worker behavior consistency, and claim history
- Prevents static pricing from under-pricing high-risk weeks or over-pricing low-risk weeks
- Workers operating in historically safe zones pay less; zones with frequent disruptions price accordingly

### 3. Fraud Detection Model

- Approach: Isolation Forest for anomaly detection on GPS patterns, session behavior, and claim frequency
- Each worker builds a behavioral baseline over their first four weeks on the platform
- Deviations from personal baseline automatically raise the Fraud Score
- For Phase 1 MVP: rule-based thresholds function as a proxy until sufficient training data exists

---

## Tech Stack

| Layer | Technology | Justification |
|---|---|---|
| Frontend | React (Web MVP) | Fast iteration, stable demo environment, platform-agnostic |
| Backend | FastAPI (Python) | Async support, clean ML integration, lightweight and fast |
| Database | PostgreSQL | Relational model fits policy, claim, and payout data structure |
| ML | Scikit-learn / LightGBM | Well-documented, sufficient for model complexity at this stage |
| Weather APIs | OpenWeather + IMD mock | Free tier sufficient; mock fallback ensures demo stability |
| AQI APIs | OpenAQ with mock fallback | Real data available; mock covers demo edge cases |
| Payments | Razorpay test mode | Native UPI support, standard Indian payment infrastructure |

Production roadmap targets a React Native mobile app from Phase 2 onwards — enabling GPS background tracking, push notifications for payout confirmations, and native app session detection.

---

## Development Plan

### Phase 1 — Ideation and Foundation (Current)

- Complete system architecture and end-to-end workflow design
- Weekly pricing model with full numerical validation
- Parametric trigger definitions and multi-source consensus rule
- Interval-based payout model design and justification
- Fraud detection model design and scoring logic
- Business model and loss ratio analysis
- Web MVP scaffold with mock trigger simulation

### Phase 2 — Automation and Protection

- Worker registration and onboarding flow
- Policy creation with live dynamic premium calculation
- Trigger engine with real API integration (OpenWeather, OpenAQ)
- Claims management backend (zero-touch, fully automated)
- 3–5 automated trigger types running end-to-end
- Fraud scoring integrated into payout pipeline

### Phase 3 — Scale and Optimise

- ML-based fraud detection model with behavioral baselines
- Instant payout system via Razorpay test mode (UPI simulation)
- Worker dashboard: earnings protected, active coverage, payout history
- Admin dashboard: loss ratios, disruption forecast, risk zone analytics
- Final demo with live simulated disruption triggering full automated payout flow

---

## Business Model

```
Revenue    = Total Premium Collected
Cost       = Total Payouts + Operational Cost

Loss Ratio = Total Payout / Total Premium
Target     = 0.6 – 0.8
```

A loss ratio of 0.6–0.8 means for every ₹100 collected in premiums, ₹60–₹80 is returned to workers as payouts. This is the industry-standard sustainability target for a worker-centric insurance product.

### Sustainability Mechanisms

- Coverage cap (60% of weekly income) prevents moral hazard
- Dynamic weekly pricing adjusts to actual forecast risk, not averages
- Zone-level risk segmentation prevents low-risk workers from over-subsidizing high-risk zones
- Large user base enables risk pooling — individual high-payout events are absorbed across the pool

---

## Why This Approach Stands Out

**Zero-touch claims.** The worker never files anything. Disruption is detected, eligibility is validated, and money moves — automatically.

**Real-time compensation.** Payouts happen during the disruption, not days after. A worker sitting in the rain at 7:00 PM sees money in their wallet by 7:10 PM. This is genuine income protection, not reimbursement.

**Actuarially grounded.** The pricing model, coverage cap, adverse selection guardrails, and loss ratio target are not approximations — they reflect how insurance economics actually work.

**Built for the actual user.** Ravi doesn't know what parametric insurance is. He doesn't need to. He sees: "₹70/week. Automatic protection. Money arrives when rain stops my work." That is the product.
