const items = [
  '✦ Built for Semester System',
  '⚡ AI-Powered Scheduling',
  '📅 Weekly Study Plans',
  '🎯 Deadline Prioritization',
  '🔄 Auto-Reschedule',
  '😮‍💨 Overwhelm Mode',
  '📊 Progress Tracking',
  '✦ Free to Use',
]

export default function SocialProof() {
  return (
    <section
      style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '20px 0',
      }}
    >
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {[...Array(2)].map((_, setIdx) =>
            items.map((item, i) => (
              <span key={`${setIdx}-${i}`} className="marquee-item">
                {item}
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
