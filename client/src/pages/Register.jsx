import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-hot-toast'
import { useGoogleLogin } from '@react-oauth/google'

export default function Register() {
  const navigate = useNavigate()
  const { googleLogin, register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [university, setUniversity] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleCustomGoogleSuccess = async (tokenResponse) => {
    try {
      await googleLogin(tokenResponse.access_token)
      navigate('/onboarding')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Google signup failed')
    }
  }

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleCustomGoogleSuccess,
    onError: () => toast.error('Google signup failed'),
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    setSubmitting(true)
    try {
      await register(name, email, password, university)
      navigate('/onboarding')
    } catch (err) {
      if (err.response?.status === 429) {
        toast.error(err.response?.data?.message || 'Too many accounts. Please try after 1 hour.')
      } else {
        toast.error(err.response?.data?.message || err.message || 'Registration failed')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
      <div style={{ maxWidth: 400, width: '100%', padding: '0 24px' }}>
        <Link to="/" className="flex items-center justify-center gap-2.5 mb-8" style={{ textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: 'linear-gradient(135deg, #00C98A, #00C98A)',
            boxShadow: '0 0 12px #00C98A50',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span className="text-white font-bold text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>W</span>
          </div>
          <div className="flex items-baseline gap-0">
            <span className="font-bold text-xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--text-primary)' }}>Week</span>
            <span className="font-bold text-xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#00C98A' }}>Planr</span>
          </div>
        </Link>

        <h1 className="font-heading font-bold text-center text-2xl mb-1" style={{ color: 'var(--text-primary)' }}>
          Create your account
        </h1>
        <p className="text-center mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'var(--text-secondary)' }}>
          Start planning your semester
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, color: 'var(--text-muted)' }}>
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Khuzaima"
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
              University
            </label>
            <input
              type="text"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              placeholder="FAST Lahore, NUST, UET..."
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
              required
              minLength={6}
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
            {submitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--border)' }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-muted)' }}>or</span>
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--border)' }} />
        </div>

        <button
          type="button"
          onClick={() => loginWithGoogle()}
          className="w-full flex items-center justify-center gap-2.5 transition-all duration-200 rounded-lg py-2.5"
          style={{
            background: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3A11.945 11.945 0 0 0 12 .909A11.945 11.945 0 0 0 2.182 6.023l3.084 3.742z"
            />
            <path
              fill="#4285F4"
              d="M23.455 12.273c0-.818-.068-1.609-.205-2.364H12v4.51h6.42a5.57 5.57 0 0 1-2.409 3.659l3.716 2.88a11.758 11.758 0 0 0 3.728-8.685z"
            />
            <path
              fill="#FBBC05"
              d="M5.266 14.235L2.182 17.977A11.945 11.945 0 0 0 12 23.091c3.255 0 6.014-1.064 8.018-2.909l-3.716-2.88a7.11 7.11 0 0 1-4.302 1.218c-3.155 0-5.836-2.127-6.734-5.285z"
            />
            <path
              fill="#34A853"
              d="M5.266 9.765c-.236.705-.373 1.464-.373 2.235s.136 1.53.373 2.235l-3.084 3.742A11.977 11.977 0 0 1 1.09 12c0-1.464.264-2.873.746-4.182l3.43 1.947z"
            />
          </svg>
          <span>Sign in with Google</span>
        </button>

        <p className="text-center mt-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#00C98A', textDecoration: 'none', fontWeight: 600 }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
