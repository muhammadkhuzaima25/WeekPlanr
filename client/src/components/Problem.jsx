import ScrollReveal from './ScrollReveal'

const problems = [
  {
    icon: '🗓️',
    title: 'Everything hits at once',
    text: '2 assignments, 1 quiz, 1 project — same week. No system survives that without a plan.',
  },
  {
    icon: '😶',
    title: "You don't know where to start",
    text: '6 subjects open. Zero clarity on what to study first. You close the laptop.',
  },
  {
    icon: '📉',
    title: 'One miss becomes a spiral',
    text: "Skip one day and the whole week collapses. Catching up replaces learning.",
  },
]

export default function Problem() {
  return (
    <section
      style={{
        background: 'var(--bg-base)',
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
            THE PROBLEM
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
            Every semester hits the same way.
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
        {problems.map((p, i) => (
          <ScrollReveal key={i} delay={i * 120}>
            <div
              className="rounded-xl p-7 transition-all duration-300"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#00C98A40'
                e.currentTarget.style.boxShadow = '0 0 24px #00C98A10'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 12 }}>{p.icon}</div>
              <h3
                className="font-heading font-semibold mb-2"
                style={{ fontSize: 18, color: 'var(--text-primary)' }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}
              >
                {p.text}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}

