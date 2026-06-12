export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: '100vh',
        background: 'var(--bg-base)',
        paddingTop: 80,
      }}
    >
      {/* Background glow */}
      <div
        className="hero-glow"
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          height: 500,
          background: 'radial-gradient(ellipse, #00C98A18 0%, transparent 65%)',
          animation: 'glowPulse 5s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      <div
        className="relative z-10 mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-0"
        style={{ padding: '0 max(24px, 8vw)', maxWidth: 1280 }}
      >
        {/* Left side */}
        <div className="w-full lg:w-1/2" style={{ maxWidth: 560 }}>
          {/* Badge pill */}
          <div
            className="inline-flex items-center animate-[fadeSlideUp_0.4s_ease-out]"
            style={{
              border: '1px solid #00C98A60',
              background: '#00C98A15',
              color: '#00C98A',
              padding: '6px 14px',
              borderRadius: 999,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            ⚡ AI-Powered Study Planner
          </div>

          {/* Headline */}
          <div className="mt-6" style={{ animation: 'fadeSlideUp 0.4s ease-out 100ms both' }}>
            <h1
              className="font-heading font-extrabold leading-[1.05] tracking-[-0.03em]"
              style={{
                fontSize: 'clamp(40px, 5.5vw, 68px)',
                color: 'var(--text-primary)',
              }}
            >
              Plan Smarter.<br />
              Stress Less.<br />
              <span style={{
                background: 'linear-gradient(135deg, #00C98A, #00E5A0, #00C98A)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Ace Every Semester.</span>
            </h1>
          </div>

          {/* Subtext */}
          <p
            className="mt-5 max-w-lg"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 17,
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              animation: 'fadeSlideUp 0.4s ease-out 200ms both',
            }}
          >
            WeekPlanr builds your personalized weekly study schedule — based on your deadlines, subjects, and understanding level.
          </p>

          {/* CTA Buttons */}
          <div
            className="mt-8 flex flex-wrap gap-3"
            style={{ animation: 'fadeSlideUp 0.4s ease-out 300ms both' }}
          >
            <button
              className="text-white font-bold transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #00C98A, #00C98A)',
                padding: '13px 26px',
                borderRadius: 8,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'brightness(1.1)'
                e.currentTarget.style.boxShadow = '0 0 20px #00C98A50'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'brightness(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Start Planning Free →
            </button>
            <button
              className="font-medium transition-all duration-200"
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                padding: '13px 26px',
                borderRadius: 8,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 15,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#00C98A'
                e.currentTarget.style.color = 'var(--text-primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text-secondary)'
              }}
            >
              See How It Works
            </button>
          </div>

          {/* Social proof */}
          <div
            className="mt-8"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: 'var(--text-muted)',
              animation: 'fadeSlideUp 0.4s ease-out 400ms both',
            }}
          >
            ✓ Free to use  ·  ✓ No credit card  ·  ✓ Made for semester students
          </div>
        </div>

        {/* Right side: Wireframe Floating Card */}
        <div
          className="w-full lg:w-1/2 flex justify-center lg:justify-end"
          style={{
            animation: 'fadeSlideUp 0.6s ease-out 200ms both',
          }}
        >
          <div
            className="relative"
            style={{
              maxWidth: 460,
              width: '100%',
              marginRight: 40,
              paddingRight: 24,
              filter: 'drop-shadow(0 20px 40px #00C98A15)',
              animation: 'float 3.5s ease-in-out infinite',
            }}
          >
            {/* Background glow behind card */}
            <div
              className="hero-glow-card"
              style={{
                position: 'absolute',
                width: 300,
                height: 300,
                borderRadius: '50%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                animation: 'glowPulse 4s ease-in-out infinite',
              }}
            />

            {/* Second floating card behind (depth effect) */}
            <div
              className="card-behind"
              style={{
                position: 'absolute',
                top: -20,
                right: -20,
                width: '80%',
                height: '100%',
                borderRadius: 16,
                zIndex: -1,
                animation: 'float 3.5s ease-in-out infinite',
                animationDelay: '0.5s',
              }}
            />

            {/* Main Card */}
            <div
              className="wireframe-card"
              style={{
                borderRadius: 16,
                padding: 20,
              }}
            >
              {/* Card Header */}
              <div
                className="wireframe-card-header"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: 12,
                  marginBottom: 14,
                }}
              >
                📅 This Week
              </div>

              {/* Week Grid — 5 columns Mon–Fri */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: 8,
                }}
              >
                {[
                  { day: 'Mon', blocks: 2 },
                  { day: 'Tue', blocks: 3 },
                  { day: 'Wed', blocks: 1 },
                  { day: 'Thu', blocks: 2 },
                  { day: 'Fri', blocks: 1 },
                ].map(({ day, blocks }) => {
                  const isToday = day === 'Tue'
                  return (
                    <div key={day}>
                      <div
                        className={isToday ? 'day-label-today' : 'day-label'}
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 600,
                          fontSize: 10,
                          textTransform: 'uppercase',
                          textAlign: 'center',
                          marginBottom: 8,
                          ...(isToday ? { paddingTop: 6 } : {}),
                        }}
                      >
                        {day}
                      </div>
                      {Array.from({ length: blocks }).map((_, i) => (
                        <div
                          key={i}
                          className={`skeleton-block${isToday ? ' skeleton-block-today' : ''}`}
                          style={{
                            width: '100%',
                            height: 28,
                            borderRadius: 6,
                            marginBottom: 6,
                            animationDelay: `${i * 200}ms`,
                          }}
                        />
                      ))}
                    </div>
                  )
                })}
              </div>

              {/* Progress Bar (bottom) */}
              <div
                style={{
                  marginTop: 16,
                  borderTop: '1px solid var(--border)',
                  paddingTop: 12,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="progress-label" style={{ fontFamily: "'Inter', sans-serif", fontSize: 11 }}>
                    4 of 7 tasks
                  </span>
                  <span className="progress-label" style={{ fontFamily: "'Inter', sans-serif", fontSize: 11 }}>
                    57%
                  </span>
                </div>
                <div
                  className="progress-track"
                  style={{
                    height: 3,
                    width: '100%',
                    borderRadius: 999,
                    border: 'none',
                  }}
                >
                  <div
                    className="progress-fill"
                    style={{
                      width: '55%',
                      height: 3,
                      borderRadius: 999,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

