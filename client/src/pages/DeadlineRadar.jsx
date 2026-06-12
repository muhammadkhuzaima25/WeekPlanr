import { useState, useEffect, useMemo } from 'react'
import api from '../services/api'
import Sidebar from '../components/Sidebar'
import LoadingSpinner from '../components/LoadingSpinner'
import { Radar, AlertTriangle, Clock, Timer } from 'lucide-react'
import { motion } from 'framer-motion'

const priorityColors = { high: '#EF4444', medium: '#F59E0B', low: '#10B981' }

function getHoursUntil(dueDate) {
  return (new Date(dueDate) - new Date()) / (1000 * 60 * 60)
}

function formatCountdown(hours) {
  if (hours <= 0) return 'Overdue'
  if (hours < 1) return `Less than 1 hour left`
  if (hours < 24) return `${Math.floor(hours)}h left`
  const days = Math.floor(hours / 24)
  return days === 1 ? '1 day remaining' : `${days} days remaining`
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const itemAnim = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 30 } },
}

export default function DeadlineRadar() {
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState([])

  const loadData = async () => {
    try {
      const res = await api.get('/tasks')
      setTasks(res.data.filter(t => !t.completed))
    } catch {
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadData() }, [])

  const { critical, warning, safe, urgentCount, highUrgentCount } = useMemo(() => {
    const now = new Date()
    const groups = { critical: [], warning: [], safe: [] }
    let urgent = 0
    let highUrgent = 0

    for (const t of tasks) {
      const hours = getHoursUntil(t.dueDate)
      if (hours <= 0) {
        groups.critical.push({ ...t, hoursRemaining: hours })
        urgent++
        if (t.priority === 'high') highUrgent++
        continue
      }
      if (hours <= 24) {
        groups.critical.push({ ...t, hoursRemaining: hours })
        urgent++
        if (t.priority === 'high') highUrgent++
      } else if (hours <= 72) {
        groups.warning.push({ ...t, hoursRemaining: hours })
        urgent++
        if (t.priority === 'high') highUrgent++
      } else {
        groups.safe.push({ ...t, hoursRemaining: hours })
      }
    }

    for (const key of Object.keys(groups)) {
      groups[key].sort((a, b) => a.hoursRemaining - b.hoursRemaining)
    }

    return { ...groups, urgentCount: urgent, highUrgentCount: highUrgent }
  }, [tasks])

  if (loading) return <LoadingSpinner />

  const sections = [
    {
      key: 'critical',
      label: 'CRITICAL ZONE',
      sub: 'Due within 24 hours',
      icon: '🔴',
      tasks: critical,
      containerClass: 'border-red-500/20 bg-red-500/5',
      headerClass: 'text-red-400',
      badgeClass: 'bg-red-500/10 text-red-400 border-red-500/20',
    },
    {
      key: 'warning',
      label: 'WARNING ZONE',
      sub: 'Due within 2–3 days',
      icon: '🟡',
      tasks: warning,
      containerClass: 'border-amber-500/20 bg-amber-500/5',
      headerClass: 'text-amber-400',
      badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
    {
      key: 'safe',
      label: 'SAFE ZONE',
      sub: 'Due in 4+ days',
      icon: '🟢',
      tasks: safe,
      containerClass: 'border-zinc-800 bg-zinc-900/20',
      headerClass: 'text-emerald-400',
      badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
  ]

  return (
    <div style={{ height: '100vh', overflow: 'hidden', display: 'flex', background: 'var(--bg-deep)' }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <header style={{
          padding: '24px 32px 20px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg-surface)',
          backdropFilter: 'blur(12px)',
          position: 'sticky', top: 0, zIndex: 10,
        }}>
          <h1 className="font-heading font-bold" style={{ fontSize: 22, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Radar size={20} strokeWidth={1.5} style={{ color: '#00C98A' }} />
            Deadline Radar
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
            Live countdown of every active task grouped by urgency
          </p>
        </header>

        <div style={{ padding: '24px 32px', flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Radar Analytics Banner */}
          <div className="border p-5 rounded-2xl" style={{
            background: 'var(--bg-surface)',
            borderColor: urgentCount > 0 ? 'rgba(239,68,68,0.15)' : 'var(--border)',
          }}>
            <div className="flex items-start gap-3">
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: urgentCount > 0 ? 'rgba(239,68,68,0.12)' : 'rgba(0,201,138,0.1)',
                color: urgentCount > 0 ? '#EF4444' : '#00C98A',
              }}>
                <AlertTriangle size={18} strokeWidth={1.5} />
              </div>
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>
                  {urgentCount > 0
                    ? `Radar Alert: ${urgentCount} task${urgentCount > 1 ? 's' : ''} due in the next 3 days.`
                    : 'All clear — no urgent deadlines in the next 3 days.'}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                  {urgentCount > 0
                    ? (highUrgentCount > 0
                      ? `Focus on ${highUrgentCount} high-priority item${highUrgentCount > 1 ? 's' : ''} to prevent auto-archiving.`
                      : 'Review and plan ahead to stay on track.')
                    : 'Keep up the great scheduling!'}
                </div>
              </div>
            </div>
          </div>

          {/* Three-tier urgency grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {sections.map((sec) => (
              <div key={sec.key} className={`rounded-xl border ${sec.containerClass}`} style={{ padding: 0, overflow: 'hidden' }}>
                {/* Section header */}
                <div style={{
                  padding: '14px 16px 12px',
                  borderBottom: '1px solid',
                  borderColor: sec.key === 'critical' ? 'rgba(239,68,68,0.12)' : sec.key === 'warning' ? 'rgba(245,158,11,0.12)' : 'var(--border)',
                }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: 16 }}>{sec.icon}</span>
                      <span className="font-heading font-bold" style={{ fontSize: 13, letterSpacing: '0.04em', color: 'var(--text-primary)' }}>
                        {sec.label}
                      </span>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${sec.badgeClass}`}>
                      {sec.tasks.length}
                    </span>
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>
                    {sec.sub}
                  </div>
                </div>

                {/* Task list */}
                <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8, minHeight: 120 }}>
                  {sec.tasks.length === 0 ? (
                    <div style={{
                      fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-muted)',
                      textAlign: 'center', padding: '24px 0', fontStyle: 'italic',
                    }}>
                      No tasks in this zone
                    </div>
                  ) : (
                    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-2">
                      {sec.tasks.map((task) => {
                        const priColor = priorityColors[task.priority] || '#888'
                        const overdue = task.hoursRemaining <= 0
                        return (
                          <motion.div key={task._id} variants={itemAnim} layout style={{
                            background: 'var(--bg-elevated)',
                            border: `1px solid var(--border)`,
                            borderLeft: `3px solid ${priColor}`,
                            borderRadius: 10, padding: '10px 12px',
                          }}>
                            <div className="flex items-start justify-between gap-2">
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                  fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13,
                                  color: overdue ? 'var(--text-muted)' : 'var(--text-primary)',
                                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                }}>
                                  {task.name}
                                </div>
                                <div className="flex items-center gap-2 mt-1.5">
                                  <span style={{
                                    fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
                                    color: task.subject?.color || '#7C3AED',
                                    background: `${task.subject?.color || '#7C3AED'}15`,
                                    padding: '1px 8px', borderRadius: 4,
                                  }}>
                                    {task.subject?.name || task.type || 'General'}
                                  </span>
                                </div>
                              </div>
                              <div style={{
                                fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
                                color: overdue ? '#EF4444' : sec.key === 'critical' ? '#EF4444' : sec.key === 'warning' ? '#F59E0B' : '#10B981',
                                whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0,
                              }}>
                                <Timer size={12} strokeWidth={1.5} />
                                {overdue ? 'Overdue!' : formatCountdown(task.hoursRemaining)}
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </motion.div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  )
}
