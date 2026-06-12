import { Clock, CheckCircle2 } from 'lucide-react'

export default function TaskCard({ task, onToggle }) {
  const handleClick = () => {
    if (onToggle) onToggle(task._id)
  }

  return (
    <div style={{
      background: task.completed ? 'rgba(0,201,138,0.05)' : 'var(--bg-elevated)',
      border: `1px solid ${task.completed ? 'rgba(0,201,138,0.15)' : 'var(--border)'}`,
      borderLeft: `3px solid ${task.color || '#00C98A'}`,
      borderRadius: 8, padding: '8px 10px',
      cursor: 'pointer',
      opacity: task.completed ? 0.6 : 1,
    }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(0,201,138,0.06)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = task.completed ? 'rgba(0,201,138,0.15)' : 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        <div onClick={handleClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          {task.completed ? (
            <CheckCircle2 size={12} strokeWidth={2} style={{ color: '#00C98A', flexShrink: 0 }} />
          ) : (
            <div style={{ width: 12, height: 12, borderRadius: '50%', border: `2px solid ${task.color || '#00C98A'}`, flexShrink: 0, opacity: 0.6 }} />
          )}
        </div>
        <div style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 11,
          color: task.completed ? 'var(--text-secondary)' : 'var(--text-primary)',
          textDecoration: task.completed ? 'line-through' : 'none',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {task.name}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 18 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 600, color: task.color || '#00C98A', textTransform: 'uppercase' }}>
          {task.subject || 'General'}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Clock size={9} strokeWidth={1.5} style={{ color: 'var(--text-muted)' }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'var(--text-muted)' }}>
            {task.hours || task.estimatedHours || 1}h
          </span>
        </div>
      </div>
    </div>
  )
}

