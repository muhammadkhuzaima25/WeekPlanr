import { useState } from 'react'
import ScrollReveal from './ScrollReveal'

const faqs = [
  {
    q: 'Is WeekPlanr really free?',
    a: 'Yes. WeekPlanr is completely free for semester students. No credit card required. No hidden charges.',
  },
  {
    q: 'How does the AI schedule my week?',
    a: 'Enter your subjects, deadlines, and how well you understand each topic. AI creates a day-by-day plan prioritizing urgent tasks and your weak areas.',
  },
  {
    q: 'Can I adjust the schedule manually?',
    a: 'Absolutely. You can drag and drop tasks between days. AI adapts to your changes and reschedules the rest automatically.',
  },
  {
    q: "What happens if I miss a day?",
    a: "Overwhelm Mode is a lifesaver. One click reduces your day to the 3 most urgent tasks. Rest is rescheduled.",
  },
  {
    q: 'Is my data safe?',
    a: 'Your data is encrypted and never shared. We only use it to generate your schedule. No tracking, no ads.',
  },
  {
    q: 'Which universities is this for?',
    a: 'FAST, NUST, UET, LUMS, and every Pakistani university following the semester system.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section
      id="faq"
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
            FAQ
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
            Got questions? We've got answers.
          </h2>
        </ScrollReveal>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        {faqs.map((faq, i) => (
          <ScrollReveal key={i} delay={i * 80}>
            <div
              className="rounded-xl transition-all duration-200 mb-3"
              style={{
                background: 'var(--bg-surface)',
                border: openIndex === i ? '1px solid #00C98A40' : '1px solid var(--border)',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between text-left px-5 py-4"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 15,
                  color: 'var(--text-primary)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <span>{faq.q}</span>
                <span
                  className="transition-transform duration-200"
                  style={{
                    transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0)',
                    color: '#00C98A',
                    fontSize: 18,
                  }}
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openIndex === i ? 200 : 0,
                  opacity: openIndex === i ? 1 : 0,
                }}
              >
                <p
                  className="px-5 pb-4"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}

