import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { getMyDashboard, getQuote, purchasePolicy, simulateTrigger, logActivity } from "../api"
import {
  Shield, Zap, IndianRupee, LogOut, RefreshCw,
  TrendingUp, Award, CheckCircle, Clock, ChevronDown, ChevronUp, ArrowRight
} from "lucide-react"

const METRIC_OPTIONS = [
  { label: "Rain",              val: "WEATHER",            fields: ["rainfall_mm"] },
  { label: "Hailstorm",         val: "WEATHER",            fields: ["rainfall_mm"] },
  { label: "Heat Wave",         val: "WEATHER",            fields: ["temperature_c"] },
  { label: "High Winds",        val: "WEATHER",            fields: ["wind_kmh"] },
  { label: "Toxic Air (AQI)",   val: "AQI",                fields: ["aqi_value"] },
  { label: "Platform Outage",   val: "PLATFORM_BLACKOUT",  fields: ["outage_duration_min"] },
  { label: "Bandh / Curfew",    val: "SOCIAL_DISRUPTION",  fields: ["news_confidence_pct"] },
]

const FIELD_META = {
  rainfall_mm:         { label: "Rainfall (mm/hr)",       placeholder: "e.g. 52",  min: 35,  unit: "mm/hr",  hint: "Threshold ≥ 35 mm/hr" },
  temperature_c:       { label: "Temperature (°C)",        placeholder: "e.g. 42",  min: 40,  unit: "°C",    hint: "Threshold ≥ 40 °C" },
  wind_kmh:            { label: "Wind Speed (km/hr)",      placeholder: "e.g. 45",  min: 40,  unit: "km/hr", hint: "Threshold ≥ 40 km/hr" },
  aqi_value:           { label: "AQI Index",               placeholder: "e.g. 320", min: 300, unit: "AQI",   hint: "Threshold ≥ 300 AQI" },
  outage_duration_min: { label: "Outage Duration (min)",   placeholder: "e.g. 60",  min: 45,  unit: "min",   hint: "Threshold ≥ 45 min · Peak hours only" },
  news_confidence_pct: { label: "News Confidence (%)",     placeholder: "e.g. 80",  min: 75,  unit: "%",     hint: "Threshold ≥ 75% · Based on news sources" },
}
const INTENSITIES = ["LOW", "MEDIUM", "HIGH", "CRITICAL"]

function StatusBadge({ status }) {
  const map = {
    ACTIVE:        "bg-brand-500/20 text-brand-400 border-brand-500/30",
    PENDING:       "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    NOT_PURCHASED: "bg-dark-600 text-gray-500 border-dark-500",
    NONE:          "bg-dark-600 text-gray-500 border-dark-500",
  }
  return (
    <span className={`badge border ${map[status] || map.NONE}`}>
      {status === "ACTIVE"  && <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse-slow" />}
      {status === "PENDING" && <Clock size={10} />}
      {status}
    </span>
  )
}

function Countdown({ seconds }) {
  const [left, setLeft] = useState(seconds)
  useEffect(() => {
    if (left <= 0) return
    const t = setInterval(() => setLeft(p => Math.max(0, p - 1)), 1000)
    return () => clearInterval(t)
  }, [])
  if (left <= 0) return <span className="text-brand-400 text-sm font-semibold">Active now ✓</span>
  return <span className="text-yellow-400 text-sm">Activates in {left}s</span>
}

// R score arc gauge — visual indicator 0→1
function RGauge({ r }) {
  const pct = Math.min(r, 1.0)
  const color = pct >= 0.75 ? "#22c55e" : pct >= 0.45 ? "#eab308" : "#ef4444"
  const circumference = 2 * Math.PI * 28
  const dash = circumference * pct
  return (
    <svg width="72" height="72" viewBox="0 0 72 72">
      <circle cx="36" cy="36" r="28" fill="none" stroke="#1f2937" strokeWidth="6" />
      <circle cx="36" cy="36" r="28" fill="none" stroke={color} strokeWidth="6"
        strokeDasharray={`${dash} ${circumference}`}
        strokeLinecap="round"
        transform="rotate(-90 36 36)"
        style={{ transition: "stroke-dasharray 0.6s ease" }}
      />
      <text x="36" y="40" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white">
        {r.toFixed(2)}
      </text>
    </svg>
  )
}

function ScoreBar({ label, value, color = "bg-brand-500" }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-medium">{(value * 100).toFixed(0)}%</span>
      </div>
      <div className="h-1.5 bg-dark-600 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(100, value * 100)}%` }} />
      </div>
    </div>
  )
}

// Returning-user R breakdown card
function ReliabilityCard({ riderD }) {
  const [expanded, setExpanded] = useState(false)
  const rb = riderD?.r_breakdown
  const pc = riderD?.premium_comparison
  if (!rb || riderD?.is_new_user) return null

  const r = rb.r
  const label = r >= 0.75 ? "Top Performer" : r >= 0.45 ? "Average" : "Needs Improvement"
  const labelColor = r >= 0.75 ? "text-green-400" : r >= 0.45 ? "text-yellow-400" : "text-red-400"

  return (
    <div className="card relative overflow-hidden bg-gradient-to-br from-dark-800/80 to-dark-900 shadow-2xl border-brand-500/10 hover:border-brand-500/30">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-brand-500/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="flex items-center gap-3 mb-6 border-b border-dark-700/50 pb-4">
        <div className="w-8 h-8 rounded-full bg-brand-500/10 flex items-center justify-center">
          <TrendingUp size={16} className="text-brand-400" />
        </div>
        <span className="font-semibold text-lg text-white">Reliability Score</span>
        <span className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold bg-dark-900 border ${labelColor} border-current/20`}>{label}</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-8 mb-6">
        <div className="shrink-0 relative">
          <div className="absolute inset-0 bg-brand-500/5 blur-xl rounded-full"></div>
          <RGauge r={r} />
        </div>
        <div className="flex-1 w-full space-y-4">
          <ScoreBar label="Time Utilization (TU)" value={rb.tu} color="bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
          <ScoreBar label="Delivery Efficiency (DE)" value={rb.de} color="bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
          <ScoreBar label="Completion Rate (CR)" value={rb.cr} color="bg-brand-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
        </div>
      </div>

      <div className="bg-dark-900/50 border border-dark-700/50 rounded-xl p-4 mb-4">
        <p className="text-xs text-gray-400 font-mono flex items-center gap-2">
          <span className="text-brand-400">R</span> = √(TU × DE × CR) = √({rb.tu} × {rb.de} × {rb.cr}) = <span className="text-white font-bold">{r}</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">Based on {rb.weeks_tracked} week{rb.weeks_tracked !== 1 ? "s" : ""} tracked</p>
      </div>

      {/* Premium reward comparison */}
      {pc && (
        <div className="bg-dark-900/50 border border-dark-700/50 rounded-xl p-4 mb-4 grid grid-cols-2 gap-4">
          <div className="border-r border-dark-700/50 pr-4">
            <p className="text-xs text-brand-400 uppercase tracking-widest mb-1">Your Adjusted Flow</p>
            <p className="font-display text-2xl font-bold text-white flex items-baseline gap-1">
              ₹{pc.your_premium} <span className="text-xs text-gray-500 font-sans font-normal">/ premium</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">{pc.your_coverage_pct}% total coverage</p>
          </div>
          <div className="pl-2">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">New Rider Baseline</p>
            <p className="font-display text-xl font-bold text-gray-400">₹{pc.new_user_premium}</p>
            <p className="text-xs text-gray-500 mt-1">{pc.new_user_coverage_pct}% total coverage</p>
          </div>
          {(pc.premium_saving > 0 || pc.coverage_gain_pct > 0) && (
            <div className="col-span-2 flex gap-4 pt-4 border-t border-dark-700/50">
              {pc.premium_saving > 0 && (
                <span className="text-xs text-cyan-400 flex items-center gap-1.5 font-medium bg-cyan-400/10 px-2 py-1 rounded">
                  <Award size={12} /> Saving ₹{pc.premium_saving} / week
                </span>
              )}
              {pc.coverage_gain_pct > 0 && (
                <span className="text-xs text-brand-400 flex items-center gap-1.5 font-medium bg-brand-400/10 px-2 py-1 rounded">
                  <Shield size={12} /> +{pc.coverage_gain_pct}% extended coverage
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Weekly history toggle */}
      {rb.history?.length > 0 && (
        <>
          <button
            onClick={() => setExpanded(e => !e)}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
          >
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {expanded ? "Collapse metrics" : "View historical metrics"}
          </button>
          {expanded && (
            <div className="mt-4 space-y-2 relative">
              <div className="absolute left-2.5 top-2 bottom-2 w-px bg-dark-700"></div>
              {rb.history.map((w, i) => (
                <div key={i} className="flex items-center justify-between text-xs py-2 pl-6 relative">
                  <div className="absolute left-1.5 w-2 h-2 rounded-full border-2 border-dark-900 bg-dark-500"></div>
                  <span className="text-gray-400 font-mono min-w-[90px]">{w.week}</span>
                  <div className="flex gap-4 text-gray-500">
                    <span>TU {(w.tu * 100).toFixed(0)}%</span>
                    <span>DE {(w.de * 100).toFixed(0)}%</span>
                    <span>CR {(w.cr * 100).toFixed(0)}%</span>
                  </div>
                  <span className="text-brand-400 font-semibold font-mono">R={w.r.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default function Dashboard() {
  const { rider, logout } = useAuth()
  const navigate = useNavigate()

  const [dash, setDash]       = useState(null)
  const [quote, setQuote]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [buying, setBuying]   = useState(false)
  const [buyMsg, setBuyMsg]   = useState("")

  const [triggerForm, setTriggerForm] = useState({
    zone_id: "", metric_type: "WEATHER", metric_label: "Rain", intensity_level: "HIGH",
    trigger_time: "19:00", trigger_end_time: "21:00",
    rainfall_mm: "", temperature_c: "", wind_kmh: "",
    aqi_value: "", outage_duration_min: "", news_confidence_pct: "",
  })
  const [triggerResult, setTriggerResult] = useState(null)
  const [triggering, setTriggering] = useState(false)
  const [polling, setPolling] = useState(false)

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    try {
      const [d, q] = await Promise.all([getMyDashboard(), getQuote()])
      setDash(d.data)
      setQuote(q.data)
      if (q.data?.zone_id) setTriggerForm(f => ({ ...f, zone_id: String(q.data.zone_id), metric_label: f.metric_label || "Rain" }))
    } catch (e) {
      if (e.response?.status === 401) { logout(); navigate("/login") }
    } finally {
      if (!silent) setLoading(false)
    }
  }, [logout, navigate])

  useEffect(() => { load() }, [load])

  const handlePurchase = async () => {
    setBuying(true); setBuyMsg("")
    try {
      const res = await purchasePolicy()
      setBuyMsg(`✓ Policy purchased! Activates in ${res.data.activates_in_seconds}s`)
      await load()
    } catch (e) {
      setBuyMsg(e.response?.data?.detail || "Purchase failed")
    }
    setBuying(false)
  }

  const handleTrigger = async () => {
    if (!triggerForm.zone_id) return
    const selectedOpt = METRIC_OPTIONS.find(o => o.label === triggerForm.metric_label) ||
                        METRIC_OPTIONS.find(o => o.val === triggerForm.metric_type)
    setTriggering(true); setTriggerResult(null)
    try {
      // Log activity first so the payout engine's fraud check passes
      await logActivity(parseInt(triggerForm.zone_id))
      const payload = {
        zone_id: parseInt(triggerForm.zone_id),
        metric_type: triggerForm.metric_type,
        intensity_level: triggerForm.intensity_level,
        trigger_time: triggerForm.trigger_time,
        trigger_end_time: triggerForm.trigger_end_time,
        event_metadata: {},
      }
      // attach only the relevant metric value
      if (selectedOpt) {
        selectedOpt.fields.forEach(f => {
          const v = triggerForm[f]
          if (v !== "") payload[f] = f === "aqi_value" || f === "outage_duration_min" || f === "news_confidence_pct"
            ? parseInt(v) : parseFloat(v)
        })
      }
      const res = await simulateTrigger(payload)
      setTriggerResult(res.data)
      setTriggering(false)
      setPolling(true)
      // Poll for interval_count × 10s + 15s buffer, checking every 3s
      const totalDuration = ((res.data.interval_count || 1) * 10 + 15) * 1000
      const pollInterval = 3000
      const maxPolls = Math.ceil(totalDuration / pollInterval)
      let polls = 0
      const poll = setInterval(async () => {
        polls++
        await load(true)
        if (polls >= maxPolls) { clearInterval(poll); setPolling(false) }
      }, pollInterval)
      return () => clearInterval(poll)
    } catch (e) {
      setTriggerResult({ error: e.response?.data?.detail || "Trigger failed" })
    }
    setTriggering(false)
  }

  if (!rider) { navigate("/login"); return null }

  const policy  = dash?.policy
  const riderD  = dash?.rider
  const payouts = dash?.payout_history || []
  const hasPol  = policy?.status === "ACTIVE" || policy?.status === "PENDING"

  return (
    <div className="min-h-screen bg-dark-900 text-white relative">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* NAV */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-dark-700/50 backdrop-blur-md sticky top-0 z-50">
        <span className="font-display text-xl font-black tracking-tight flex items-center gap-1">

          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          VERO
        </span>
        <div className="flex items-center gap-4">
          <button onClick={() => load(true)} className="text-gray-500 hover:text-white transition-colors">
            <RefreshCw size={16} />
          </button>
          <button onClick={() => { logout(); navigate("/") }}
            className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {loading ? (
          <div className="text-center py-20 text-gray-500 animate-pulse">Loading your dashboard...</div>
        ) : (
          <>
            {/* ── RIDER HEADER ── */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">Hey 👋</p>
                <h1 className="font-display text-3xl font-bold">{riderD?.name || rider?.name}</h1>
                <p className="text-gray-500 text-sm mt-1">{riderD?.platform || rider?.platform} · {riderD?.city || rider?.city}</p>
              </div>
              {!riderD?.is_new_user && (
                <div className="text-right">
                  <p className="text-xs text-gray-600 mb-1">Reliability Score</p>
                  <p className="font-display text-3xl font-bold text-brand-500">
                    {Number(riderD?.reliability_score || 0).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-600">
                    Returning · {riderD?.r_breakdown?.weeks_tracked || 0}w tracked
                  </p>
                </div>
              )}
            </div>

            {/* ── RETURNING USER: R BREAKDOWN ── */}
            <ReliabilityCard riderD={riderD} />

            {/* ── POLICY CARD ── */}
            <div className="card border-dark-600">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-brand-500" />
                  <span className="font-semibold">Your Coverage</span>
                </div>
                <StatusBadge status={policy?.status || "NOT_PURCHASED"} />
              </div>

              {hasPol ? (
                <>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Coverage</p>
                      <p className="font-display text-2xl font-bold text-white">{Number(policy.coverage_pct || 0).toFixed(0)}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Premium paid</p>
                      <p className="font-display text-2xl font-bold text-white">₹{policy.premium_paid}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Weekly cap</p>
                      <p className="font-display text-2xl font-bold text-brand-500">₹{policy.weekly_cap}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Cap used: ₹{Number(policy.total_paid_out || 0).toFixed(0)}</span>
                      <span>Remaining: ₹{Number(policy.remaining_cap || 0).toFixed(0)}</span>
                    </div>
                    <div className="h-2 bg-dark-600 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, policy.weekly_cap ? (Number(policy.total_paid_out) / Number(policy.weekly_cap)) * 100 : 0)}%` }} />
                    </div>
                  </div>

                  {policy.status === "PENDING" && (
                    <Countdown seconds={policy.activates_in_seconds} />
                  )}
                </>
              ) : (
                <div>
                  {quote && (
                    <div className="bg-dark-700 rounded-xl p-4 mb-4 space-y-3">
                      <p className="text-xs text-gray-500 uppercase tracking-widest">Your weekly quote</p>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <p className="text-xs text-gray-500">Coverage</p>
                          <p className="font-display text-2xl font-bold">{quote.coverage_pct}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Premium</p>
                          <p className="font-display text-2xl font-bold text-brand-500">₹{quote.premium}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Weekly cap</p>
                          <p className="font-display text-2xl font-bold">₹{quote.weekly_cap}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="w-2 h-2 rounded-full bg-dark-500" />
                        {quote.city} · Zone risk {Number(quote.zone_risk_multiplier || 1).toFixed(1)}x
                        {!riderD?.is_new_user && (
                          <span className="text-brand-400 ml-1">· R={Number(riderD?.reliability_score || 0).toFixed(2)} applied</span>
                        )}
                      </div>
                    </div>
                  )}
                  {buyMsg && (
                    <div className={`p-3 rounded-xl text-sm mb-3 border ${buyMsg.startsWith("✓") ? "bg-brand-500/10 border-brand-500/20 text-brand-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
                      {buyMsg}
                    </div>
                  )}
                  <button className="btn-primary flex items-center justify-center gap-2" onClick={handlePurchase} disabled={buying}>
                    {buying ? <RefreshCw size={18} className="animate-spin" /> : "Pay & Activate Coverage"}
                    {!buying && <ArrowRight size={16} />}
                  </button>
                  <p className="text-xs text-gray-600 mt-2 text-center">
                    Activates in 20 seconds (demo). Covers you for 7 days.
                  </p>
                </div>
              )}
            </div>

            {/* ── TRIGGER SIMULATOR ── */}
            <div className="card border-dark-600">
              <div className="flex items-center gap-2 mb-1">
                <Zap size={18} className="text-yellow-400" />
                <span className="font-semibold">Simulate a Disruption</span>
                <span className="badge bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 ml-auto">Demo</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Set the disruption type, real metric value, and time. Payout only fires if threshold is met <em>and</em> the time falls within your shift.
              </p>

              {/* Row 1: Zone + Type + Intensity */}
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Zone ID</label>
                  <input className="input-field" placeholder="e.g. 1"
                    value={triggerForm.zone_id}
                    onChange={e => setTriggerForm({ ...triggerForm, zone_id: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Disruption Type</label>
                  <select className="input-field" value={triggerForm.metric_label || METRIC_OPTIONS[0].label}
                    onChange={e => {
                      const opt = METRIC_OPTIONS.find(o => o.label === e.target.value)
                      setTriggerForm({ ...triggerForm, metric_label: e.target.value, metric_type: opt?.val || "WEATHER" })
                    }}>
                    {METRIC_OPTIONS.map(opt => <option key={opt.label}>{opt.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Intensity</label>
                  <select className="input-field" value={triggerForm.intensity_level}
                    onChange={e => setTriggerForm({ ...triggerForm, intensity_level: e.target.value })}>
                    {INTENSITIES.map(i => <option key={i}>{i}</option>)}
                  </select>
                </div>
              </div>

              {/* Row 2: Start + End time + dynamic metric field */}
              {(() => {
                const opt = METRIC_OPTIONS.find(o => o.label === (triggerForm.metric_label || METRIC_OPTIONS[0].label))
                const fields = opt?.fields || []
                return (
                  <div className="space-y-3 mb-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Disruption Start (IST)</label>
                        <input className="input-field" type="time"
                          value={triggerForm.trigger_time}
                          onChange={e => setTriggerForm({ ...triggerForm, trigger_time: e.target.value })} />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Disruption End (IST)</label>
                        <input className={`input-field ${
                          triggerForm.trigger_end_time <= triggerForm.trigger_time ? "border-red-500/60" : ""
                        }`} type="time"
                          value={triggerForm.trigger_end_time}
                          onChange={e => setTriggerForm({ ...triggerForm, trigger_end_time: e.target.value })} />
                        {triggerForm.trigger_end_time <= triggerForm.trigger_time && (
                          <p className="text-xs text-red-400 mt-1">⚠ End must be after start</p>
                        )}
                      </div>
                    </div>
                    {fields.length > 0 && (
                      <div className="grid grid-cols-1 gap-3">
                        {fields.map(f => {
                          const meta = FIELD_META[f]
                          const val = triggerForm[f]
                          const numVal = parseFloat(val)
                          const belowThreshold = val !== "" && !isNaN(numVal) && numVal < meta.min
                          return (
                            <div key={f}>
                              <label className="text-xs text-gray-500 mb-1 block">{meta.label}</label>
                              <div className="relative">
                                <input className={`input-field pr-16 ${
                                  belowThreshold ? "border-red-500/60 focus:border-red-500" : ""
                                }`}
                                  placeholder={meta.placeholder} type="number" value={val}
                                  onChange={e => setTriggerForm({ ...triggerForm, [f]: e.target.value })} />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{meta.unit}</span>
                              </div>
                              <p className={`text-xs mt-1 ${belowThreshold ? "text-red-400" : "text-gray-600"}`}>
                                {belowThreshold ? `⚠ Below threshold — ${meta.hint}` : meta.hint}
                              </p>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })()}

              <button className="btn-primary bg-yellow-500 hover:bg-yellow-400 text-black"
                onClick={handleTrigger} disabled={triggering || !triggerForm.zone_id}>
                {triggering ? "Firing trigger..." : "⚡ Fire Trigger"}
              </button>

              {triggerResult && (
                <div className={`mt-4 rounded-xl p-4 text-sm ${
                  triggerResult.error
                    ? "bg-red-500/10 border border-red-500/20 text-red-400"
                    : "bg-brand-500/10 border border-brand-500/20 text-brand-400"
                }`}>
                  {triggerResult.error ? (
                    <p>{triggerResult.error}</p>
                  ) : (
                    <div className="space-y-1">
                      <p className="font-semibold">✓ Trigger activated</p>
                      <p className="text-gray-400 text-xs font-mono">Event: {triggerResult.event_id}</p>
                      <p className="text-gray-400">Threshold: <span className="text-white">{triggerResult.threshold_check}</span></p>
                      <p className="text-gray-400">
                        Overlap: <span className="text-white">{triggerResult.overlap_hours}h</span>
                        &nbsp;·&nbsp;
                        Intervals: <span className="text-brand-400 font-semibold">{triggerResult.interval_count}</span> × 10s
                      </p>
                      <p className="text-gray-400">
                        Riders eligible: <span className="text-brand-400 font-semibold">{triggerResult.payouts_queued}</span>
                        {triggerResult.skipped_fraud > 0 && (
                          <span className="text-yellow-400 ml-2">· {triggerResult.skipped_fraud} outside shift</span>
                        )}
                      </p>
                      <div className="mt-2 pt-2 border-t border-dark-700/50 grid grid-cols-2 gap-2">
                        <div className="bg-dark-900/60 rounded-lg p-2">
                          <p className="text-xs text-gray-500">Est. payout (new rider)</p>
                          <p className="text-white font-semibold">₹{triggerResult.estimated_payout_new}</p>
                          <p className="text-xs text-gray-600">40% coverage</p>
                        </div>
                        <div className="bg-dark-900/60 rounded-lg p-2">
                          <p className="text-xs text-gray-500">Est. payout (top rider)</p>
                          <p className="text-brand-400 font-semibold">₹{triggerResult.estimated_payout_returning}</p>
                          <p className="text-xs text-gray-600">65% coverage</p>
                        </div>
                      </div>
                      <p className="text-yellow-400 text-xs mt-2">
                        ⏳ Paying every 10s · completes in ~{triggerResult.interval_count * 10}s
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── PAYOUT HISTORY ── */}
            <div className="card border-dark-600">
              <div className="flex items-center gap-2 mb-4">
                <IndianRupee size={18} className="text-brand-500" />
                <span className="font-semibold">Payout History</span>
                <span className="ml-auto text-xs text-gray-600">Total: ₹{riderD?.total_payouts_received?.toFixed(2)}</span>
              </div>

              {polling && (
                <p className="text-yellow-400 text-xs mb-3 animate-pulse">
                  ⏳ Paying out every 10s · {triggerResult?.interval_count || ""} intervals · watch payouts arrive below
                </p>
              )}
              {payouts.length === 0 ? (
                <p className="text-gray-600 text-sm text-center py-6">
                  No payouts yet. Fire a trigger above to test.
                </p>
              ) : (
                <div className="space-y-2">
                  {payouts.map((p) => (
                    <div key={p.payout_id}
                      className="flex items-center justify-between py-3 border-b border-dark-700 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-white">₹{parseFloat(p.amount).toFixed(2)}</p>
                        <p className="text-xs text-gray-600 font-mono">
                          {new Date(p.processed_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                        </p>
                      </div>
                      <span className={`badge ${p.status === "SUCCESS"
                        ? "bg-brand-500/20 text-brand-400 border border-brand-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
                        {p.status === "SUCCESS" && <CheckCircle size={10} />}
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </>
        )}
      </div>
    </div>
  )
}
