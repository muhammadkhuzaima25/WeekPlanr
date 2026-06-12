import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.get('/api/auth/me')
        .then(res => setUser(res.data.user))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const res = await api.post('/api/auth/login', { email, password })
    localStorage.setItem('token', res.data.token)
    setUser(res.data.user)
    return res.data
  }

  const googleLogin = async (credential) => {
    // Fixed: Proper single /api prefix
    const res = await api.post('/api/auth/google', { credential })
    localStorage.setItem('token', res.data.token)
    setUser(res.data.user)
    return res.data
  }

  const register = async (name, email, password, university) => {
    const res = await api.post('/api/auth/register', { name, email, password, university })
    localStorage.setItem('token', res.data.token)
    setUser(res.data.user)
    return res.data
  }

  const refreshUser = async () => {
    try {
      const res = await api.get('/api/auth/me')
      setUser(res.data.user)
    } catch {
      logout()
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, googleLogin, register, logout, refreshUser }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
