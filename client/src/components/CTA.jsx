import ScrollReveal from './ScrollReveal'

export default function CTA() {
  return (
    <section
      className="relative overflow-hidden text-center"
      style={{
        background: 'linear-gradient(135deg, #1C1F2E 0%, #0D0F1A 100%)',
        borderTop: '1px solid #252836',
        padding: '100px max(24px, 8vw)',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 500,
          height: 300,
          background: 'radial-gradient(ellipse, #00C98A20 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10">
        <ScrollReveal>
            <h2
              className="font-heading font-extrabold"
              style={{
                fontSize: 'clamp(32px, 5vw, 52px)',
                color: '#FFFFFF',
              }}
            >
              Stop guessing. Start planning.
            </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p
            className="mt-4"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 16,
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            Free. No credit card. Built for semester students.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <button
            className="mt-8 text-white font-bold transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #00C98A, #00C98A)',
              padding: '15px 36px',
              borderRadius: 8,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'brightness(1.1)'
              e.currentTarget.style.boxShadow = '0 0 32px #00C98A50'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'brightness(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Get Your Free Plan →
          </button>
        </ScrollReveal>
      </div>
    </section>
  )
}

