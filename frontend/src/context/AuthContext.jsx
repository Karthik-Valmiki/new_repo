import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [rider, setRider] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem("vero_rider")
    if (saved) setRider(JSON.parse(saved))
  }, [])

  const saveRider = (data) => {
    localStorage.setItem("vero_token", data.access_token)
    localStorage.setItem("vero_rider", JSON.stringify(data))
    setRider(data)
  }

  const logout = () => {
    localStorage.removeItem("vero_token")
    localStorage.removeItem("vero_rider")
    setRider(null)
  }

  return (
    <AuthContext.Provider value={{ rider, saveRider, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
