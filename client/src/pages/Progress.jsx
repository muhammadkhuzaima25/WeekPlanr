import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import api from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import Sidebar from '../components/Sidebar'
import { BarChart3 } from 'lucide-react'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg px-3 py-2 text-sm" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif" }}>
        <p style={{ fontWeight: 600 }}>{`${label}: ${payload[0].value}%`}</p>
      </div>
    )
  }
  return null
}

export default function Progress() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [urgentTasks, setUrgentTasks] = useState([])

  const loadStats = async () => {
    try {
      const [statsRes, tasksRes] = await Promise.all([
        api.get('/progress/stats'),
        api.get('/tasks'),
      ])
      setStats(statsRes.data)
      const highPrio = (tasksRes.data || []).filter(t => t.priority === 'high' && !t.completed)
      setUrgentTasks(highPrio)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStats()
  }, [])

  if (loading) return <div className="flex items-center justify-center h-screen"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>

  if (error) return (
    <div className="flex flex-col items-center justify-center h-screen gap-4" style={{ background: 'var(--bg-deep)' }}>
      <p style={{ color: '#EF4444', fontFamily: "'Inter', sans-serif" }}>Something went wrong.</p>
      <button onClick={loadStats} style={{ color: '#00C98A', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Try again</button>
    </div>
  )

  const subjectData = stats?.subjectBreakdown?.map((s) => ({
    name: s.name,
    value: s.percentage || 0,
    color: s.color || '#00C98A',
  })) || []

  const weeklyData = stats?.weeklyCompletion || []
  const isEmpty = subjectData.length === 0 && weeklyData.length === 0

  const statCards = [
    { number: stats?.tasksDoneThisWeek || '0', label: 'tasks completed', sub: `out of ${stats?.totalTasksThisWeek || 0} total`, color: 'var(--text-primary)' },
    { number: `${stats?.currentStreak || 0}`, label: 'day streak', sub: '🔥 Keep going!', color: '#F59E0B' },
    { number: `${stats?.completionRate || 0}%`, label: 'completion rate', sub: stats?.completionRate > 70 ? 'Great progress!' : stats?.completionRate > 40 ? 'Keep pushing!' : 'Needs improvement', color: stats?.completionRate > 70 ? '#10B981' : stats?.completionRate > 40 ? '#F59E0B' : '#EF4444' },
  ]

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
            <BarChart3 size={20} strokeWidth={1.5} style={{ color: '#00C98A' }} />
            Your Progress
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
            Track how this semester is going — week by week.
          </p>
        </header>

        <div style={{ padding: '24px 32px' }}>
          {isEmpty ? (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'var(--text-muted)' }}>No progress data yet. Start completing tasks!</p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                {statCards.map((stat, i) => (
                  <div key={i} className="rounded-xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                    <div className="font-extrabold" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 36, color: stat.color }}>{stat.number}</div>
                    <div className="mt-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-muted)' }}>{stat.label}</div>
                    {stat.sub && <div className="mt-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-muted)' }}>{stat.sub}</div>}
                  </div>
                ))}
                <div className="rounded-xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                  <div className="mt-1 mb-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#EF4444', fontWeight: 600 }}>🔴 Needs urgent attention</div>
                  {urgentTasks.length === 0 ? (
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-muted)' }}>All caught up! 🎉</div>
                  ) : (
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {urgentTasks.map(t => (
                        <li key={t._id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-primary)' }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444', flexShrink: 0, boxShadow: '0 0 6px #EF444460' }} />
                          <span style={{ flex: 1 }}>{t.name}</span>
                          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.subject?.name || ''}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="grid gap-6 mb-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                {subjectData.length > 0 && (
                  <div className="rounded-xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                    <h3 className="font-heading font-semibold mb-4" style={{ fontSize: 16, color: 'var(--text-primary)' }}>Subjects Breakdown</h3>
                    <ResponsiveContainer width="100%" height={260}>
                      <PieChart>
                        <Pie data={subjectData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                          {subjectData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                        </Pie>
                        <Legend wrapperStyle={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-muted)' }} />
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
                {weeklyData.length > 0 && (
                  <div className="rounded-xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                    <h3 className="font-heading font-semibold mb-4" style={{ fontSize: 16, color: 'var(--text-primary)' }}>Weekly Completion</h3>
                    <ResponsiveContainer width="100%" height={260}>
                      <LineChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#252836" />
                        <XAxis dataKey="week" stroke="#64748B" tick={{ fill: '#64748B', fontSize: 12, fontFamily: "'Inter', sans-serif" }} />
                        <YAxis domain={[0, 100]} stroke="#64748B" tick={{ fill: '#64748B', fontSize: 12, fontFamily: "'Inter', sans-serif" }} tickFormatter={(v) => `${v}%`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey="completion" stroke="#00C98A" strokeWidth={2} dot={{ fill: '#00C98A', r: 4 }} activeDot={{ r: 6, fill: '#00C98A' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              {stats?.aiInsight && (
                <div className="rounded-xl p-4" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                  <div className="mb-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, color: 'var(--text-secondary)' }}>📊 Insight</div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{stats.aiInsight}</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}
