import ScrollReveal from './ScrollReveal'

const steps = [
  {
    num: 1,
    title: 'Add your subjects & deadlines',
    text: "Enter what you're studying, when it's due, and how well you know each topic.",
  },
  {
    num: 2,
    title: 'AI builds your weekly plan',
    text: 'AI creates a realistic day-by-day schedule — prioritized by urgency and your weak areas.',
  },
  {
    num: 3,
    title: 'Follow it. Adjust when needed.',
    text: 'Mark tasks done. If you fall behind, AI reschedules automatically. No guilt. Just progress.',
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        background: 'var(--bg-base)',
        padding: '100px max(24px, 8vw)',
      }}
    >
      <div className="text-center mb-16">
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
            HOW IT WORKS
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
            Three steps to a clear week.
          </h2>
        </ScrollReveal>
      </div>

      <div
        className="relative flex flex-col md:flex-row items-start md:items-center justify-center gap-8 md:gap-12"
        style={{ maxWidth: 900, margin: '0 auto' }}
      >
        {/* Dashed connector line (desktop only) */}
        <div
          className="absolute top-[22px] left-[44px] md:top-1/2 md:left-[calc(16.666%+22px)] md:right-[calc(16.666%+22px)] hidden md:block"
          style={{
            borderTop: '2px dashed #252836',
            zIndex: 0,
          }}
        />

        {steps.map((step, i) => (
          <ScrollReveal key={i} delay={i * 150} className="flex-1 text-center md:text-left relative z-10">
            <div className="flex flex-col items-center md:items-start">
              {/* Step number circle */}
              <div
                className="flex items-center justify-center mb-4"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'var(--bg-surface)',
                  border: '1px solid #00C98A',
                  color: '#00C98A',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  boxShadow: '0 0 16px #00C98A30',
                }}
              >
                {step.num}
              </div>
              <h3
                className="font-heading font-semibold mb-2"
                style={{ fontSize: 18, color: 'var(--text-primary)' }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  maxWidth: 240,
                }}
              >
                {step.text}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}

