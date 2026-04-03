import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { sendOtp, verifyOtp, register } from "../api"
import { ArrowLeft, Phone, ShieldCheck, User } from "lucide-react"

const CITIES = ["Bengaluru","Chennai","Mumbai","Delhi","Gurgaon","Hyderabad","Vizag","Pune","Kolkata","Ahmedabad"]
const PLATFORMS = ["Zomato","Swiggy"]

const STEP_LABELS = ["Phone", "Verify OTP", "Your Details"]

export default function Register() {
  const { saveRider } = useAuth()
  const navigate = useNavigate()

  const [step, setStep]     = useState(0)   // 0=phone, 1=otp, 2=form
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState("")
  const [otpDisplay, setOtpDisplay] = useState("")  // demo: show otp

  const [phone, setPhone]   = useState("")
  const [otp, setOtp]       = useState("")
  const [form, setForm]     = useState({
    name: "", password: "", platform: "Zomato",
    city: "Mumbai", shift_start: "09:00", shift_end: "21:00", upi_id: "",
  })

  const err = (msg) => { setError(msg); setLoading(false) }

  // STEP 0 — send OTP
  const handleSendOtp = async () => {
    if (!/^\+91\d{10}$/.test(phone)) return err("Enter a valid number like +919876543210")
    setLoading(true); setError("")
    try {
      const res = await sendOtp(phone)
      setOtpDisplay(res.data.otp_code)   // demo only
      setStep(1)
    } catch (e) { err(e.response?.data?.detail || "Failed to send OTP") }
    setLoading(false)
  }

  // STEP 1 — verify OTP
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return err("Enter the 6-digit OTP")
    setLoading(true); setError("")
    try {
      await verifyOtp(phone, otp)
      setStep(2)
    } catch (e) { err(e.response?.data?.detail || "Invalid OTP") }
    setLoading(false)
  }

  // STEP 2 — register
  const handleRegister = async () => {
    if (!form.name || !form.password || !form.upi_id) return err("Fill all fields")
    if (form.password.length < 8) return err("Password must be at least 8 characters")
    setLoading(true); setError("")
    try {
      const res = await register({ ...form, phone_number: phone, otp_code: otp })
      saveRider(res.data)
      navigate("/dashboard")
    } catch (e) { err(e.response?.data?.detail || "Registration failed") }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white flex flex-col items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* back */}
      <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-white text-sm mb-8 self-start max-w-md w-full mx-auto transition-colors relative z-10">
        <ArrowLeft size={14} /> Back
      </Link>

      <div className="w-full max-w-lg relative z-10">
        {/* header */}
        <div className="text-center mb-8">
          <span className="font-display text-4xl font-black tracking-tight inline-flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            VERO
          </span>
          <h1 className="text-2xl font-bold mt-4 mb-1">Create your account</h1>
          <p className="text-gray-500 text-sm">Get covered in under 2 minutes.</p>
        </div>

        {/* step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors
                ${i < step ? "bg-brand-500 text-black" : i === step ? "bg-brand-500 text-black" : "bg-dark-600 text-gray-500"}`}>
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`text-xs ${i === step ? "text-white" : "text-gray-600"}`}>{label}</span>
              {i < 2 && <div className={`flex-1 h-px w-6 ${i < step ? "bg-brand-500" : "bg-dark-600"}`} />}
            </div>
          ))}
        </div>

        <div className="card space-y-4 animate-fade-up">

          {/* ── STEP 0: Phone ── */}
          {step === 0 && (
            <>
              <div className="flex items-center gap-3 mb-2">
                <Phone size={18} className="text-brand-500" />
                <p className="font-semibold">Enter your phone number</p>
              </div>
              <input className="input-field" placeholder="+919876543210"
                value={phone} onChange={e => setPhone(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSendOtp()} />
              <p className="text-xs text-gray-600">We'll send a 6-digit OTP to verify it's you.</p>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button className="btn-primary" onClick={handleSendOtp} disabled={loading}>
                {loading ? "Sending..." : "Send OTP →"}
              </button>
            </>
          )}

          {/* ── STEP 1: OTP ── */}
          {step === 1 && (
            <>
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck size={18} className="text-brand-500" />
                <p className="font-semibold">Enter OTP</p>
              </div>
              {otpDisplay && (
                <div className="bg-brand-500/10 border border-brand-500/30 rounded-xl px-4 py-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">Demo OTP (shown here only)</p>
                  <p className="font-display text-3xl font-bold text-brand-400 tracking-widest">{otpDisplay}</p>
                </div>
              )}
              <input className="input-field text-center text-2xl tracking-widest" placeholder="------"
                maxLength={6} value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ""))}
                onKeyDown={e => e.key === "Enter" && handleVerifyOtp()} />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button className="btn-primary" onClick={handleVerifyOtp} disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP →"}
              </button>
              <button className="btn-ghost text-sm" onClick={() => { setStep(0); setError("") }}>
                ← Change number
              </button>
            </>
          )}

          {/* ── STEP 2: Form ── */}
          {step === 2 && (
            <>
              <div className="flex items-center gap-3 mb-2">
                <User size={18} className="text-brand-500" />
                <p className="font-semibold">Your details</p>
              </div>

              <input className="input-field" placeholder="Full name"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />

              <input className="input-field" placeholder="Password (min 8 chars)" type="password"
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />

              <input className="input-field" placeholder="UPI ID  e.g. 9876543210@upi"
                value={form.upi_id} onChange={e => setForm({ ...form, upi_id: e.target.value })} />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Platform</label>
                  <select className="input-field" value={form.platform}
                    onChange={e => setForm({ ...form, platform: e.target.value })}>
                    {PLATFORMS.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">City</label>
                  <select className="input-field" value={form.city}
                    onChange={e => setForm({ ...form, city: e.target.value })}>
                    {CITIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Shift start</label>
                  <input className="input-field" type="time" value={form.shift_start}
                    onChange={e => setForm({ ...form, shift_start: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Shift end</label>
                  <input className="input-field" type="time" value={form.shift_end}
                    onChange={e => setForm({ ...form, shift_end: e.target.value })} />
                </div>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button className="btn-primary" onClick={handleRegister} disabled={loading}>
                {loading ? "Creating account..." : "Create account →"}
              </button>
            </>
          )}
        </div>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-brand-500 hover:text-brand-400 font-medium">Login</Link>
        </p>
      </div>
    </div>
  )
}
