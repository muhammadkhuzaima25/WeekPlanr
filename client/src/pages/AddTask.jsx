import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { toast } from 'react-hot-toast'
import Sidebar from '../components/Sidebar'
import { Plus } from 'lucide-react'

export default function AddTask() {
  const navigate = useNavigate()
  const [subjects, setSubjects] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    subjectId: '',
    name: '',
    type: 'Assignment',
    dueDate: '',
    priority: 'medium',
    notes: '',
  })

  useEffect(() => {
    api.get('/subjects')
      .then(res => setSubjects(res.data))
      .catch(() => {})
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.subjectId || !form.name || !form.dueDate) {
      toast.error('Please fill in all required fields')
      return
    }
    setSubmitting(true)
    try {
      await api.post('/tasks', form)
      navigate('/weekly-plan')
      toast.success('Task added!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const priorityColors = { high: '#EF4444', medium: '#F59E0B', low: '#10B981' }

  return (
    <div style={{ height: '100vh', overflow: 'hidden', display: 'flex', background: 'var(--bg-deep)' }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: 'auto', padding: '40px max(24px, 8vw)' }}>
        <div style={{ maxWidth: 600 }}>
          <h1 className="font-heading font-bold" style={{ fontSize: 22, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Plus size={20} strokeWidth={1.5} style={{ color: '#00C98A' }} />
            Add a New Task
          </h1>
          <p className="mt-1 mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>
            WeekPlanr will schedule it into your week automatically.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block mb-1.5" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, color: 'var(--text-muted)' }}>Subject *</label>
              <select value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif", fontSize: 14, outline: 'none' }}>
                <option value="">Select a subject</option>
                {subjects.map((s) => (
                  <option key={s._id} value={s._id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1.5" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, color: 'var(--text-muted)' }}>Task Name *</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Assignment 3 submission"
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif", fontSize: 14, outline: 'none' }} />
            </div>

            <div>
              <label className="block mb-1.5" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, color: 'var(--text-muted)' }}>Task Type</label>
              <div className="flex gap-2 flex-wrap">
                {['Assignment', 'Quiz', 'Project', 'Lab', 'Exam'].map((type) => (
                  <button key={type} type="button" onClick={() => setForm({ ...form, type })}
                    style={{
                      padding: '8px 16px', borderRadius: 8, cursor: 'pointer',
                      fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500,
                      background: form.type === type ? 'rgba(0,201,138,0.12)' : 'var(--bg-elevated)',
                      border: form.type === type ? '1px solid rgba(0,201,138,0.4)' : '1px solid var(--border)',
                      color: form.type === type ? '#00C98A' : 'var(--text-secondary)',
                    }}>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1.5" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, color: 'var(--text-muted)' }}>Due Date *</label>
              <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif", fontSize: 14, outline: 'none' }} />
            </div>

            <div>
              <label className="block mb-1.5" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, color: 'var(--text-muted)' }}>Priority</label>
              <div className="flex gap-2">
                {[
                  { label: '🔴 High', value: 'high' },
                  { label: '🟡 Medium', value: 'medium' },
                  { label: '🟢 Low', value: 'low' },
                ].map((p) => (
                  <button key={p.value} type="button" onClick={() => setForm({ ...form, priority: p.value })}
                    style={{
                      flex: 1, padding: '10px', borderRadius: 8, cursor: 'pointer',
                      fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500,
                      background: form.priority === p.value ? `${priorityColors[p.value]}20` : 'var(--bg-elevated)',
                      border: form.priority === p.value ? `1px solid ${priorityColors[p.value]}` : '1px solid var(--border)',
                      color: form.priority === p.value ? priorityColors[p.value] : 'var(--text-secondary)',
                    }}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1.5" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, color: 'var(--text-muted)' }}>Notes (optional)</label>
              <textarea rows="3" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Any additional details..."
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif", fontSize: 14, outline: 'none', resize: 'vertical' }} />
            </div>

            <button type="submit" disabled={submitting}
              style={{
                width: '100%', padding: '14px', borderRadius: 10, border: 'none', cursor: submitting ? 'not-allowed' : 'pointer',
                background: submitting ? 'var(--accent-soft)' : '#00C98A', color: '#0A0A0A',
                fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15,
              }}>
              {submitting ? 'Adding...' : 'Add Task & Update Schedule'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
