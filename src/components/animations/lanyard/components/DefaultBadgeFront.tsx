import * as React from 'react';

export function DefaultBadgeFront({
  cardWidth,
  name = "VERONICA WAEO",
  role = "UI/UX DESIGNER & SYSTEM ANALYST",
  photoUrl = "/images/profile.jpeg",
}: {
  cardWidth: number
  name?: string
  role?: string
  photoUrl?: string
}) {
  const [currentSrc, setCurrentSrc] = React.useState(photoUrl)
  const [imgError, setImgError] = React.useState(false)
  const s = cardWidth / 240

  const handleImgError = () => {
    if (currentSrc && currentSrc.endsWith(".jpeg")) {
      setCurrentSrc(currentSrc.replace(".jpeg", ".jpg"))
    } else if (currentSrc && currentSrc.endsWith(".jpg")) {
      setCurrentSrc(currentSrc.replace(".jpg", ".jpeg"))
    } else {
      setImgError(true)
    }
  }

  const TEAL_PRIMARY = '#3E8E93'
  const TEAL_DARK = '#265E62'
  const BG_MINT = '#F0F5F4'

  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden select-none"
      style={{
        background: BG_MINT,
        color: '#FFFFFF',
        fontFamily: 'var(--font-montserrat), system-ui, sans-serif',
      }}
    >
      {/* Upper Section: Photo Area (~76% Height) */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: '76%',
          backgroundColor: BG_MINT,
          borderTopLeftRadius: cardWidth * 0.06,
          borderTopRightRadius: cardWidth * 0.06,
        }}
      >
        {/* Left Background Watermark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 5 * s,
            top: 12 * s,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 14 * s,
            zIndex: 1,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {['VERONICA', 'VERONICA', 'VERONICA'].map((txt, idx) => (
            <span
              key={idx}
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                fontSize: 16 * s,
                fontWeight: 900,
                letterSpacing: '0.14em',
                fontFamily: '"Impact", "Arial Black", "Oswald", sans-serif',
                color: 'transparent',
                WebkitTextStroke: '1.2px rgba(62, 142, 147, 0.28)',
                textTransform: 'uppercase',
                lineHeight: 1,
                opacity: 0.9,
              }}
            >
              {txt}
            </span>
          ))}
        </div>

        {/* University / Academic Seal Watermark in Background */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '32%',
            top: '24%',
            transform: 'translate(-50%, -50%)',
            width: 170 * s,
            height: 170 * s,
            borderRadius: '50%',
            border: '1.5px solid rgba(62, 142, 147, 0.22)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: 146 * s,
              height: 146 * s,
              borderRadius: '50%',
              border: '1px dashed rgba(62, 142, 147, 0.24)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 116 * s,
                height: 116 * s,
                borderRadius: '50%',
                border: '1.5px solid rgba(62, 142, 147, 0.18)',
              }}
            />
          </div>
          <svg
            width={64 * s}
            height={64 * s}
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(62, 142, 147, 0.24)"
            strokeWidth="1.2"
            style={{ position: 'absolute' }}
          >
            <circle cx="12" cy="12" r="10" />
            <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9" />
          </svg>
        </div>

        {/* The Photo Layer */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          {!imgError ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={currentSrc}
              alt={name}
              onError={handleImgError}
              onLoad={(e) => {
                const img = e.currentTarget
                if (img.naturalWidth <= 1 && img.naturalHeight <= 1) {
                  setImgError(true)
                }
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 15%',
                display: 'block',
                filter: 'drop-shadow(0 4px 12px rgba(38, 94, 98, 0.18))',
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 94 * s,
                  height: 94 * s,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(62, 142, 147, 0.12)',
                  border: '2px solid rgba(62, 142, 147, 0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: TEAL_PRIMARY,
                  boxShadow: '0 6px 18px rgba(38, 94, 98, 0.15)',
                }}
              >
                <svg
                  width={46 * s}
                  height={46 * s}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ opacity: 0.85 }}
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <span
                  style={{
                    fontSize: 7 * s,
                    fontWeight: 800,
                    letterSpacing: '0.14em',
                    color: TEAL_PRIMARY,
                    marginTop: 2 * s,
                  }}
                >
                  VW
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Top subtle vignette */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 30 * s,
            background:
              'linear-gradient(to bottom, rgba(38, 94, 98, 0.35) 0%, transparent 100%)',
            zIndex: 4,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Multi-Line Collegiate Divider Strip */}
      <div
        style={{
          width: '100%',
          height: 6 * s,
          backgroundColor: TEAL_DARK,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: (1 * s) + 'px 0',
          zIndex: 5,
        }}
      >
        <div style={{ width: '100%', height: 1.2 * s, backgroundColor: '#FFFFFF' }} />
        <div style={{ width: '100%', height: 1.2 * s, backgroundColor: '#FFFFFF' }} />
      </div>

      {/* Lower Section: Bottom Teal Identity Banner */}
      <div
        className="relative flex flex-col items-center justify-center w-full"
        style={{
          height: '24%',
          backgroundColor: TEAL_PRIMARY,
          padding: (6 * s) + 'px ' + (10 * s) + 'px ' + (8 * s) + 'px',
          zIndex: 5,
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-montserrat), system-ui, sans-serif',
            fontSize: 14.8 * s,
            fontWeight: 700,
            letterSpacing: '0.07em',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            lineHeight: 1.15,
            margin: 0,
            textAlign: 'center',
          }}
        >
          {name}
        </h3>

        <div
          style={{
            marginTop: 5 * s,
            padding: (2.5 * s) + 'px ' + (8.5 * s) + 'px',
            borderRadius: 999,
            backgroundColor: 'rgba(255, 255, 255, 0.18)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            backdropFilter: 'blur(4px)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4.5 * s,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <span
            style={{
              width: 3.5 * s,
              height: 3.5 * s,
              borderRadius: '50%',
              backgroundColor: '#34D399',
              boxShadow: '0 0 6px rgba(52, 211, 153, 0.8)',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-montserrat), system-ui, sans-serif',
              fontSize: 5.6 * s,
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            {role}
          </span>
        </div>
      </div>
    </div>
  )
}
