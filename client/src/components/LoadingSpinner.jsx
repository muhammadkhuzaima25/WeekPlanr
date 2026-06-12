export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen" style={{ background: 'var(--bg-base)' }}>
      <div
        className="w-8 h-8 rounded-full animate-spin"
        style={{
          border: '2px solid var(--border)',
          borderTopColor: '#00C98A',
        }}
      />
    </div>
  )
}

