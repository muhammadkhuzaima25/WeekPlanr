import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { toast } from 'react-hot-toast'

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [semester, setSemester] = useState('')
  const [subjectName, setSubjectName] = useState('')
  const [subjects, setSubjects] = useState([])
  const [submitting, setSubmitting] = useState(false)

  const handleStep1 = () => {
    if (!semester.trim()) {
      toast.error('Please enter your semester')
      return
    }
    setStep(2)
  }

  const addSubject = () => {
    const name = subjectName.trim()
    if (!name) return
    if (subjects.some(s => s.name.toLowerCase() === name.toLowerCase())) {
      toast.error('Subject already added')
      return
    }
    setSubjects([...subjects, { name }])
    setSubjectName('')
  }

  const removeSubject = (i) => {
    setSubjects(subjects.filter((_, idx) => idx !== i))
  }

  const handleSubmit = async () => {
    if (subjects.length === 0) {
      toast.error('Add at least one subject')
      return
    }
    setSubmitting(true)
    try {
      await api.put('/auth/update', { semester })
      await api.post('/subjects', { subjects })
      await api.post('/schedule/generate')
      navigate('/weekly-plan')
      toast.success('Your plan is ready!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-deep)', padding: 24 }}>
      <div style={{ maxWidth: 480, width: '100%' }}>
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2].map((s) => (
            <div key={s} style={{
              width: s <= step ? 32 : 10, height: 10,
              borderRadius: 999,
              background: s <= step ? 'var(--accent)' : 'var(--border)',
              transition: 'all 300ms ease',
            }} />
          ))}
        </div>

        {step === 1 && (
          <>
            <h1 className="font-heading font-bold text-center text-2xl mb-1" style={{ color: 'var(--text-primary)' }}>
              Which semester are you in?
            </h1>
            <p className="text-center mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>
              We'll tailor your plan accordingly.
            </p>

            <div className="mb-6">
              <input type="text" value={semester}
                onChange={(e) => setSemester(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleStep1() } }}
                placeholder="e.g. 3rd Semester, 7th Semester..."
                style={{
                  width: '100%', padding: '14px 16px', borderRadius: 10,
                  background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                  color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif", fontSize: 15, outline: 'none',
                }} />
            </div>

            <button onClick={handleStep1}
              className="w-full font-bold transition-all duration-200 rounded-lg py-3"
              style={{
                background: 'var(--accent)', border: 'none',
                color: '#0A0A0A', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15,
                cursor: 'pointer',
              }}>
              Next →
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="font-heading font-bold text-center text-2xl mb-1" style={{ color: 'var(--text-primary)' }}>
              What are you studying this semester?
            </h1>
            <p className="text-center mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>
              Add all your current subjects.
            </p>

            {/* Input row */}
            <div className="flex gap-2 mb-4">
              <input type="text" value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSubject() } }}
                placeholder="Subject name..."
                style={{
                  flex: 1, padding: '12px 14px', borderRadius: 10,
                  background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                  color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif", fontSize: 14, outline: 'none',
                }} />
              <button onClick={addSubject}
                style={{
                  padding: '12px 20px', borderRadius: 10, whiteSpace: 'nowrap',
                  background: 'var(--accent)', border: 'none',
                  color: '#0A0A0A', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, cursor: 'pointer',
                }}>
                + Add
              </button>
            </div>

            {/* Subject pills */}
            <div className="flex flex-wrap gap-2 mb-8" style={{ minHeight: 40 }}>
              {subjects.map((subj, i) => (
                <span key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '6px 12px', borderRadius: 8,
                  background: 'var(--accent-dim)', border: '1px solid var(--accent)',
                  fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--accent)',
                }}>
                  {subj.name}
                  <button onClick={() => removeSubject(i)}
                    style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', padding: 0, fontSize: 16, lineHeight: 1 }}>
                    ×
                  </button>
                </span>
              ))}
            </div>

            <button onClick={handleSubmit} disabled={submitting}
              className="w-full font-bold transition-all duration-200 rounded-lg py-3"
              style={{
                background: submitting ? 'var(--accent-soft)' : 'var(--accent)', border: 'none',
                color: '#0A0A0A', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15,
                cursor: submitting ? 'not-allowed' : 'pointer',
              }}>
              {submitting ? 'Building...' : 'Build My Plan →'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
