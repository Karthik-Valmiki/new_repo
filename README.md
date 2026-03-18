# 🛡️ GigShield — AI-Powered Parametric Income Protection for India's Food Delivery Workers

> **Hackathon Phase 1 Submission | Problem Statement: AI-Powered Insurance for India's Gig Economy**

---

## 🚀 What GigShield Does That No One Else Does

Most parametric insurance solutions for gig workers focus on weather triggers and flat payouts. GigShield goes further in three directions that existing products do not address.

**1. Coverage extended to digital infrastructure failure**
Weather-based insurance misses the most frequent income disruption for a food delivery rider — platform app downtime. When Swiggy or Zomato goes down during Friday dinner peak, riders lose their highest-earning window with no recourse. GigShield extends parametric coverage to platform outages, verified through neutral third-party uptime sources entirely independent of the rider.

**2. Proactive coverage — armed before disruption hits**
Most parametric architectures are reactive: disruption happens, system detects, payout triggers. GigShield's Social Disruption Oracle monitors news feeds, social signals, and government notices the night before a predicted bandh or curfew. Coverage is pre-armed before the disruption day begins — the rider wakes up already protected rather than discovering the problem mid-shift.

**3. Adverse selection addressed at product design level**
A known weakness of any subscription insurance product is that informed riders buy only during bad weeks and cancel during clear ones. GigShield addresses this proactively through a three-layer financial defense — a continuity payout scale, a personal loss ratio monitor, and pool mathematics — that makes opportunistic gaming progressively unprofitable without penalizing honest subscribers.

---

## 📌 What is GigShield?

India's food delivery riders on Zomato and Swiggy are the backbone of a ₹50,000 crore digital economy. Yet when the world disrupts their work — through extreme weather, platform outages, or sudden civic shutdowns — they bear the full financial loss alone. No safety net. No recourse. No warning.

**GigShield** is an AI-powered parametric income protection platform built exclusively for platform-based delivery partners. It monitors the world around a rider in real time, predicts disruptions before they hit, and automatically pays out lost income — without the rider filing a single claim.

> ⚠️ **Coverage Scope (Golden Rule):** GigShield strictly covers **income loss only**. No health, no accident, no vehicle repair. Every trigger, every payout, every feature maps to one thing: *the rider couldn't earn money today because of something outside their control.*

---

## 👤 Persona: Food Delivery Partner (Zomato / Swiggy)

### Who We're Building For

| Attribute | Detail |
|---|---|
| **Segment** | Food Delivery Partners (Zomato, Swiggy) |
| **Age Range** | 19–35 years |
| **Earnings** | ₹10,000–₹25,000/month (₹2,500–₹6,000/week) |
| **Work Pattern** | 6–12 hour shifts focused on lunch (12–2pm) and dinner (7–10pm) peaks |
| **Payment Cycle** | Weekly platform payouts |
| **Device** | Android smartphone (primary work tool) |
| **Digital Literacy** | Comfortable with UPI, WhatsApp; limited with forms |

### Persona Scenarios

---

**Scenario 1 — Ravi, Mumbai (Platform Outage)**

Ravi logs in at 7pm on a Friday — peak dinner delivery window. Swiggy's app goes down for 70 minutes. He sits on his bike outside a restaurant, earning zero. No orders come in. When the app returns, he has lost the best hours of his week with no record of the disruption.

*GigShield detects the outage at minute 1. By minute 47, when the platform crosses the trigger threshold, Ravi's income shield activates. By the time he refreshes his app, ₹210 is already in his UPI wallet.*

---

**Scenario 2 — Suresh, Delhi (AQI Crisis)**

It's November. Delhi's AQI crosses 380 for the third consecutive day. Suresh can barely breathe. Each delivery takes twice as long as his lungs struggle with the toxic air. Order demand is normal — but his delivery speed has collapsed. He completes half his usual trips in the same hours.

*GigShield's AQI monitor detects that Suresh's active zone has crossed the trigger threshold for 4+ hours during his shift. A parametric income payout triggers automatically — no claim, no paperwork.*

---

**Scenario 3 — Karan, Bengaluru (City Shutdown)**

A political party announces a bandh for Thursday morning. Karan has no idea. He wakes up, gears up, and rides out — only to find every restaurant shuttered and every zone locked.

*GigShield's social disruption oracle detected the bandh announcement Wednesday night via news and social signals. By 11pm, Karan's zone shield was pre-activated. Thursday morning, when the disruption is confirmed, his payout processes before he even leaves home.*

---

## 💡 Our Three Core Features

---

### Feature 1 — Predictive Weekly Premium Engine

Every Sunday night, an AI agent re-prices each rider's premium based on what is actually forecast to happen in their specific zone that week.

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

  Extreme disruption               → 70% of hourly income loss
    Rainfall > 100mm/hr
    AQI > 400 (severe category)
    Full confirmed bandh/curfew
    Platform down > 90 mins

  Hard ceiling: Never exceeds 70% under any condition
  Weekly cap : Rs.1,200 regardless of coverage percentage

CONTINUITY SCALE OPERATES WITHIN THE COVERAGE CAP:
  Week 1–2  → 40% of entitled payout (new subscriber protection)
  Week 3–4  → 70% of entitled payout
  Week 5+   → 100% of entitled payout

EXAMPLE — Week 5+ rider, extreme bandh, Rs.80/hr, 4 hours lost:
  Full loss          = Rs.80 x 4 = Rs.320
  70% coverage cap   = Rs.224 entitled
  100% continuity    = Rs.224 actual payout

New subscriber (week 1–2): same formula but 40% continuity cap
  → Rs.96 entitled x 40% = Rs.38.40 actual payout
  → Gaming week 1 is a net loss on any premium paid
```

---

### Feature 2 — Platform Blackout Coverage

**The problem:** When Swiggy or Zomato's app goes down during peak meal hours, riders earn ₹0. It is the most direct, most frequent income disruption — and the most ignored.

**How it works:**

GigShield monitors platform uptime every 5 minutes via third-party uptime services. Food delivery riders are uniquely vulnerable during lunch and dinner peaks — a 45-minute outage during these windows destroys their highest-earning hours of the day. When an outage is detected:

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

GigShield's AI agent runs a continuous signal monitoring pipeline:

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

**What makes this unique:** Every other solution is reactive. This is the only feature that predicts and pre-arms coverage *before* the disruption hits — turning parametric insurance from reactive to proactive.

---

## 🎯 Product Philosophy

GigShield does not tell riders to stop working. It removes the financial pressure that forces them to work when they shouldn't have to. A rider who receives a payout during heavy rain or a bandh now has a genuine choice — stop and stay safe, or continue and earn more. Before GigShield, stopping was never financially possible.

Each trigger uses a disruption-specific signal so income impairment is structurally implied, not assumed: platform blackout means zero orders possible; delivery time spike means rain has destroyed productivity; restaurant availability collapse means a bandh has shut the supply side entirely.

---

## ⚡ Trigger Timing — Why Threshold-Based Is The Only Correct Approach

There are three possible approaches to payout timing. Only one is correct.

Paying at rain start leads to fraud (10-minute drizzle qualifies). Waiting until rain ends defeats the purpose (rider already suffered). GigShield uses threshold-based triggering — both intensity AND sustained duration must be confirmed before payout fires:

```
WEATHER TRIGGER — Both conditions must be met simultaneously:
  Condition 1 (Threshold): Rainfall > 50mm/hr
  Condition 2 (Duration) : Sustained for > 1 hour continuously
  
  Why both required:
  Threshold alone → 10-minute downpour qualifies (wrong)
  Duration alone  → light drizzle for 2 hours qualifies (wrong)
  Both together   → genuine income-impacting disruption only ✅

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

## 🔁 Application Workflow

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
  ├── Payout = Hourly Rate x Duration x Coverage % (60% standard / 70% extreme)
  └── SMS confirmation sent → Claim stored with event ID

────────────────────────────────────────────────────────────────────

DASHBOARD
├── Rider: Premium summary, active alerts, claim history, zone heatmap
└── Admin: Live disruption panel, claims count, payout ratio, fraud flags
```

---

## 🤖 AI/ML Integration Plan

| Model | Type | Framework | Output |
|---|---|---|---|
| Premium engine | Supervised regression | XGBoost / scikit-learn | Weekly risk score → premium per rider |
| Disruption oracle | NLP classifier | HuggingFace Transformers | Confidence score 0–100% per zone |
| Fraud anomaly engine | Rule-based + ML | Isolation Forest | Flags suspicious claim patterns |
| Payout calculator | Deterministic formula | — | Duration x Hourly Rate x Severity Multiplier |

---

## 🧱 Tech Stack

### Platform Choice: Mobile-First Progressive Web App (PWA)

**Justification:** Riders use Android phones exclusively. A PWA delivers an app-like experience without requiring Play Store installation — critical for low-digital-literacy users. Supports push notifications natively and works offline for dashboard viewing.

| Layer | Technology | Reason |
|---|---|---|
| **Frontend** | React.js + Tailwind CSS (PWA) | Lightweight, fast, installable on Android |
| **Backend** | Node.js + Express | Fast API development, strong ecosystem |
| **Database** | PostgreSQL + Redis | Relational for policies/claims; Redis for real-time trigger state |
| **ML Service** | Python + FastAPI microservice | scikit-learn, XGBoost, HuggingFace models |
| **Weather API** | OpenWeatherMap (free tier) | Reliable, generous free quota |
| **AQI API** | IQAir / CPCB open data | Real AQI data for Indian cities |
| **News/Social** | NewsAPI.org + Twitter API v2 | Social disruption monitoring |
| **Uptime Monitor** | DownDetector + custom scraper | Platform blackout detection |
| **Payments** | Razorpay Sandbox (UPI payouts + mandate) | Indian-native, free sandbox |
| **Notifications** | Firebase Cloud Messaging + Twilio SMS | Covers both data and non-data users |
| **Hosting** | Railway / Render (free tier) | Simple deployment for hackathon |

---

## 📅 6-Week Development Plan

| Week | Phase | Key Deliverables |
|---|---|---|
| 1–2 | Ideation & Foundation | Persona research, feature design, README, repo setup |
| 3 | Core Build — Onboarding + Premium | OTP onboarding, zone picker, Sunday premium engine |
| 4 | Core Build — Triggers + Payouts | Uptime monitor, AQI/weather trigger, Razorpay payout flow |
| 5 | Advanced Features | Social disruption oracle (rule-based MVP), pre-activation alerts |
| 6 | Polish + Demo Prep | Fraud engine (rule-based MVP), basic dashboards, demo simulation |

**MVP scope vs Phase 2:**

| Feature | Hackathon MVP | Phase 2 |
|---|---|---|
| Social disruption oracle | Rule-based keyword matching | Full NLP classifier (HuggingFace) |
| Fraud detection | Rule-based scoring | Isolation Forest ML model |
| Premium engine | XGBoost on synthetic data | Retrained on real disruption history |
| Dashboard | Mock data, basic admin view | Live data, full analytics |

Scoping the hackathon MVP around rule-based implementations keeps delivery realistic while demonstrating the full system architecture. ML models are designed for Phase 2 when real training data is available.

---

## 📊 Analytics Dashboard

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

## 💰 Financial Sustainability Model

A smart rider could game any weather-based product by buying the premium only during bad weeks. GigShield blocks this with three layers:

| Layer | Mechanism | Effect |
|---|---|---|
| Continuity payout scale | Week 1–2 = 40% cap, week 3–4 = 70%, week 5+ = 100% | Joining before a bad week yields almost nothing |
| Loss ratio monitor | Ratio > 1.8x triggers personal surcharge, grows each cycle | Gaming becomes net loss by month 5 |
| Pool math | 1,000 riders, ~100 claims/week — pool stays profitable | Minority who game are absorbed by honest majority |

Cancelling and rejoining resets eligibility to week 1 — making repeated gaming progressively more expensive to restart.

**Loss ratio target: 0.6–0.8** — for every Rs.1 collected in premiums, GigShield pays out Rs.0.60–0.80 in claims. The 60% coverage cap is the primary lever that keeps the loss ratio within this target range.

---

## ✅ Constraint Compliance Checklist

| Golden Rule | Status | How We Comply |
|---|---|---|
| Delivery partners only | ✅ | Built exclusively for Zomato/Swiggy food delivery riders |
| Income loss coverage only | ✅ | All 3 triggers map strictly to lost working hours/wages |
| No health, accident, or vehicle coverage | ✅ | Zero features touch these categories |
| Weekly pricing model | ✅ | Premium recalculated every Sunday; week is the atomic unit of everything |
| AI/ML integration | ✅ | Premium engine, NLP disruption scorer, fraud anomaly detection |
| Intelligent fraud detection | ✅ | Third-party verification + GPS validation + ML anomaly engine |
| Parametric automation | ✅ | Zero rider action required for any claim or payout |
| Integration capabilities | ✅ | OpenWeatherMap, IQAir, NewsAPI, Twitter, DownDetector, Razorpay |

---

*Built for the AI-Powered Insurance Hackathon | Phase 1 Submission | Persona: Food Delivery Partners (Zomato / Swiggy) | March 2026*
