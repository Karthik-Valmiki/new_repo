import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { login } from "../api"

export default function Login() {
  const { saveRider } = useAuth()
  const navigate = useNavigate()
  const [form, setForm]     = useState({ phone_number: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState("")
  const [gpsPhase, setGpsPhase] = useState(false)

  const handleLogin = async () => {
    const phone = form.phone_number.trim()
    if (!phone.startsWith("+91") || phone.length !== 13 || !/^\+91\d{10}$/.test(phone)) {
      return setError("Phone must be +91 followed by 10 digits (e.g. +919876543210)")
    }
    if (!form.password) return setError("Enter your password")
    setLoading(true); setError("")
    setGpsPhase(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setGpsPhase(false)
    try {
      const res = await login(form)
      saveRider(res.data)
      navigate("/dashboard")
    } catch (e) {
      setError(e.response?.data?.detail || "Login failed")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <span className="font-display text-4xl font-black tracking-tight inline-flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            VERO
          </span>
          <h1 className="text-2xl font-bold mt-4 mb-1">Welcome back</h1>
          <p className="text-gray-500 text-sm">Login to check your coverage and payouts.</p>
        </div>

        <div className="card space-y-4 animate-fade-up">
          <div className="relative">
            <input className="input-field" placeholder="+919876543210"
              value={form.phone_number}
              onChange={e => {
                let v = e.target.value
                if (!v.startsWith("+91")) v = "+91" + v.replace(/^\+91/, "")
                setForm({ ...form, phone_number: v.slice(0, 13) })
              }} />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-600">
              {form.phone_number.length}/13
            </span>
          </div>

          <input className="input-field" placeholder="Password" type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            onKeyDown={e => e.key === "Enter" && handleLogin()} />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary mt-4 py-4" onClick={handleLogin}>
            {loading ? (gpsPhase ? "Verifying GPS Subsystem..." : "Authenticating...") : "Access Dashboard"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            New here? <Link to="/register" className="text-brand-500 font-semibold hover:text-brand-400">Join VERO</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
