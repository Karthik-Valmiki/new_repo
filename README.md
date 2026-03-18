# GigShield — AI-Powered Parametric Income Protection for India's Food Delivery Workers

> Hackathon Phase 1 Submission | Problem Statement: AI-Powered Insurance for India's Gig Economy
> Persona: Food Delivery Partners (Zomato / Swiggy) | March 2026

---

## Executive Summary

India's 1 million+ food delivery riders on Zomato and Swiggy have no income protection when environmental conditions, platform outages, or civic shutdowns make earning impossible. GigShield is a parametric income protection platform that monitors disruption signals in real time and automatically processes compensation to a rider's UPI wallet at regular intervals — no claim required, no paperwork. Three things distinguish it: platform app outages are covered as a first-class trigger; the Social Disruption Oracle pre-arms coverage the night before a bandh or curfew so riders are protected before they leave home; and adverse selection is blocked structurally through a 24-hour policy activation window and a continuity payout scale that makes opportunistic gaming financially unattractive. Coverage is personalized using a Reliability Score derived from each rider's Time Utilization, Delivery Efficiency, and Completion Rate relative to their zone peers. Tech stack: React PWA, Node.js, PostgreSQL, Python ML microservice, OpenWeatherMap, Tomorrow.io, IQAir, Razorpay.

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
9. [Policy Activation Rule](#9-policy-activation-rule)
10. [Fraud Prevention Design](#10-fraud-prevention-design)
11. [Adverse Selection Handling](#11-adverse-selection-handling)
12. [Financial Sustainability Model](#12-financial-sustainability-model)
13. [End-to-End Application Workflow](#13-end-to-end-application-workflow)
14. [AI and ML Integration](#14-ai-and-ml-integration)
15. [Tech Stack](#15-tech-stack)
16. [Analytics Dashboard](#16-analytics-dashboard)
17. [Development Plan](#17-development-plan)
18. [Constraint Compliance](#18-constraint-compliance)

---

## 1. Problem Statement

India has over 1 million platform-based food delivery workers operating on Zomato and Swiggy. These workers sustain a Rs. 35,800 crore digital economy, but they operate without any income safety net.

Their earnings are disrupted regularly by events entirely outside their control:

- Severe environmental conditions — heavy rainfall, hailstorms, dusty winds, and heavy winds — that make roads unsafe, slow delivery speeds, and reduce order volumes
- High pollution levels (AQI) that significantly cut trip completion rates over sustained periods
- Platform app outages during peak meal hours that make earning physically impossible
- Bandhs, curfews, and civic shutdowns that close entire zones with little to no warning

When any of these disruptions hit, the rider absorbs the full financial loss. There is no existing system — government, platform, or insurance — that compensates for this income shock. The rider either works through dangerous conditions or loses the day's income entirely.

GigShield exists to close this gap.

---

## 2. What GigShield Does

GigShield is an AI-powered parametric income protection platform built specifically for food delivery riders on Zomato and Swiggy. It monitors disruption signals in real time, verifies them against independent sources, and automatically processes income compensation to the rider's UPI wallet at regular intervals — without requiring the rider to file any claim.

The system operates on a single principle: if a disruption event is confirmed by objective third-party signals and the rider was active in the affected zone with an active policy, income compensation is processed at regular intervals for the full duration of the disruption.

What this is not: GigShield does not cover health, accident, or vehicle damage. Every feature, every trigger, and every payout maps strictly to one outcome — the rider could not earn money because of something outside their control.

Three things GigShield does that no existing product does:

**Digital infrastructure failure is covered.** Weather-only parametric products miss the most frequent income shock for delivery riders: platform app downtime. When Swiggy or Zomato goes down during a Friday dinner peak, riders lose their highest-earning window with zero recourse. GigShield adds parametric coverage for platform outages, verified through neutral third-party uptime monitoring entirely independent of the rider.

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
| Work Pattern | Shift-based work focused on lunch (12pm to 2pm) and dinner (7pm to 10pm) peaks |
| Payment Cycle | Weekly platform payouts |
| Primary Device | Android smartphone |
| Digital Literacy | Comfortable with UPI and WhatsApp; limited experience with forms or complex apps |

### Real-World Scenarios

**Scenario 1 — Ravi, Mumbai, Swiggy (Platform Outage)**

Ravi logs in at 7pm on a Friday — the peak dinner window. Swiggy's app goes down for 70 minutes. He waits on his bike outside a restaurant, earning nothing. When the app comes back, the best earning hours of his week are gone with no record of what happened.

GigShield detects the outage at minute one. By minute 47, when the outage crosses the trigger threshold, Ravi's income shield activates. Compensation is processed at regular intervals for the duration of the confirmed outage and credited to his UPI wallet throughout.

**Scenario 2 — Suresh, Delhi, Zomato (Environmental Disruption — Hailstorm)**

A sudden hailstorm hits Delhi in the afternoon. Hail and strong winds make roads dangerous. Suresh can complete fewer than half his usual trips. Demand stays normal but conditions make safe delivery impossible.

GigShield's environmental monitor confirms the hail and wind threshold in Suresh's active zone has been sustained for the required duration. A parametric income payout is triggered. Compensation is processed at regular intervals for as long as conditions remain above threshold. No claim, no paperwork.

**Scenario 3 — Karan, Bengaluru, Zomato (City Shutdown)**

A political party announces a bandh for Thursday morning. Karan does not see it in time. He wakes up, gears up, rides out — and finds restaurants shuttered and zones locked down.

GigShield's social disruption oracle detected the bandh announcement Wednesday night via news and social signals. By 11pm, Karan's zone shield was pre-activated. Thursday morning, when the disruption is confirmed across three independent sources, payout intervals begin automatically.

---

## 4. User-Based Categorization

GigShield segments all registered riders into two categories based on their subscription history. This categorization drives premium calculation, coverage percentage, and payout continuity scaling.

### New Users (Week 1 and Week 2)

New users have no personal income history, no zone behavior data, and no track record on the platform. GigShield handles the cold-start problem by:

- Using city-level baseline income estimates as the hourly income reference for payout calculation
- Applying zone-level default risk multipliers (Delhi: 1.3x, Mumbai: 1.15x) until personal data accumulates
- Setting a fixed coverage of 40% and a reduced continuity scale, making it financially unattractive to join only during a known bad week

New users still receive genuine coverage and real payouts. The system is calibrated so that joining right before a known bad event does not result in a windfall that undermines the pool.

Every new policy also activates 24 hours after purchase, which prevents last-minute purchases triggered by an already-announced disruption event. See Section 9 for the full policy activation rule.

### Returning Users (Week 3 Onward)

From week three, GigShield shifts to a personalized model. The premium and coverage for returning users are driven by three performance metrics: Time Utilization (TU), Delivery Efficiency (DE), and Completion Rate (CR), which together produce the Reliability Score (R).

```
Adjusted TU     = User's Active Hours this week / Average Active Hours in their Zone
Adjusted DE     = User's Completed Orders this week / Average Orders in their Zone
Completion Rate = User's Completed Orders / User's Accepted Orders

R               = min(sqrt(Adjusted TU x Adjusted DE x Completion Rate), 1.0)

Coverage %      = 40% + (25% x R)
Premium         = Base Rate x Risk Multiplier x (1.5 - R)
```

R is clamped to a maximum of 1.0. This ensures Coverage never exceeds 65% and the premium multiplier (1.5 - R) never falls below 0.5, keeping both outcomes bounded regardless of how a rider performs relative to a low-activity zone average.

**What these metrics measure:**

- **Time Utilization (TU):** How consistently the rider is active relative to other riders in the same zone. A rider who works regularly will have a TU at or close to 1.0.
- **Delivery Efficiency (DE):** How many orders the rider completes relative to the zone average. A high-performing rider will have a DE at or close to 1.0.
- **Completion Rate (CR):** The ratio of orders the rider completed to orders they accepted. A rider who accepts but drops orders will have a CR below 1.0, which pulls R down even if TU and DE are high. All three values come from the rider's own platform activity — no external data dependency.
- **R (Reliability Score):** The geometric mean of all three metrics, clamped to 1.0. R ranges from 0 to 1.0, where 1.0 represents the maximum benefit level.

**What R drives:**

| R Value | Coverage | Premium Effect |
|---|---|---|
| R = 1.0 (high performer, clamped maximum) | 40% + 25% = 65% | Base x Risk x 0.5 (lowest premium) |
| R = 0.5 (average) | 40% + 12.5% = 52.5% | Base x Risk x 1.0 (neutral) |
| R = 0.0 (inactive) | 40% + 0% = 40% (floor) | Base x Risk x 1.5 (highest premium) |

A rider who is consistently active and completing orders relative to their zone peers pays less premium and receives higher coverage. A rarely active rider pays more and receives only the baseline floor coverage. The 40% floor ensures even low-activity riders have meaningful protection.

From week five onward, zone averages are computed from the rider's specific registered pin codes rather than city-wide defaults, making the personalization genuinely local.

---

## 5. Core Features

### 5.1 Dynamic Premium Pricing Engine

Every Sunday night, an AI agent re-prices each rider's premium based on the coming week's forecast risk for that rider's specific zones.

**For new users (Week 1 and 2):**

```
Weekly Premium = Base Rate x Risk Multiplier

Base Rate        = 2% of city-level estimated weekly earnings for the rider's bracket
Risk Multiplier  = Zone risk score derived from environmental, AQI, and social disruption
                   forecasts for the coming week
```

**For returning users (Week 3 onward):**

```
Weekly Premium = Base Rate x Risk Multiplier x (1.5 - R)

Where:
  Base Rate        = 2% of rider's verified weekly income
  Risk Multiplier  = Zone risk score from environmental, AQI, and social forecasts
  R                = min(sqrt(Adjusted TU x Adjusted DE x Completion Rate), 1.0)
                     computed from the past week's data

A higher R (capped at 1.0) lowers the multiplier toward (1.5 - 1.0) = 0.5x (minimum).
A lower R raises the multiplier toward (1.5 - 0.0) = 1.5x (maximum).
```

**Hard cap:** Premium never exceeds 6% of the rider's weekly earnings regardless of how multipliers stack.

**Example — Suresh, Delhi, Zomato, returning user (R = 0.8), Rs. 3,500 per week, heavy environmental disruption week forecast:**

```
Base Rate       = Rs. 3,500 x 2%              = Rs. 70
Risk Multiplier = 1.30 (Delhi zone, severe week forecast)
R               = 0.8

Premium         = Rs. 70 x 1.30 x (1.5 - 0.8)
                = Rs. 70 x 1.30 x 0.70
                = Rs. 63.70

Coverage %      = 40% + (25% x 0.8)           = 60%
Weekly payout cap = Rs. 3,500 x 60%           = Rs. 2,100 (dynamic: Coverage % x Verified Weekly Income)
```

**Policy structure:** Monday to Sunday. Activates 24 hours after purchase. Auto-renews via UPI mandate every Sunday. Riders register up to three active delivery zones. Coverage applies to whichever zone GPS confirms at the time of the disruption event.

---

### 5.2 Multi-Dimensional Trigger System

GigShield monitors four independent disruption categories simultaneously, each with its own threshold and duration requirements. If multiple triggers activate simultaneously for the same rider during the same interval, only the trigger producing the highest payout for that interval is applied. Payouts are never stacked across concurrent triggers.

| Trigger Type | Signal Source | What It Covers |
|---|---|---|
| Environmental | OpenWeatherMap + Tomorrow.io | Income lost to heavy rain, hailstorms, dusty winds, and heavy winds |
| AQI | IQAir / CPCB open data | Income lost when sustained high pollution cuts delivery speed and trip completion |
| Platform | Third-party uptime monitor (DownDetector) | Income lost to Swiggy or Zomato outages during peak hours |
| Social | News feeds, government notices, social signals | Income lost to bandhs, curfews, Section 144 orders, local strikes |

**Why threshold-based triggering is the only correct approach:**

Paying at the onset of any adverse signal creates fraud risk — a brief drizzle or five-minute hailstorm would qualify. Waiting until conditions clear defeats the purpose — the rider already absorbed the loss. GigShield requires both a severity threshold and a sustained duration to be confirmed simultaneously before any payout fires.

```
ENVIRONMENTAL TRIGGER — Both conditions must be met simultaneously:
  Condition 1 (Threshold): Any one of the following confirmed in rider's active zone:
      Rainfall     above 50mm/hr
      Hailstorm    detected and confirmed (weather alert issued)
      Wind speed   above 40km/hr (dusty winds or heavy winds)
  Condition 2 (Duration):  Sustained for more than 1 hour continuously

AQI TRIGGER — Both conditions must be met simultaneously:
  Condition 1 (Threshold): AQI above 300 in rider's active zone
  Condition 2 (Duration):  Sustained for more than 2 hours continuously during the rider's shift

PLATFORM BLACKOUT TRIGGER — Both conditions must be met:
  Condition 1 (Threshold): Platform uptime below 100% (outage confirmed by third-party)
  Condition 2 (Duration):  Sustained for more than 45 continuous minutes
                           AND falls within peak hours (12:00–14:30 or 19:00–22:30)

SOCIAL DISRUPTION TRIGGER — Three independent signals required:
  Condition 1: Oracle confidence score above 75%
  Condition 2: Three independent sources confirm disruption is active on the day
  Condition 3: Restaurant availability in the affected zone drops above 80%
```

Trigger timestamps are stored at both the start and end of each disruption event. Duration is computed from these timestamps and used for payout interval calculations and fraud analytics. Payout intervals begin once the trigger fires and continue at regular intervals for as long as the disruption conditions remain active.

---

### 5.3 Platform Blackout Coverage

When Swiggy or Zomato goes down during peak meal hours, delivery riders earn zero. It is the most direct and frequent income disruption — and the most ignored by every existing insurance or protection product.

GigShield monitors platform uptime every five minutes via neutral third-party uptime services. Swiggy and Zomato are monitored independently, since an outage on one does not affect riders on the other. When an outage during a peak window exceeds the 45-minute threshold and the rider was logged in at the time:

```
Trigger Condition:
  Platform uptime below 100% for more than 45 continuous minutes
  AND time falls within food delivery peak window (12:00–14:30 OR 19:00–22:30)
  AND rider was active or logged in on the specific affected platform at outage start
  AND rider holds an active policy with the 24-hour activation window already passed

Payout per interval:
  = Interval Duration (hours) x Rider's Hourly Earning Rate x Coverage %

Payout intervals are processed at regular intervals for the full confirmed outage duration.
Processing stops when the platform restores service or the weekly coverage cap is exhausted.
```

Why this trigger is fraud-proof by design: the outage is confirmed by a neutral third-party source entirely independent of the rider. Either the platform is down or it is not. With zero platform function, earning is physically impossible — income loss is guaranteed by the trigger itself, not estimated.

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
  1 tweet from unknown account                     = 12% confidence — ignored
  Trending hashtag + 3 corroborating news sources  = 74% confidence — pre-alert sent to riders
  Official statement + government notice           = 91% confidence — shield pre-activated
```

**Trigger flow:**

```
Step 1: Oracle confidence crosses 75% threshold (typically the night before)
Step 2: AI maps affected zones at pin-code precision
Step 3: Riders in affected zones receive pre-activation notification via SMS and app
Step 4: Disruption day — cross-verification via:
          (a) Three independent news or government sources confirm disruption is active
          (b) Restaurant availability in zone drops above 80%
          (c) Rider GPS confirms presence in the affected zone
Step 5: All three conditions confirmed — payout intervals begin automatically
```

What makes this different from every other solution: all other parametric products are reactive. The Social Disruption Oracle predicts and pre-arms coverage before the disruption hits, turning parametric insurance from reactive to genuinely proactive.

---

## 6. Worker-Based Premium Model

GigShield's premium is not a flat rate. It is individually calculated based on who the worker is, where they work, and their demonstrated performance relative to their zone peers.

**City-Level Risk Factor (Weeks 1 to 4)**

Each city carries a baseline zone risk multiplier derived from historical disruption frequency, average environmental severity, and AQI patterns.

| City | Default Zone Multiplier |
|---|---|
| Delhi | 1.30x |
| Mumbai | 1.15x |
| Bengaluru | 1.10x |
| Chennai | 1.05x |
| Other cities | 1.00x (neutral baseline) |

From week five onward, city-level defaults are replaced by pin-code level zone history specific to the rider's registered delivery zones.

**Performance-Based Factor (Week 3 Onward)**

For returning users, the Reliability Score R — derived from Time Utilization, Delivery Efficiency, and Completion Rate relative to zone peers, clamped to a maximum of 1.0 — adjusts the premium via the factor (1.5 - R). A high-performing rider with R at 1.0 pays the minimum possible premium. A low-activity rider with R near 0 pays the maximum. The formula is:

```
Premium = Base Rate x Risk Multiplier x (1.5 - R)
  where R = min(sqrt(Adjusted TU x Adjusted DE x Completion Rate), 1.0)
```

See Section 4 for the full R derivation.

**Income Reference**

Income is validated using a hybrid bounding approach to prevent over-declaration while preserving onboarding simplicity:

```
Verified Weekly Income = min(
  Self-declared income,
  City-level benchmark for the rider's earnings bracket,
  Historical earnings if available from week 3 onward
)
```

The base rate of 2% is applied to the verified weekly income. The 6% hard cap ensures no rider pays more than six percent of their verified weekly income regardless of stacked multipliers.

---

## 7. Income Continuity Guarantee

GigShield guarantees income continuity during confirmed disruptions. When objective conditions make earning impossible or significantly harder, the rider's income does not go to zero.

The Income Continuity Guarantee operates on a tiered scale linked to subscription tenure. It protects against gaming by new subscribers while rewarding long-term, honest riders with progressively higher coverage.

### Continuity Scale

| Subscription Tenure | Coverage % | Notes |
|---|---|---|
| Week 1 to Week 2 | Fixed at 40% | No R data yet; city baseline income used for hourly reference |
| Week 3 to Week 4 | 40% + (25% x R), capped at 65% | R computed from past week's TU, DE, and CR data |
| Week 5 and beyond | 40% + (25% x R), capped at 65% | Pin-code level zone averages replace city-wide defaults |

For new users (weeks 1 and 2), coverage is fixed at 40% independent of R since no performance data exists yet.

For returning users, coverage grows with R week over week. A rider who becomes more consistent, efficient, and reliable over time earns higher coverage and pays a lower premium — the two outcomes compound to make sustained engagement meaningfully rewarding.

### Coverage Cap Rationale

GigShield intentionally caps coverage at 65% maximum and never offers 100% income replacement.

```
WHY NOT 100%:

  100% coverage = rider earns the same whether working or not
                = moral hazard — rider stops at the first sign of bad weather
                = product collapses under unnecessary claims

  Coverage capped at 65% = rider still loses income by not working
                         = only genuine disruptions result in payouts
                         = premiums stay affordable and pool remains sustainable
```

The weekly payout cap is dynamically derived per rider: Weekly Cap = Coverage % x Verified Weekly Income. This ensures proportional protection across income brackets rather than a single fixed ceiling.

### Payout Example

Suresh, Delhi, Zomato, week 5+ subscriber, R = 0.8, hailstorm trigger confirmed, 3-hour disruption, payout intervals every 30 minutes:

```
Coverage %                    = 40% + (25% x 0.8) = 60%
Hourly income (city baseline) = Rs. 90

Per-interval payout (30 min interval):
  = 0.5 hours x Rs. 90 x 60%
  = Rs. 27

Total payout over 3 hours (6 intervals):
  = Rs. 27 x 6 = Rs. 162
```

Same rider in week 1 (coverage fixed at 40%):

```
Per-interval payout = 0.5 hours x Rs. 90 x 40% = Rs. 18
Total over 3 hours  = Rs. 18 x 6 = Rs. 108
```

---

## 8. Payout Logic

GigShield uses interval-based payouts during confirmed disruptions. This is the correct approach — it is distinct from a lump sum at trigger start (which creates early-exit gaming risk) and from paying only after the disruption ends (the rider already absorbed the full loss by then).

```
Per-Interval Payout Formula:
  Payout = Interval Duration (hours) x Rider's Hourly Income x Coverage %

Where:
  Interval Duration  = Fixed payout interval (every 30 minutes = 0.5 hours)
  Rider's Hourly     = Verified Weekly Income / estimated weekly active hours
                       (city baseline used for new users; verified income from week 3+)
  Coverage %         = 40% for new users (weeks 1 and 2)
                       40% + (25% x R) for returning users (week 3+),
                       where R = min(sqrt(TU x DE x CR), 1.0), max coverage 65%

Payout Timeline:
  - Trigger fires when both threshold and duration conditions are confirmed
  - First payout interval processed at trigger confirmation
  - Subsequent intervals processed at 30-minute intervals while disruption continues
  - Payout stops when disruption ends (conditions drop below threshold)
  - Payout also stops when rider's weekly coverage cap is exhausted
    (Weekly Cap = Coverage % x Verified Weekly Income, computed per rider)
  - Each payout interval is logged with the trigger event ID for audit and fraud tracking

Multi-Trigger Resolution Rule:
  If multiple trigger conditions are active simultaneously for the same rider
  during the same interval, payouts are NOT stacked.
  Only the trigger producing the highest payout for that interval is applied.
  This prevents double-counting of the same income loss across correlated events.
```

An SMS confirmation is sent at the first interval with the trigger event ID. Subsequent intervals within the same event are processed silently until the event closes.

---

## 9. Policy Activation Rule

Every new policy — whether purchased by a first-time subscriber or a returning user who rejoined after a lapse — activates 24 hours after the purchase timestamp.

This waiting period is a structural fraud-prevention measure. It ensures that riders cannot purchase a policy in direct response to an imminent, already-announced disruption event (a bandh declared the previous evening, a storm visible on public forecasts) and immediately claim against it.

```
Example:
  Policy purchased:  Sunday 8:00pm
  Policy active:     Monday 8:00pm

  Any disruption events between Sunday 8:00pm and Monday 8:00pm
  are NOT covered under this policy.
```

The 24-hour window begins from the exact time of UPI payment confirmation and applies to all disruption types — environmental, AQI, platform, and social — without exception.

For existing subscribers whose policy auto-renews every Sunday night via UPI mandate, the 24-hour rule does not re-apply to continuations. It applies only to new purchases and to riders who cancelled and rejoined.

---

## 10. Fraud Prevention Design

GigShield is fraud-resistant by structural design. The core principle is that the trigger itself is what makes fraud difficult, not after-the-fact auditing.

**No claim submission means no fake claims.** Since riders submit nothing and the system triggers automatically from independent sources, there is nothing for a fraudulent actor to fabricate.

**Third-party verification is independent of the rider.** Platform uptime data, environmental readings, AQI levels, and news signals are all sourced from third parties that have no relationship with any individual rider. A rider cannot influence whether these signals fire.

**24-hour policy activation window.** A rider cannot purchase coverage moments before a known disruption and immediately claim. The waiting period structurally eliminates last-minute opportunistic purchases.

**GPS-based zone validation.** The rider's GPS location at the time of disruption must match one of their registered delivery zones. A rider outside the declared disruption zone does not receive a payout.

**Duplicate trigger blocking.** The system stores trigger event IDs and blocks duplicate payouts for the same event under the same policy.

**ML anomaly detection (Phase 2).** An Isolation Forest model flags claim patterns that deviate significantly from expected behavior — for example, a rider triggering payouts repeatedly in weeks when no other rider in the same zone triggered.

---

## 11. Adverse Selection Handling

Any subscription insurance product faces a fundamental problem: informed users buy coverage only during bad weeks and cancel when conditions look normal. If unchecked, this behavior makes the risk pool unsustainable.

GigShield addresses adverse selection at product design level through four mechanisms operating simultaneously.

**24-Hour Activation Waiting Period**

A rider who sees tomorrow's storm forecast or reads tonight's bandh announcement and buys the policy immediately cannot claim against that specific event. This is the primary structural block against event-driven opportunistic purchases.

**Continuity Payout Scale**

Week 1 and 2 subscribers receive coverage fixed at 40%, which is lower than what a long-term subscriber with a good R would receive for the same disruption. Joining right before a known bad week produces a significantly reduced payout relative to what the rider might have expected, making the attempt financially unattractive once the premium cost is factored in.

**Cancellation Resets Eligibility**

Cancelling and rejoining resets the rider to week one status, restarting both the 24-hour activation window and the reduced continuity scale. Repeated cancel-and-rejoin cycling is progressively unattractive because the reduced payouts in weeks one and two compound across each restart.

**Personal Loss Ratio Monitor**

GigShield tracks each rider's personal loss ratio — total payouts received divided by total premiums paid. When this ratio exceeds 1.8x, a surcharge is applied to the following week's premium. The surcharge compounds with repeated triggering, making sustained gaming progressively expensive.

---

## 12. Financial Sustainability Model

The financial model is built around four principles that keep the platform solvent while providing genuine value.

**Coverage hard ceiling at 65%.** No disruption severity, no rider tenure level, and no stacked conditions result in a payout above 65% of confirmed hourly income loss. This is the primary mechanism that keeps expected claims bounded.

**Continuity scale reduces new-subscriber payouts.** Week one and two subscribers receive coverage fixed at 40%, further reducing claims from high-churn subscribers who have not yet demonstrated sustained engagement.

**Premium scales with risk and rider performance.** Riders in high-risk zones during high-risk forecast weeks pay more. High-performing riders (high R) pay less. The model calibrates premium income to expected claim output at both the zone and individual level.

**Weekly policy cycle limits liability.** The policy unit is a single week (Monday to Sunday). Maximum platform liability is always bounded by the current week's active policies. There is no long-tail multi-year exposure.

```
Loss ratio target: 0.40 to 0.60
For every Rs. 1.00 collected in premiums, GigShield targets
paying Rs. 0.40 to Rs. 0.60 in claims.
```

---

## 13. End-to-End Application Workflow

### Onboarding (Under 2 Minutes)

```
Rider opens GigShield PWA on Android
Phone number + OTP verification
Select delivery platform: Zomato or Swiggy
Drop pin for active delivery zones (up to 3 zones within the rider's city)
State average weekly earnings bracket (self-declared; used as hourly income baseline)
System calculates and displays this week's personalized premium instantly
Pay via UPI mandate authorization
Policy purchase confirmed
Policy activates 24 hours from the UPI payment timestamp
```

### Every Sunday Night (Automated)

```
Premium engine re-runs for all active riders
Pulls fresh environmental forecast (rain, hail, wind, dust), AQI forecast,
  and social disruption signals for each registered zone
For returning users (week 3+): recalculates R from the past week's
  Time Utilization, Delivery Efficiency, and Completion Rate data
Generates new personalized premium for the coming week
New weekly premium auto-debited via existing UPI mandate
Policy for the coming week activates Monday morning for renewing subscribers
  (24-hour rule applies only to new purchases and rejoins, not to continuations)
```

### Real-Time Monitoring (Always On)

```
Environmental conditions (rainfall intensity, hail alerts, wind speed, dust storms)
  tracked per zone every 15 minutes via OpenWeatherMap and Tomorrow.io
AQI levels tracked per zone every hour via IQAir and CPCB
Platform uptime (Zomato and Swiggy monitored separately) checked every 5 minutes
  via DownDetector and custom scraper
Restaurant availability per zone monitored continuously
Social media and news feeds scanned for disruption signals around the clock
All active policies evaluated against trigger conditions continuously
```

### Claim Trigger (Zero Rider Action Required)

```
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
      or weekly coverage cap (Coverage % x Verified Weekly Income) is exhausted

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
  Threshold: Platform uptime below 100% (confirmed by third-party monitor)
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
  Per-interval payout = Interval Duration (hrs) x Hourly Income x Coverage %
  SMS sent at first interval with trigger event ID
  Subsequent intervals within the same event processed silently
  Event closes when conditions end or weekly cap is exhausted
```

---

## 14. AI and ML Integration

| Model | Type | Framework | Output |
|---|---|---|---|
| Premium engine | Supervised regression | XGBoost / scikit-learn | Weekly risk score and premium per rider |
| R calculator | Deterministic formula | None required | TU, DE, CR, R (clamped to 1.0) per rider per week |
| Disruption oracle | NLP classifier | HuggingFace Transformers | Confidence score 0 to 100% per zone |
| Fraud anomaly engine | Rule-based + ML | Isolation Forest | Flags suspicious claim patterns |
| Payout processor | Deterministic formula | None required | Interval x Hourly Rate x Coverage % |

**MVP vs Phase 2 scope:**

| Component | Hackathon MVP | Phase 2 |
|---|---|---|
| Social disruption oracle | Rule-based keyword matching | Full NLP classifier with HuggingFace |
| Fraud detection | Rule-based scoring (loss ratio + zone comparison) | Isolation Forest ML model |
| Premium engine | XGBoost on synthetic disruption data | Retrained on real disruption history |
| Zone personalization | City-level defaults (weeks 1 to 4) | Pin-code level from real claim data (week 5+) |
| Environmental signals | OpenWeatherMap (rain, wind) | Tomorrow.io for hail and dust storm alerts |

Scoping the hackathon MVP around rule-based implementations keeps delivery realistic while demonstrating the full system architecture. ML models are designed for Phase 2 once real training data is available from live riders.

---

## 15. Tech Stack

**Platform choice: Mobile-First Progressive Web App (PWA)**

Riders use Android phones almost exclusively. A PWA delivers an app-like experience without requiring Play Store installation, which matters for users with lower digital literacy. It supports push notifications and functions offline for dashboard viewing.

| Layer | Technology | Reason |
|---|---|---|
| Frontend | React.js + Tailwind CSS (PWA) | Lightweight, installable on Android without app store |
| Backend | Node.js + Express | Fast API development, strong ecosystem |
| Database | PostgreSQL + Redis | Relational for policies and claims; Redis for real-time trigger state |
| ML Service | Python + FastAPI microservice | scikit-learn, XGBoost, HuggingFace models |
| Environmental API | OpenWeatherMap + Tomorrow.io | Rain, wind, hail, and dust storm data for Indian cities |
| AQI API | IQAir / CPCB open data | Real AQI data for Indian cities |
| News and Social | NewsAPI.org + Twitter API v2 | Social disruption signal monitoring |
| Uptime Monitor | DownDetector + custom scraper | Platform blackout detection for Zomato and Swiggy independently |
| Payments | Razorpay Sandbox (UPI payouts + mandate) | Indian-native, free sandbox environment |
| Notifications | Firebase Cloud Messaging + Twilio SMS | Covers both data and non-data users |
| Hosting | Railway / Render (free tier) | Straightforward deployment for hackathon |

---

## 16. Analytics Dashboard

### Rider View

- Current week's premium, coverage percentage, and remaining weekly cap
- Policy activation timestamp and current status (pending 24-hour window or active)
- Live disruption alerts in registered zones
- Claim history — trigger type, event ID, duration, per-interval payout, total received
- Zone risk heatmap for the current week
- Current R score, what it means for coverage and premium this week

### Admin View

- Total active riders by zone in real time
- Live monitoring panel — environmental conditions, AQI levels, platform uptime (Zomato and Swiggy separately), social signal confidence
- Active trigger events — type, zone, start time, riders currently covered, running payout total
- Claims closed today — count, total payout, average per event
- Fraud flags — anomalous claim patterns under review
- Weekly premium revenue versus total payout ratio
- Most disruption-prone zones heatmap

---

## 17. Development Plan

| Week | Phase | Key Deliverables |
|---|---|---|
| 1 to 2 | Ideation and Foundation | Persona research, feature design, README, repository setup |
| 3 | Core Build — Onboarding and Premium | OTP onboarding, zone picker, 24-hour activation logic, Sunday premium engine with R formula |
| 4 | Core Build — Triggers and Payouts | Environmental and AQI triggers, platform uptime monitor, 30-minute interval payout logic, Razorpay UPI integration |
| 5 | Advanced Features | Social disruption oracle (rule-based MVP), pre-activation alerts, GPS zone validation |
| 6 | Polish and Demo Preparation | Fraud engine (rule-based MVP), rider and admin dashboards, demo simulation |

---

## 18. Constraint Compliance

| Requirement | Status | How GigShield Complies |
|---|---|---|
| Delivery partners only | Met | Built exclusively for Zomato and Swiggy food delivery riders |
| Income loss coverage only | Met | All triggers map strictly to lost working hours and wages |
| No health, accident, or vehicle coverage | Met | Zero features touch these categories |
| Weekly pricing model | Met | Premium recalculated every Sunday; week is the atomic unit of the entire system |
| AI and ML integration | Met | Premium engine, NLP disruption scorer, R-based personalization, fraud anomaly detection |
| Intelligent fraud detection | Met | 24-hour activation window + third-party verification + GPS validation + ML anomaly engine |
| Parametric automation | Met | Zero rider action required for any claim or payout |
| Integration capabilities | Met | OpenWeatherMap, Tomorrow.io, IQAir, CPCB, NewsAPI, Twitter, DownDetector, Razorpay |

---

> GigShield is not just insurance. It is a real-time income protection system designed for the actual realities of gig workers — combining parametric triggers, adaptive pricing, performance-based personalization, interval payouts, and a structurally fraud-resistant policy design into a scalable and deployable solution.

---

_Built for the AI-Powered Insurance Hackathon | Phase 1 Submission | March 2026_
