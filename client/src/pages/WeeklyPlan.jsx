import { useState, useEffect } from 'react'
import api from '../services/api'
import { toast } from 'react-hot-toast'
import { AnimatePresence, motion } from 'framer-motion'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import Sidebar from '../components/Sidebar'
import LoadingSpinner from '../components/LoadingSpinner'
import OverwhelmModal from '../components/OverwhelmModal'
import { Calendar, Sparkles, Bot, Frown, CheckCircle2 } from 'lucide-react'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function getTodayLabel() {
  return DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]
}

function getDates() {
  const start = new Date()
  const day = start.getDay()
  const diff = start.getDate() - day + (day === 0 ? -6 : 1)
  const mon = new Date(start.setDate(diff))
  return DAYS.map((_, i) => {
    const d = new Date(mon)
    d.setDate(d.getDate() + i)
    return d.getDate().toString()
  })
}

const priorityColor = { high: '#EF4444', medium: '#F59E0B', low: '#10B981' }
const priorityLabel = { high: 'High', medium: 'Medium', low: 'Low' }

function TaskMotionCard({ task, onToggle, dragProvided, isDragOver }) {
  const priColor = priorityColor[task.priority] || '#888'
  const card = (
    <motion.div
      layout layoutId={task._id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: task.completed ? 0.5 : 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{
        background: task.completed ? 'rgba(0,201,138,0.05)' : 'var(--bg-elevated)',
        border: `1px solid ${task.completed ? 'rgba(0,201,138,0.15)' : 'var(--border)'}`,
        borderLeft: `3px solid ${priColor}`,
        borderRadius: 8, padding: '8px 10px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        <div onClick={(e) => { e.stopPropagation(); onToggle(task._id) }} style={{
          width: 14, height: 14, borderRadius: '50%',
          border: `2px solid ${task.completed ? '#00C98A' : priColor}`,
          background: task.completed ? '#00C98A' : 'transparent',
          flexShrink: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {task.completed && <CheckCircle2 size={10} strokeWidth={3} style={{ color: '#0A0A0A' }} />}
        </div>
        <span style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 11,
          color: task.completed ? 'var(--text-secondary)' : 'var(--text-primary)',
          textDecoration: task.completed ? 'line-through' : 'none',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1,
        }}>
          {task.name}
        </span>
        <div style={{
          width: 7, height: 7, borderRadius: '50%',
          background: priColor, boxShadow: `0 0 5px ${priColor}60`, flexShrink: 0,
        }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 600, color: task.subjectColor || '#00C98A', textTransform: 'uppercase' }}>
            {task.subject?.name || task.subject || ''}
          </span>
          {task.completed ? (
            task.autoArchived ? (
              <span style={{
                fontFamily: "'Inter', sans-serif", fontSize: 8, fontWeight: 600,
                background: 'rgba(245,166,35,0.12)', color: '#F59E0B',
                padding: '1px 6px', borderRadius: 4, whiteSpace: 'nowrap',
              }}>
                ⏱️ Auto-Archived (Past Deadline)
              </span>
            ) : (
              <span style={{
                fontFamily: "'Inter', sans-serif", fontSize: 8, fontWeight: 600,
                background: 'rgba(0,201,138,0.12)', color: '#00C98A',
                padding: '1px 6px', borderRadius: 4, whiteSpace: 'nowrap',
              }}>
                ✅ Manually Done
              </span>
            )
          ) : (
            <span style={{
              fontFamily: "'Inter', sans-serif", fontSize: 8, fontWeight: 600, textTransform: 'uppercase',
              background: `${priColor}15`, color: priColor, padding: '1px 6px', borderRadius: 4,
            }}>
              {priorityLabel[task.priority] || ''}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )

  if (dragProvided) {
    return (
      <div
        ref={dragProvided.innerRef}
        {...dragProvided.draggableProps}
        {...dragProvided.dragHandleProps}
        style={{
          ...dragProvided.draggableProps.style,
          cursor: 'grab',
        }}
      >
        {card}
      </div>
    )
  }
  return card
}

export default function WeeklyPlan() {
  const [loading, setLoading] = useState(true)
  const [weekTasks, setWeekTasks] = useState({})
  const [showOverwhelm, setShowOverwhelm] = useState(false)

  const loadData = async () => {
    try {
      const [scheduleRes, tasksRes] = await Promise.all([
        api.get('/schedule/week').catch(() => ({ data: null })),
        api.get('/tasks').catch(() => ({ data: [] })),
      ])
      if (scheduleRes.data?.days) {
        setWeekTasks(scheduleRes.data.days)
      } else {
        const tasks = tasksRes.data || []
        const grouped = {}
        DAYS.forEach(d => { grouped[d] = [] })
        tasks.forEach(t => {
          const day = t.scheduledDay || 'Mon'
          if (!grouped[day]) grouped[day] = []
          grouped[day].push(t)
        })
        for (const day of DAYS) {
          grouped[day].sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0))
        }
        setWeekTasks(grouped)
      }
    } catch {
      setWeekTasks({})
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadData() }, [])

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  useEffect(() => {
    const timeouts = []
    const dueTasks = Object.values(weekTasks).flat().filter(t => !t.completed && t.dueDate)
    dueTasks.forEach(task => {
      const deadline = new Date(task.dueDate)
      const subject = task.subject?.name || task.subject || 'No subject'
      const now = Date.now()

      const scheduleAt = (label, offsetMs, body) => {
        const diff = deadline.getTime() - offsetMs - now
        if (diff > 0) {
          const id = setTimeout(() => {
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification(`📚 StudyPilot - ${label}`, { body })
            }
          }, diff)
          timeouts.push(id)
        }
      }

      scheduleAt('24 Hours Left', 24 * 60 * 60 * 1000, `"${task.name}" (${subject}) is due in 24 hours!`)
      scheduleAt('6 Hours Left', 6 * 60 * 60 * 1000, `"${task.name}" (${subject}) is due in 6 hours!`)
      scheduleAt('Task Due!', 0, `"${task.name}" (${subject}) is due now!`)
    })
    return () => timeouts.forEach(clearTimeout)
  }, [weekTasks])

  const handleToggleTask = async (taskId) => {
    const prev = {}
    for (const [day, tasks] of Object.entries(weekTasks)) {
      prev[day] = tasks.map(t => ({ ...t }))
    }
    try {
      const newTasks = {}
      for (const [day, tasks] of Object.entries(weekTasks)) {
        newTasks[day] = tasks.map(t =>
          t._id === taskId ? { ...t, completed: !t.completed } : t
        )
      }
      setWeekTasks(newTasks)
      const task = Object.values(weekTasks).flat().find(t => t._id === taskId)
      await api.put(`/tasks/${taskId}`, { completed: !task?.completed })
    } catch {
      setWeekTasks(prev)
      toast.error('Failed to update task')
    }
  }

  const handleDragEnd = async (result) => {
    if (!result.destination) return
    const { draggableId, source, destination } = result
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    const newTasks = {}
    for (const [day, tasks] of Object.entries(weekTasks)) {
      newTasks[day] = [...tasks]
    }
    const prev = structuredClone(newTasks)

    const [moved] = newTasks[source.droppableId].splice(source.index, 1)
    newTasks[destination.droppableId].splice(destination.index, 0, moved)
    setWeekTasks(newTasks)

    try {
      await api.put(`/tasks/${draggableId}`, {
        scheduledDay: destination.droppableId,
        orderIndex: destination.index,
      })
    } catch {
      setWeekTasks(prev)
      toast.error('Failed to move task')
    }
  }

  const handleRegenerate = async () => {
    try {
      toast.loading('Sorting tasks by due date...')
      await api.post('/schedule/generate')
      toast.dismiss()
      toast.success('Schedule rearranged')
      loadData()
    } catch { toast.dismiss(); toast.error('Failed') }
  }

  const handleOptimize = async () => {
    try {
      toast.loading('AI is optimizing your week...')
      const res = await api.post('/schedule/ai', { mode: 'optimize' })
      toast.dismiss()
      if (res.data.days) setWeekTasks(res.data.days)
      toast.success('Week optimized! ⚡')
    } catch { toast.dismiss(); toast.error('Failed') }
  }

  const handleOverwhelmed = () => {
    const today = getTodayLabel()
    const todayActive = (weekTasks[today] || []).filter(t => !t.completed).length
    if (todayActive <= 3) {
      toast("💡 Quick Tip: You're doing great! This feature is activated when you have more than 3 urgent tasks today.")
      return
    }
    setShowOverwhelm(true)
  }

  const handleOverwhelmConfirm = async () => {
    setShowOverwhelm(false)
    try {
      setLoading(true)
      const res = await api.post('/schedule/ai', { mode: 'overwhelm' })
      if (res.data.days) setWeekTasks(res.data.days)
      toast.success('Focused! Just 3 tasks for today 💪')
    } catch { toast.error('Failed') } finally { setLoading(false) }
  }

  const handleClearWeek = async () => {
    try {
      await api.delete('/tasks/clear-week')
      toast.success('All weekly tasks cleared!')
      loadData()
    } catch {
      toast.error('Failed to clear tasks')
    }
  }

  if (loading) return <LoadingSpinner />

  const allTasks = Object.values(weekTasks).flat()
  const activeTasks = allTasks.filter(t => !t.completed)
  const completedTasks = allTasks.filter(t => t.completed)
  const todayLabel = getTodayLabel()
  const dates = getDates()

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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h1 className="font-heading font-bold" style={{ fontSize: 22, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <Calendar size={20} strokeWidth={1.5} style={{ color: '#00C98A' }} />
                Weekly Plan
              </h1>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
                <span style={{ color: 'var(--text-muted)' }}>{activeTasks.length} task{activeTasks.length !== 1 ? 's' : ''} due this week</span>
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={handleRegenerate} style={{
                background: 'transparent', border: '1px solid rgba(0,201,138,0.3)', color: '#00C98A',
                borderRadius: 10, padding: '8px 16px', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <Sparkles size={14} strokeWidth={1.5} /> Regenerate
              </button>
              <button onClick={handleOptimize} style={{
                background: 'rgba(0,201,138,0.1)', border: '1px solid rgba(0,201,138,0.3)', color: '#00C98A',
                borderRadius: 10, padding: '8px 16px', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <Bot size={14} strokeWidth={1.5} /> Optimize All Tasks
              </button>
              <button onClick={handleOverwhelmed} title="AI picks your 3 most urgent tasks for today. Rest are moved to tomorrow." style={{
                background: 'transparent', border: '1px solid rgba(255,77,77,0.3)', color: '#FF4D4D',
                borderRadius: 10, padding: '8px 16px', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <Frown size={14} strokeWidth={1.5} /> I'm Overwhelmed
              </button>
            </div>
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, marginTop: 14,
            padding: '10px 16px', borderRadius: 10,
            background: 'rgba(245,166,35,0.05)', border: '1px solid rgba(245,166,35,0.15)',
            fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-secondary)',
          }}>
            <span style={{ fontSize: 14 }}>💡</span>
            <span>Feeling overwhelmed? Click 'I'm Overwhelmed' — AI keeps your 3 most urgent tasks today and moves the rest to tomorrow. Manually mark tasks using the circle button, or they will automatically archive after the deadline.</span>
          </div>
        </header>

        <div style={{ padding: '24px 32px', flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Active week grid — drag-reorderable, contains only incomplete tasks */}
          <DragDropContext onDragEnd={handleDragEnd}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 10 }}>
              {DAYS.map((day, i) => {
                const isToday = day === todayLabel
                const dayTasks = (weekTasks[day] || []).filter(t => !t.completed)
                return (
                  <Droppable key={day} droppableId={day}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.droppableProps} style={{
                        background: snapshot.isDraggingOver ? 'rgba(0,201,138,0.08)' : isToday ? 'rgba(255,255,255,0.02)' : 'var(--bg-card)',
                        border: isToday ? '1px solid rgba(255,255,255,0.06)' : '1px solid var(--border)',
                        borderRadius: 14, padding: '14px 10px',
                        display: 'flex', flexDirection: 'column', gap: 5,
                        minHeight: 180, position: 'relative',
                      }}>
                        <div style={{ textAlign: 'center', marginBottom: 6 }}>
                          <div style={{ height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
                            {isToday ? (
                              <span style={{
                                fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700,
                                textTransform: 'uppercase', letterSpacing: '0.08em',
                                background: 'rgba(0,201,138,0.1)', border: '1px solid rgba(0,201,138,0.2)',
                                color: '#00C98A', padding: '1px 10px', borderRadius: 999,
                              }}>
                                Today
                              </span>
                            ) : null}
                          </div>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', color: isToday ? '#F0F0F0' : 'var(--text-muted)' }}>{day}</div>
                          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: isToday ? '#00C98A' : 'var(--text-primary)', marginTop: 2 }}>{dates[i]}</div>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
                          {dayTasks.map((task, j) => (
                            <Draggable key={task._id} draggableId={task._id} index={j}>
                              {(prov, snap) => (
                                <TaskMotionCard task={task} onToggle={handleToggleTask} dragProvided={prov} isDragOver={snap.isDragging} />
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                          {dayTasks.length === 0 && !snapshot.isDraggingOver && (
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', marginTop: 12, opacity: 0.5 }}>— No tasks —</div>
                          )}
                        </div>
                      </div>
                    )}
                  </Droppable>
                )
              })}
            </div>
          </DragDropContext>

          {/* Completed & Archived section — contains only completed tasks */}
          <div className="rounded-xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 18 }}>🏆</span>
              <h2 className="font-heading font-semibold" style={{ fontSize: 16, color: 'var(--text-primary)' }}>
                Completed & Archived This Week
              </h2>
              <span style={{
                fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: '#00C98A',
                background: 'rgba(0,201,138,0.1)', padding: '2px 10px', borderRadius: 12,
              }}>
                {completedTasks.length}
              </span>
            </div>

            {completedTasks.length === 0 ? (
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', padding: 20 }}>
                No completed tasks yet. Tap the circle tick to mark one done!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <AnimatePresence mode="popLayout">
                  {completedTasks.map(task => (
                    <TaskMotionCard key={task._id} task={task} onToggle={handleToggleTask} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Clear Weekly Tasks button — permanently deletes ALL tasks */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, paddingTop: 8 }}>
            <button onClick={handleClearWeek} style={{
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444',
              borderRadius: 10, padding: '10px 24px', fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            }}>
              Clear Weekly Tasks
            </button>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'var(--text-muted)', textAlign: 'center',
              maxWidth: 500, lineHeight: 1.5,
            }}>
              ⚠️ Warning: This will wipe the entire week’s tasks to start a fresh plan. Click only when your week is fully complete.
            </p>
          </div>
        </div>
      </main>

      {showOverwhelm && <OverwhelmModal onConfirm={handleOverwhelmConfirm} onClose={() => setShowOverwhelm(false)} />}
    </div>
  )
}
