# GigShield — AI-Powered Parametric Income Protection for India's Food Delivery Workers

> **Hackathon Phase 1 Submission | Problem Statement: AI-Powered Parametric Insurance for India's Gig Economy**

---

## Table of Contents

1.  [Executive Summary](#1-executive-summary)
2.  [Problem Statement](#2-problem-statement)
3.  [What GigShield Does](#3-what-gigshield-does)
4.  [What Makes GigShield Different](#4-what-makes-gigshield-different)
5.  [Product Philosophy](#5-product-philosophy)
6.  [Persona](#6-persona-food-delivery-partner-zomato--swiggy)
7.  [User Categorization](#7-user-categorization--new-vs-returning)
8.  [Three Core Features](#8-three-core-features)
    - 8.1 [Parametric Trigger System](#81-parametric-trigger-system)
    - 8.2 [Adaptive Weekly Premium Engine](#82-adaptive-weekly-premium-engine)
    - 8.3 [Income Continuity Guarantee](#83-income-continuity-guarantee)
9.  [Payout Logic](#9-payout-logic)
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

---

## 1. Executive Summary

India's food delivery riders on Zomato and Swiggy have no income protection when disruptions hit — whether that is a hailstorm, a platform outage, or a city-wide bandh. The income loss happens. Nothing compensates for it.

GigShield is a parametric income protection platform built specifically for these riders. When a disruption is confirmed through independent data, income compensation goes to the rider's UPI wallet automatically — no claim, no paperwork, no delay.

Three things make it different from what else exists: it covers platform app downtime as a first-class trigger; it pre-arms coverage message via notificatino the night before a predicted bandh so riders are protected before they leave home; and it structurally prevents gaming through a 24-hour activation window and a continuity scale that makes last-minute purchasing unprofitable. Coverage adjusts per rider based on a Reliability Score derived from their own activity data.

Stack: React PWA, Node.js, PostgreSQL, Python ML microservice, OpenWeatherMap, Tomorrow.io, IQAir, Razorpay.

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

## 3. What GigShield Does

GigShield watches for disruptions in real time, checks them against independent sources, and sends income compensation directly to the rider's UPI wallet every 30 minutes. No claim needed. No paperwork.

The rule is simple: if a disruption is confirmed by independent third-party data and the rider was working in the affected zone with an active policy, they get paid — for as long as the disruption lasts.

**What GigShield does not cover:** Health, accident, or vehicle damage. Every trigger and every payout maps to one outcome — the rider could not earn today because of something outside their control.

---

## 4. What Makes GigShield Different

Most parametric products for gig workers work the same way — detect bad weather, trigger a payout. Three gaps in that approach came up consistently when we looked at what actually causes income loss for food delivery riders.

**1. Platform outages are not covered anywhere**
When Swiggy or Zomato goes down during a Friday dinner peak, riders lose their highest-earning window with zero recourse. GigShield covers this — verified through neutral third-party uptime monitoring, no rider action required.

**2. Social disruption coverage that arms the night before**
Bandhs and curfews are announced the night before, not detected on the day. GigShield's Social Disruption Oracle reads those signals overnight and pre-arms coverage before the rider leaves home — not after they have already lost the income.

**3. Adverse selection built out at the design level**
Smart riders can game any subscription insurance by buying only during bad weeks. GigShield treats this as a design problem, not an enforcement problem — a continuity payout scale, a loss ratio monitor, and pool math make opportunistic purchasing progressively unprofitable.

---

## 5. Product Philosophy

A Swiggy rider earning Rs.80 an hour during a dangerous AQI day or a full bandh has one real choice right now — keep working or go home broke. GigShield does not take that choice away. What it does is make stopping financially survivable for the first time. The rider still absorbs 40% of the income gap. But 60% is covered. That is enough to make the decision real.

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

*GigShield detects the outage at minute 1. By minute 47, when the outage crosses the trigger threshold, Ravi's income shield activates automatically. By the time he refreshes his app, ₹210 is already in his UPI wallet — no claim filed, no support ticket raised.*

---

**Scenario 2 — Suresh, Delhi (AQI Crisis)**

It is November. Delhi's AQI crosses 380 for the third consecutive day. Suresh can barely breathe. Each delivery takes twice as long as his lungs struggle with the toxic air. Order demand is normal — but his delivery speed has collapsed. He completes half his usual trips in the same hours.

*GigShield's AQI monitor detects that Suresh's active zone has crossed the trigger threshold for 4+ hours during his shift. A parametric income payout triggers automatically — no claim, no paperwork, no call to support.*

---

**Scenario 3 — Karan, Bengaluru (City Shutdown)**

A political party announces a bandh for Thursday morning. Karan does not see the news in time. He wakes up, gears up, and rides out — only to find every restaurant shuttered and his zone effectively locked down.

*GigShield's Social Disruption Oracle detected the bandh announcement Wednesday night. By 11pm, Karan's zone shield was pre-activated. Thursday morning, when the disruption is confirmed across multiple independent sources, his payout processes before he even leaves home.*

---

## 7. User Categorization — New vs Returning

GigShield treats new riders and returning riders differently. The approach changes depending on how much data the system has about the rider.

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

R               = min(sqrt(Adjusted TU x Adjusted DE x Completion Rate), 1.0)

Coverage %      = 40% + (25% x R)        → max 65%
Premium         = Base Rate x Risk Multiplier x (1.5 - R)
```

R is clamped to 1.0. This ensures coverage never exceeds 65% and the premium multiplier never falls below 0.5x.

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

GigShield watches four types of disruption at the same time. Each one uses a specific, independent signal to confirm the income impact is genuine.

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

Most insurance products divide an annual premium by 52 and call it weekly pricing. That is not what GigShield does. Every Sunday night, the premium for the coming week is recalculated from scratch based on what is actually forecast to happen in that specific rider's zone.

```
Weekly Premium = (Earnings x 1.5%)
               x Weather Multiplier   (OpenWeatherMap — 7-day forecast)
               x AQI Multiplier       (IQAir / CPCB — pollution forecast)
               x Social Multiplier    (Oracle disruption confidence score)
               x Active Hours         (part-time 0.6x → full-day 1.4x)
               x Zone History         (pin code disruption frequency)

Hard cap: Premium never exceeds 6% of weekly earnings
```

The 1.5% base rate is derived actuarially — expected weekly payout (Rs.80 x 5 hours x 10% probability x 60% coverage) plus operating margin = Rs.50 for an average rider = 1.5% of Rs.3,500 weekly income.

**For returning users (week 3+), the Reliability Score R personalizes further:**

```
R = min(sqrt(Adjusted TU x Adjusted DE x Completion Rate), 1.0)

Premium = Base Rate x Risk Multiplier x (1.5 - R)
  R = 1.0 → multiplier 0.5x (lowest premium — top performer reward)
  R = 0.0 → multiplier 1.5x (highest premium — inactive rider)
```

**Example — Suresh, Delhi, full-time, Rs.3,500/week, heavy rain + AQI 320:**

```
Base Rate     = Rs.52.50  |  Weather = 1.21x  |  AQI = 1.40x
Social = 1.00x  |  Active hours = 1.40x  |  Zone history = 1.30x

Weekly premium = Rs.52.50 x 1.21 x 1.40 x 1.00 x 1.40 x 1.30 = Rs.163
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

The 1.5% base rate applies to verified weekly income — not self-declared income. This grounds payout calculations in real earnings, not inflated figures.

---

### 8.3 Income Continuity Guarantee

GigShield caps income replacement at 65% maximum and never offers 100% — preventing moral hazard while ensuring meaningful relief. Coverage scales with rider tenure and performance.

**Why 60-65% and not 100%:**
100% coverage means a rider earns the same whether working or not — removing all incentive to work through manageable conditions. The cap means the rider still absorbs the remaining loss personally. Genuine disruptions get claimed. Mild conditions do not.

**Continuity scale table:**

| Tenure | Coverage % | Notes |
|---|---|---|
| Week 1–2 | Fixed 40% | No R data; city baseline income used |
| Week 3–4 | 40% + (25% x R), max 65% | R from past week's TU, DE, CR |
| Week 5+ | 40% + (25% x R), max 65% | Pin-code zone data replaces city defaults |

**Continuity scale (within coverage cap):**

```
Week 1–2  → 40% of entitled payout released
Week 3–4  → 70% of entitled payout released
Week 5+   → 100% of entitled payout released

Weekly payout cap = Coverage % x Verified Weekly Income (dynamic per rider)
```

A consistently active rider with a high R score pays less premium and receives higher coverage. The two outcomes compound — sustained engagement is meaningfully rewarded. See Section 8 for the full payout formula and worked examples.

---

## 9. Payout Logic

Paying a lump sum when rain starts is wrong — it might stop in 10 minutes. Waiting until rain ends is also wrong — the rider already lost the money. GigShield pays in 30-minute intervals while the disruption is actually happening. The amount is accurate and the money arrives when it is needed.

```
Per-Interval Payout Formula:

  Payout = Interval Duration (hrs) x Verified Hourly Income x Coverage %

Where:
  Interval Duration  = 0.5 hours (fixed 30-minute intervals)
  Verified Hourly    = Verified Weekly Income / estimated weekly active hours
                       (city baseline for new users; verified income from week 3+)
  Coverage %         = 40% fixed for weeks 1–2
                       40% + (25% x R) for week 3+, max 65%

Payout Timeline:
  → Trigger confirmed → first interval paid immediately within 2 minutes
  → Every 30 minutes while conditions remain above threshold
  → Stops when conditions drop below threshold OR weekly cap exhausted
  → Weekly Cap = Coverage % x Verified Weekly Income (dynamic per rider)
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
Coverage %           = 40% + (25% x 0.8)  = 60%
Verified hourly      = Rs.90
Per interval (30min) = 0.5 x Rs.90 x 60%  = Rs.27
Total (6 intervals)  = Rs.27 x 6           = Rs.162

Same rider, week 1 (coverage fixed at 40%):
Per interval         = 0.5 x Rs.90 x 40%  = Rs.18
Total                = Rs.18 x 6           = Rs.108
```

---

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
For every Rs.1.00 collected, GigShield targets Rs.0.40–0.60 in claims
```

---

## 12. Adverse Selection Handling

The classic problem with subscription insurance is that smart users buy in when bad weather is coming and cancel when things look clear. GigShield handles this through four mechanisms built into the product itself — not enforced after the fact.

**1. 24-Hour Activation Window**
A rider who reads tonight's bandh announcement and buys immediately cannot claim against that event. The 24-hour window is the primary structural block against last-minute opportunistic purchases. Applies to new purchases and rejoins only — not to auto-renewing subscribers.

**2. Continuity Payout Scale**
Week 1–2 subscribers receive 40% coverage — far less than a long-term subscriber with a good R score receives for the same disruption. Joining before a known bad week produces a significantly reduced payout, making the attempt financially unattractive once the premium cost is factored in.

**3. Cancellation Resets Eligibility**
Cancelling and rejoining resets the rider to week 1 status — restarting both the 24-hour window and the reduced continuity scale. Repeated cancel-and-rejoin cycling is progressively unattractive because reduced payouts in weeks 1–2 compound across each restart.

**4. Personal Loss Ratio Monitor**
GigShield tracks each rider's personal loss ratio — total payouts received divided by total premiums paid. When this ratio exceeds 1.8x, a surcharge applies to the following week's premium. The surcharge compounds with repeated triggering, making sustained gaming progressively expensive until it becomes a net loss by month 5.

---


## 13. Fraud Prevention Design

Most fraud prevention relies on catching bad actors after the fact. GigShield's approach is different — the way triggers are designed makes fraud structurally difficult in the first place.

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

  BLACKOUT TRIGGER:
  ├── Platform down > 45 mins within peak hours
  ├── Rider active, waiting for orders, confirmed via GPS + app session
  └── Instant payout → UPI within 2 minutes

  WEATHER / AQI TRIGGER:
  ├── Threshold: Rainfall > 50mm/hr OR hailstorm confirmed OR wind > 40km/hr OR AQI > 300
  ├── Duration: Sustained > 1 hour (weather) / 2 hours (AQI) continuously
  ├── Rider GPS confirms zone presence
  └── Interval payout begins → 30-min intervals → UPI within 2 mins of trigger

  SOCIAL DISRUPTION TRIGGER:
  ├── Night before: confidence > 75% → pre-activation alert sent to rider
  ├── Disruption day: 3 sources confirm + restaurants unavailable > 80%
  ├── Rider GPS confirms zone presence
  └── Instant payout → UPI within 2 minutes

  ALL TRIGGERS:
  ├── Eligibility: active policy + 24hr window passed + no duplicate + GPS zone match
  ├── Interval payout = 0.5 hrs x Hourly Rate x Coverage %
  ├── Processed every 30 minutes while disruption conditions hold
  ├── Stops when conditions end OR weekly cap exhausted
  ├── Multi-trigger rule: if two triggers active simultaneously, highest payout wins
  └── SMS at first interval with event ID — subsequent intervals silent

────────────────────────────────────────────────────────────────

DASHBOARD
├── Rider view: premium summary, disruption alerts, claim history, zone heatmap
└── Admin view: live monitoring panel, claims count, payout ratio, fraud flags
```

---


## 15. AI/ML Integration Plan

| Model | Type | Framework | Output |
|---|---|---|---|
| Premium engine | Supervised regression | XGBoost / scikit-learn | Weekly risk score → personalised premium per rider |
| Disruption oracle | NLP classifier | HuggingFace Transformers | Confidence score 0–100% per zone per day |
| Fraud anomaly engine | Rule-based + ML | Isolation Forest | Flags suspicious claim patterns for review |
| Payout calculator | Deterministic formula | — | Hourly Rate x Duration x 60% coverage cap |

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
| Delivery partners only | Met | Zomato and Swiggy food delivery riders only — no other segments |
| Income loss coverage only | Met | Every trigger maps to lost working time — nothing else |
| No health, accident, or vehicle coverage | Met | None of these are covered anywhere in the product |
| Weekly pricing model | Met | Premium recalculated fresh every Sunday based on coming week's forecast |
| AI/ML integration | Met | Used in premium calculation, disruption confidence scoring, and fraud detection |
| Intelligent fraud detection | Met | 24-hr activation window, third-party trigger verification, GPS zone matching, loss ratio monitoring |
| Parametric automation | Met | No rider action needed at any point — triggers and payouts are fully automated |
| Integration capabilities | Met | OpenWeatherMap, Tomorrow.io, IQAir, NewsAPI, Twitter API, DownDetector, Razorpay |

---

*Built for the AI-Powered Insurance Hackathon | Phase 1 Submission | Persona: Food Delivery Partners (Zomato / Swiggy) | March 2026*
