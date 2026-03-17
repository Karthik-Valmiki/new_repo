# GigShield — AI-Powered Parametric Income Insurance for Gig Workers

> Guidewire DEVTrails 2026 | Persona: Food Delivery Partner (Swiggy / Zomato) | City: Chennai

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Target User Persona](#3-target-user-persona)
4. [Product Overview](#4-product-overview)
5. [Core System Components](#5-core-system-components)
6. [Risk & Pricing Model](#6-risk--pricing-model)
7. [Policy Structure](#7-policy-structure)
8. [System Workflow](#8-system-workflow)
9. [Key Challenges](#9-key-challenges)
10. [Solutions & Mitigations](#10-solutions--mitigations)
11. [Key Differentiators](#11-key-differentiators)
12. [Tech Stack & Development Plan](#12-tech-stack--development-plan)

---

## 1. Executive Summary

**GigShield** is an AI-enabled parametric income insurance platform built exclusively for India's platform-based food delivery partners (Swiggy / Zomato). Delivery workers in cities like Chennai routinely lose 20–30% of their weekly income due to uncontrollable external disruptions — extreme weather, severe pollution, or civic curfews — with zero financial protection available today.

GigShield solves this by offering:
- **Weekly income protection** with premiums as low as ₹40/week
- **Zero-touch automated claims** triggered by real-world parametric events (no manual filing)
- **AI-driven dynamic pricing** based on location risk, weather patterns, and worker activity
- **Intelligent fraud detection** using GPS validation, anomaly scoring, and claim-behavior analysis
- Coverage scope is strictly **loss of income only** — no health, life, accident, or vehicle payouts

The platform addresses adverse selection through mandatory minimum subscriptions and restricts policy purchase to Sundays, ensuring workers cannot game the system by buying only on high-risk days.

---

## 2. Problem Statement

### 2.1 Income Instability for Gig Workers

- Food delivery partners in India operate without any employment safety net
- External disruptions — heavy rain, floods, extreme heat, AQI spikes, or sudden curfews — can completely halt delivery operations for hours or days
- A typical Chennai delivery partner earning ₹5,000/week can lose ₹480–₹2,000 in a single disruption event
- No existing insurance product addresses income loss at this granularity or affordability

### 2.2 Environmental & Social Disruptions

| Disruption Type | Examples | Impact |
|---|---|---|
| Environmental | Heavy rain (>50mm), Extreme heat (>40°C), Severe Pollution (AQI >400), Flood warnings | Cannot work outdoors / deliveries halted |
| Social | Unplanned curfews, local strikes, sudden zone closures | Inability to access pickup/drop locations |

> **Important:** GigShield insures only the **income lost** during these events. Vehicle repair, health, or accident costs are explicitly excluded.

### 2.3 Adverse Selection Problem

- Workers are likely to purchase insurance only when they anticipate disruption (e.g., during monsoon season or pollution alerts)
- This creates an imbalanced risk pool, pushing up loss ratios
- A structural policy design is required to counteract self-selection bias

---

## 3. Target User Persona

| Attribute | Details |
|---|---|
| Role | Food Delivery Partner |
| Platform | Swiggy / Zomato |
| City | Chennai |
| Average Orders/Day | 18 |
| Avg. Earnings/Order | ₹40 |
| Daily Income | ₹720 |
| Weekly Income | ₹5,000 |
| Coverage Amount | 40% of weekly income = **₹2,000/week** |
| Working Pattern | Daily, weather-dependent, outdoor |
| Digital Comfort | Smartphone-first; prefers simple UX, regional language support |
| Key Constraint | Week-to-week cash flow; cannot afford high upfront premiums |

---

## 4. Product Overview

### What GigShield Covers

- **Loss of income** caused by verified external disruptions during the active coverage week
- Payout is calculated based on the estimated hours lost and the worker's average hourly earnings
- Strictly excludes: health, life, accidents, vehicle damage, or platform-side order cancellations

### Weekly Income Protection Model

- Premiums are charged on a **weekly basis**, aligned with the typical payout cycle of gig workers
- Policy purchases are open **only on Sundays**; coverage runs **Monday through Sunday**
- Minimum subscription: **4 consecutive weeks** — prevents adverse selection

### Parametric Nature

- There is **no manual claim filing**
- Claims are triggered automatically when real-world data (weather APIs, pollution indices, civic alerts) breaches pre-defined parametric thresholds
- Income loss is estimated algorithmically using disruption duration × worker's hourly rate
- Payout is processed instantly via mock UPI / Razorpay / Stripe sandbox

---

## 5. Core System Components

### 5.1 Income Loss Estimation Engine

**What it does:** Calculates the income a worker is entitled to receive as payout when a disruption event is detected.

| | |
|---|---|
| **Inputs** | Worker's average hourly earnings, disruption start/end timestamps, active policy status |
| **Logic** | `payout = hourly_earnings × disruption_duration_hours` |
| **Example** | Hourly rate: ₹120 × 4 hours of rain disruption = **₹480 payout** |
| **Outputs** | Payout amount, claim record, payout initiation signal |

---

### 5.2 Risk Zone Classification

**What it does:** Assigns a geographic risk score to each worker's primary operating zone based on historical disruption frequency.

| | |
|---|---|
| **Inputs** | Worker's registered operating zone (GPS coordinates / delivery zone), historical weather + flood + AQI data per zone |
| **Logic** | Zones are classified as Low / Medium / High risk based on disruption frequency over a rolling 12-month window |
| **Outputs** | Zone risk label, zone risk multiplier (used in premium calculation) |

---

### 5.3 Parametric Trigger Engine

**What it does:** Continuously monitors real-time external data feeds and triggers automatic claim initiation when thresholds are breached within a worker's active coverage zone.

| | |
|---|---|
| **Inputs** | Weather API (rainfall, temperature), AQI API, government flood/curfew alerts, worker's registered coverage zone |
| **Triggers** | Heavy Rain: rainfall > 50mm / Heavy Heat: temperature > 40°C / Severe Pollution: AQI > 400 / Flood Warning: official alert issued / Curfew / Zone Closure: civic notification received |
| **Outputs** | Trigger event log, automatic claim initiation signal, disruption duration timestamp |

---

### 5.4 Fraud Detection System

**What it does:** Validates each triggered claim against worker location and activity data to reject fraudulent or ineligible payouts.

| | |
|---|---|
| **Inputs** | Worker's real-time or last-known GPS location, active delivery records, claim history |
| **Rules** | If `worker_location ≠ disruption_zone` → reject claim / Duplicate claim for same disruption event → reject / Unusual claim frequency relative to historical behavior → flag for review |
| **Outputs** | Claim approved / rejected / flagged, anomaly score per claim, fraud audit log |

---

### 5.5 Worker Reliability Score

**What it does:** Generates a dynamic score per worker that reflects their activity consistency, delivery regularity, and claim behavior — used to adjust premium and coverage thresholds.

| | |
|---|---|
| **Inputs** | Delivery activity history, login consistency, claim frequency, claim legitimacy outcomes |
| **Scoring Logic** | High reliability → lower premium, higher coverage limit / Low reliability → higher premium, additional fraud verification steps |
| **Outputs** | Reliability score (0–100), premium adjustment factor, fraud check flag |

---

### 5.6 Risk Pool Architecture

**What it does:** Segments insured workers into pools by tier and zone to ensure actuarial balance and prevent high-risk workers from subsidizing low-risk workers (or vice versa).

| | |
|---|---|
| **Inputs** | Worker tier (A/B/C), zone risk classification, disruption history per zone |
| **Logic** | Each pool collects premiums from its segment and pays out claims within the same segment; cross-pool reinsurance layer handles overflow |
| **Outputs** | Pool balance per segment, payout capacity metrics, loss ratio per pool |

---

## 6. Risk & Pricing Model

### Core Formula

```
premium = base_rate × risk_multiplier
```

Where `risk_multiplier` is a composite of three sub-factors:

```
risk_multiplier = f(weather_risk, location_risk, activity_level)
```

### Factor Breakdown

| Factor | Description | Effect on Premium |
|---|---|---|
| **Weather Risk** | Probability of disruption in the upcoming week based on forecast data for the worker's zone | Higher forecast risk → higher multiplier |
| **Location Risk** | Historical disruption frequency of the worker's primary operating zone | High-risk zone (e.g., flood-prone) → higher multiplier |
| **Activity Level** | Worker's average weekly active hours and delivery consistency | More active workers → lower relative premium (better data, lower uncertainty) |

### Premium Tiers

| Tier | Weekly Premium | Profile |
|---|---|---|
| Tier A | ₹40 / week | High activity, low-risk zone, high reliability score |
| Tier B | ₹60 / week | Moderate activity or moderate-risk zone |
| Tier C | ₹90 / week | Low activity, high-risk zone, or low reliability score |

> Premiums are reassessed at the start of each new 4-week subscription cycle.

---

## 7. Policy Structure

### Policy Attributes

| Attribute | Value |
|---|---|
| Policy ID | Auto-generated unique identifier |
| Coverage Amount | ₹2,000 / week (40% of average weekly income) |
| Weekly Premium | ₹40 – ₹90 depending on tier |
| Coverage Period | Monday to Sunday (7 days) |
| Minimum Subscription | 4 consecutive weeks |
| Purchase Window | Sundays only |
| Covered Disruptions | Heavy Rain, Extreme Heat, Severe Pollution, Flood Warning, Curfew/Zone Closure |
| Coverage Zone | Worker's registered primary operating zone |
| Exclusions | Health, life, accidents, vehicle damage, platform cancellations |

### Parametric Thresholds

| Trigger | Threshold |
|---|---|
| Heavy Rain | Rainfall > 50 mm in 24 hours |
| Extreme Heat | Temperature > 40°C for 3+ continuous hours |
| Severe Pollution | AQI > 400 |
| Flood Warning | Official government flood alert issued for coverage zone |
| Curfew / Zone Closure | Civic notification issued restricting movement in coverage zone |

---

## 8. System Workflow

### Step-by-Step: Onboarding to Payout

**Step 1 — Worker Registration & Onboarding**
Worker downloads the app, submits their delivery profile: name, phone, platform (Swiggy/Zomato), primary operating zone, average daily working hours, and bank/UPI details.

**Step 2 — Worker Data Collection**
System collects and stores: persona details, GPS-pinned operating zone, delivery platform, daily working pattern, and historical earnings estimate.

**Step 3 — AI Risk Profiling**
The AI risk model assesses the worker's zone risk classification, weather forecast for their area, and initial activity data to generate a risk profile.

**Step 4 — Dynamic Weekly Premium Calculation**
Using `premium = base_rate × risk_multiplier`, the system assigns the worker to Tier A, B, or C and displays their weekly premium.

**Step 5 — Policy Creation**
Worker reviews and accepts the policy on Sunday. The system generates a Policy ID with defined coverage amount, disruption triggers, coverage zone, and 4-week start date.

**Step 6 — Worker Purchases Weekly Policy**
Payment is deducted weekly. Coverage activates Monday 00:00 and remains active through Sunday 23:59.

**Step 7 — Trigger Monitoring (Continuous)**
The Parametric Trigger Engine polls weather, AQI, flood alert, and curfew APIs every 15–30 minutes for all active coverage zones.

**Step 8 — Disruption Detected**
A threshold breach is logged for the relevant zone with a start timestamp. All workers with active policies in that zone are flagged for potential claim.

**Step 9 — Automatic Claim Initiation**
The system automatically initiates a claim for each eligible worker in the affected zone. No manual action required from the worker.

**Step 10 — Income Loss Estimation**
The engine calculates `payout = hourly_rate × disruption_duration` for each worker based on their registered earnings profile.

**Step 11 — Fraud Detection Checks**
GPS validation confirms worker was in the coverage zone. Duplicate claim check runs. Anomaly detection scores the claim against historical behavior. If all checks pass, claim is approved.

**Step 12 — Payout Processing**
Approved payout is disbursed via mock UPI / Razorpay test mode / Stripe sandbox to the worker's registered account within minutes of disruption end.

**Step 13 — Dashboard Update**
Worker dashboard updates with: payout received, coverage status, next premium due. Insurer/admin dashboard updates with: loss ratio, claims processed, zone disruption heatmap.

---

## 9. Key Challenges

### 9.1 Adverse Selection
Workers are rational actors — they are more likely to subscribe during high-risk periods (monsoon, pollution season) and drop coverage when conditions are favorable. This skews the risk pool toward high-loss periods and increases the loss ratio unsustainably.

### 9.2 Geographic Imbalance
Certain zones (flood-prone areas, dense urban pockets with poor drainage) will generate disproportionately high claims relative to premiums collected from those zones, straining pool balance.

### 9.3 Fraud Attempts
- GPS spoofing: Workers may falsify their location to appear in a disruption zone when they are not
- Fake disruption claims: Claiming income loss during a disruption while actually working
- Duplicate claims: Attempting multiple claims for a single disruption event

---

## 10. Solutions & Mitigations

### 10.1 Combating Adverse Selection
- **Sunday-only purchase window:** Prevents mid-week panic buying when a storm is forecast
- **Minimum 4-week subscription:** Spreads risk across low-disruption weeks, not just high ones
- **Dynamic premium repricing:** Premiums are recalculated each subscription cycle using the latest weather forecast and zone risk data, so risk is priced in before coverage starts

### 10.2 Managing Geographic Imbalance
- **Zone-based risk pool segmentation:** High-risk zones contribute higher premiums; their payouts are funded from their own pool segment
- **Zone risk multiplier in pricing formula:** Actuarially adjusts premiums to reflect real zone-level disruption probability

### 10.3 Fraud Prevention
- **GPS location validation:** Worker's GPS coordinates at claim time must fall within the declared coverage zone
- **Anomaly detection scoring:** ML model flags claims that deviate significantly from the worker's historical pattern (e.g., claiming for every disruption at maximum duration)
- **Duplicate claim prevention:** System de-duplicates claims by disruption event ID and worker ID
- **Worker Reliability Score:** Chronic over-claimers are scored down, triggering higher premiums and additional verification on future claims

### 10.4 Risk Pool Stability
- **Tiered pool architecture:** Tier A, B, C pools are separately managed with distinct premium inflows and payout obligations
- **Reliability score feedback loop:** High-reliability workers are rewarded with lower premiums, incentivizing consistent honest behavior

---

## 11. Key Differentiators

| Feature | GigShield | Traditional Insurance |
|---|---|---|
| Claims process | Fully automated, zero-touch | Manual filing, long processing |
| Payout speed | Minutes after disruption ends | Days to weeks |
| Pricing model | AI-driven, dynamic, weekly | Static annual premiums |
| Minimum premium | ₹40/week | Not designed for gig workers |
| Trigger mechanism | Real-time parametric APIs | Self-reported events |
| Fraud detection | AI + GPS + behavioral scoring | Manual investigation |
| Coverage scope | Income loss only, precisely defined | Broad / mismatched for gig workers |

---

## 12. Tech Stack & Development Plan

### Proposed Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js (Web) / React Native (Mobile) |
| Backend | Node.js / Python (FastAPI) |
| Database | PostgreSQL + Redis (for real-time trigger state) |
| AI/ML | Python (scikit-learn / XGBoost for risk scoring, anomaly detection) |
| Weather API | OpenWeatherMap (free tier) / IMD mock data |
| AQI API | AQICN API (free tier) |
| Payment Simulation | Razorpay test mode / Stripe sandbox |
| Hosting | AWS / GCP (free tier / student credits) |
| Version Control | GitHub (same repo across all phases) |

### Phase-Wise Development Plan

**Phase 1 — Ideation & Foundation (Weeks 1–2) | Deadline: March 20**
- Finalize persona: Food Delivery Partner, Chennai, Swiggy/Zomato
- Define parametric triggers and threshold values
- Design weekly premium model and tier structure
- Build system architecture diagram
- Set up GitHub repository with this README
- Record 2-minute strategy + prototype video

**Phase 2 — Automation & Protection (Weeks 3–4) | Deadline: April 4**
- Build worker registration and onboarding flow
- Implement AI risk profiling model (zone + weather + activity)
- Develop dynamic weekly premium calculation engine
- Build insurance policy creation and management module
- Implement claims management with 3–5 automated parametric triggers
- Record 2-minute demo video

**Phase 3 — Scale & Optimise (Weeks 5–6) | Deadline: April 17**
- Integrate advanced fraud detection (GPS spoofing, anomaly detection, duplicate prevention)
- Build simulated instant payout system (Razorpay test / Stripe sandbox / UPI simulator)
- Build dual-view intelligent dashboard (Worker view + Admin/Insurer view)
- Package final deliverables: 5-minute demo video + Final Pitch Deck (PDF)

---

> **Built for Guidewire DEVTrails 2026 — Unicorn Chase**
> Seed → Scale → Soar
