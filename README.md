<<<<<<< HEAD
# VERO — AI-Powered Parametric Income Protection for India's Food Delivery Workers

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [What VERO Does](#3-what-vero-does)
4. [What Makes VERO Different](#4-what-makes-vero-different)
5. [Product Philosophy](#5-product-philosophy)
6. [Persona](#6-persona-food-delivery-partner-zomato--swiggy)
7. [User Categorization](#7-user-categorization--new-vs-returning)
8. [Three Core Features](#8-three-core-features)
   - 8.1 [Parametric Trigger System](#81-parametric-trigger-system)
   - 8.2 [Adaptive Weekly Premium Engine](#82-adaptive-weekly-premium-engine)
   - 8.3 [Income Continuity Guarantee](#83-income-continuity-guarantee)
9. [Payout Logic](#9-payout-logic)
10. [Policy Activation Rule](#10-policy-activation-rule)
11. [Financial Sustainability Model](#11-financial-sustainability-model)
12. [Adverse Selection Handling](#12-adverse-selection-handling)
13. [Fraud Prevention Design](#13-fraud-prevention-design)
14. [Application Workflow](#14-application-workflow)
15. [AI/ML Integration Plan](#15-aiml-integration-plan)
16. [Tech Stack](#16-tech-stack)
17. [6-Week Development Plan](#17-6-week-development-plan)
18. [Analytics Dashboard](#18-analytics-dashboard)
19. [Constraint Compliance](#19-constraint-compliance)
20. [Adversarial Defense & Anti-Spoofing Strategy](#20-adversarial-defense--anti-spoofing-strategy)

---

## 1. Executive Summary

India has over **1 million platform-based food delivery workers** on Zomato and Swiggy sustaining a ₹35,800 crore digital economy — yet not one of them has access to income protection when disruptions hit. A hailstorm, a platform outage, a city-wide bandh: the income loss happens, and nothing compensates for it.

**VERO is a parametric income protection platform built exclusively for these riders.** VERO — meaning *true* and *genuine* — reflects the core promise: coverage flows only to riders who are genuinely out there working. When a disruption is confirmed through independent third-party data, income compensation is transferred directly to the rider's UPI wallet in 30-minute intervals — automatically, with no claim form, no paperwork, and no delay.

### What sets VERO apart

**Platform outage coverage — a first.** When Zomato or Swiggy goes down during peak dinner hours, riders lose their highest-earning window with zero recourse. VERO is the only product that covers this, verified through neutral third-party uptime monitoring with no rider action required.

**Pre-armed social disruption coverage.** Bandhs are announced the night before — not detected on the day. VERO's Social Disruption Oracle reads those signals overnight and activates coverage before the rider even leaves home, not after the income is already lost.

**Adverse selection solved at the design level.** A 24-hour activation window, a continuity payout scale tied to rider tenure, and a personal loss ratio monitor make opportunistic last-minute purchasing structurally unprofitable — without requiring any enforcement after the fact.

**Personalized pricing via Reliability Score (R).** From week 3 onward, every rider's premium and coverage percentage are calculated from their own delivery activity data. A consistently active, efficient rider pays less and receives more. The two outcomes compound — sustained engagement is meaningfully rewarded.

**Resilient against coordinated fraud.** VERO's validation pipeline is grounded in independent data, device-level behavioral signals, and population-level anomaly detection — not GPS alone. A fraudster can fake a location coordinate. They cannot simultaneously fake a government weather feed, a third-party uptime monitor, and delivery activity patterns — across 500 devices in the same 15-minute window.

**Stack:** React PWA · Node.js · PostgreSQL · Python ML Microservice · OpenWeatherMap · Tomorrow.io · IQAir · Razorpay

---

## 2. Problem Statement

India has over 1 million platform-based food delivery workers operating on Zomato and Swiggy. These workers sustain a ₹35,800 crore digital economy but operate without any income safety net.

Their earnings are disrupted regularly by events entirely outside their control:

- Heavy rainfall, hailstorms, and extreme winds that make roads unsafe and cut delivery speeds
- High AQI levels that significantly reduce trip completion rates over sustained periods
- Platform app outages during peak meal hours that make earning physically impossible
- Bandhs, curfews, and civic shutdowns that close entire zones with little to no warning

When any disruption hits, the rider absorbs the full financial loss. There is no existing system — government, platform, or insurance — that compensates for this income shock. The rider either works through dangerous conditions or loses the day's income entirely.

---

## 3. What VERO Does

VERO watches for disruptions in real time, checks them against independent sources, and sends income compensation directly to the rider's UPI wallet every 30 minutes. No claim needed. No paperwork.

The rule is simple: if a disruption is confirmed by independent third-party data and the rider was working in the affected zone with an active policy, they get paid — for as long as the disruption lasts.

**What VERO does not cover:** Health, accident, or vehicle damage. Every trigger and every payout maps to one outcome — the rider could not earn today because of something outside their control.

---

## 4. What Makes VERO Different

Most parametric products for gig workers work the same way — detect bad weather, trigger a payout. Three gaps in that approach came up consistently when we looked at what actually causes income loss for food delivery riders.

**1. Platform outages are not covered anywhere**
When Swiggy or Zomato goes down during a Friday dinner peak, riders lose their highest-earning window with zero recourse. VERO covers this — verified through neutral third-party uptime monitoring, no rider action required.

**2. Social disruption coverage that arms the night before**
Bandhs and curfews are announced the night before, not detected on the day. VERO's Social Disruption Oracle reads those signals overnight and pre-arms coverage before the rider leaves home — not after they have already lost the income.

**3. Adverse selection built out at the design level**
Smart riders can game any subscription insurance by buying only during bad weeks. VERO treats this as a design problem, not an enforcement problem — a continuity payout scale, a loss ratio monitor, and pool math make opportunistic purchasing progressively unprofitable.

---

## 5. Product Philosophy

A Swiggy rider earning ₹80 an hour during a dangerous AQI day or a full bandh has one real choice right now — keep working or go home broke. VERO does not take that choice away. What it does is make stopping financially survivable for the first time. The rider still absorbs 40% of the income gap. But 60% is covered. That is enough to make the decision real.

What the rider does with that is up to them.

---

## 6. Persona: Food Delivery Partner (Zomato / Swiggy)

### 6.1 Who We're Building For

| Attribute | Detail |
|---|---|
| **Segment** | Food Delivery Partners (Zomato, Swiggy) |
| **Age Range** | 19–35 years |
| **Earnings** | ₹10,000–₹25,000/month (₹2,500–₹6,000/week) |
| **Work Pattern** | 6–12 hour shifts centred on lunch (12–2pm) and dinner (7–10pm) peaks |
| **Payment Cycle** | Weekly platform payouts |
| **Device** | Android smartphone — primary work tool |
| **Digital Literacy** | Comfortable with UPI and WhatsApp; limited experience with formal processes |

### 6.2 Persona Scenarios

---

**Scenario 1 — Ravi, Mumbai (Platform Outage)**

Ravi logs in at 7pm on a Friday — the peak dinner window. Swiggy's app goes down for 70 minutes. He sits on his bike outside a restaurant earning nothing. No orders come through. When the app returns, the best hours of his week are gone with no record of what happened and no way to report the lost time.

*VERO detects the outage at minute 1. By minute 47, when the outage crosses the trigger threshold, Ravi's income shield activates automatically. His payout begins processing — no claim filed, no support ticket raised.*

---

**Scenario 2 — Suresh, Delhi (AQI Crisis)**

It is November. Delhi's AQI crosses 380 for the third consecutive day. Suresh can barely breathe. Each delivery takes twice as long as his lungs struggle with the toxic air. Order demand is normal — but his delivery speed has collapsed. He completes half his usual trips in the same hours.

*VERO's AQI monitor detects that Suresh's active zone has crossed the trigger threshold for 4+ hours during his shift. A parametric income payout triggers automatically — no claim, no paperwork, no call to support.*

---

**Scenario 3 — Karan, Bengaluru (City Shutdown)**

A political party announces a bandh for Thursday morning. Karan does not see the news in time. He wakes up, gears up, and rides out — only to find every restaurant shuttered and his zone effectively locked down.

*VERO's Social Disruption Oracle detected the bandh announcement Wednesday night. By 11pm, Karan's zone shield was pre-activated. Thursday morning, when the disruption is confirmed across multiple independent sources, his payout processes before he even leaves home.*

---

## 7. User Categorization — New vs Returning

VERO treats new riders and returning riders differently. The approach changes depending on how much data the system has about the rider.

### 7.1 New Users (Week 1–2)

A new rider joining in week 1 has no history — no zone data, no earnings record, no track record. The system handles this by:

- Using city-level baseline income estimates as the hourly income reference
- Applying city-level default zone multipliers (Delhi: 1.3x, Mumbai: 1.15x, Bengaluru: 1.1x)
- Setting coverage fixed at 40% — making it financially unattractive to join only during a known bad week
- Applying the 24-hour policy activation window — prevents buying the night before an announced disruption

New users receive genuine coverage and real payouts. The calibration ensures joining right before a bad event does not produce a windfall that undermines the pool.

### 7.2 Returning Users (Week 3 Onward)

From week 3, each rider's premium and coverage depend on their own performance data. The system calculates a **Reliability Score (R)** — a number between 0 and 1 based on how active and effective the rider has been relative to others in their zone:

```
Adjusted TU     = Rider's active hours this week / Zone average active hours
Adjusted DE     = Rider's completed orders / Zone average completed orders
Completion Rate = Rider's completed orders / Rider's accepted orders

R               = min(sqrt(Adjusted TU × Adjusted DE × Completion Rate), 1.0)

Coverage %      = 40% + (25% × R)        → max 65%
Premium         = Base Rate × Risk Multiplier × (1.5 - R)
```

R is clamped to 1.0. This ensures coverage never exceeds 65% and the premium multiplier never falls below 0.5x.
Multiplicative form penalizes imbalance across dimensions. Square root normalizes extreme values and prevents domination by any single factor.

| R Value | Coverage | Premium Effect |
|---|---|---|
| R = 1.0 (top performer) | 65% | Lowest premium (multiplier = 0.5x) |
| R = 0.5 (average) | 52.5% | Neutral premium (multiplier = 1.0x) |
| R = 0.0 (inactive) | 40% floor | Highest premium (multiplier = 1.5x) |

A consistently active rider who completes orders efficiently pays less and receives more coverage. The two outcomes compound — sustained engagement is meaningfully rewarded. From week 5, zone averages shift from city-level defaults to pin-code level data specific to the rider's registered zones.

---

## 8. Three Core Features

---

### 8.1 Parametric Trigger System

VERO watches four types of disruption at the same time. Each one uses a specific, independent signal to confirm the income impact is genuine.

Paying the moment rain starts is a problem — a 10-minute shower would qualify. Waiting until rain stops is also a problem — the rider already lost that income. The approach here is to require two conditions at once: intensity above a threshold, and duration long enough to confirm it is a real disruption.

```
WEATHER / ENVIRONMENTAL TRIGGER:
  Threshold : Rainfall > 50mm/hr OR hailstorm confirmed OR wind > 40km/hr
  Duration  : Sustained > 1 hour continuously
  Signal    : Delivery time spike in zone — rain raises demand but
              destroys productivity. Spike confirms income impairment.
  Source    : OpenWeatherMap + Tomorrow.io

AQI TRIGGER:
  Threshold : AQI > 300 in rider's active zone
  Duration  : Sustained > 2 hours during shift
  Signal    : Sustained toxic air cuts trip completion rates
  Source    : IQAir / CPCB open data

PLATFORM BLACKOUT TRIGGER:
  Threshold : Platform uptime < 100% (Zomato and Swiggy monitored separately)
  Duration  : Sustained > 45 continuous minutes within peak hours
              (12:00–14:30 OR 19:00–22:30)
  Signal    : Zero platform function = zero orders possible
              Fraud structurally impossible — third-party verified
  Source    : DownDetector + custom scraper
  Eligibility extra: GPS in zone + app active + delivery attempt in last 30 mins

SOCIAL DISRUPTION TRIGGER (Proactive — night before):
  Sources   : Twitter/X, Google News, Government feeds, NewsAPI.org
  Scoring   : 12% single tweet → 74% trending + news → 91% official notice
  Threshold : Oracle confidence > 75%
  Night before → zones pre-armed → riders notified before disruption day
  Disruption day → 3 sources confirm + restaurant availability drops > 80%
                 + rider GPS in zone → payout intervals begin
  Signal    : Restaurant availability collapse confirms supply shutdown
              Nothing to deliver = income impossible regardless of demand
```

**Multi-trigger resolution:** If two triggers are active simultaneously for the same rider, only the highest payout for that interval applies. Payouts are never stacked across concurrent triggers.

---

### 8.2 Adaptive Weekly Premium Engine

Most insurance products divide an annual premium by 52 and call it weekly pricing. That is not what VERO does. Every Sunday night, the premium for the coming week is recalculated from scratch based on what is actually forecast to happen in that specific rider's zone.

```
Weekly Premium = Base Rate × Risk Multiplier

Base Rate        = 2% of city-level estimated weekly earnings for the rider's bracket
Risk Multiplier  = Zone risk score derived from environmental, AQI, and social disruption
                   forecasts for the coming week
```

The 2% base rate is derived actuarially — expected weekly payout (₹80 × 5 hours × 10% probability × 60% coverage) plus operating margin = ₹50 for an average rider = approximately 1.5–2% of ₹3,500 weekly income.

**For returning users (week 3+), the Reliability Score R personalizes further:**

```
R = min(sqrt(Adjusted TU × Adjusted DE × Completion Rate), 1.0)

Premium = Base Rate × Risk Multiplier × (1.5 - R)
  R = 1.0 → multiplier 0.5x (lowest premium — top performer reward)
  R = 0.0 → multiplier 1.5x (highest premium — inactive rider)
```

**Example — Suresh, Delhi, Zomato, returning user (R = 0.8), ₹3,500 per week, heavy environmental disruption week forecast:**

```
Base Rate       = ₹3,500 × 2%              = ₹70
Risk Multiplier = 1.30 (Delhi zone, severe week forecast)
R               = 0.8

Premium         = ₹70 × 1.30 × (1.5 - 0.8)
                = ₹70 × 1.30 × 0.70
                = ₹63.70

Coverage %      = 40% + (25% × 0.8)        = 60%
Weekly payout cap = ₹3,500 × 60%           = ₹2,100
```

**City-level zone defaults (weeks 1–4):**

| City | Default Zone Multiplier |
|---|---|
| Delhi | 1.30x |
| Mumbai | 1.15x |
| Bengaluru | 1.10x |
| Chennai | 1.05x |
| Other cities | 1.00x (neutral baseline) |

From week 5, city-level defaults are replaced by pin-code level zone history specific to the rider's registered delivery zones.

**Income validation — prevents over-declaration:**

```
Verified Weekly Income = min(
  Self-declared income,
  City-level benchmark for rider's earnings bracket,
  Historical earnings from platform data (week 3 onward)
)
```

The base rate applies to verified weekly income — not self-declared income. This grounds payout calculations in real earnings, not inflated figures.

---

### 8.3 Income Continuity Guarantee

VERO caps income replacement at 65% maximum and never offers 100% — preventing moral hazard while ensuring meaningful relief. Coverage scales with rider tenure and performance.

**Why 60–65% and not 100%:**
100% coverage means a rider earns the same whether working or not — removing all incentive to work through manageable conditions. The cap means the rider still absorbs the remaining loss personally. Genuine disruptions get claimed. Mild conditions do not.

**Continuity scale table:**

| Tenure | Coverage % | Notes |
|---|---|---|
| Week 1–2 | Fixed 40% | No R data; city baseline income used |
| Week 3–4 | 40% + (25% × R), max 65% | R from past week's TU, DE, CR |
| Week 5+ | 40% + (25% × R), max 65% | Pin-code zone data replaces city defaults |

A consistently active rider with a high R score pays less premium and receives higher coverage. The two outcomes compound — sustained engagement is meaningfully rewarded.

---

## 9. Payout Logic

Paying a lump sum when rain starts is wrong — it might stop in 10 minutes. Waiting until rain ends is also wrong — the rider already lost the money. VERO pays in 30-minute intervals while the disruption is actually happening. The amount is accurate and the money arrives when it is needed.

```
Per-Interval Payout Formula:

  Payout = Interval Duration (hrs) × Verified Hourly Income × Coverage %

Where:
  Interval Duration  = 0.5 hours (fixed 30-minute intervals)
  Verified Hourly    = Verified Weekly Income / estimated weekly active hours
                       (city baseline for new users; verified income from week 3+)
  Coverage %         = 40% fixed for weeks 1–2
                       40% + (25% × R) for week 3+, max 65%

Payout Timeline:
  → Trigger confirmed → payout intervals begin
  → Every 30 minutes while conditions remain above threshold
  → Stops when conditions drop below threshold OR weekly cap exhausted
  → Weekly Cap = Coverage % × Verified Weekly Income (dynamic per rider)
  → Each interval logged with trigger event ID for audit and fraud tracking

Multi-Trigger Resolution Rule:
  If two triggers are active simultaneously for the same rider:
  → Only the trigger producing the highest payout for that interval applies
  → Payouts are never stacked across concurrent triggers
  → Prevents double-counting of the same income loss
```

An SMS confirmation is sent at the first interval with the trigger event ID. Subsequent intervals within the same event are processed silently until the event closes.

**Worked example — Suresh, Delhi, week 5+, R = 0.8, hailstorm, 3-hour disruption:**

```
Coverage %           = 40% + (25% × 0.8)  = 60%
Verified hourly      = ₹90
Per interval (30min) = 0.5 × ₹90 × 60%   = ₹27
Total (6 intervals)  = ₹27 × 6            = ₹162

Same rider, week 1 (coverage fixed at 40%):
Per interval         = 0.5 × ₹90 × 40%   = ₹18
Total                = ₹18 × 6            = ₹108
=======
# VERO — Phase 2 Team Execution Plan

> **Deliverables:** Working app + 2-min demo video
> **Team Size:** 4 members
> **Current State:** README ✅ | DB Schema ✅ | Seed Data ✅ | **No app code yet**

---

## What the Judges Want (Mapped to Our Tasks)

| # | Judging Criteria | What We Must Show | Owner |
|---|-----------------|-------------------|-------|
| 1 | **Registration Process** | Phone OTP → Platform pick → Zone drop → Earnings → Premium → Pay | M1 + M2 |
| 2 | **Insurance Policy Management** | Purchase, activate (24-hr rule), auto-renew, cancel, tenure tracking | M2 |
| 3 | **Dynamic Premium Calculation** | `Base Rate 2% × Risk Multiplier × (1.5 - R)` with ML-driven risk scoring | M3 |
| 4 | **Claims Management** | Zero-touch: trigger fires → claim auto-created → 30-min payouts → UPI | M3 + M4 |
| 5 | **AI Integration** | ML model adjusting premiums from hyper-local risk factors (zone safety, weather prediction) | M3 |
| 6 | **3-5 Automated Triggers** | Weather, AQI, Platform Blackout, Social Disruption, Waterlogging | M3 + M4 |
| 7 | **Zero-Touch Claim UX** | No forms, no uploads — rider gets SMS + dashboard updates automatically | M1 |
| 8 | **2-Min Demo Video** | End-to-end walkthrough: register → policy → trigger → auto-claim → payout | M4 |

---

## Team Roster & Assignments

### 🧑‍💻 Member 1 — Frontend Lead
> **Owns:** Every screen the rider and admin will see

### 🔧 Member 2 — Backend Lead
> **Owns:** API server, database layer, policy lifecycle, auth

### 🤖 Member 3 — AI & Trigger Engine
> **Owns:** The ML premium model, trigger detection, payout engine, fraud rules

### 🎨 Member 4 — Integrations & Demo
> **Owns:** External API connectors, Razorpay, notifications, demo video

---

## Folder Structure

```
Hackathon/
├── client/                          # Member 1
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                  # Buttons, cards, badges, gauges
│   │   │   ├── maps/                # Leaflet zone picker + heatmap
│   │   │   └── charts/              # Chart.js / Recharts components
│   │   ├── pages/
│   │   │   ├── Onboarding.jsx       # 5-step registration flow
│   │   │   ├── RiderDashboard.jsx   # Premium, alerts, claims, map
│   │   │   ├── AdminDashboard.jsx   # Monitoring, financials, fraud
│   │   │   └── ClaimDetail.jsx      # Live 30-min interval view
│   │   ├── services/api.js          # Axios API calls
│   │   └── App.jsx
│   └── package.json
│
├── server/                          # Member 2 + 3 + 4
│   ├── routes/
│   │   ├── auth.js                  # M2: OTP send/verify
│   │   ├── riders.js                # M2: Register, profile, zones
│   │   ├── policies.js              # M2: Purchase, cancel, renew
│   │   ├── premiums.js              # M3: Calculate, breakdown
│   │   ├── claims.js                # M2: List, details, intervals
│   │   ├── triggers.js              # M3: Active triggers, history
│   │   └── admin.js                 # M2: Dashboard aggregates
│   ├── services/
│   │   ├── premiumEngine.js         # M3: ML-powered premium calc
│   │   ├── triggerEngine.js         # M3: 5 trigger detection loops
│   │   ├── payoutService.js         # M3: 30-min interval processor
│   │   ├── reliabilityScore.js      # M3: R-score from activity
│   │   └── fraudDetection.js        # M3: Rule-based fraud flags
│   ├── integrations/
│   │   ├── weatherAPI.js            # M4: OpenWeatherMap
│   │   ├── aqiAPI.js                # M4: IQAir / CPCB
│   │   ├── uptimeMonitor.js         # M4: Platform status
│   │   ├── socialOracle.js          # M4: NewsAPI + Twitter
│   │   ├── razorpay.js              # M4: Payments
│   │   └── notifications.js         # M4: SMS + Push
│   ├── ml/
│   │   ├── riskModel.js             # M3: ML risk score predictor
│   │   └── trainingData.json        # M3: Historical zone risk data
│   ├── db/
│   │   └── pool.js                  # M2: PostgreSQL connection
│   ├── middleware/
│   │   ├── auth.js                  # M2: JWT verification
│   │   └── errorHandler.js          # M2: Global error handler
│   └── index.js                     # M2: Express entry point
│
├── database/                        # Already exists ✅
│   ├── schema.sql
│   └── seed.sql
│
└── README.md                        # Already exists ✅
>>>>>>> 8894edacc148ba7b5ab89fa4a1cbd1bd6a5a9f31
```

---

<<<<<<< HEAD
## 10. Policy Activation Rule

Every new policy takes effect **24 hours after purchase** — no exceptions.

```
Example:
  Policy purchased : Sunday 8:00pm
  Policy active    : Monday 8:00pm

  Any disruption between Sunday 8:00pm and Monday 8:00pm
  is NOT covered under this policy.
```

This exists for one reason: to prevent a rider from reading tonight's bandh announcement, buying a policy at 10pm, and claiming against it the next morning. The 24-hour window covers all disruption types with no exceptions.

Riders whose policy auto-renews each Sunday are not affected by this rule. It only kicks in when someone buys for the first time or rejoins after cancelling.

---

## 11. Financial Sustainability Model

The model is designed so the platform stays profitable without shortchanging riders.

**Coverage ceiling at 65%.** No matter how severe the disruption or how long the rider has been subscribed, payouts never exceed 65% of confirmed hourly income loss. This keeps expected claims manageable.

**New subscribers get reduced payouts.** Riders in weeks 1–2 receive 40% coverage, which cuts down on claims from people who sign up just before a bad week and disappear.

**Premium reflects actual risk.** Riders in high-risk zones during bad forecast weeks pay more. Riders who are consistently active and efficient pay less. The pricing is calibrated to match what is actually expected to be paid out.

**Weekly cycle keeps liability contained.** Each policy runs Monday to Sunday. There is no multi-year exposure — the platform's maximum liability is always limited to what is active in the current week.

```
Loss ratio target: 0.40 to 0.60
For every ₹1.00 collected, VERO targets ₹0.40–0.60 in claims
=======
## Detailed Task Breakdown

---

### 🧑‍💻 MEMBER 1 — Frontend Lead

#### Deliverable 1: Registration Process (Judging Criteria #1)

**Onboarding Flow — 5 screens, one seamless wizard:**

- [ ] **Screen 1 — Phone + OTP**
  - Phone input with +91 prefix
  - 6-digit OTP entry with auto-focus between digits
  - Timer + resend button
  - Calls: `POST /api/auth/send-otp`, `POST /api/auth/verify-otp`

- [ ] **Screen 2 — Platform Selection**
  - Two large cards: Zomato (red) / Swiggy (orange)
  - Tap to select, smooth highlight animation

- [ ] **Screen 3 — Zone Picker** (the wow factor)
  - Leaflet.js map centered on Chennai
  - Rider taps to drop up to 3 pins
  - Each pin shows zone name + pin code via reverse geocoding
  - Radius circle (3km) around each pin
  - "Primary zone" toggle on first pin

- [ ] **Screen 4 — Earnings & Schedule**
  - Slider for weekly earnings bracket (₹1,500 – ₹6,000)
  - Shift hours picker (start/end time)
  - Shows "estimated hourly rate" calculated live

- [ ] **Screen 5 — Premium Confirmation**
  - Animated premium card showing:
    - Base rate calculation
    - Risk multiplier for their zone(s)
    - Final weekly premium
    - Coverage % (40% for new users)
    - Weekly payout cap
  - "Pay ₹XX via UPI" button → Razorpay checkout
  - After payment → "Coverage activates in 24 hours" countdown

#### Deliverable 2: Rider Dashboard (Judging Criteria #4, #7)

- [ ] **Premium Card** — current premium, coverage %, payout cap, days remaining
- [ ] **R-Score Gauge** — animated circular gauge (0 → 1.0), only visible week 3+
- [ ] **Live Disruption Alerts** — pulsing red/orange cards for active triggers
  - Each card: trigger type icon, zone name, severity, "Auto-claim active ✓"
  - Zero-touch UX: rider sees "You're being compensated" — no action needed
- [ ] **Claim History Timeline** — vertical timeline showing:
  - Trigger type + icon
  - Duration, total payout
  - Each 30-min interval with ₹ amount
  - Status badge: Active (pulse) / Completed / Capped
- [ ] **Zone Heatmap** — Leaflet map, pin codes colored by risk level

#### Deliverable 3: Admin Dashboard (Judging Criteria #2, #3)

- [ ] **Stats Row** — Active Riders | Active Claims | Today's Payouts | Loss Ratio
- [ ] **Live Monitoring Panel** — 4 cards:
  - Weather: rainfall/wind per zone
  - AQI: current AQI by zone
  - Platform: Zomato ✅ / Swiggy ❌ uptime status
  - Social: Oracle confidence scores
- [ ] **Claims Table** — sortable, filterable by trigger type, status
- [ ] **Financial Chart** — weekly premiums vs payouts bar chart (Recharts)
- [ ] **Fraud Flags Panel** — severity-colored badges, details expandable
- [ ] **Policy Management View** — list of all policies, status, activation time

#### Design Requirements

- [ ] **Color palette:** Deep navy (#0F172A) + Teal accent (#14B8A6) + Risk red (#EF4444)
- [ ] **Typography:** Inter (Google Fonts)
- [ ] **Dark mode** as default (riders work at night)
- [ ] **Glassmorphism** cards with backdrop-blur
- [ ] **Micro-animations:** number counters, pulse on active claims, gauge fill
- [ ] **PWA manifest** — installable on Android

---

### 🔧 MEMBER 2 — Backend Lead

#### Deliverable: All API Routes + Database Layer

**Day 1: Setup + Auth**
- [ ] `npm init` in `server/`, install: express, pg, cors, dotenv, bcryptjs, jsonwebtoken, express-validator, node-cron
- [ ] `db/pool.js` — PostgreSQL connection pool
- [ ] Run `schema.sql` + `seed.sql` on database
- [ ] `POST /api/auth/send-otp` — generate 6-digit OTP, bcrypt hash, store with 5-min expiry
- [ ] `POST /api/auth/verify-otp` — verify, issue JWT (24hr expiry), create/find rider
- [ ] JWT middleware for protected routes

**Day 2: Registration + Rider APIs**
- [ ] `POST /api/riders/register` — full registration:
  - Validate phone, platform, city, earnings, shift hours
  - Income validation: `min(declared, city_benchmark)`
  - Create rider row + up to 3 zone rows
  - Set `registration_week`, `current_tenure_weeks = 0`
- [ ] `GET /api/riders/:id` — profile with current policy + R-score
- [ ] `PUT /api/riders/:id/zones` — update delivery zones

**Day 3: Policy Management (Judging Criteria #2)**
- [ ] `POST /api/policies/purchase`
  - Calculate premium (call M3's premiumEngine)
  - Set `activates_at = NOW() + 24 hours`
  - Set `status = 'pending_activation'`
  - Create `premium_payments` row
  - Return premium breakdown to frontend
- [ ] `GET /api/policies/:riderId/current` — current week's policy + remaining cap
- [ ] `POST /api/policies/:id/cancel` — cancel policy, reset tenure to 0
- [ ] `GET /api/policies/:riderId/history` — all past policies

**Day 4: Claims + Intervals APIs**
- [ ] `GET /api/claims/:riderId` — all claims with trigger type, payout, status
- [ ] `GET /api/claims/:id` — single claim with all intervals
- [ ] `GET /api/claims/:id/live` — live claim: current interval, running total, cap remaining
- [ ] `GET /api/triggers/active` — all active trigger events with affected zones

**Day 5: Admin APIs**
- [ ] `POST /api/admin/login` — admin auth (separate from rider)
- [ ] `GET /api/admin/dashboard` — aggregated stats:
  ```json
  {
    "activeRiders": 8,
    "activePolicies": 7,
    "activeClaims": 2,
    "todayPayouts": 233.88,
    "weeklyPremiums": 635.00,
    "lossRatio": 0.368
  }
  ```
- [ ] `GET /api/admin/triggers` — all triggers with claims count
- [ ] `GET /api/admin/claims` — all claims, filterable
- [ ] `GET /api/admin/financials` — weekly revenue/payout/loss-ratio
- [ ] `GET /api/admin/fraud-flags` — pending flags with severity

**Day 6: Scheduled Jobs**
- [ ] `node-cron`: Every 5 min → activate pending policies past 24hrs
- [ ] `node-cron`: Every 15 min → run trigger checks (calls M3's engine)
- [ ] `node-cron`: Sunday 11pm → recalculate all premiums for next week
- [ ] `node-cron`: Sunday 11pm → compute R-scores for all week-3+ riders

**Day 7: Polish**
- [ ] Input validation on every route
- [ ] Global error handler with proper HTTP codes
- [ ] CORS configuration for frontend
- [ ] API health check endpoint `GET /api/health`

---

### 🤖 MEMBER 3 — AI & Trigger Engine

> [!IMPORTANT]
> This is the **highest-impact** role. The judges specifically call out **AI Integration** and **Automated Triggers** as evaluation criteria. Assign your strongest coder here.

#### Deliverable 1: AI-Powered Dynamic Premium (Judging Criteria #3, #5)

**`premiumEngine.js` — the ML pricing model:**

- [ ] **Feature engineering** — for each rider+zone, compute:
  ```
  Features:
  1. zone_historical_disruption_hours (from zone_risk_history)
  2. zone_disruption_count_4weeks
  3. weather_forecast_severity (from OpenWeatherMap 7-day)
  4. aqi_forecast_trend
  5. platform_outage_frequency_4weeks
  6. social_disruption_probability
  7. rider_tenure_weeks
  8. rider_R_score
  9. zone_waterlogging_history (boolean — safe vs flood-prone)
  10. time_of_year_risk (monsoon = high, winter = low)
  ```

- [ ] **ML Risk Model** (`ml/riskModel.js`):
  - Train a simple model (decision tree or gradient boosting via `ml-cart` or `brain.js`) on synthetic training data
  - Input: 10 features above → Output: `risk_multiplier` (0.8 to 1.5)
  - **Key demo moment:** "₹2 less per week if zone is historically safe from waterlogging"
  - Store trained model weights as JSON

- [ ] **Premium calculation flow:**
  ```javascript
  // 1. Get verified income
  verifiedIncome = min(declared, cityBenchmark, historicalEarnings)
  
  // 2. Base rate
  baseRate = verifiedIncome * 0.02
  
  // 3. ML risk multiplier (not hardcoded!)
  riskMultiplier = mlModel.predict(riderFeatures)
  
  // 4. Reliability factor (week 3+ only)
  reliabilityFactor = (1.5 - rScore)  // range 0.5 to 1.5
  
  // 5. Final premium
  premium = baseRate * riskMultiplier * reliabilityFactor
  
  // 6. Coverage
  coverage = tenure <= 2 ? 40 : min(40 + 25 * rScore, 65)
  ```

- [ ] **Store full breakdown** in `premium_calculations` with `forecast_data` JSONB

**`reliabilityScore.js`:**
- [ ] Compute R from `rider_activity` table:
  ```
  R = min(sqrt(adjustedTU × adjustedDE × completionRate), 1.0)
  ```
- [ ] Store in `reliability_scores` table

#### Deliverable 2: 5 Automated Triggers (Judging Criteria #6)

**`triggerEngine.js` — the core monitoring loop:**

- [ ] **Trigger 1 — Heavy Rain / Hailstorm / Wind**
  - Poll `weatherAPI.js` every 15 min for each active zone
  - Check: rainfall > 50mm/hr OR hail confirmed OR wind > 40km/hr
  - Duration check: sustained > 1 hour (check last 4 readings)
  - Insert `trigger_events` row → find eligible policies → create claims

- [ ] **Trigger 2 — AQI Crisis**
  - Poll `aqiAPI.js` hourly for each active zone
  - Check: AQI > 300
  - Duration check: sustained > 2 hours during rider's shift window
  - Insert trigger → create claims

- [ ] **Trigger 3 — Platform Blackout (Zomato / Swiggy)**
  - Poll `uptimeMonitor.js` every 5 min
  - Check: platform down > 45 continuous minutes
  - Must be during peak hours (12:00–14:30 OR 19:00–22:30)
  - Extra check: rider had delivery attempt in last 30 min
  - Insert trigger → create claims

- [ ] **Trigger 4 — Social Disruption (Bandh / Curfew)**
  - Poll `socialOracle.js` every hour
  - Night-before detection: confidence > 75% → pre-arm zones
  - Day-of confirmation: 3+ sources + restaurant closure > 80% + GPS match
  - Insert trigger → create claims

- [ ] **Trigger 5 — Waterlogging / Flooding**
  - Derived from weather data: sustained heavy rain > 2 hours in flood-prone zones
  - Cross-reference with `zone_risk_history.risk_multiplier > 1.2`
  - Separate trigger type for demo impact — "VERO knows your zone floods"

- [ ] **Multi-trigger resolution:** if 2+ triggers active for same rider, use highest payout only

#### Deliverable 3: Zero-Touch Claim Process (Judging Criteria #4, #7)

**`payoutService.js`:**
- [ ] When trigger fires for eligible rider:
  1. Create `claims` row with all validation flags ✓
  2. Start 30-min interval loop:
     ```
     payout = 0.5 × verifiedHourlyRate × (coveragePct / 100)
     ```
  3. Each interval: create `claim_intervals` row + `payouts` row
  4. Check weekly cap: stop if `total_paid_out >= weekly_payout_cap`
  5. Send notification at first interval (SMS template)
  6. Close claim when trigger resolves or cap exhausted

**`fraudDetection.js`:**
- [ ] Loss ratio > 1.8x → flag + surcharge next week
- [ ] Zone anomaly: rider triggers with no peer triggers → flag
- [ ] No delivery activity in last 30 min → ineligible
- [ ] Temporal clustering: many riders trigger in narrow window → ring detection
- [ ] GPS outside registered zones → flag

#### Training Data Generation
- [ ] Create `ml/trainingData.json` with 200+ synthetic records:
  - Chennai zone pin codes with historical disruption patterns
  - Monsoon months → high risk, dry months → low risk
  - Flood-prone zones (Velachery, Adyar) → higher multiplier
  - Safe zones (Mylapore, T.Nagar) → lower multiplier
  - This data makes the ML model's predictions realistic for demo

---

### 🎨 MEMBER 4 — Integrations & Demo

#### Deliverable 1: External API Connectors

**`weatherAPI.js`:**
- [ ] OpenWeatherMap Current Weather API (free tier: 60 calls/min)
  ```
  GET https://api.openweathermap.org/data/2.5/weather?lat={}&lon={}&appid={}
  ```
- [ ] Parse: `rain['1h']`, `wind.speed`, weather conditions
- [ ] Store in `weather_readings` table
- [ ] Fallback: if API fails, return last known reading from DB

**`aqiAPI.js`:**
- [ ] IQAir Nearest City API (free: 10,000 calls/month)
  ```
  GET https://api.airvisual.com/v2/nearest_city?lat={}&lon={}&key={}
  ```
- [ ] Parse: AQI value, dominant pollutant, PM2.5/PM10
- [ ] Store in `aqi_readings` table

**`uptimeMonitor.js`:**
- [ ] Option A: DownDetector unofficial API / scraping
- [ ] Option B: Custom health ping to Swiggy/Zomato domains
  ```javascript
  // Simple uptime check
  const checkPlatform = async (url) => {
    try {
      const res = await fetch(url, { timeout: 5000 });
      return { isUp: res.ok, responseTime: elapsed };
    } catch {
      return { isUp: false, error: err.message };
    }
  }
  ```
- [ ] Store in `platform_status_checks`

**`socialOracle.js`:**
- [ ] NewsAPI.org keyword search (free: 100 calls/day)
  ```
  GET https://newsapi.org/v2/everything?q=chennai+bandh&apiKey={}
  ```
- [ ] Confidence scoring:
  - Single news article = 15%
  - Multiple sources = 50%
  - Government notice = +35%
  - Trending on Twitter = +20%
- [ ] Store in `social_disruption_signals`

**`razorpay.js` (sandbox):**
- [ ] Premium collection: Razorpay Checkout integration
- [ ] Payout: Razorpay PayoutLinks for UPI transfers
- [ ] Webhook handling for payment confirmations
- [ ] Store refs in `premium_payments` / `payouts`

**`notifications.js`:**
- [ ] SMS templates for each event type (Twilio or mock)
- [ ] Browser push notifications for PWA
- [ ] Store all in `notifications` table

#### Deliverable 2: Demo Video (Judging Criteria #8)

> [!IMPORTANT]
> The demo video is **worth as much as the code**. Plan this carefully.

**2-Minute Demo Script:**

```
0:00-0:15  HOOK
  "India has 1 million delivery riders with zero income protection.
   VERO changes that — AI-powered, zero-touch, instant payouts."
  [Show VERO logo + tagline]

0:15-0:35  REGISTRATION (Criteria #1)
  [Live demo] New rider "Murugan" registers:
  - Phone OTP → Selects Swiggy → Drops pin on T.Nagar
  - Earnings: ₹2,800/week → Premium calculated: ₹46
  - "Coverage activates in 24 hours"

0:35-0:55  DYNAMIC PREMIUM (Criteria #3 + #5 — AI)
  [Show premium breakdown screen]
  - "Our ML model analyzes 10 hyper-local risk factors"
  - Show: Velachery (flood-prone) = ₹72 vs Mylapore (safe) = ₹32
  - "₹40 difference — same city, same rider profile, different zone risk"
  - Flash the R-score: "Active riders earn up to 35% premium discount"

0:55-1:25  TRIGGER + ZERO-TOUCH CLAIM (Criteria #4, #6, #7)
  [Simulate a weather trigger]
  - Admin dashboard: rainfall hits 72mm/hr in Adyar zone
  - Trigger fires automatically → claim created
  - Cut to rider dashboard: "Income Shield Active ✓"
  - Show 30-min intervals accumulating: ₹21.44... ₹42.88... ₹64.32
  - "No form. No call. No paperwork. Money hits UPI every 30 minutes."

1:25-1:45  POLICY MANAGEMENT + ADMIN (Criteria #2)
  [Show admin dashboard]
  - 8 active riders, 2 live claims, loss ratio: 0.37
  - Fraud flags panel: "GPS mismatch detected for Rider #8"
  - Weekly financials chart: premiums vs payouts

1:45-2:00  CLOSE
  "VERO — True protection for India's delivery workforce.
   AI-powered. Zero-touch. Instant."
  [Show all 5 trigger types listed]
  [Team name + tech stack]
```

- [ ] **Demo data injection script** — populates perfect demo state
- [ ] **Screen recording** with OBS or browser recorder
- [ ] **Upload** to YouTube (unlisted) or Google Drive (public link)
- [ ] **Backup:** if live demo breaks, have pre-recorded segments ready

---

## 7-Day Sprint Timeline

```
         M1 (Frontend)         M2 (Backend)          M3 (AI/Triggers)      M4 (Integrations)
         ─────────────         ────────────          ────────────────      ─────────────────
Day 1    React setup           Express + DB setup    R-score calc          Weather + AQI APIs
         Design system         Auth (OTP/JWT)        Premium engine        API key setup
         ─── Sync: Agree on API response shapes ──────────────────────────────────────────

Day 2    Onboarding flow       Rider registration    ML risk model         Platform monitor
         (all 5 screens)       Rider profile API     Training data gen     Social oracle

Day 3    Rider dashboard       Policy purchase       Weather trigger       Razorpay sandbox
         Premium card          Policy cancel/renew   AQI trigger           Payment flow
         ─── Sync: First frontend↔backend integration test ───────────────────────────────

Day 4    Claim history         Claims API            Platform trigger      Notifications
         Live claim view       Intervals API         Social trigger        SMS templates
                                                     Waterlogging trigger

Day 5    Admin dashboard       Admin APIs            Payout service        Full integration
         Charts + tables       Scheduled jobs        Fraud detection       test everything
         ─── Sync: End-to-end flow must work today ────────────────────────────────────────

Day 6    Admin: fraud +        Validation +          Simulation script     Demo script
         financials            Error handling        Edge case testing     Data injection
         Polish + animations   API docs                                    Screen recording

Day 7    PWA manifest          Bug fixes             Bug fixes             DEMO VIDEO
         Loading states        Integration fixes     Integration fixes     Upload + backup
         ─── FULL TEAM: Final integration + demo rehearsal ────────────────────────────────
>>>>>>> 8894edacc148ba7b5ab89fa4a1cbd1bd6a5a9f31
```

---

<<<<<<< HEAD
## 12. Adverse Selection Handling

The classic problem with subscription insurance is that smart users buy in when bad weather is coming and cancel when things look clear. VERO handles this through four mechanisms built into the product itself — not enforced after the fact.

**1. 24-Hour Activation Window**
A rider who reads tonight's bandh announcement and buys immediately cannot claim against that event. The 24-hour window is the primary structural block against last-minute opportunistic purchases. Applies to new purchases and rejoins only — not to auto-renewing subscribers.

**2. Continuity Payout Scale**
Week 1–2 subscribers receive 40% coverage — far less than a long-term subscriber with a good R score receives for the same disruption. Joining before a known bad week produces a significantly reduced payout, making the attempt financially unattractive once the premium cost is factored in.

**3. Cancellation Resets Eligibility**
Cancelling and rejoining resets the rider to week 1 status — restarting both the 24-hour window and the reduced continuity scale. Repeated cancel-and-rejoin cycling is progressively unattractive because reduced payouts in weeks 1–2 compound across each restart.

**4. Personal Loss Ratio Monitor**
VERO tracks each rider's personal loss ratio — total payouts received divided by total premiums paid. When this ratio exceeds 1.8x, a surcharge applies to the following week's premium. The surcharge compounds with repeated triggering, making sustained gaming progressively expensive until it becomes a net loss by month 5.

---

## 13. Fraud Prevention Design

Most fraud prevention relies on catching bad actors after the fact. VERO's approach is different — the way triggers are designed makes fraud structurally difficult in the first place.

**No claim form means nothing to fake.** Since riders submit nothing and triggers fire from independent data sources, there is no mechanism for a bad actor to exploit.

**Data sources have no connection to the rider.** Platform uptime, weather readings, AQI, and news signals all come from third parties who have no relationship with any individual rider. The signals fire or they don't — a rider cannot change that.

**24-hour policy activation window.** A rider cannot purchase coverage moments before a known disruption and immediately claim. The waiting period structurally eliminates last-minute opportunistic purchases.

**GPS-based zone validation.** The rider's GPS location at time of disruption must match one of their registered delivery zones. A rider outside the disrupted zone receives nothing.

**Duplicate trigger blocking.** The system stores trigger event IDs and blocks duplicate payouts for the same event under the same policy.

**Activity validation for platform blackout.** Rider must have attempted at least one delivery in the last 30 minutes. Riders who log in purely to collect a payout without working are ineligible.

**ML anomaly detection (Phase 2).** An Isolation Forest model flags claim patterns that deviate significantly from zone peers — for example, a rider repeatedly triggering payouts in weeks when no other rider in the same zone triggered.

---

## 14. Application Workflow

```
ONBOARDING  (under 2 minutes)
├── Phone number + OTP
├── Select platform: Zomato / Swiggy
├── Drop pin on active delivery zones (up to 3)
├── Declare weekly earnings bracket and shift hours
└── AI shows this week's premium → pay via UPI → coverage active

────────────────────────────────────────────────────────────────

EVERY SUNDAY NIGHT  (fully automated)
├── Premium engine re-runs for every active rider
├── Pulls fresh weather, AQI, and social disruption forecasts
├── Applies all six multipliers per rider per zone
└── New weekly premium auto-debited via UPI mandate

────────────────────────────────────────────────────────────────

REAL-TIME MONITORING  (always on)
├── Platform uptime checked every 5 minutes
├── AQI and delivery time spike tracked per zone hourly
├── Restaurant availability monitored per zone continuously
└── Social media, news feeds, and govt alerts scanned 24/7

────────────────────────────────────────────────────────────────

CLAIM TRIGGER  (zero rider action required)

ENVIRONMENTAL TRIGGER (Rain / Hail / Wind / Dust):
  Threshold: Rainfall above 50mm/hr, OR hailstorm alert confirmed,
             OR wind speed above 40km/hr in rider's registered zone
  Duration:  Sustained for more than 1 hour continuously
  Validation:
    Rider GPS confirms presence in the affected zone
    Active policy confirmed; 24-hour activation window has passed
    No duplicate event ID for this trigger
  Action:
    Payout intervals begin at trigger confirmation
    Processed at 30-minute intervals while threshold conditions hold
    Stops when environmental conditions drop below threshold
      or weekly coverage cap is exhausted

AQI TRIGGER:
  Threshold: AQI above 300 in rider's active zone
  Duration:  Sustained for more than 2 hours during the rider's shift
  Validation:
    Rider GPS confirms zone presence
    Active policy confirmed; 24-hour activation window has passed
  Action:
    Payout intervals begin at trigger confirmation
    Processed at 30-minute intervals while AQI remains above 300
    Stops when AQI drops below threshold or cap is exhausted

PLATFORM BLACKOUT TRIGGER (Zomato / Swiggy — monitored independently):
  Threshold: Platform outage (confirmed by third-party monitor)
  Duration:  Sustained for more than 45 minutes
             AND within peak hours (12:00–14:30 or 19:00–22:30)
  Validation:
    Rider was logged into the specific affected platform at outage start
    Active policy confirmed; 24-hour activation window has passed
    Zone match confirmed
  Action:
    Payout intervals begin at trigger confirmation
    Processed at 30-minute intervals while outage continues
    Stops when platform uptime restores or cap is exhausted

SOCIAL DISRUPTION TRIGGER:
  Night before:
    Oracle confidence crosses 75%
    Pre-activation alert sent to riders in affected zones via SMS and app notification
  Disruption day — three conditions confirmed simultaneously:
    (a) Three independent news or government sources confirm disruption is active
    (b) Restaurant availability in zone drops above 80%
    (c) Rider GPS confirms presence in the affected zone
  Validation:
    Active policy confirmed; 24-hour activation window has passed
  Action:
    All three conditions confirmed — payout intervals begin automatically
    Processed at 30-minute intervals while disruption conditions hold
    Stops when restaurant availability recovers or cap is exhausted

ALL TRIGGERS — Common Rule:
  Per-interval payout = Interval Duration (hrs) × Hourly Income × Coverage %
  SMS sent at first interval with trigger event ID
  Subsequent intervals within the same event processed silently
  Event closes when conditions end or weekly cap is exhausted

────────────────────────────────────────────────────────────────

DASHBOARD
├── Rider view: premium summary, disruption alerts, claim history, zone heatmap
└── Admin view: live monitoring panel, claims count, payout ratio, fraud flags
=======
## Critical Integration Contracts (Agree on Day 1)

### API Response Shapes

```javascript
// GET /api/riders/:id
{
  "rider": { "id", "name", "phone", "platform", "city", "tenure_weeks" },
  "currentPolicy": { "id", "status", "coverage_pct", "premium", "payout_cap", "paid_out" },
  "rScore": { "score", "coverage_pct", "premium_factor" },
  "zones": [{ "name", "pin_code", "is_primary", "lat", "lng" }]
}

// GET /api/premiums/:riderId/calculate
{
  "breakdown": {
    "verified_income": 2600,
    "base_rate_pct": 0.02,
    "base_premium": 52,
    "risk_multiplier": 1.25,
    "risk_factors": {             // ← This is the AI part judges want to see
      "waterlogging_history": 0.85,
      "weather_forecast": 1.1,
      "aqi_trend": 0.95,
      "platform_stability": 1.0,
      "zone_safety_score": 0.88
    },
    "r_score": 0.80,
    "reliability_factor": 0.70,
    "final_premium": 45.50,
    "coverage_pct": 60.0,
    "weekly_cap": 1560.00
  }
}

// GET /api/claims/:riderId
{
  "claims": [{
    "id", "trigger_type", "status",
    "started_at", "ended_at",
    "total_payout", "intervals_count",
    "trigger": { "severity", "threshold_details" },
    "intervals": [{ "number", "payout", "status", "paid_at" }]
  }]
}

// GET /api/admin/dashboard
{
  "stats": { "activeRiders", "activePolicies", "activeClaims", "todayPayouts", "lossRatio" },
  "activeTriggers": [...],
  "recentClaims": [...],
  "fraudFlags": [...],
  "weeklyFinancials": [{ "week", "premiums", "payouts", "ratio" }]
}
>>>>>>> 8894edacc148ba7b5ab89fa4a1cbd1bd6a5a9f31
```

---

<<<<<<< HEAD
## 15. AI/ML Integration Plan

| Model | Type | Framework | Output |
|---|---|---|---|
| Premium engine | Supervised regression | XGBoost / scikit-learn | Weekly risk score → personalised premium per rider |
| Disruption oracle | NLP classifier | HuggingFace Transformers | Confidence score 0–100% per zone per day |
| Fraud anomaly engine | Rule-based + ML | Isolation Forest | Flags suspicious claim patterns for review |
| Payout calculator | Deterministic formula | — | Hourly Rate × Duration × Coverage % |

---

## 16. Tech Stack

### 16.1 Platform: Mobile-First Progressive Web App (PWA)

Riders use Android phones as their primary work tool. A PWA delivers an app-like experience without requiring Play Store installation — important for low-digital-literacy users — and supports push notifications and offline dashboard viewing natively.

| Layer | Technology | Reason |
|---|---|---|
| **Frontend** | React.js + Tailwind CSS (PWA) | Lightweight, fast, installable on Android |
| **Backend** | Node.js + Express | Fast API development, strong ecosystem |
| **Database** | PostgreSQL + Redis | Relational for policies/claims; Redis for real-time trigger state |
| **ML Service** | Python + FastAPI microservice | scikit-learn, XGBoost, HuggingFace models |
| **Weather API** | OpenWeatherMap + Tomorrow.io | Rain, hail, wind, dust storm signals for Indian cities |
| **AQI API** | IQAir / CPCB open data | Real AQI data for Indian cities |
| **News/Social** | NewsAPI.org + Twitter API v2 | Social disruption signal monitoring |
| **Uptime Monitor** | DownDetector + custom scraper | Platform outage detection |
| **Payments** | Razorpay Sandbox (UPI payouts + mandate) | Indian-native, free sandbox |
| **Notifications** | Firebase Cloud Messaging + Twilio SMS | Covers data and non-data users |
| **Hosting** | Railway / Render (free tier) | Simple deployment for hackathon |

---

## 17. 6-Week Development Plan

| Week | Phase | Key Deliverables |
|---|---|---|
| 1–2 | Ideation & Foundation | Persona research, feature design, README, repo setup |
| 3 | Core Build — Onboarding + Premium | OTP flow, zone picker, Sunday premium engine |
| 4 | Core Build — Triggers + Payouts | Uptime monitor, AQI/weather trigger, Razorpay payout flow |
| 5 | Advanced Features | Social disruption oracle (rule-based MVP), pre-activation alerts |
| 6 | Polish + Demo | Fraud engine (rule-based MVP), dashboards, end-to-end demo |

**MVP scope vs Phase 2:**

| Feature | Hackathon MVP | Phase 2 |
|---|---|---|
| Social disruption oracle | Rule-based keyword matching | Full NLP classifier (HuggingFace) |
| Fraud detection | Rule-based scoring with GPS validation | Isolation Forest on real claim data |
| Premium engine | XGBoost trained on synthetic data | Retrained on real disruption history |
| Dashboard | Basic admin view with mock data | Live data, full analytics pipeline |

The hackathon MVP uses rule-based implementations wherever full ML models require real training data that does not yet exist. The architecture is designed for these to be replaced with ML models in Phase 2 without structural changes.

---

## 18. Analytics Dashboard

**Rider View:**
- This week's premium breakdown and coverage summary
- Live disruption alerts for active zones
- Claim history with payout amounts and event IDs
- Zone risk heatmap for the current week

**Admin View:**
- Active riders by zone in real time
- Live monitoring panel — weather, AQI, platform uptime, social signals
- Claims triggered today — count and total payout value
- Fraud flags raised — anomalous claims pending review
- Weekly premium revenue vs. payout ratio
- Most disruption-prone zones heatmap

---

## 19. Constraint Compliance

| Requirement | Status | How We Comply |
|---|---|---|
| Delivery partners only | ✅ Met | Zomato and Swiggy food delivery riders only — no other segments |
| Income loss coverage only | ✅ Met | Every trigger maps to lost working time — nothing else |
| No health, accident, or vehicle coverage | ✅ Met | None of these are covered anywhere in the product |
| Weekly pricing model | ✅ Met | Premium recalculated fresh every Sunday based on coming week's forecast |
| AI/ML integration | ✅ Met | Used in premium calculation, disruption confidence scoring, and fraud detection |
| Intelligent fraud detection | ✅ Met | 24-hr activation window, third-party trigger verification, GPS zone matching, loss ratio monitoring |
| Parametric automation | ✅ Met | No rider action needed at any point — triggers and payouts are fully automated |
| Integration capabilities | ✅ Met | OpenWeatherMap, Tomorrow.io, IQAir, NewsAPI, Twitter API, DownDetector, Razorpay |

---

## 20. Adversarial Defense & Anti-Spoofing Strategy

> **Market Crash Threat Brief:** A coordinated syndicate of 500 delivery
> workers used GPS-spoofing apps to fake presence in a red-alert weather
> zone while resting at home — triggering mass false payouts and draining
> a competitor platform's liquidity pool. Simple GPS verification is
> officially obsolete. Below is VERO's architectural response.

The attack only works on systems where location equals eligibility.
In VERO, it doesn't. Here is why.

---

### 20.1 The Differentiation — Genuine Rider vs. GPS Spoofer

VERO's parametric triggers were never built around GPS as the
primary signal. GPS is only a zone-matching check. What actually fires
a payout is entirely outside a rider's control:

| Trigger | What fires the payout | Can a rider fake this? |
|---|---|---|
| Weather / Hailstorm | OpenWeatherMap + Tomorrow.io meteorological feeds | No |
| AQI | IQAir / CPCB government sensor network | No |
| Platform blackout | DownDetector + custom third-party uptime scraper | No |
| Social disruption | 3 independent news/govt sources + restaurant availability collapse | No |

A fraudster sitting at home cannot manufacture a hailstorm on
OpenWeatherMap, take Zomato offline on DownDetector, or collapse
restaurant availability data across their zone. The triggers are
structurally unfakeable. GPS spoofing only affects the zone-match
check — and VERO has multiple layers that defeat that too.

**Beyond GPS — what the system actually checks:**

Even if a disruption is genuinely active, eligibility requires
demonstrated working behavior — not just presence:

- For platform blackout: rider must have a logged delivery attempt
  in the last 30 minutes before the outage. Someone who opened the
  app purely to collect a payout is ineligible.
- For all triggers: the Reliability Score (R) is built from Time
  Utilization, Delivery Efficiency, and Completion Rate over prior
  weeks. A fraudster with no real delivery history naturally sits at
  R = 0.0 — meaning 40% coverage floor, highest premium multiplier
  (1.5x), and minimum payout per interval. The economics of fraud
  are unattractive before any detection logic fires.
- The personal loss ratio monitor tracks total payouts divided by
  total premiums per rider. A ratio exceeding 1.8x triggers a
  compounding surcharge — making repeated gaming progressively
  expensive until it becomes a net loss by month 5.

---

### 20.2 The Data — What Catches a Coordinated Ring

Individual spoofing is hard to prove in isolation. A ring of 500
people is easy to detect because their coordination becomes the
signal. VERO's fraud anomaly engine (Isolation Forest, Phase 2)
monitors at the population level, not just the individual level.

**Temporal clustering:** Genuine disruptions produce staggered
triggers spread over 60–180 minutes as riders encounter conditions
at different times across a zone. A Telegram-coordinated ring
produces a spike — many riders in the same zone triggering within
a narrow window simultaneously. This pattern does not appear in
genuine disruptions and flags immediately as a ring-candidate event.

**Zone peer comparison:** Every claim is benchmarked against active
riders in the same zone at the same time. If a large group triggers
payouts while peer riders in that zone show normal delivery activity
— no slowdown, no delivery time spike, no restaurant availability
drop — the system flags this as a coordinated anomaly. A genuine
disruption affects all riders in the zone. A spoofed one doesn't.

**Duplicate trigger blocking:** Trigger event IDs are stored and
checked. The same event cannot produce duplicate payouts under the
same policy. Ring members attempting to trigger the same event
multiple times are blocked structurally.

**The 24-hour activation window** closes the most obvious attack
vector entirely. A rider who reads a bandh announcement tonight and
buys a policy cannot claim against it tomorrow morning. Organized
rings cannot exploit a known upcoming disruption through last-minute
mass sign-ups.

---

### 20.3 The UX Balance — Flagged Claims Without Penalizing Honest Workers

Fraud flags must never punish a genuine rider who simply has a bad
network connection during a storm. VERO handles this through
the existing fraud score pipeline:

**Flagged claims are held — not denied.** A suspicious claim enters
a review state. The payout is not rejected; it is paused while the
system gathers more signal passively. No rider action is required.

**Network drops are treated as neutral.** A failed re-verification
signal during a confirmed weather disruption does not count against
the rider. The system accounts for the fact that bad conditions
degrade connectivity — that is the whole point of the product.

**Honest riders are insulated by their history.** A returning rider
with a high R score and a clean personal loss ratio is extremely
unlikely to cross the fraud score threshold on a single genuine
claim. The score is built from behavioral history across weeks —
a one-off ambiguous signal does not override a strong track record.

**The R score naturally separates genuine riders from bad actors.**
A legitimate rider who has been active for weeks carries real Time
Utilization, Delivery Efficiency, and Completion Rate data. A
fraudster who joined to exploit a disruption has none of this. The
two profiles produce very different fraud scores without requiring
any manual intervention.

**If a flag is cleared, the rider receives the full payout** for
the period the disruption was confirmed active. No income is
permanently lost due to a false positive.

---

### 20.4 Why the Fraud Ring Cannot Win Against VERO

To drain VERO's liquidity pool the way the syndicate drained
the competitor platform, a coordinated ring would need to clear
all of the following simultaneously:

1. Wait the mandatory 24-hour activation window before any claim
   is possible
2. Trigger a real independent third-party source — a weather event
   on OpenWeatherMap, a platform outage on DownDetector, or a
   restaurant availability collapse in their zone
3. Pass the delivery activity check — a logged attempt on the
   platform in the 30 minutes prior to the trigger
4. Avoid the zone peer comparison alarm that fires when a large
   group triggers while no corresponding delivery slowdown is
   detected in the zone
5. Build enough R score history to receive anything beyond the
   40% minimum coverage at the maximum 1.5x premium multiplier
6. Do all of this profitably despite the personal loss ratio
   monitor applying compounding surcharges after the 1.8x threshold

Each of these is a separate structural barrier that exists in the
product for reasons entirely unrelated to fraud. The fraud
resistance is a byproduct of designing the product honestly —
not a bolt-on detection layer. That is what makes it durable.

---

### 20.5 Defense Summary

| Threat vector | Detection mechanism | Impact on honest rider |
|---|---|---|
| Single GPS spoof | Triggers fire from independent third-party data — GPS is zone-match only | Claim held for review, not denied; cleared on confirmation |
| Coordinated ring (500+ riders) | Temporal clustering + zone peer comparison + Isolation Forest anomaly engine | Zone enters audit mode; genuine riders' claims reviewed, not blocked |
| Last-minute buy + same-day claim | 24-hour activation window — no exceptions | None — applies only to new purchases and rejoins |
| Cancel-rejoin farming | Continuity scale resets to Week 1 on every rejoin | None for continuous auto-renewing subscribers |
| Income inflation | Verified income = min(self-declared, city benchmark, historical) | None — fair verification applies equally to all |
| No delivery activity at time of claim | Activity validation — delivery attempt required within last 30 minutes | None for riders actively working |
| High personal claim rate | Personal loss ratio monitor: ratio > 1.8x triggers compounding premium surcharge | Only activates if payout/premium ratio is genuinely anomalous over time |

> **The fundamental shift:** VERO moves trust away from user-controlled signals toward independent data, real economic activity, and population-level anomaly detection. The GPS coordinate is the *least* trusted signal in the pipeline — it is one input into a zone-match check, nothing more. The rest of the system is built on sources a fraudster cannot touch.

---

*VERO AI-Powered Insurance | Persona: Food Delivery Partners (Zomato / Swiggy)*
=======
## Setup Checklist (Day 1 Morning — ALL MEMBERS)

- [ ] Clone repo, create feature branches: `feat/frontend`, `feat/backend`, `feat/triggers`, `feat/integrations`
- [ ] PostgreSQL running (local install or [Supabase free](https://supabase.com) or [Neon free](https://neon.tech))
- [ ] `schema.sql` executed — all 20+ tables created
- [ ] `seed.sql` executed — 10 riders, 8 policies, 5 triggers, 5 claims loaded
- [ ] `.env` file created:
  ```
  DATABASE_URL=postgresql://user:pass@host:5432/vero
  JWT_SECRET=vero-hackathon-secret-2026
  OPENWEATHERMAP_API_KEY=          # Free: openweathermap.org
  IQAIR_API_KEY=                   # Free: iqair.com/dashboard
  NEWSAPI_KEY=                     # Free: newsapi.org
  RAZORPAY_KEY_ID=                 # Sandbox: razorpay.com
  RAZORPAY_KEY_SECRET=
  ```
- [ ] Node.js 18+ on all machines
- [ ] Git branching strategy agreed: feature branches → `main` via PR

---

## What Wins the Hackathon

> [!TIP]
> **The judges aren't looking for perfection.** They want to see:
> 1. **The AI actually does something visible** — show the ML premium difference between zones
> 2. **Triggers fire automatically** — no manual buttons, the system detects + acts
> 3. **Rider never touches a form** — zero-touch claim is the UX story
> 4. **Numbers are real and traceable** — premium breakdown shows every factor
> 5. **The demo tells a story** — not a feature tour, a rider's journey

> [!CAUTION]
> **Common hackathon fails to avoid:**
> - Don't build features that can't be demoed in 2 minutes
> - Don't spend Day 6-7 debugging integration — that's why Day 5 sync exists
> - Don't skip the demo video for "more code" — the video IS the deliverable
> - Mock what you can't build in time (SMS → console.log, Razorpay → mock success)
>>>>>>> 8894edacc148ba7b5ab89fa4a1cbd1bd6a5a9f31
