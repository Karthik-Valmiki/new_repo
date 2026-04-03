import { useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { Shield, CloudRain, Wifi, AlertTriangle, IndianRupee, ArrowRight, Check } from "lucide-react"

// ── Typewriter hook ──────────────────────────────────────────────────────────
const PHRASES = [
  "you still get paid.",
  "VERO covers you.",
  "money hits your UPI.",
  "no forms. no waiting.",
]

function useTypewriter(phrases, speed = 60, pause = 1800) {
  const [display, setDisplay]   = useState("")
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIdx]
    let timeout

    if (!deleting && display === current) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && display === "") {
      setDeleting(false)
      setPhraseIdx(i => (i + 1) % phrases.length)
    } else {
      timeout = setTimeout(() => {
        setDisplay(prev =>
          deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        )
      }, deleting ? speed / 2 : speed)
    }
    return () => clearTimeout(timeout)
  }, [display, deleting, phraseIdx, phrases, speed, pause])

  return display
}

// ── Data ─────────────────────────────────────────────────────────────────────
const TRIGGERS = [
  {
    icon: CloudRain,
    label: "Rain & Hailstorm",
    desc: "Roads turn dangerous. Orders dry up. You lose 3–4 hours of your best earning time.",
    color: "text-brand-400",
    bg: "bg-dark-800 border border-brand-500/20 group-hover:bg-brand-500/10",
  },
  {
    icon: AlertTriangle,
    label: "Toxic Air (AQI)",
    desc: "Delhi in November. Every breath hurts. Your delivery speed drops by half.",
    color: "text-cyan-400",
    bg: "bg-dark-800 border border-cyan-500/20 group-hover:bg-cyan-500/10",
  },
  {
    icon: Wifi,
    label: "App Goes Down",
    desc: "Swiggy or Zomato crashes at 8pm Friday. You sit outside a restaurant earning zero.",
    color: "text-indigo-400",
    bg: "bg-dark-800 border border-indigo-500/20 group-hover:bg-indigo-500/10",
  },
  {
    icon: Shield,
    label: "Bandh & Shutdowns",
    desc: "Announced the night before. Every restaurant shuts. The whole day is gone.",
    color: "text-rose-400",
    bg: "bg-dark-800 border border-rose-500/20 group-hover:bg-rose-500/10",
  },
]

const STEPS = [
  { n: "01", title: "Sign up in 2 minutes",     desc: "Phone OTP. Pick your city. That's it." },
  { n: "02", title: "Pay ₹50–90 for the week",  desc: "Based on your city's risk. Less than a meal." },
  { n: "03", title: "Ride like normal",          desc: "We watch for disruptions around the clock. You do nothing." },
  { n: "04", title: "Money lands in your UPI",   desc: "Disruption confirmed → payout starts. No claim. No call. No wait." },
]

const WHAT_YOU_GET = [
  "Payout every 30 minutes while disruption lasts",
  "Straight to your UPI — no bank forms",
  "Covers rain, AQI, app outages, bandhs",
  "No claim to file. Ever.",
  "Weekly plan — cancel anytime",
  "Works on Zomato and Swiggy",
]

// ── Component ─────────────────────────────────────────────────────────────────
export default function Landing() {
  const navigate = useNavigate()
  const typed    = useTypewriter(PHRASES)
  const heroRef  = useRef(null)

  // Intersection observer for scroll-reveal
  useEffect(() => {
    const els = document.querySelectorAll(".reveal")
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("revealed") }),
      { threshold: 0.12 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-dark-900 text-white overflow-x-hidden relative">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-4
                      border-b border-dark-700/50 bg-dark-900/80 backdrop-blur-md">
        <span className="font-display text-2xl font-black tracking-tight flex items-center gap-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          VERO
        </span>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate("/login")}
            className="px-5 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors rounded-lg">
            Login
          </button>
          <button onClick={() => navigate("/register")}
            className="flex items-center gap-1.5 px-5 py-2 text-sm font-semibold
                       bg-brand-500 hover:bg-brand-600 text-white rounded-xl
                       transition-all active:scale-95 shadow-md shadow-brand-500/20">
            Get Covered <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="pt-40 pb-28 px-6 text-center max-w-5xl mx-auto">

        {/* pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                        border border-brand-500/25 bg-brand-500/10 text-brand-400
                        text-xs font-semibold mb-10 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse-slow" />
          For Zomato &amp; Swiggy riders across India
        </div>

        {/* headline */}
        <div className="relative inline-block mb-6">
          <div className="absolute -inset-1 blur-2xl bg-gradient-to-r from-brand-600 to-cyan-600 opacity-20 rounded-full"></div>
          <h1 className="relative font-display text-5xl md:text-[4.5rem] lg:text-[5.5rem]
                         font-bold leading-[1.08] tracking-tight animate-fade-up">
            Bad day on the road?
            <br />
            <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">{typed}</span>
            <span className="inline-block w-0.5 h-[0.9em] bg-brand-500 ml-1 align-middle animate-pulse" />
          </h1>
        </div>

        {/* subtext */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed
                      animate-fade-up" style={{ animationDelay: "0.15s" }}>
          VERO watches for rain, app crashes, AQI spikes, and bandhs —
          and sends money straight to your UPI the moment your earnings are hit.
          <span className="text-white"> No forms. No calls. Nothing to do.</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10
                        animate-fade-up" style={{ animationDelay: "0.25s" }}>
          <button onClick={() => navigate("/register")}
            className="group flex items-center justify-center gap-2
                       px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white
                       font-medium rounded-xl text-base transition-all active:scale-[0.98]
                       shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]">
            Start for ₹50 this week
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={() => navigate("/login")}
            className="px-8 py-4 border border-dark-600 bg-dark-800/50 hover:bg-dark-700
                       text-gray-300 hover:text-white font-medium rounded-xl backdrop-blur-sm
                       text-base transition-all">
            Already a member? Login
          </button>
        </div>

        {/* trust bar */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3
                        text-sm text-gray-600 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          {["Live in 10 cities", "Zomato & Swiggy", "UPI instant payout", "No claim form ever"].map((t, i) => (
            <span key={t} className="flex items-center gap-2">
              {i > 0 && <span className="hidden sm:inline text-dark-500">·</span>}
              {i === 0 && <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse-slow" />}
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ── WHAT HAPPENS WITHOUT VERO ── */}
      <section className="py-6 px-6">
        <div className="max-w-3xl mx-auto bg-dark-800 border border-dark-600 rounded-2xl p-8 reveal opacity-0
                        translate-y-6 transition-all duration-700">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-4">The reality right now</p>
          <div className="space-y-3 text-gray-400 text-base leading-relaxed">
            <p>You're outside a restaurant at 8pm. Swiggy is down. No orders coming.</p>
            <p>You wait 70 minutes. The app comes back. Your best earning window is gone.</p>
            <p className="text-white font-medium">
              No one compensates you. No platform. No government. No insurance.
              <span className="text-brand-500"> Until now.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT WE COVER ── */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-14 reveal opacity-0 translate-y-6 transition-all duration-700">
          <p className="text-xs font-semibold text-brand-500 uppercase tracking-widest mb-3">What we cover</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            4 things that wipe out your day.
          </h2>
          <p className="text-gray-500 mt-3 text-lg">We cover all of them. Automatically.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TRIGGERS.map(({ icon: Icon, label, desc, color, bg }, i) => (
            <div key={label}
              className="card group hover:border-dark-500 transition-all duration-300 reveal opacity-0 translate-y-6"
              style={{ transitionDelay: `${i * 80}ms` }}>
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-4 transition-colors`}>
                <Icon size={18} className={color} />
              </div>
              <p className="font-semibold text-white mb-2">{label}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-14 reveal opacity-0 translate-y-6 transition-all duration-700">
          <p className="text-xs font-semibold text-brand-500 uppercase tracking-widest mb-3">How it works</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Simpler than ordering food.
          </h2>
        </div>

        <div className="space-y-3">
          {STEPS.map(({ n, title, desc }, i) => (
            <div key={n}
              className="flex items-start gap-5 card hover:border-dark-500 transition-all duration-300
                         reveal opacity-0 translate-y-6"
              style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="font-display text-4xl font-bold text-dark-500 shrink-0 leading-none mt-1">{n}</span>
              <div>
                <p className="font-semibold text-white text-lg mb-1">{title}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LIVE PAYOUT EXAMPLE ── */}
      <section className="py-10 px-6">
        <div className="max-w-2xl mx-auto reveal opacity-0 translate-y-6 transition-all duration-700">
            <div className="card border border-dark-600 bg-gradient-to-br from-dark-800/90 to-dark-900/90 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-brand-500/20 blur-3xl rounded-full pointer-events-none"></div>
              <div className="flex items-center gap-3 mb-5 border-b border-dark-700/50 pb-4">
                <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center">
                  <IndianRupee size={14} className="text-brand-400" />
                </div>
              <div>
                <p className="text-sm font-semibold text-white">Real example</p>
                <p className="text-xs text-gray-600">Ravi · Mumbai · Swiggy · Friday 8pm</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Swiggy goes down for 70 minutes during dinner peak. Ravi sits outside a restaurant earning nothing.
            </p>

            <div className="space-y-3 font-mono text-sm">
              {[
                { t: "8:00 PM", e: "Outage detected by third-party monitor",   hi: false },
                { t: "8:47 PM", e: "45-min threshold crossed — trigger fires",  hi: true  },
                { t: "8:47 PM", e: "₹27 → Ravi's UPI  (interval 1)",           hi: true  },
                { t: "9:17 PM", e: "₹27 → Ravi's UPI  (interval 2)",           hi: true  },
                { t: "9:10 PM", e: "App restored. Event closed.",               hi: false },
              ].map(({ t, e, hi }) => (
                <div key={t + e} className="flex items-start gap-4">
                  <span className="text-dark-400 w-16 shrink-0">{t}</span>
                  <span className={hi ? "text-brand-400 font-medium" : "text-gray-600"}>{e}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-dark-600 flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Ravi received</p>
                <p className="text-xs text-gray-700 mt-0.5">No claim filed. No support ticket.</p>
              </div>
              <span className="font-display text-3xl font-bold text-brand-500">₹54</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-12 reveal opacity-0 translate-y-6 transition-all duration-700">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Everything included. Nothing hidden.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 reveal opacity-0 translate-y-6 transition-all duration-700">
          {WHAT_YOU_GET.map(item => (
            <div key={item} className="flex items-center gap-3 bg-dark-800/50 backdrop-blur-sm border border-dark-600/50 hover:bg-dark-700/60 transition-colors rounded-xl px-4 py-3">
              <div className="w-5 h-5 rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center shrink-0">
                <Check size={11} className="text-brand-400" />
              </div>
              <span className="text-sm text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-28 px-6 text-center reveal opacity-0 translate-y-6 transition-all duration-700">
        <p className="text-xs font-semibold text-brand-500 uppercase tracking-widest mb-4">Start today</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Your next bad day<br />
          <span className="text-brand-500">is already covered.</span>
        </h2>
        <p className="text-gray-500 mb-10 text-lg max-w-md mx-auto">
          Takes 2 minutes to sign up. Costs less than a chai. Works from day one.
        </p>
        <button onClick={() => navigate("/register")}
          className="group inline-flex items-center gap-2 px-10 py-4
                     bg-brand-600 hover:bg-brand-500 text-white font-medium
                     rounded-xl text-base transition-all active:scale-[0.98]
                     shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]">
          Get covered now
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-dark-700 py-8 px-6 flex flex-col sm:flex-row
                         items-center justify-between gap-3 text-gray-700 text-sm max-w-5xl mx-auto">
        <span className="font-display font-black text-white text-lg flex items-center gap-1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          VERO
        </span>
        <span>Parametric income protection for India's delivery workers</span>
        <span>DEVTrails 2026</span>
      </footer>

      {/* scroll-reveal styles */}
      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .revealed { opacity: 1 !important; transform: translateY(0) !important; }
      `}</style>
    </div>
  )
}
