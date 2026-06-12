import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Calendar, Plus, Radar, Settings, LogOut } from 'lucide-react'

const navItems = [
  { icon: Calendar, label: 'Weekly Plan', path: '/weekly-plan' },
  { icon: Plus, label: 'Add Task', path: '/add-task' },
  { icon: Radar, label: 'Deadline Radar', path: '/deadline-radar' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside style={{
      width: 240, flexShrink: 0,
      background: 'var(--bg-surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid var(--border)' }}>
        <Link to="/weekly-plan" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
          <img src="/WeekPlanr.svg" alt="WeekPlanr" style={{ width: 34, height: 34 }} />
          <div>
            <div className="font-heading font-bold" style={{ fontSize: 17, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              Week<span style={{ color: '#00C98A' }}>Planr</span>
            </div>
          </div>
        </Link>
      </div>

      <nav style={{ flex: 1, padding: '16px 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link key={item.label} to={item.path} style={{
              display: 'flex', alignItems: 'center', gap: 11,
              padding: '10px 14px', borderRadius: 10,
              textDecoration: 'none',
              fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14,
              background: isActive ? 'rgba(0,201,138,0.08)' : 'transparent',
              color: isActive ? '#00C98A' : 'var(--text-secondary)',
              borderLeft: isActive ? '2px solid #00C98A' : '2px solid transparent',
            }}
              onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = 'rgba(0,201,138,0.04)'; e.currentTarget.style.color = 'var(--text-primary)' } }}
              onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)' } }}
            >
              <Icon size={18} strokeWidth={1.5} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div style={{ padding: '14px 16px 18px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: 'linear-gradient(135deg, #00C98A, #00A370)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13,
          color: '#0A0A0A', flexShrink: 0,
        }}>
          {user?.name?.[0] || 'U'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 12, color: 'var(--text-primary)' }}>
            {user?.name || 'User'}
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 10, color: 'var(--text-muted)' }}>
            {user?.university || 'Student'}
          </div>
        </div>
        <button onClick={handleLogout} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: 'var(--text-muted)', padding: 6, borderRadius: 8,
        }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#FF4D4D'; e.currentTarget.style.background = 'rgba(255,77,77,0.1)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent' }}
        >
          <LogOut size={15} strokeWidth={1.5} />
        </button>
      </div>
    </aside>
  )
}
