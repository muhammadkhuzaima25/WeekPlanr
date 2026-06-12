import ScrollReveal from './ScrollReveal'

const testimonials = [
  {
    quote: 'Finally something that gets semester stress. My week plans itself now.',
    initials: 'HT',
    name: 'Hana Tariq',
    detail: '3rd Year, FAST Lahore',
    color: '#00C98A',
  },
  {
    quote: 'Overwhelm Mode is a lifesaver. One click and I know exactly what to do.',
    initials: 'BR',
    name: 'Bilal Raza',
    detail: '5th Semester, NUST Islamabad',
    color: '#06B6D4',
  },
  {
    quote: 'I stopped missing assignments the week I started using WeekPlanr.',
    initials: 'SM',
    name: 'Sana Mirza',
    detail: '2nd Year, UET Lahore',
    color: '#10B981',
  },
]

export default function Testimonials() {
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
            STUDENT REVIEWS
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
            Real students. Real semesters.
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
        {testimonials.map((t, i) => (
          <ScrollReveal key={i} delay={i * 120}>
            <div
              className="rounded-xl p-7"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
              }}
            >
              {/* Stars */}
              <div className="mb-4" style={{ fontSize: 14, color: '#F59E0B' }}>
                {'★★★★★'}
              </div>

              {/* Quote */}
              <p
                className="mb-6"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 15,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}
              >
                "{t.quote}"
              </p>

              {/* Bottom row */}
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 38,
                    height: 38,
                    background: `${t.color}20`,
                    color: t.color,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: 14,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: 13,
                      color: 'var(--text-muted)',
                    }}
                  >
                    {t.detail}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}

