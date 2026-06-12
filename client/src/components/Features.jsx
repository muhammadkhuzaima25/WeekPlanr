import ScrollReveal from './ScrollReveal'

const features = [
  {
    icon: '✦',
    title: 'AI Weekly Schedule',
    text: 'Automatically planned. Based on your deadlines, subject weights, and understanding gaps.',
  },
  {
    icon: '🔄',
    title: 'Smart Auto-Reschedule',
    text: "Miss a day? AI moves tasks forward without breaking your whole week.",
  },
  {
    icon: '🆘',
    title: 'Overwhelm Mode',
    text: 'One tap reduces your day to the 3 most urgent tasks. Rest is rescheduled.',
    badge: 'Fan Favourite',
  },
  {
    icon: '📆',
    title: 'Drag & Drop Weekly View',
    text: 'See your full week. Drag tasks between days. Color-coded by subject.',
  },
  {
    icon: '📊',
    title: 'Progress Dashboard',
    text: 'Streaks, completion rates, weakest subjects — with AI tips to close the gap.',
  },
  {
    icon: '🎯',
    title: 'Priority Labels',
    text: 'Every task gets High / Medium / Low assigned by AI — not by guessing.',
  },
]

export default function Features() {
  return (
    <section
      id="features"
      style={{
        background: 'var(--bg-surface)',
        padding: '100px max(24px, 8vw)',
      }}
    >
      <div className="text-center mb-14">
        <ScrollReveal>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#00C98A',
            }}
          >
            FEATURES
          </span>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2
            className="font-heading font-bold mt-3"
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              lineHeight: 1.15,
              color: 'var(--text-primary)',
            }}
          >
            Built for the chaos of semester life.
          </h2>
        </ScrollReveal>
      </div>

      <div
        className="grid gap-5"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          maxWidth: 1000,
          margin: '0 auto',
        }}
      >
        {features.map((f, i) => (
          <ScrollReveal key={i} delay={i * 80}>
            <div
              className="rounded-xl p-7 transition-all duration-300 relative"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#00C98A40'
                e.currentTarget.style.boxShadow = '0 0 24px #00C98A10'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.borderLeft = '2px solid #00C98A'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderLeft = '1px solid var(--border)'
              }}
            >
              <div className="flex items-start justify-between">
                <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
                {f.badge && (
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
                    style={{
                      background: '#00C98A15',
                      color: '#00C98A',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: 11,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {f.badge}
                  </span>
                )}
              </div>
              <h3
                className="font-heading font-semibold mb-2"
                style={{ fontSize: 18, color: 'var(--text-primary)' }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}
              >
                {f.text}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}

