export default function OverwhelmModal({ onConfirm, onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
    }} onClick={onClose}>
      <div style={{
        maxWidth: 420, width: '90%',
        background: 'var(--bg-surface)', borderRadius: 16,
        border: '1px solid var(--border)',
        padding: 32,
      }} onClick={(e) => e.stopPropagation()}>
        <h2 className="font-heading font-bold" style={{ fontSize: 20, color: 'var(--text-primary)', marginBottom: 4 }}>
          Feeling overwhelmed? 😮‍💨
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24 }}>
          Let AI pick your 3 most important tasks for today. Rest gets rescheduled.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: '12px', borderRadius: 10, cursor: 'pointer',
            fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600,
            background: 'transparent', border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
          }}>
            Cancel
          </button>
          <button onClick={onConfirm} style={{
            flex: 1, padding: '12px', borderRadius: 10, cursor: 'pointer',
            fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600,
            background: '#EF4444', border: 'none', color: '#FFFFFF',
          }}>
            Yes, simplify my day
          </button>
        </div>
      </div>
    </div>
  )
}
