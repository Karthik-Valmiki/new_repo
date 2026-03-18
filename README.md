# GigShield — AI-Powered Parametric Income Protection for India's Food Delivery Workers

> Hackathon Phase 1 Submission | Problem Statement: AI-Powered Insurance for India's Gig Economy
> Persona: Food Delivery Partners (Zomato / Swiggy) | March 2026

---

## Table of Contents

1. [Problem Statement](#1-problem-statement)
2. [What GigShield Does](#2-what-gigshield-does)
3. [Target Persona](#3-target-persona)
4. [User-Based Categorization](#4-user-based-categorization)
5. [Core Features](#5-core-features)
   - 5.1 [Dynamic Premium Pricing Engine](#51-dynamic-premium-pricing-engine)
   - 5.2 [Multi-Dimensional Trigger System](#52-multi-dimensional-trigger-system)
   - 5.3 [Platform Blackout Coverage](#53-platform-blackout-coverage)
   - 5.4 [Social Disruption Oracle](#54-social-disruption-oracle)
6. [Worker-Based Premium Model](#6-worker-based-premium-model)
7. [Income Continuity Guarantee](#7-income-continuity-guarantee)
8. [Payout Logic](#8-payout-logic)
9. [Fraud Prevention Design](#9-fraud-prevention-design)
10. [Adverse Selection Handling](#10-adverse-selection-handling)
11. [Financial Sustainability Model](#11-financial-sustainability-model)
12. [End-to-End Application Workflow](#12-end-to-end-application-workflow)
13. [AI and ML Integration](#13-ai-and-ml-integration)
14. [Tech Stack](#14-tech-stack)
15. [Analytics Dashboard](#15-analytics-dashboard)
16. [Development Plan](#16-development-plan)
17. [Constraint Compliance](#17-constraint-compliance)

---

## 1. Problem Statement

India has over 5 million platform-based food delivery workers operating on Zomato and Swiggy. These workers sustain a Rs. 50,000 crore digital economy, but they operate without any income safety net.

Their earnings are disrupted regularly by events entirely outside their control:

- Heavy rainfall that makes roads unsafe and reduces order volumes
- High pollution levels (AQI) that slow delivery speeds and cut trip completion rates
- Platform app outages during peak meal hours that make earning physically impossible
- Bandhs, curfews, and civic shutdowns that close entire zones with little to no warning

When any of these disruptions hit, the rider absorbs the full financial loss. There is no existing system — government, platform, or insurance — that compensates for this income shock. The rider either works through dangerous conditions or loses the day's income entirely.

GigShield exists to close this gap.

---

## 2. What GigShield Does

GigShield is an AI-powered parametric income protection platform built specifically for food delivery riders. It monitors disruption signals in real time, verifies them against independent sources, and automatically transfers income compensation to the rider's UPI wallet — without requiring the rider to file any claim.

The system operates on a single principle: if a disruption event is confirmed by objective third-party signals and the rider was active in the affected zone, income compensation transfers automatically.

What this is not: GigShield does not cover health, accident, or vehicle damage. Every feature, every trigger, and every payout maps strictly to one outcome — the rider could not earn money today because of something outside their control.

Three things GigShield does that no existing product does:

**Digital infrastructure failure is covered.** Weather-only parametric products miss the most frequent income shock for delivery riders: platform app downtime. When Swiggy or Zomato goes down during a Friday dinner peak, riders lose their highest-earning window with zero recourse. GigShield adds parametric coverage for platform outages, verified through neutral third-party uptime monitoring independent of the rider.

**Coverage is pre-armed before disruption hits.** Most parametric systems are reactive. GigShield's Social Disruption Oracle monitors news feeds, social signals, and government notices the night before a likely bandh or curfew. Coverage activates before the rider leaves home, not after the rider has already lost income trying to work.

**Adverse selection is addressed at product design level.** Informed users in subscription insurance products buy only during bad weeks and cancel when conditions normalize. GigShield blocks this with a three-layer financial defense built into the coverage structure itself, so opportunistic gaming becomes progressively unprofitable without penalizing honest subscribers.

---

## 3. Target Persona

GigShield is built exclusively for food delivery partners on Zomato and Swiggy.

| Attribute | Detail |
|---|---|
| Segment | Food Delivery Partners (Zomato, Swiggy) |
| Age Range | 19 to 35 years |
| Monthly Earnings | Rs. 10,000 to Rs. 25,000 (Rs. 2,500 to Rs. 6,000 per week) |
| Work Pattern | 6 to 12 hour shifts focused on lunch (12pm to 2pm) and dinner (7pm to 10pm) peaks |
| Payment Cycle | Weekly platform payouts |
| Primary Device | Android smartphone |
| Digital Literacy | Comfortable with UPI and WhatsApp; limited experience with forms or apps beyond essentials |

### Real-World Scenarios

**Scenario 1 — Ravi, Mumbai (Platform Outage)**

Ravi logs in at 7pm on a Friday — the peak dinner window. Swiggy's app goes down for 70 minutes. He waits on his bike outside a restaurant, earning nothing. When the app comes back, the best hours of his week are gone with no record of what happened.

GigShield detects the outage at minute one. By minute 47, when the platform crosses the trigger threshold, Ravi's income shield activates. By the time he refreshes his app, Rs. 210 is already in his UPI wallet.

**Scenario 2 — Suresh, Delhi (AQI Crisis)**

It is November. Delhi's AQI crosses 380 for the third consecutive day. Suresh can barely breathe. Each delivery takes twice as long. Demand stays normal, but his speed collapses — he completes half his usual trips in the same hours.

GigShield's AQI monitor confirms that Suresh's active zone has crossed the trigger threshold for four or more hours during his shift. A parametric income payout triggers automatically. No claim, no paperwork.

**Scenario 3 — Karan, Bengaluru (City Shutdown)**

A political party announces a bandh for Thursday morning. Karan does not see it in time. He wakes up, gears up, rides out — and finds restaurants shuttered and zones locked down.

GigShield's social disruption oracle detected the bandh announcement on Wednesday night via news and social signals. By 11pm, Karan's zone shield was pre-activated. Thursday morning, when the disruption is confirmed, his payout processes before he even leaves home.

---

## 4. User-Based Categorization

GigShield segments all registered riders into two categories based on their subscription history. This categorization drives premium calculation, coverage percentage, and payout continuity scaling.

### New Users (Week 1 and Week 2)

New users have no personal income history, no zone behavior data, and no reliability track record on the platform. GigShield handles this cold start problem by:

- Using city-level baseline income estimates as the hourly income reference
- Applying zone-level default risk multipliers (Delhi: 1.3x, Mumbai: 1.15x) until personal data accumulates
- Setting a reduced continuity payout scale (40% of entitled payout) that makes it financially unattractive to join only during a bad week

This means a new user still receives genuine coverage and real payouts — but the system is calibrated so that joining right before a known bad event does not result in a windfall that undermines the pool.

### Returning Users (Week 3 Onward)

From week three, GigShield shifts to a personalized model driven by the Reliability Score.

```
Reliability Score (RS) = (Consistency Score + Activity Score + Behavior Score) / 3
```

Each component measures a different dimension of the rider's engagement:

- **Consistency Score:** How regularly the rider maintains an active subscription week over week
- **Activity Score:** How actively the rider works during their declared shift hours across their registered zones
- **Behavior Score:** Whether historical claim patterns align with confirmed disruption events (no suspicious spikes during non-disruption periods)

The Reliability Score then drives two outcomes:

| Reliability Score Range | Premium Effect | Coverage Effect |
|---|---|---|
| High RS (above 0.75) | Lower premium multiplier applied | Higher payout continuity, approaching 60% cap |
| Medium RS (0.50 to 0.75) | Neutral premium multiplier | Standard payout continuity |
| Low RS (below 0.50) | Higher premium multiplier applied | Reduced payout continuity |

From week five onward, personal pin-code disruption history replaces city-level zone defaults, making the model genuinely personalized.

---

## 5. Core Features

### 5.1 Dynamic Premium Pricing Engine

Every Sunday night, an AI agent re-prices each rider's premium based on what is forecast to happen in that rider's specific zone during the coming week.

```
Weekly Premium = (Weekly Earnings x 1.5%)
               x Weather Multiplier    (OpenWeatherMap — rain intensity forecast)
               x AQI Multiplier        (IQAir / CPCB — pollution severity forecast)
               x Social Multiplier     (Oracle confidence score for bandh / curfew risk)
               x Active Hours Factor   (part-time: 0.6x, full-day: 1.4x)
               x Zone History Factor   (pin code disruption frequency — from week 5+)

Hard cap: Premium never exceeds 6% of weekly earnings
```

**Example — Suresh, Delhi, full-time, Rs. 3,500 per week, heavy rain week + AQI 320:**

```
Base rate     = Rs. 3,500 x 1.5%        = Rs. 52.50
Weather       x 1.21 (heavy rain)
AQI           x 1.40 (AQI 320)
Social        x 1.00 (no bandh signal)
Active hours  x 1.40 (full-day)
Zone history  x 1.30 (Delhi baseline)

Final premium = Rs. 52.50 x 1.21 x 1.40 x 1.00 x 1.40 x 1.30 = Rs. 163

Maximum payout this week = Rs. 3,500 x 60% = Rs. 2,100
```

**Policy structure:** Monday to Sunday. Auto-renews via UPI mandate. Riders can register up to three active delivery zones. Coverage applies to whichever zone GPS confirms at the time of the disruption event.

---

### 5.2 Multi-Dimensional Trigger System

GigShield goes beyond single-trigger weather insurance. The system monitors four independent disruption categories simultaneously, each with its own threshold and duration requirements.

| Trigger Type | What Is Monitored | What It Covers |
|---|---|---|
| Weather | Rainfall intensity (mm/hr) via OpenWeatherMap | Income lost to rain-related delivery slowdowns |
| AQI | Air quality index per zone via IQAir / CPCB | Income lost when pollution makes delivery significantly slower |
| Platform | App uptime checked every 5 minutes via third-party monitoring | Income lost to Swiggy or Zomato downtime during peak hours |
| Social | News, social signals, and government notices for civic shutdowns | Income lost to bandhs, curfews, strikes, and Section 144 orders |

**Why threshold-based triggering is the only correct approach:**

There are three possible approaches to payout timing. Only one is correct.

- Paying at the start of rain creates obvious fraud opportunities — a 10-minute drizzle would qualify.
- Waiting until rain ends defeats the purpose — the rider already absorbed the full income hit.
- GigShield uses threshold-based triggering, where both intensity and sustained duration must be confirmed before a payout fires.

```
WEATHER TRIGGER — Both conditions must be met simultaneously:
  Condition 1 (Threshold): Rainfall above 50mm/hr
  Condition 2 (Duration):  Sustained for more than 1 hour continuously

AQI TRIGGER — Both conditions must be met simultaneously:
  Condition 1 (Threshold): AQI above 300 in rider's active zone
  Condition 2 (Duration):  Sustained for more than 2 hours during shift

PLATFORM BLACKOUT TRIGGER — Both conditions must be met:
  Condition 1 (Threshold): Platform uptime below 100%
  Condition 2 (Duration):  Sustained for more than 45 continuous minutes
                           AND within peak hours (12:00–14:30 or 19:00–22:30)

SOCIAL DISRUPTION TRIGGER — Three independent signals confirmed:
  Condition 1: Oracle confidence score above 75%
  Condition 2: Three independent sources confirm disruption is active on the day
  Condition 3: Restaurant availability in the affected zone drops above 80%
```

Trigger timestamps are stored at both start and end of disruption. Duration is computed from these timestamps and used for payout calculation and fraud analytics. The payout fires at trigger start — not trigger end — so the rider receives compensation during the disruption, not after it has already ended.

---

### 5.3 Platform Blackout Coverage

When Swiggy or Zomato goes down during peak meal hours, delivery riders earn zero. It is the most direct and most frequent income disruption — and it is the most ignored by every existing insurance or protection product.

GigShield monitors platform uptime every five minutes via neutral third-party uptime services. When an outage during a peak window exceeds the 45-minute threshold:

```
Trigger Condition:
  Platform uptime below 100% for more than 45 continuous minutes
  AND time falls within food delivery peak window (12:00–14:30 OR 19:00–22:30)
  AND rider was active or logged in at disruption start

Payout Calculation:
  Payout = (Minutes of outage / 60) x Rider's hourly earning rate x Coverage %
  Transferred to rider's UPI ID within 2 minutes of trigger confirmation
```

Why this trigger is fraud-proof by design: the outage is confirmed by a neutral third-party source entirely independent of the rider. Either the platform is down or it is not. With zero platform function, earning is physically impossible — income loss is guaranteed by the trigger itself, not inferred or estimated.

---

### 5.4 Social Disruption Oracle

Bandhs, curfews, Section 144 orders, and local strikes cause immediate zone shutdowns with little to no notice. Riders are left stranded with zero income and no warning.

GigShield's AI agent runs a continuous signal-monitoring pipeline:

```
Sources Monitored (24 hours, 7 days):
  Twitter / X API     : Keywords — bandh, curfew, chakka jam, rasta roko + city name
  Google News API     : Local news headlines for civic disruptions
  Government feeds    : Section 144, official curfew notifications
  NewsAPI.org         : Regional news aggregation

AI Confidence Scoring:
  1 tweet from unknown account                    = 12% confidence — ignored
  Trending hashtag + 3 corroborating news sources = 74% confidence — pre-alert sent to riders
  Official statement + government notice          = 91% confidence — shield pre-activated
```

**Trigger flow:**

```
Step 1: Oracle confidence crosses 75% threshold (typically the night before)
Step 2: AI maps affected zones at pin-code precision
Step 3: Riders in affected zones receive pre-activation notification
Step 4: Disruption day — cross-verification via:
          (a) News sources confirm disruption is active
          (b) Restaurant availability in zone drops above 80%
          (c) Rider GPS confirms presence in affected zone
Step 5: All three conditions confirmed — payout triggers automatically
```

What makes this different from every other solution: all other parametric products are reactive. The Social Disruption Oracle is the only feature in any product that predicts and pre-arms coverage before the disruption hits, turning parametric insurance from reactive to genuinely proactive.

---

## 6. Worker-Based Premium Model

GigShield's premium is not a flat rate. It is individually calculated based on who the worker is, where they work, and how they work. The following factors adjust the final premium for each rider.

**City-Level Risk Factor**

Each city carries a baseline zone risk multiplier derived from historical disruption frequency, average rainfall intensity, and AQI patterns.

| City | Default Zone Multiplier |
|---|---|
| Delhi | 1.30x |
| Mumbai | 1.15x |
| Bengaluru | 1.10x |
| Chennai | 1.05x |
| Other cities | 1.00x (neutral baseline) |

From week five onward, city-level defaults are replaced by pin-code level zone history specific to the rider's registered delivery zones.

**Working Hours Factor**

Riders who declare fewer active hours are less exposed to disruption windows and pay proportionally less.

| Working Hours per Day | Factor Applied |
|---|---|
| 4 hours or fewer (part-time) | 0.6x |
| 5 to 7 hours | 1.0x |
| 8 hours or more (full-day) | 1.4x |

**Reliability Score Factor (Week 3 Onward)**

High reliability riders have demonstrated consistent, honest use of the product. They receive a premium reduction as a benefit of continued engagement.

**Income Bracket**

The 1.5% base rate is applied to the rider's self-declared weekly earnings bracket. Higher-earning riders have a higher premium in absolute terms but the same percentage rate, keeping the system fair across income levels. The 6% hard cap ensures no rider pays more than six percent of their weekly earnings regardless of how many risk multipliers stack.

---

## 7. Income Continuity Guarantee

GigShield guarantees income continuity during confirmed disruptions through its payout structure. This is the core promise of the product: when objective conditions make earning impossible or significantly harder, the rider's income does not go to zero.

The Income Continuity Guarantee operates on a tiered scale linked to subscription tenure. This serves two purposes simultaneously — it protects against gaming by new subscribers while rewarding long-term, honest riders with the full entitled payout.

### Continuity Scale

| Subscription Tenure | Continuity Payout Scale |
|---|---|
| Week 1 to Week 2 | 40% of the entitled payout |
| Week 3 to Week 4 | 50% of the entitled payout |
| Week 5 and beyond | 60% of the entitled payout (maximum) |

The "entitled payout" is calculated first at the base coverage level (60% of income loss), and then the continuity scale is applied on top. A week five or beyond rider receives the full entitled amount. A week one rider receives 40% of that same entitled amount.

### Coverage Cap Rationale

GigShield intentionally caps coverage at 60% and never offers 100% replacement income. This is a deliberate design decision, not a limitation.

```
WHY 60% AND NOT 100%:

  100% coverage = rider earns the same whether working or not
                = moral hazard — rider stops working at the first sign of bad weather
                = product collapses under unnecessary claims

  60% coverage  = rider still loses 40% of income by not working
                = only genuine disruptions result in payouts
                = premiums stay affordable and the pool stays sustainable
```

The hard ceiling is 60% under any condition, regardless of disruption severity. The weekly payout cap is Rs. 1,200 regardless of coverage percentage.

### Payout Example — End-to-End Calculation

Mumbai worker, week 5+ subscriber, extreme bandh, 4 hours of income lost:

```
Hourly income            = Rs. 80
Hours lost               = 4
Full income loss         = Rs. 80 x 4 = Rs. 320

60% coverage cap applied = Rs. 320 x 60% = Rs. 192 (entitled payout)
60% continuity scale     = Rs. 192 x 60% = Rs. 115.20 (actual payout)
```

Same worker in week 1:

```
60% coverage cap applied = Rs. 192 (entitled payout, same)
40% continuity scale     = Rs. 192 x 40% = Rs. 76.80 (actual payout)
```

The difference between week 1 and week 5+ payouts makes gaming — joining only before a known bad week — financially unattractive while ensuring even new riders receive meaningful protection.

---

## 8. Payout Logic

GigShield uses interval-based payout during confirmed disruptions. This is distinct from paying before a disruption (gaming risk) or paying only after a disruption ends (the rider already absorbed the loss).

```
Core Formula:
  Payout = Hourly Income x Disruption Duration (hours) x Coverage %

Timeline:
  - Payout starts when both threshold and duration conditions are confirmed
  - Payout continues at interval intervals during the disruption
  - Payout stops when the disruption ends (threshold drops below minimum)
  - Coverage deducted from rider's weekly maximum as payouts occur
  - Payout stops automatically when weekly coverage maximum is exhausted
```

All payouts are sent to the rider's UPI ID within two minutes of trigger confirmation. An SMS confirmation is sent simultaneously with the claim event ID attached for the rider's records.

---

## 9. Fraud Prevention Design

GigShield is fraud-resistant by structural design, not just by enforcement. The core principle is that the trigger itself is what makes fraud difficult, not after-the-fact auditing.

**No claim submission means no fake claims.** Since riders submit nothing and the system triggers automatically from independent sources, there is nothing for a fraudulent actor to fabricate.

**Third-party verification is independent of the rider.** Platform uptime data, weather readings, AQI levels, and news signals are all sourced from third parties that have no relationship with any individual rider. A rider cannot influence whether these signals fire.

**GPS-based zone validation.** The rider's GPS location at the time of disruption must match one of their registered delivery zones. A rider in a zone unaffected by the declared disruption does not receive a payout.

**Duplicate trigger blocking.** The system stores trigger event IDs and blocks duplicate payouts for the same event across the same policy.

**ML anomaly detection (Phase 2).** An Isolation Forest model flags claim patterns that deviate significantly from expected behavior for a given zone and disruption event — for example, a rider claiming multiple disruptions in a week where no other rider in the same zone triggered.

---

## 10. Adverse Selection Handling

Any subscription insurance product faces a fundamental problem: informed users buy coverage only during bad weeks and cancel when conditions look normal. This behavior, if unchecked, makes the risk pool unsustainable.

GigShield addresses adverse selection at the product design level through three mechanisms that operate simultaneously.

**Continuity Payout Scale**

Week 1 to 2 subscribers receive only 40% of their entitled payout. Joining right before a known bad week therefore results in a net financial loss once the premium paid is compared against the reduced payout received. The math makes gaming week one unattractive without any explicit penalty.

**Personal Loss Ratio Monitor**

GigShield tracks each rider's personal loss ratio — the ratio of total payouts received to total premiums paid. When a rider's personal loss ratio exceeds 1.8x (meaning they have received Rs. 1.80 in payouts for every Rs. 1.00 paid in premiums), a surcharge is applied to their following week's premium. This surcharge compounds with repeated gaming behavior, making the cycle progressively more expensive.

**Cancellation Resets Eligibility**

Cancelling and rejoining the subscription resets the rider to week one status. The continuity scale starts over. This eliminates the strategy of cancelling during safe periods and rejoining before bad weeks, since rejoining always means reduced payouts for the first two weeks.

**Pool Mathematics**

With 1,000 active riders and approximately 100 claims per week, the risk pool operates within sustainable variance. The loss ratio target is 0.40 to 0.60 — for every Rs. 1.00 collected in premiums, GigShield targets paying out Rs. 0.40 to Rs. 0.60 in claims. The 60% hard payout ceiling is what keeps expected claims bounded and makes this ratio achievable.

---

## 11. Financial Sustainability Model

The financial model is built around four principles that keep the platform solvent while providing genuine value to riders.

**Coverage cap at 60% of income loss, always.** No condition, no disruption severity, and no rider tenure level results in a payout above 60% of confirmed income loss. This is the primary mechanism that keeps expected claims bounded.

**Continuity scale reduces new-subscriber payouts.** Even when a valid disruption occurs, week one and two subscribers receive only 40% to 50% of the entitled amount, further reducing claims from high-churn subscribers.

**Premium scales with risk.** Weeks and zones with higher forecast disruption probability carry higher premiums. Riders who choose to work in high-risk zones during high-risk weeks pay more, which calibrates premium income to expected claim output.

**Weekly policy cycle limits exposure.** Because the policy unit is a single week (Monday to Sunday), the platform's maximum liability is always bounded by the current week's policies. There is no long-tail multi-year liability.

```
Loss ratio target: 0.40 to 0.60
(For every Rs. 1.00 collected in premiums, GigShield pays Rs. 0.40 to Rs. 0.60 in claims)
```

---

## 12. End-to-End Application Workflow

### Onboarding (Under 2 Minutes)

```
Phone number + OTP verification
Select platform (Zomato / Swiggy / Zepto / Blinkit)
Drop pin for active delivery zones (2 to 3 zones)
State average weekly earnings bracket
System instantly displays the current week's personalized premium
Pay via UPI — policy activates immediately
```

### Every Sunday Night (Automated)

```
Premium engine re-runs for all active riders
Pulls fresh weather, AQI, and social disruption signals
Recalculates zone-level risk scores for the coming week
New weekly premium auto-debited via UPI mandate
```

### Real-Time Monitoring (Always On)

```
Platform uptime checked every 5 minutes
AQI levels and delivery time spikes tracked per zone hourly
Restaurant availability monitored per zone continuously
Social media and news feeds scanned for disruption signals
Trigger conditions evaluated against all active policies
```

### Claim Trigger (Zero Rider Action Required)

```
PLATFORM BLACKOUT:
  Uptime below 100% for more than 45 minutes
  Within peak hours (12:00–14:30 or 19:00–22:30)
  Rider logged in confirmed
  Payout to UPI within 2 minutes

WEATHER / AQI:
  Rainfall above 50mm/hr OR AQI above 300
  Sustained for required duration
  Rider GPS confirms zone presence
  Payout to UPI within 2 minutes

SOCIAL DISRUPTION:
  Oracle confidence above 75% (night before) — pre-activation alert sent
  Disruption day: 3 sources confirm active
  Restaurant availability drops above 80%
  Rider GPS confirms zone presence
  Payout to UPI within 2 minutes

ALL TRIGGERS:
  Eligibility checked (active policy, no duplicate, zone match)
  Payout = Hourly Rate x Duration x Coverage % x Continuity Scale
  SMS confirmation sent with claim event ID
```

---

## 13. AI and ML Integration

| Model | Type | Framework | Output |
|---|---|---|---|
| Premium engine | Supervised regression | XGBoost / scikit-learn | Weekly risk score and premium per rider |
| Disruption oracle | NLP classifier | HuggingFace Transformers | Confidence score 0 to 100% per zone |
| Fraud anomaly engine | Rule-based + ML | Isolation Forest | Flags suspicious claim patterns |
| Payout calculator | Deterministic formula | None required | Duration x Hourly Rate x Coverage % |

**MVP vs Phase 2 scope:**

| Component | Hackathon MVP | Phase 2 |
|---|---|---|
| Social disruption oracle | Rule-based keyword matching | Full NLP classifier with HuggingFace |
| Fraud detection | Rule-based scoring | Isolation Forest ML model |
| Premium engine | XGBoost on synthetic data | Retrained on real disruption history |
| Zone personalization | City-level defaults | Pin-code level from real claim data |

Scoping the hackathon MVP around rule-based implementations keeps delivery realistic while demonstrating the full system architecture. ML models are designed for Phase 2 once real training data is available from live riders.

---

## 14. Tech Stack

**Platform choice: Mobile-First Progressive Web App (PWA)**

Riders use Android phones almost exclusively. A PWA delivers an app-like experience without requiring Play Store installation, which matters for users with lower digital literacy. It supports push notifications and can function offline for dashboard viewing.

| Layer | Technology | Reason |
|---|---|---|
| Frontend | React.js + Tailwind CSS (PWA) | Lightweight, fast, installable on Android without app store |
| Backend | Node.js + Express | Fast API development, strong ecosystem |
| Database | PostgreSQL + Redis | Relational for policies and claims; Redis for real-time trigger state |
| ML Service | Python + FastAPI microservice | scikit-learn, XGBoost, HuggingFace models |
| Weather API | OpenWeatherMap (free tier) | Reliable, generous free quota |
| AQI API | IQAir / CPCB open data | Real AQI data for Indian cities |
| News and Social | NewsAPI.org + Twitter API v2 | Social disruption monitoring |
| Uptime Monitor | DownDetector + custom scraper | Platform blackout detection |
| Payments | Razorpay Sandbox (UPI payouts + mandate) | Indian-native, free sandbox environment |
| Notifications | Firebase Cloud Messaging + Twilio SMS | Covers both data and non-data users |
| Hosting | Railway / Render (free tier) | Straightforward deployment for hackathon |

---

## 15. Analytics Dashboard

### Rider View

- Current week's premium and remaining coverage summary
- Live disruption alerts active in registered zones
- Claim history with payout amounts and event IDs
- Zone risk heatmap for the current week

### Admin View

- Total active riders by zone (real-time count)
- Live monitoring panel showing weather, AQI, platform uptime, and social signals
- Claims triggered today — count and total payout value
- Fraud flags raised — anomalous claims under review
- Weekly premium revenue versus payout ratio
- Most disruption-prone zones heatmap

---

## 16. Development Plan

| Week | Phase | Key Deliverables |
|---|---|---|
| 1 to 2 | Ideation and Foundation | Persona research, feature design, README, repository setup |
| 3 | Core Build — Onboarding and Premium | OTP onboarding, zone picker, Sunday premium engine |
| 4 | Core Build — Triggers and Payouts | Uptime monitor, AQI and weather trigger, Razorpay payout flow |
| 5 | Advanced Features | Social disruption oracle (rule-based MVP), pre-activation alerts |
| 6 | Polish and Demo Preparation | Fraud engine (rule-based MVP), basic dashboards, demo simulation |

---

## 17. Constraint Compliance

| Requirement | Status | How GigShield Complies |
|---|---|---|
| Delivery partners only | Met | Built exclusively for Zomato and Swiggy food delivery riders |
| Income loss coverage only | Met | All triggers map strictly to lost working hours and wages |
| No health, accident, or vehicle coverage | Met | Zero features touch these categories |
| Weekly pricing model | Met | Premium recalculated every Sunday; week is the atomic unit of the entire system |
| AI and ML integration | Met | Premium engine, NLP disruption scorer, fraud anomaly detection |
| Intelligent fraud detection | Met | Third-party verification + GPS validation + ML anomaly engine |
| Parametric automation | Met | Zero rider action required for any claim or payout |
| Integration capabilities | Met | OpenWeatherMap, IQAir, NewsAPI, Twitter, DownDetector, Razorpay |

---

> GigShield is not just insurance. It is a real-time income protection system designed for the actual realities of gig workers — combining parametric triggers, adaptive pricing, worker-based categorization, and automated payouts into a scalable and deployable solution.

---

_Built for the AI-Powered Insurance Hackathon | Phase 1 Submission | March 2026_
