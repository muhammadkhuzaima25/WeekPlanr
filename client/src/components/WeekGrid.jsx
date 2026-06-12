import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { CheckCircle2 } from 'lucide-react'

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function getTodayLabel() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return days[new Date().getDay()]
}

function getDates() {
  const start = new Date()
  const day = start.getDay()
  const diff = start.getDate() - day + (day === 0 ? -6 : 1)
  const mon = new Date(start.setDate(diff))
  return dayLabels.map((_, i) => {
    const d = new Date(mon)
    d.setDate(d.getDate() + i)
    return d.getDate().toString()
  })
}

const priorityColor = { high: '#EF4444', medium: '#F59E0B', low: '#10B981' }
const priorityLabel = { high: 'High', medium: 'Medium', low: 'Low' }

export default function WeekGrid({ weekTasks, onToggleTask, onDragEnd }) {
  const todayLabel = getTodayLabel()
  const dates = getDates()

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 10 }}>
        {dayLabels.map((day, i) => {
          const isToday = day === todayLabel
          const dayTasks = (weekTasks && weekTasks[day]) || []
          const dayComp = dayTasks.filter(t => t.completed).length

          return (
            <Droppable key={day} droppableId={day}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps} style={{
                  background: snapshot.isDraggingOver
                    ? 'rgba(0,201,138,0.08)'
                    : isToday
                      ? 'linear-gradient(180deg, rgba(0,201,138,0.06), var(--bg-card))'
                      : 'var(--bg-card)',
                  border: isToday ? '1px solid rgba(0,201,138,0.25)' : '1px solid var(--border)',
                  borderRadius: 14, padding: '14px 10px',
                  display: 'flex', flexDirection: 'column', gap: 5,
                  minHeight: 240, position: 'relative',
                  transition: 'background 0.2s',
                }}>
                  {isToday && (
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                      background: 'linear-gradient(90deg, #00C98A, #00A370)',
                    }} />
                  )}
                  <div style={{ textAlign: 'center', marginBottom: 6 }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', color: isToday ? '#00C98A' : 'var(--text-muted)' }}>
                      {day}
                    </div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: isToday ? '#00C98A' : 'var(--text-primary)', marginTop: 2 }}>
                      {dates[i]}
                    </div>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {dayTasks.length === 0 && !snapshot.isDraggingOver ? (
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', marginTop: 12, opacity: 0.5 }}>
                        — Rest day —
                      </div>
                    ) : (
                      dayTasks.map((task, j) => {
                        const priColor = priorityColor[task.priority] || '#888'
                        return (
                          <Draggable key={task._id} draggableId={task._id} index={j}>
                            {(provided, snap) => (
                              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{
                                background: task.completed ? 'rgba(0,201,138,0.05)' : 'var(--bg-elevated)',
                                border: `1px solid ${task.completed ? 'rgba(0,201,138,0.15)' : 'var(--border)'}`,
                                borderLeft: `3px solid ${priColor}`,
                                borderRadius: 8, padding: '8px 10px',
                                opacity: task.completed ? 0.6 : 1,
                                cursor: 'grab',
                                ...provided.draggableProps.style,
                              }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                                  {task.completed ? (
                                    <CheckCircle2 size={12} strokeWidth={2} style={{ color: '#00C98A', flexShrink: 0 }} />
                                  ) : (
                                    <div onClick={(e) => { e.stopPropagation(); onToggleTask(task._id) }} style={{
                                      width: 12, height: 12, borderRadius: '50%',
                                      border: `2px solid ${priColor}`, flexShrink: 0, cursor: 'pointer',
                                    }} />
                                  )}
                                  <div onClick={(e) => { e.stopPropagation(); onToggleTask(task._id) }} style={{
                                    fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 10,
                                    color: task.completed ? 'var(--text-secondary)' : 'var(--text-primary)',
                                    textDecoration: task.completed ? 'line-through' : 'none',
                                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, cursor: 'pointer',
                                  }}>
                                    {task.name}
                                  </div>
                                  <div style={{
                                    width: 8, height: 8, borderRadius: '50%',
                                    background: priColor,
                                    boxShadow: `0 0 6px ${priColor}60`,
                                    flexShrink: 0,
                                  }} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 18 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 600, color: task.subjectColor || '#00C98A', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                                      {task.subject?.name || task.subject || ''}
                                    </span>
                                    <span style={{
                                      fontFamily: "'Inter', sans-serif", fontSize: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em',
                                      background: `${priColor}15`, color: priColor,
                                      padding: '1px 6px', borderRadius: 4,
                                    }}>
                                      {priorityLabel[task.priority] || ''}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        )
                      })
                    )}
                    {provided.placeholder}
                  </div>
                  <div style={{ marginTop: 'auto', paddingTop: 6 }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: 'var(--text-muted)' }}>{dayComp}/{dayTasks.length}</div>
                    <div style={{ width: '100%', height: 3, background: 'var(--progress-bar-bg)', borderRadius: 4, overflow: 'hidden', marginTop: 4 }}>
                      <div style={{
                        width: dayTasks.length ? `${Math.round((dayComp / dayTasks.length) * 100)}%` : '0%',
                        height: '100%', borderRadius: 4,
                        background: 'linear-gradient(90deg, #00C98A, #00A370)',
                        transition: 'width 0.5s ease',
                      }} />
                    </div>
                  </div>
                </div>
              )}
            </Droppable>
          )
        })}
      </div>
    </DragDropContext>
  )
}
