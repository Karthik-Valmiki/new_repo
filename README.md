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
```

---

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
```

---

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
```

---

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
