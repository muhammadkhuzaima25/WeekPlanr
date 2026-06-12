import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer
      className="flex flex-wrap items-center justify-between gap-4"
      style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border)',
        padding: '40px max(24px, 8vw)',
      }}
    >
      {/* Left: Logo + tagline */}
      <div>
        <div className="flex items-center gap-2.5 mb-2">
          <img src="/WeekPlanr.svg" alt="WeekPlanr" style={{ width: 32, height: 32 }} />
          <div className="flex items-baseline gap-0">
            <span
              className="font-bold"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 18,
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em',
              }}
            >
              Week
            </span>
            <span
              className="font-bold"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 18,
                color: '#00C98A',
                letterSpacing: '-0.01em',
              }}
            >
              Planr
            </span>
          </div>
        </div>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: 'var(--text-muted)',
            maxWidth: 260,
          }}
        >
          Your AI Weekly Study Planner for Stressful Semesters
        </p>
        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '16px 0' }} />
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>
          © 2026 WeekPlanr. All rights reserved.
        </p>
      </div>

      {/* Center: Links */}
      <div className="flex items-center gap-6 flex-wrap">
          {['Features', 'How It Works', 'Login', 'Register'].map((link) => (
            <a
              key={link}
              href={link === 'Features' ? '/#features' : link === 'How It Works' ? '/#how-it-works' : link === 'Login' ? '/login' : '/signup'}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 14,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              transition: 'color 150ms ease',
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
          >
            {link}
          </a>
        ))}
      </div>

      {/* Right: Social Icons + Copyright */}
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-4">
          <a href="https://www.linkedin.com/in/muhammad-khuzaima-991a08313" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--text-muted)', transition: 'color 150ms ease', display: 'flex' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#0A66C2'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://github.com/muhammadkhuzaima25" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--text-muted)', transition: 'color 150ms ease', display: 'flex' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

