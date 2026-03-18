# GigShield — AI-Powered Parametric Income Protection for India's Food Delivery Workers

> **Hackathon Phase 1 Submission | Problem Statement: AI-Powered Insurance for India's Gig Economy**

---

## Quick Summary (for judges)

GigShield is a **parametric income protection** product for food delivery riders (Zomato/Swiggy). It focuses on **income loss only** (not health/accident/vehicle) and pays automatically when disruption triggers are met.

What’s different vs typical parametric ideas:

- **Platform outages** are covered (app downtime during peak hours is a real, frequent income shock).
- **Social disruptions** can be detected **the night before** (bandh/curfew/Section 144), so coverage is pre-armed.
- **Anti-gaming design** (continuity scale + personal loss ratio + pool math) makes “buy only in bad weeks” behavior unprofitable.

What the system does in one line: **detect disruption → verify with independent signals → compute payout from duration × hourly rate × coverage % → send to UPI automatically.**

---

## What GigShield Does That No One Else Does

Most parametric insurance for gig workers stops at weather triggers and one-size payouts. GigShield goes further in three ways that most products miss in practice.

**1. Coverage extended to digital infrastructure failure**
Weather-only coverage misses one of the most common income shocks for delivery riders: platform app downtime. When Swiggy or Zomato goes down during a Friday dinner peak, riders lose the best earning window of the week with no practical recourse. GigShield adds parametric coverage for platform outages, verified through neutral third-party uptime sources that are independent of the rider.

**2. Proactive coverage — armed before disruption hits**
Most parametric systems are reactive: something happens, it gets detected, then a payout triggers. GigShield’s Social Disruption Oracle monitors news, social signals, and government notices the night before a likely bandh or curfew. That means coverage can be pre-armed before the day starts, so the rider begins the shift protected instead of finding out mid-shift.

**3. Adverse selection addressed at product design level**
Any subscription insurance product has a known weak spot: informed users buy only in bad weeks and cancel when conditions look normal. GigShield tackles this upfront with a three-layer financial defense (continuity payout scale, personal loss ratio monitor, and pool mathematics) so opportunistic gaming becomes progressively unprofitable without punishing honest subscribers.

---

## What is GigShield?

India’s food delivery riders on Zomato and Swiggy keep a ₹50,000 crore digital economy moving. But when work gets disrupted—extreme weather, platform outages, sudden civic shutdowns—the rider usually absorbs the entire financial hit. No safety net. No recourse. Often, no warning.

**GigShield** is an AI-powered, parametric income protection platform built specifically for platform-based delivery partners. It monitors the rider’s environment in real time, predicts disruptions before they land, and automatically pays out for lost income—without the rider needing to file a claim.

> **Coverage Scope (Golden Rule):** GigShield strictly covers **income loss only**. No health, no accident, no vehicle repair. Every trigger, every payout, every feature maps to one thing: _the rider couldn't earn money today because of something outside their control._

---

## Persona: Food Delivery Partner (Zomato / Swiggy)

### Who We're Building For

| Attribute            | Detail                                                               |
| -------------------- | -------------------------------------------------------------------- |
| **Segment**          | Food Delivery Partners (Zomato, Swiggy)                              |
| **Age Range**        | 19–35 years                                                          |
| **Earnings**         | ₹10,000–₹25,000/month (₹2,500–₹6,000/week)                           |
| **Work Pattern**     | 6–12 hour shifts focused on lunch (12–2pm) and dinner (7–10pm) peaks |
| **Payment Cycle**    | Weekly platform payouts                                              |
| **Device**           | Android smartphone (primary work tool)                               |
| **Digital Literacy** | Comfortable with UPI, WhatsApp; limited with forms                   |

### Persona Scenarios

---

**Scenario 1 — Ravi, Mumbai (Platform Outage)**

Ravi logs in at 7pm on a Friday—the peak dinner window. Swiggy’s app goes down for 70 minutes. He waits on his bike outside a restaurant, earning nothing. No orders arrive. When the app finally comes back, the best hours of his week are gone, and there’s no clean record of what happened.

_GigShield detects the outage at minute 1. By minute 47, when the platform crosses the trigger threshold, Ravi's income shield activates. By the time he refreshes his app, ₹210 is already in his UPI wallet._

---

**Scenario 2 — Suresh, Delhi (AQI Crisis)**

It’s November. Delhi’s AQI crosses 380 for the third day in a row. Suresh can barely breathe. Each delivery takes twice as long because the air is toxic. Demand stays normal, but his speed collapses—he completes half his usual trips in the same hours.

_GigShield's AQI monitor detects that Suresh's active zone has crossed the trigger threshold for 4+ hours during his shift. A parametric income payout triggers automatically — no claim, no paperwork._

---

**Scenario 3 — Karan, Bengaluru (City Shutdown)**

A political party announces a bandh for Thursday morning. Karan doesn’t see it in time. He wakes up, gears up, and rides out—only to find restaurants shuttered and zones effectively locked down.

_GigShield's social disruption oracle detected the bandh announcement Wednesday night via news and social signals. By 11pm, Karan's zone shield was pre-activated. Thursday morning, when the disruption is confirmed, his payout processes before he even leaves home._

---

## Our Three Core Features

---

### Feature 1 — Predictive Weekly Premium Engine

Every Sunday night, an AI agent re-prices each rider’s premium based on what’s forecast to happen in that rider’s specific zone during the coming week.

```
Weekly Premium = (Earnings x 1.5%)
               x Weather Multiplier  (OpenWeatherMap — rain intensity)
               x AQI Multiplier      (IQAir/CPCB — pollution severity)
               x Social Multiplier   (Oracle confidence score)
               x Active Hours        (part-time 0.6x to full-day 1.4x)
               x Zone History        (pin code disruption frequency)

Cap: Premium never exceeds 6% of weekly earnings
```

**Example — Suresh, Delhi, full-time, Rs.3,500/week, heavy rain week + AQI 320:**

```
Rs.52.50 x 1.21 x 1.40 x 1.00 x 1.40 x 1.30 = Rs.163 premium
Max payout this week = Rs.3,500 x 60% = Rs.2,100
```

New riders use city-level zone defaults (Delhi=1.3x, Mumbai=1.15x) until personal pin code data builds from week 5 onward.

**Policy structure:** Monday–Sunday. Auto-renews via UPI mandate. Up to 3 active zones. Coverage always applies to whichever zone GPS confirms at time of disruption.

**Coverage cap model:**

```
WHY 60% AND NOT 100%:
  100% coverage = rider earns same whether working or not
  = moral hazard — rider stops at first sign of bad weather
  = company goes bankrupt paying unnecessary claims

  60% means rider still loses 40% by not working
  = genuine disruptions get claimed, mild conditions do not
  = premiums stay affordable, platform stays sustainable

TIERED BY DISRUPTION SEVERITY:

  Standard disruption              → 60% of hourly income loss
    Rainfall 50–100mm/hr
    AQI 300–400
    Platform down 45–90 mins

  Extreme disruption               → 60% of hourly income loss
    Rainfall > 100mm/hr
    AQI > 400 (severe category)
    Full confirmed bandh/curfew
    Platform down > 90 mins

  Hard ceiling: Never exceeds 60% under any condition
  Weekly cap : Rs.1,200 regardless of coverage percentage

CONTINUITY SCALE OPERATES WITHIN THE COVERAGE CAP:
  Week 1–2  → 40% of entitled payout (new subscriber protection)
  Week 3–4  → 50% of entitled payout
  Week 5+   → 60% of entitled payout

EXAMPLE — Week 5+ rider, extreme bandh, Rs.80/hr, 4 hours lost:
  Full loss          = Rs.80 x 4 = Rs.320
  60% coverage cap   = Rs.192 entitled
  60% continuity     = Rs.115.20 actual payout

New subscriber (week 1–2): same formula but 40% continuity cap
  → Rs.192 entitled x 40% = Rs.76.80 actual payout
  → Gaming week 1 is a net loss on any premium paid
```

---

### Feature 2 — Platform Blackout Coverage

**The problem:** When Swiggy or Zomato's app goes down during peak meal hours, riders earn ₹0. It is the most direct, most frequent income disruption — and the most ignored.

**How it works:**

GigShield monitors platform uptime every 5 minutes via third-party uptime services. Riders are most exposed during lunch and dinner peaks—an outage of 45 minutes in these windows can wipe out the highest-earning part of the day. When an outage is detected:

```
Trigger Condition:
  Platform uptime < 100% for > 45 continuous minutes
  AND time falls within food delivery peak window (12:00–14:30 OR 19:00–22:30)
  AND rider was active/logged-in at disruption start

Action:
  Income loss claim auto-generated (no rider input required)
  Payout = (Minutes of outage ÷ 60) × Rider's hourly earning rate
  Sent to rider's UPI ID within 2 minutes of trigger confirmation
```

**Why fraud is impossible here:** The outage is confirmed by a neutral third-party source entirely independent of the rider. Either the platform is down or it is not. With zero platform function, earning is physically impossible — income loss is guaranteed by the trigger itself, not inferred.

---

### Feature 3 — Social Disruption Oracle

**The problem:** Bandhs, curfews, Section 144 orders, and local strikes cause immediate zone shutdowns with little to no notice, leaving riders stranded with zero income.

**How it works:**

GigShield’s AI agent runs a continuous signal-monitoring pipeline:

```
Sources Monitored (24/7):
  → Twitter/X API     : Keywords — bandh, curfew, chakka jam, rasta roko + city name
  → Google News API   : Local news headlines for civic disruptions
  → Government feeds  : Section 144, official curfew notifications
  → NewsAPI.org       : Regional news aggregation

AI Confidence Scoring:
  → 1 tweet from unknown account           = 12% confidence → ignore
  → Trending hashtag + 3 news sources      = 74% confidence → pre-alert riders
  → Official statement + government notice = 91% confidence → pre-activate shield
```

**Trigger flow:**

```
Step 1: Confidence crosses 75% threshold
Step 2: AI maps affected zones at pin-code precision
Step 3: Riders in affected zones receive pre-activation notification
Step 4: Disruption day — AI cross-verifies via:
          (a) News sources confirm disruption is active
          (b) Available restaurants in zone drop > 80% (bandh = nothing to deliver)
          (c) Rider GPS confirms they are in affected zone
Step 5: All 3 confirmed → payout triggers automatically
```

**What makes this unique:** Every other solution is reactive. This is the only feature that predicts and pre-arms coverage _before_ the disruption hits — turning parametric insurance from reactive to proactive.

---

## Product Philosophy

GigShield doesn’t tell riders to stop working. It removes the financial pressure that forces people to work when they shouldn’t have to. If a rider receives a payout during heavy rain or a bandh, they have a real choice: stop and stay safe, or continue and earn more. Before GigShield, stopping often wasn’t financially possible.

Each trigger uses a disruption-specific signal so income impairment is structurally implied, not guessed: a platform blackout means zero orders are possible; a delivery-time spike means rain has destroyed productivity; a collapse in restaurant availability means a bandh has shut down the supply side.

---

## Trigger Timing — Why Threshold-Based Is The Only Correct Approach

There are three possible approaches to payout timing. Only one is correct.

Paying at the start of rain leads to obvious fraud (a 10-minute drizzle would qualify). Waiting until rain ends defeats the point (the rider already suffered the income hit). GigShield uses threshold-based triggering—both intensity AND sustained duration must be confirmed before a payout fires:

```
WEATHER TRIGGER — Both conditions must be met simultaneously:
  Condition 1 (Threshold): Rainfall > 50mm/hr
  Condition 2 (Duration) : Sustained for > 1 hour continuously

  Why both required:
  Threshold alone → 10-minute downpour qualifies (wrong)
  Duration alone  → light drizzle for 2 hours qualifies (wrong)
  Both together   → genuine income-impacting disruption only (correct)

AQI TRIGGER — Both conditions must be met simultaneously:
  Condition 1 (Threshold): AQI > 300 in rider's active zone
  Condition 2 (Duration) : Sustained for > 2 hours during shift

PLATFORM BLACKOUT — Both conditions must be met:
  Condition 1 (Threshold): Platform uptime < 100%
  Condition 2 (Duration) : Sustained for > 45 continuous minutes

SOCIAL DISRUPTION — Confirmed by 3 independent signals:
  Condition 1: Oracle confidence > 75%
  Condition 2: 3 sources confirm disruption active on the day
  Condition 3: Restaurant availability in zone drops > 80%
```

**Trigger timestamps:** Start stored when both conditions are confirmed. End stored when threshold drops below minimum. Duration = End − Start, used for analytics and loss ratio tracking. Payout fires at trigger start — not trigger end — so the rider receives relief during the disruption, not after.

---

## Application Workflow

```
ONBOARDING (< 2 minutes)
├── Phone number + OTP
├── Select platform (Zomato / Swiggy / Zepto / Blinkit)
├── Drop pin for active delivery zones (2–3 zones)
├── State average weekly earnings bracket
└── AI instantly shows THIS WEEK's personalized premium → Pay via UPI → Active

────────────────────────────────────────────────────────────────────

EVERY SUNDAY NIGHT (Automated)
├── Premium engine re-runs for all active riders
├── Pulls fresh weather + AQI + social disruption signals
├── Recalculates zone-level risk scores
└── New weekly premium auto-debited via UPI mandate

────────────────────────────────────────────────────────────────────

REAL-TIME MONITORING (Always On)
├── Platform uptime checked every 5 minutes
├── AQI levels + delivery time spike tracked per zone hourly
├── Restaurant availability monitored per zone continuously
├── Social media + news feeds scanned for disruption signals
└── Trigger conditions evaluated against all active policies

────────────────────────────────────────────────────────────────────

CLAIM TRIGGER (Zero Rider Action Required)

  BLACKOUT TRIGGER:
  ├── Condition 1 (Threshold): Platform uptime < 100%
  ├── Condition 2 (Duration) : Sustained > 45 continuous minutes
  ├── Both conditions met AND within peak hours (12–14:30 / 19–22:30)
  ├── Rider logged in confirmed
  └── Instant payout → UPI within 2 minutes of trigger start

  WEATHER / AQI TRIGGER:
  ├── Condition 1 (Threshold): Rainfall > 50mm/hr OR AQI > 300
  ├── Condition 2 (Duration) : Sustained > 1 hour continuously
  ├── Both conditions met simultaneously → trigger fires
  ├── Rider GPS confirms zone presence
  └── Instant payout → UPI within 2 minutes of trigger start

  SOCIAL DISRUPTION TRIGGER:
  ├── Oracle confidence > 75% (night before) → pre-activation alert sent
  ├── Disruption day: 3 sources confirm active
  ├── Zone restaurant availability drops > 80%
  ├── Rider GPS confirms zone presence
  └── Instant payout → UPI within 2 minutes

  ALL TRIGGERS:
  ├── Eligibility checked (active policy + no duplicate + zone match)
  ├── Payout = Hourly Rate x Duration x Coverage % (60%)
  └── SMS confirmation sent → Claim stored with event ID

────────────────────────────────────────────────────────────────────

DASHBOARD
├── Rider: Premium summary, active alerts, claim history, zone heatmap
└── Admin: Live disruption panel, claims count, payout ratio, fraud flags
```

---

## AI/ML Integration Plan

| Model                | Type                  | Framework                | Output                                       |
| -------------------- | --------------------- | ------------------------ | -------------------------------------------- |
| Premium engine       | Supervised regression | XGBoost / scikit-learn   | Weekly risk score → premium per rider        |
| Disruption oracle    | NLP classifier        | HuggingFace Transformers | Confidence score 0–100% per zone             |
| Fraud anomaly engine | Rule-based + ML       | Isolation Forest         | Flags suspicious claim patterns              |
| Payout calculator    | Deterministic formula | —                        | Duration x Hourly Rate x Severity Multiplier |

---

## Tech Stack

### Platform Choice: Mobile-First Progressive Web App (PWA)

**Justification:** Riders use Android phones almost exclusively. A PWA delivers an app-like experience without Play Store installation, which matters for users with low digital literacy. It supports push notifications and can work offline for dashboard viewing.

| Layer              | Technology                               | Reason                                                            |
| ------------------ | ---------------------------------------- | ----------------------------------------------------------------- |
| **Frontend**       | React.js + Tailwind CSS (PWA)            | Lightweight, fast, installable on Android                         |
| **Backend**        | Node.js + Express                        | Fast API development, strong ecosystem                            |
| **Database**       | PostgreSQL + Redis                       | Relational for policies/claims; Redis for real-time trigger state |
| **ML Service**     | Python + FastAPI microservice            | scikit-learn, XGBoost, HuggingFace models                         |
| **Weather API**    | OpenWeatherMap (free tier)               | Reliable, generous free quota                                     |
| **AQI API**        | IQAir / CPCB open data                   | Real AQI data for Indian cities                                   |
| **News/Social**    | NewsAPI.org + Twitter API v2             | Social disruption monitoring                                      |
| **Uptime Monitor** | DownDetector + custom scraper            | Platform blackout detection                                       |
| **Payments**       | Razorpay Sandbox (UPI payouts + mandate) | Indian-native, free sandbox                                       |
| **Notifications**  | Firebase Cloud Messaging + Twilio SMS    | Covers both data and non-data users                               |
| **Hosting**        | Railway / Render (free tier)             | Simple deployment for hackathon                                   |

---

## 6-Week Development Plan

| Week | Phase                             | Key Deliverables                                                 |
| ---- | --------------------------------- | ---------------------------------------------------------------- |
| 1–2  | Ideation & Foundation             | Persona research, feature design, README, repo setup             |
| 3    | Core Build — Onboarding + Premium | OTP onboarding, zone picker, Sunday premium engine               |
| 4    | Core Build — Triggers + Payouts   | Uptime monitor, AQI/weather trigger, Razorpay payout flow        |
| 5    | Advanced Features                 | Social disruption oracle (rule-based MVP), pre-activation alerts |
| 6    | Polish + Demo Prep                | Fraud engine (rule-based MVP), basic dashboards, demo simulation |

**MVP scope vs Phase 2:**

| Feature                  | Hackathon MVP               | Phase 2                              |
| ------------------------ | --------------------------- | ------------------------------------ |
| Social disruption oracle | Rule-based keyword matching | Full NLP classifier (HuggingFace)    |
| Fraud detection          | Rule-based scoring          | Isolation Forest ML model            |
| Premium engine           | XGBoost on synthetic data   | Retrained on real disruption history |
| Dashboard                | Mock data, basic admin view | Live data, full analytics            |

Scoping the hackathon MVP around rule-based implementations keeps delivery realistic while still demonstrating the full system architecture. The ML models are designed for Phase 2, once real training data is available.

---

## Analytics Dashboard

**Rider View:**

- This week's premium and coverage summary
- Live disruption alerts in active zones
- Claim history with payout amounts and event IDs
- Zone risk heatmap for the current week

**Admin View:**

- Total active riders by zone (real-time)
- Live monitoring panel — weather + AQI + platform uptime + social signals
- Claims triggered today — count and total payout value
- Fraud flags raised — anomalous claims under review
- Weekly premium revenue vs. payout ratio
- Most disruption-prone zones heatmap

---

## Financial Sustainability Model

A smart rider could game any weather-based product by buying the premium only during bad weeks. GigShield blocks this with three layers, and the whole design is built around a hard **60% payout ceiling** (plus the continuity scale below).

| Layer                   | Mechanism                                                              | Effect                                                                                                    |
| ----------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Continuity payout scale | Week 1–2 = 40% of entitled payout, week 3–4 = 50%, week 5+ = 60%       | Joining right before a “bad week” pays out less than people expect, which makes churn-gaming unattractive |
| Loss ratio monitor      | Personal loss ratio > 1.8x triggers a surcharge, increasing each cycle | Repeat gaming gets progressively more expensive over time                                                 |
| Pool math               | 1,000 riders, ~100 claims/week — pool stays profitable                 | Pool absorbs normal variance while keeping pricing stable for honest riders                               |

Cancelling and rejoining resets eligibility to week 1 — making repeated gaming progressively more expensive to restart.

**Loss ratio target: 0.4–0.6** — for every Rs.1 collected in premiums, GigShield pays out Rs.0.40–0.60 in claims.

**Why this holds with 60% payouts:** the product has a hard ceiling of **60% of hourly income loss** on any trigger, and then the **continuity scale** can reduce the actual paid amount further for newer subscribers (Week 1–2 pays 40% of the entitled amount; Week 3+ pays 60%). In other words, even when a valid disruption happens, the system never pays 100% of lost income, which keeps expected payouts bounded and helps the pool stay sustainable.

---

## Constraint Compliance Checklist

| Golden Rule                              | Status | How We Comply                                                            |
| ---------------------------------------- | ------ | ------------------------------------------------------------------------ |
| Delivery partners only                   | Yes    | Built exclusively for Zomato/Swiggy food delivery riders                 |
| Income loss coverage only                | Yes    | All 3 triggers map strictly to lost working hours/wages                  |
| No health, accident, or vehicle coverage | Yes    | Zero features touch these categories                                     |
| Weekly pricing model                     | Yes    | Premium recalculated every Sunday; week is the atomic unit of everything |
| AI/ML integration                        | Yes    | Premium engine, NLP disruption scorer, fraud anomaly detection           |
| Intelligent fraud detection              | Yes    | Third-party verification + GPS validation + ML anomaly engine            |
| Parametric automation                    | Yes    | Zero rider action required for any claim or payout                       |
| Integration capabilities                 | Yes    | OpenWeatherMap, IQAir, NewsAPI, Twitter, DownDetector, Razorpay          |

---

_Built for the AI-Powered Insurance Hackathon | Phase 1 Submission | Persona: Food Delivery Partners (Zomato / Swiggy) | March 2026_
