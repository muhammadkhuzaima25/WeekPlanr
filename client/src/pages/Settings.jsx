import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import { toast } from 'react-hot-toast'
import Sidebar from '../components/Sidebar'
import LoadingSpinner from '../components/LoadingSpinner'
import { Settings as SettingsIcon, User, Trash2 } from 'lucide-react'

export default function Settings() {
  const navigate = useNavigate()
  const { user, logout, refreshUser } = useAuth()
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState(user?.name || '')
  const [university, setUniversity] = useState(user?.university || '')
  const [subjects, setSubjects] = useState([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    Promise.all([
      api.get('/auth/me'),
      api.get('/subjects'),
    ]).then(([meRes, subjRes]) => {
      const u = meRes.data.user
      setName(u.name)
      setUniversity(u.university || '')
      setSubjects(subjRes.data || [])
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.put('/auth/update', { name, university })
      await refreshUser()
      toast.success('Profile updated!')
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteSubject = async (id) => {
    try {
      await api.delete(`/subjects/${id}`)
      setSubjects(subjects.filter(s => s._id !== id))
      toast.success('Subject removed')
    } catch {
      toast.error('Failed to remove subject')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (loading) return <div className="flex items-center justify-center h-screen"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div style={{ height: '100vh', overflow: 'hidden', display: 'flex', background: 'var(--bg-deep)' }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: 'auto' }}>
        <header style={{
          padding: '24px 32px 20px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg-surface)', backdropFilter: 'blur(12px)',
          position: 'sticky', top: 0, zIndex: 10,
        }}>
          <h1 className="font-heading font-bold" style={{ fontSize: 22, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <SettingsIcon size={20} strokeWidth={1.5} style={{ color: '#00C98A' }} />
            Settings
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
            Manage your account and preferences
          </p>
        </header>

        <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 600 }}>
          {/* Profile Section */}
          <div className="rounded-xl p-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-3 mb-5">
              <User size={18} strokeWidth={1.5} style={{ color: '#00C98A' }} />
              <h2 className="font-heading font-semibold" style={{ fontSize: 16, color: 'var(--text-primary)' }}>Profile</h2>
            </div>
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div>
                <label className="block mb-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, color: 'var(--text-muted)' }}>Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 10, background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif", fontSize: 14, outline: 'none' }} />
              </div>
              <div>
                <label className="block mb-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, color: 'var(--text-muted)' }}>University</label>
                <input type="text" value={university} onChange={(e) => setUniversity(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 10, background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif", fontSize: 14, outline: 'none' }} />
              </div>
              <div>
                <label className="block mb-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, color: 'var(--text-muted)' }}>Email</label>
                <input type="email" value={user?.email || ''} disabled
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 10, background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif", fontSize: 14, outline: 'none', opacity: 0.6, cursor: 'not-allowed' }} />
              </div>
              <button type="submit" disabled={saving}
                style={{ padding: '12px', borderRadius: 10, border: 'none', cursor: saving ? 'not-allowed' : 'pointer', background: saving ? 'var(--accent-soft)' : '#00C98A', color: '#0A0A0A', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14 }}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Subjects Section */}
          <div className="rounded-xl p-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <h2 className="font-heading font-semibold" style={{ fontSize: 16, color: 'var(--text-primary)', marginBottom: 12 }}>Your Subjects</h2>
            {subjects.length === 0 ? (
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-muted)' }}>No subjects added yet.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {subjects.map((s) => (
                  <div key={s._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 10, background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, color: 'var(--text-primary)' }}>{s.name}</span>
                    <button onClick={() => handleDeleteSubject(s._id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#FF4D4D', padding: 4, borderRadius: 6 }}>
                      <Trash2 size={15} strokeWidth={1.5} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Logout */}
          <button onClick={handleLogout} style={{
            padding: '14px', borderRadius: 10, cursor: 'pointer',
            background: 'rgba(255,77,77,0.1)', border: '1px solid rgba(255,77,77,0.2)',
            color: '#FF4D4D', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14,
          }}>
            Log Out
          </button>
        </div>
      </main>
    </div>
  )
}
