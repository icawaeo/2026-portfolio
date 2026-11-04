'use client';

import { useState } from 'react';

export function BadgeFront({
  cardWidth,
  photoUrl = '/images/profile.jpeg',
}: {
  cardWidth: number;
  photoUrl?: string;
}) {
  const [currentSrc, setCurrentSrc] = useState(photoUrl);
  const [imgError, setImgError] = useState(false);
  const s = cardWidth / 240;

  const handleImgError = () => {
    if (currentSrc.endsWith('.jpeg')) {
      setCurrentSrc(currentSrc.replace('.jpeg', '.jpg'));
    } else if (currentSrc.endsWith('.jpg')) {
      setCurrentSrc(currentSrc.replace('.jpg', '.jpeg'));
    } else {
      setImgError(true);
    }
  };

  const BADGE_PRIMARY = '#1C1917';
  const BADGE_ACCENT = '#F59E0B';
  const BADGE_SURFACE = '#FAFAF9';

  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden select-none"
      style={{
        background: BADGE_SURFACE,
        color: '#FFFFFF',
        fontFamily: 'var(--font-montserrat), system-ui, sans-serif',
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: '76%',
          backgroundColor: BADGE_SURFACE,
          borderTopLeftRadius: cardWidth * 0.06,
          borderTopRightRadius: cardWidth * 0.06,
        }}
      >
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
                WebkitTextStroke: '1.2px rgba(120, 113, 108, 0.28)',
                textTransform: 'uppercase',
                lineHeight: 1,
                opacity: 0.9,
              }}
            >
              {txt}
            </span>
          ))}
        </div>

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
            border: '1.5px solid rgba(120, 113, 108, 0.22)',
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
              border: '1px dashed rgba(120, 113, 108, 0.24)',
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
                border: '1.5px solid rgba(120, 113, 108, 0.18)',
              }}
            />
          </div>
          <svg
            width={64 * s}
            height={64 * s}
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(120, 113, 108, 0.24)"
            strokeWidth="1.2"
            style={{ position: 'absolute' }}
          >
            <circle cx="12" cy="12" r="10" />
            <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9" />
          </svg>
        </div>

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
            <img
              src={currentSrc}
              alt="Veronica Waeo"
              draggable={false}
              onDragStart={(event) => event.preventDefault()}
              onError={handleImgError}
              onLoad={(e) => {
                const img = e.currentTarget;
                if (img.naturalWidth <= 1 && img.naturalHeight <= 1) {
                  setImgError(true);
                }
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 15%',
                display: 'block',
                filter: 'drop-shadow(0 4px 12px rgba(28, 25, 23, 0.18))',
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
                  backgroundColor: 'rgba(245, 158, 11, 0.12)',
                  border: '2px solid rgba(245, 158, 11, 0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: BADGE_PRIMARY,
                  boxShadow: '0 6px 18px rgba(28, 25, 23, 0.15)',
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
                    color: BADGE_PRIMARY,
                    marginTop: 2 * s,
                  }}
                >
                  VW
                </span>
              </div>
            </div>
          )}
        </div>

        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 30 * s,
            background:
              'linear-gradient(to bottom, rgba(28, 25, 23, 0.35) 0%, transparent 100%)',
            zIndex: 4,
            pointerEvents: 'none',
          }}
        />
      </div>

      <div
        style={{
          width: '100%',
          height: 6 * s,
          backgroundColor: BADGE_ACCENT,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: `${1 * s}px 0`,
          zIndex: 5,
        }}
      >
        <div style={{ width: '100%', height: 1.2 * s, backgroundColor: '#FFFFFF' }} />
        <div style={{ width: '100%', height: 1.2 * s, backgroundColor: '#FFFFFF' }} />
      </div>

      <div
        className="relative flex w-full flex-col items-center justify-center"
        style={{
          height: '24%',
          backgroundColor: BADGE_PRIMARY,
          padding: `${6 * s}px ${10 * s}px ${8 * s}px`,
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
          VERONICA WAEO
        </h3>

        <div
          style={{
            marginTop: 5 * s,
            padding: `${2.5 * s}px ${8.5 * s}px`,
            borderRadius: 999,
            backgroundColor: 'rgba(250, 250, 249, 0.12)',
            border: '1px solid rgba(250, 250, 249, 0.28)',
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
              backgroundColor: BADGE_ACCENT,
              boxShadow: '0 0 6px rgba(245, 158, 11, 0.8)',
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
            UI/UX DESIGNER & SYSTEM ANALYST
          </span>
        </div>
      </div>
    </div>
  );
}

export function BadgeBack({ cardWidth }: { cardWidth: number }) {
  const s = cardWidth / 240;

  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden select-none"
      style={{
        background: '#E8DFCC',
        color: '#25221F',
        fontFamily: 'var(--font-montserrat), system-ui, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3.5 * s,
          background: '#25221F',
        }}
      />

      <div
        style={{
          paddingTop: 30 * s,
          paddingLeft: 20 * s,
          paddingRight: 20 * s,
          paddingBottom: 10 * s,
        }}
      >
        <p
          style={{
            fontSize: 5.8 * s,
            fontWeight: 800,
            letterSpacing: '0.26em',
            color: '#78716C',
            textTransform: 'uppercase',
            marginBottom: 8 * s,
          }}
        >
          A LITTLE ABOUT ME
        </p>

        <h4
          style={{
            fontSize: 15 * s,
            fontWeight: 900,
            letterSpacing: '0.06em',
            color: '#1C1917',
            textTransform: 'uppercase',
            lineHeight: 1.15,
            marginBottom: 6 * s,
          }}
        >
          DESIGN.
          <br />
          ANALYZE.
          <br />
          BUILD.
        </h4>

        <div
          style={{
            width: 24 * s,
            height: 1.5 * s,
            background: '#25221F',
            marginBottom: 10 * s,
          }}
        />

        <p
          style={{
            fontSize: 6.2 * s,
            lineHeight: 1.55,
            color: '#44403C',
            marginBottom: 14 * s,
          }}
        >
          Curious mind, creative thinker, and problem solver. Always exploring how
          technology can make everyday experiences better.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 * s }}>
          {[
            { num: '01', title: 'UI/UX DESIGN' },
            { num: '02', title: 'SYSTEM ANALYSIS' },
            { num: '03', title: 'WEB DEVELOPMENT' },
          ].map((item) => (
            <div
              key={item.num}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7 * s,
              }}
            >
              <span
                style={{
                  fontSize: 5.8 * s,
                  fontWeight: 800,
                  color: '#A8A29E',
                  fontFamily: 'monospace',
                }}
              >
                {item.num}
              </span>
              <span
                style={{
                  width: 8 * s,
                  height: 1,
                  background: '#A8A29E',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 6.4 * s,
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  color: '#1C1917',
                  textTransform: 'uppercase',
                }}
              >
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="w-full flex items-center justify-center"
        style={{
          height: 28 * s,
          background: '#25221F',
          marginTop: 'auto',
        }}
      >
        <span
          style={{
            fontSize: 4.8 * s,
            fontWeight: 700,
            letterSpacing: '0.24em',
            color: '#D7C4A3',
            textTransform: 'uppercase',
          }}
        >
          ALWAYS LEARNING. ALWAYS BUILDING.
        </span>
      </div>
    </div>
  );
}
