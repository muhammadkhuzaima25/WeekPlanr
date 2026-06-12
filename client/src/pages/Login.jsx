import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import { toast } from 'react-hot-toast'
import { GoogleLogin } from '@react-oauth/google'

export default function Login() {
  const navigate = useNavigate()
  const { login, googleLogin } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !import.meta.env.VITE_GOOGLE_CLIENT_ID) {
      console.warn('⚠️ WeekPlanr Alert: VITE_GOOGLE_CLIENT_ID environment variable is missing or undefined.');
    }
  }, [])

  const navigateAfterAuth = async () => {
    try {
      const subjectsRes = await api.get('/subjects')
      if (subjectsRes.data.length === 0) {
        navigate('/onboarding')
      } else {
        navigate('/weekly-plan')
      }
    } catch (err) {
      console.error('Error navigating after auth:', err.message)

      navigate('/weekly-plan')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    setSubmitting(true)
    try {
      await login(email, password)
      await navigateAfterAuth()
    } catch (err) {
      if (err.response?.status === 429) {
        toast.error(err.response?.data?.message || 'Too many attempts. Please wait 15 minutes.')
      } else if (err.response?.status === 401) {
        toast.error('Invalid email or password.')
      } else {
        toast.error(err.response?.data?.message || 'Login failed')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Sends credential token directly to backend context integration logic
      await googleLogin(credentialResponse.credential)
      await navigateAfterAuth()
    } catch (err) {
      console.error('Google login execution error:', err.response?.data)
      toast.error(err.response?.data?.message || 'Google login verification failed')
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'var(--bg-base)' }}
    >
      <div style={{ maxWidth: 400, width: '100%', padding: '0 24px' }}>
        <Link to="/" className="flex items-center justify-center gap-2.5 mb-8" style={{ textDecoration: 'none' }}>
          <div
            className="flex items-center justify-center rounded-lg"
            style={{
              width: 36, height: 36,
              background: 'linear-gradient(135deg, #00C98A, #00C98A)',
              boxShadow: '0 0 12px #00C98A50',
            }}
          >
            <span className="text-white font-bold text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>W</span>
          </div>
          <div className="flex items-baseline gap-0">
            <span className="font-bold text-xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--text-primary)' }}>Week</span>
            <span className="font-bold text-xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#00C98A' }}>Planr</span>
          </div>
        </Link>

        <h1 className="font-heading font-bold text-center text-2xl mb-1" style={{ color: 'var(--text-primary)' }}>
          Welcome back
        </h1>
        <p className="text-center mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'var(--text-secondary)' }}>
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, color: 'var(--text-muted)' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@university.edu"
              required
              className="w-full rounded-lg px-4 py-3 text-sm transition-all duration-200"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, color: 'var(--text-muted)' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              required minLength={6}
              className="w-full rounded-lg px-4 py-3 text-sm transition-all duration-200"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                outline: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full text-white font-bold transition-all duration-200 rounded-lg py-3 mt-2"
            style={{
              background: submitting ? '#00A370' : 'linear-gradient(135deg, #00C98A, #00C98A)',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              border: 'none',
              cursor: submitting ? 'not-allowed' : 'pointer',
            }}
          >
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--border)' }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-muted)' }}>or</span>
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--border)' }} />
        </div>

        <div className="w-full flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error('Google login failed')}
            theme="outline"
            size="large"
            width="352px"
            shape="rectangular"
          />
        </div>

        <p className="text-center mt-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#00C98A', textDecoration: 'none', fontWeight: 600 }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
