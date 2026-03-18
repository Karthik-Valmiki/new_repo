# AI-Powered Parametric Insurance (PI) for Gig Workers

## 1. Problem Understanding

### Context

India’s gig delivery workforce (Zomato, Swiggy, Zepto, Amazon, etc.) operates on a **daily earning model**, where income is directly tied to working hours.

External disruptions such as:

- Heavy rainfall  
- Extreme heat  
- High AQI  
- Curfews / local restrictions  
- Road blockages  

can significantly reduce working time, leading to **20–30% weekly income loss**.

---

### Core Problem

> Gig workers face **unpredictable income loss due to uncontrollable external disruptions**, with **no automated system to compensate lost earnings in real time**.

This results in financial instability and lack of income certainty.

---

## 2. Persona-Based Scenario

### Persona: Food Delivery Partner

- Works 8–12 hours/day  
- Paid per delivery (variable income)  
- Operates in fixed zones  
- Fully dependent on mobile applications  
- Requires predictable weekly income  

---

### Scenario Without System

- Rain begins during peak hours  
- Delivery demand drops  
- Earnings reduce to near zero  
- No compensation exists  

---

### Scenario With PI System

- Rainfall crosses threshold  
- System detects disruption automatically  
- Worker activity is validated  
- Income loss is calculated continuously  
- Payout is credited in real time  

---

### Outcome

> Worker income is stabilized during disruptions, reducing volatility and uncertainty.

---

## 3. Product Strategy & Platform Decision

### Approach

- **Mobile-first product design (real-world usage)**
- **Web-based MVP implementation (for hackathon execution)**

---

### Justification

| Factor | Decision |
|------|--------|
| Real user environment | Mobile (GPS, activity tracking, notifications) |
| Development speed | Web (faster implementation, easier debugging) |
| Demo reliability | Web MVP ensures stable execution |

---

## 4. End-to-End Workflow

User Registration  
→ Risk Profiling  
→ Weekly Premium Calculation  
→ Policy Activation (Sunday + 24h delay)  
→ Continuous Monitoring (every 10 minutes)  
→ Disruption Detection  
→ Activity Validation  
→ Fraud Scoring  
→ Interval-Based Payout Calculation  
→ Instant Wallet Credit  

---

## 5. Weekly Premium Model

### Core Formula

Premium = Base Rate × Risk Multiplier  

---

### Base Rate

Base Rate = Expected Weekly Payout + Margin  

#### Explanation

- Expected Weekly Payout → estimated average income loss  
- Margin → buffer for uncertainty and operational sustainability  

---

### Example Calculation

- Weekly income = ₹5600  
- Hourly income = ₹80  
- Avg disruption = 5 hours/week  
- Probability = 10%  

Expected payout = 80 × 5 × 0.1 = ₹40  
Base Rate = ₹50  

---

### Risk Multiplier

Risk Multiplier =  
Location Risk × Weather Risk × Behavior Risk × Claim Risk  

#### Components

- Location Risk → flood-prone or high AQI zones  
- Weather Risk → forecast-based disruption probability  
- Behavior Risk → user activity consistency  
- Claim Risk → historical claim frequency  

---

### Example Premium

Premium = 50 × 1.4 = ₹70/week  

---

## 6. Parametric Trigger System

### Trigger Conditions

| Disruption | Threshold |
|----------|----------|
| Rainfall | ≥ 50 mm/hour |
| Heat | ≥ 40°C |
| AQI | ≥ 300 |
| Flood Alert | Binary |

---

### Data Sources

- OpenWeather  
- IMD (or mock APIs)  
- AQI APIs  

---

### Validation Rule

> A trigger is considered valid if at least two independent data sources confirm it.

---

## 7. Interval-Based Payout Model (Core Design)

### Problem with Traditional Approach

- Requires exact start and end detection  
- Delays payouts  
- Not aligned with real-time income loss  

---

### Proposed Approach

The system calculates payouts in **fixed intervals (every 10 minutes)**.

---

### Formula

Interval Payout = (Hourly Income / 6) × Eligibility  

---

### Example

- Hourly income = ₹80  
- Interval payout ≈ ₹13.3  

Rain duration = 30 minutes:

- 0–10 min → ₹13.3  
- 10–20 min → ₹13.3  
- 20–30 min → ₹13.3  

Total payout = ₹40  

---

### Advantages

- Real-time compensation  
- No dependency on disruption end  
- Continuous validation  
- Strong user trust  

---

## 8. Activity Validation (Eligibility)

User must be actively working:

GPS within delivery zone AND  
App session active AND  
At least one delivery attempt in last 30 minutes  

---

## 9. Fraud Detection System

### Fraud Score Model

Fraud Score =  
w1*(GPS mismatch) +  
w2*(No activity) +  
w3*(Historical anomaly) +  
w4*(Device tampering)  

---

### Decision Logic

| Score | Action |
|------|--------|
| Low | Auto payout |
| Medium | Delayed verification |
| High | Block payout |

---

### Fraud Cases Covered

- GPS spoofing  
- Fake inactivity  
- Duplicate claims  
- Device manipulation  

---

## 10. Adverse Selection Prevention

- Purchase allowed only on Sunday  
- Policy activation delay of 24 hours  
- Dynamic pricing increases during high-risk periods  

---

## 11. Coverage Model

Coverage = 50–60% of weekly income  

### Rationale

- Prevents misuse  
- Keeps premiums affordable  
- Ensures sustainability  

---

## 12. AI/ML Integration

### Risk Prediction

Input:
- Historical weather data  
- Location trends  

Output:
- Disruption probability  

---

### Dynamic Pricing

- Adjusts risk multiplier weekly  
- Based on:
  - Forecast data  
  - User behavior  
  - Claim history  

---

### Fraud Detection

- Anomaly detection  
- Behavioral pattern analysis  

---

## 13. System Architecture

### Core Engines

1. Risk Engine  
2. Pricing Engine  
3. Trigger Engine  
4. Fraud Engine  
5. Payout Engine  

---

### Data Flow

External APIs → Trigger Engine → Decision Engine → Payout Engine  

---

### Reliability

- Multi-source validation  
- Outlier filtering  
- Mock fallback  

---

## 14. Tech Stack

| Layer | Technology |
|------|-----------|
| Frontend | React (Web MVP) |
| Backend | FastAPI (Python) |
| Database | PostgreSQL |
| ML | Scikit-learn / LightGBM |
| APIs | Weather + AQI APIs |
| Payments | Razorpay (test mode) |

---

## 15. Business Model

Revenue = Total Premium Collected  

Cost = Total Payout + Operational Cost  

---

### Loss Ratio

Loss Ratio = Payout / Premium  

Target = 0.6 – 0.8  

---

### Sustainability

- Partial coverage (≤60%)  
- Dynamic pricing  
- Risk segmentation  
- Risk pooling  

---

## 16. Development Plan (Phase 1)

- Complete system design  
- Define pricing model  
- Implement trigger logic  
- Build Web MVP with mock APIs  

---

## 17. Key Differentiators

1. Interval-Based Real-Time Payout  
   Compensation happens during disruption, not after  

2. Self-Adjusting Pricing  
   Premium adapts based on user behavior and environment  

3. Predictive Risk Pricing  
   Forecast-driven pricing before disruptions occur  

---

## 18. Conclusion

The proposed system provides:

- Real-time income protection  
- Fully automated payouts (no claims)  
- Scalable and sustainable model  

It is:

- Technically feasible  
- Economically viable  
- Aligned with real-world gig worker needs  
