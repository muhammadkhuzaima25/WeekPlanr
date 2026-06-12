import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const { isDark, setIsDark } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const isLanding = location.pathname === '/'
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/#features' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'FAQ', href: '/#faq' },
  ]

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ height: 64, padding: '0 max(24px, 5vw)' }}
      >
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src="/WeekPlanr.svg" alt="WeekPlanr" style={{ width: 36, height: 36 }} />
          <div className="flex items-baseline gap-0">
            <span
              className="text-lg font-bold"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em',
              }}
            >
              Week
            </span>
            <span
              className="text-lg font-bold"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: '#00C98A',
                letterSpacing: '-0.01em',
              }}
            >
              Planr
            </span>
          </div>
        </Link>

        {/* Center: Nav Links (desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href
            return (
              <a
                key={link.label}
                href={link.href}
                className="relative text-sm font-medium transition-colors duration-150"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 15,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                }}
                onMouseEnter={(e) => { if (!isActive) e.target.style.color = 'var(--text-primary)' }}
                onMouseLeave={(e) => { if (!isActive) e.target.style.color = 'var(--text-secondary)' }}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: '#00C98A' }}
                  />
                )}
              </a>
            )
          })}
        </div>

        {/* Right: Buttons */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              cursor: 'pointer',
              transition: 'border-color 200ms ease',
              color: 'var(--text-secondary)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00C98A'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
              </svg>
            )}
          </button>

          {/* Login */}
          <Link
            to="/login"
            className="hidden sm:inline-flex items-center justify-center text-sm font-medium transition-colors duration-150"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 14,
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
              padding: '8px 18px',
              borderRadius: 8,
              background: 'transparent',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#00C98A'
              e.currentTarget.style.color = 'var(--text-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
          >
            Login
          </Link>

          {/* Start Free */}
          <Link
            to="/signup"
            className="hidden sm:inline-flex items-center justify-center text-sm font-semibold text-white transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #00C98A, #00C98A)',
              padding: '10px 22px',
              borderRadius: 8,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              border: 'none',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'brightness(1.1)'
              e.currentTarget.style.boxShadow = '0 0 20px #00C98A50'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'brightness(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Start Free →
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              color: 'var(--text-secondary)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileOpen ? <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></> : <><path d="M4 12h16"/><path d="M4 6h16"/><path d="M4 18h16"/></>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            background: 'var(--bg-surface)',
            borderTop: '1px solid var(--border)',
            padding: '12px max(24px, 5vw)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-2 text-sm"
              style={{
                color: 'var(--text-secondary)',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
            <Link
              to="/login"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                color: 'var(--text-secondary)',
                border: '1px solid var(--border)',
                padding: '8px 18px',
                borderRadius: 8,
                background: 'transparent',
                textDecoration: 'none',
              }}
            >
              Login
            </Link>
            <Link
              to="/signup"
              style={{
                background: 'linear-gradient(135deg, #00C98A, #00C98A)',
                color: 'white',
                padding: '8px 18px',
                borderRadius: 8,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                border: 'none',
                textDecoration: 'none',
              }}
            >
              Start Free →
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

