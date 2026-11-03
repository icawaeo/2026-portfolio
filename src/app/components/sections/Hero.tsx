'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import { Download, ArrowDown } from 'lucide-react';
import Container from '@/components/shared/Container';
import Button from '@/app/components/ui/Button';
import SocialLinks from '@/app/components/ui/SocialLinks';
import ShapeGrid from '@/components/ui/ShapeGrid';
import { personalInfo } from '@/data/personal';

// Dynamically import LanyardBadge with SSR disabled to safely handle browser APIs
const LanyardBadge = dynamic(
  () => import('@/components/ui/lanyard-badge'),
  { ssr: false }
);

/* ------------------------------------------------------------------ */
/*  Custom Badge Front: Personal Identity (Collegiate Photocard Style)*/
/* ------------------------------------------------------------------ */

function BadgeFront({
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

  // Teal Color Palette from reference photocard
  const TEAL_PRIMARY = '#3E8E93';
  const TEAL_DARK = '#265E62';
  const BG_MINT = '#F0F5F4';

  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden select-none"
      style={{
        background: BG_MINT,
        color: '#FFFFFF',
        fontFamily: 'var(--font-montserrat), system-ui, sans-serif',
      }}
    >
      {/* ──────────────── Upper Section: Photo Area (~76% Height) ──────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: '76%',
          backgroundColor: BG_MINT,
          borderTopLeftRadius: cardWidth * 0.06,
          borderTopRightRadius: cardWidth * 0.06,
        }}
      >
        {/* 1. Left Background Watermark (Repeating Vertical Name Outline) */}
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

        {/* 2. University / Academic Seal Watermark in Background */}
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

        {/* 3. The Photo Layer */}
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
              alt="Veronica Waeo"
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
                filter: 'drop-shadow(0 4px 12px rgba(38, 94, 98, 0.18))',
              }}
            />
          ) : (
            /* Fallback Collegiate Portrait Illustration */
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

        {/* Top subtle vignette for lanyard slot integration */}
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

      {/* ──────────────── Multi-Line Collegiate Divider Strip ──────────────── */}
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

      {/* ──────────────── Lower Section: Bottom Teal Identity Banner (~24% Height) ──────────────── */}
      <div
        className="relative flex flex-col items-center justify-center w-full"
        style={{
          height: '24%',
          backgroundColor: TEAL_PRIMARY,
          padding: (6 * s) + 'px ' + (10 * s) + 'px ' + (8 * s) + 'px',
          zIndex: 5,
        }}
      >
        {/* Name: Clean Geist Sans typography with refined letter-spacing */}
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

        {/* Role: Highlighted in a modern frosted pill badge with emerald indicator */}
        <div
          style={{
            marginTop: 5 * s,
            padding: `${2.5 * s}px ${8.5 * s}px`,
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
            UI/UX DESIGNER & SYSTEM ANALYST
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Custom Badge Back: Personal Manifesto                             */
/* ------------------------------------------------------------------ */

function BadgeBack({ cardWidth }: { cardWidth: number }) {
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
      {/* Top accent line */}
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

      {/* Main Content Area */}
      <div
        style={{
          paddingTop: 30 * s,
          paddingLeft: 20 * s,
          paddingRight: 20 * s,
          paddingBottom: 10 * s,
        }}
      >
        {/* Small Heading */}
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

        {/* Main Statement */}
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

        {/* Separator line */}
        <div
          style={{
            width: 24 * s,
            height: 1.5 * s,
            background: '#25221F',
            marginBottom: 10 * s,
          }}
        />

        {/* Description */}
        <p
          style={{
            fontSize: 6.2 * s,
            lineHeight: 1.55,
            color: '#44403C',
            marginBottom: 14 * s,
          }}
        >
          Curious mind, creative thinker, and problem solver. Always
          exploring how technology can make everyday experiences better.
        </p>

        {/* Three Areas of Expertise */}
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

      {/* Bottom Bar: Always Learning. Always Building. */}
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

/* ------------------------------------------------------------------ */
/*  Hero Section Component                                            */
/* ------------------------------------------------------------------ */

function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

interface LanyardConfig {
  cardWidth: number;
  anchorX: number;
  buckleY: number;
}

const DESKTOP_LANYARD_CONFIG: LanyardConfig = {
  cardWidth: 230,
  anchorX: 0.73,
  buckleY: 195,
};

const TABLET_LANYARD_CONFIG: LanyardConfig = {
  cardWidth: 230,
  anchorX: 0.5,
  buckleY: 180,
};

const MOBILE_LANYARD_CONFIG: LanyardConfig = {
  cardWidth: 200,
  anchorX: 0.5,
  buckleY: 370,
};

function subscribeWindowResize(callback: () => void) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

function getLanyardClientSnapshot(): LanyardConfig {
  if (typeof window === 'undefined') return DESKTOP_LANYARD_CONFIG;
  const width = window.innerWidth;
  if (width < 640) return MOBILE_LANYARD_CONFIG;
  if (width < 1024) return TABLET_LANYARD_CONFIG;
  return DESKTOP_LANYARD_CONFIG;
}

function getLanyardServerSnapshot(): LanyardConfig {
  return DESKTOP_LANYARD_CONFIG;
}

function useLanyardConfig(): LanyardConfig {
  return useSyncExternalStore(
    subscribeWindowResize,
    getLanyardClientSnapshot,
    getLanyardServerSnapshot
  );
}

export default function Hero() {
  const mounted = useIsMounted();
  const { cardWidth, anchorX, buckleY } = useLanyardConfig();
  const [typedName, setTypedName] = useState('');
  const heroName = personalInfo.name;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const completionFrame = window.requestAnimationFrame(() => {
        setTypedName(heroName);
      });

      return () => window.cancelAnimationFrame(completionFrame);
    }

    let characterIndex = 0;
    const typingInterval = window.setInterval(() => {
      characterIndex += 1;
      setTypedName(heroName.slice(0, characterIndex));

      if (characterIndex >= heroName.length) {
        window.clearInterval(typingInterval);
      }
    }, 65);

    return () => window.clearInterval(typingInterval);
  }, [heroName]);

  return (
    <section
      id="home"
      suppressHydrationWarning
      className="relative min-h-[850px] lg:min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Editorial background ambient shapes */}
      <div
        suppressHydrationWarning
        className="absolute inset-0 -z-10 pointer-events-none"
      >
        <div className="absolute top-20 right-10 w-96 h-96 bg-stone-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#e7e5e4_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <ShapeGrid
          shape="square"
          direction="diagonal"
          lineColor="#D8D1FF"
          hoverColor="#7861FF"
          hoverFillColor="#A78BFA"
          fillOpacity={0.12}
          cellSize={48}
          lineWidth={1}
          speed={0.25}
          tiltX={0}
          tiltY={0}
          radius={1.5}
          trail={0.6}
          glow={0.3}
          twinkle={0.03}
          fade={0.65}
          clickCascade={false}
          intro={true}
          opacity={0.8}
          rainbow={false}
          className="h-full w-full"
        />
      </div>

      {/* ───────────── Full-Bleed Interactive Lanyard Badge Layer (z-10) ───────────── */}
      {/*
        Spans the full Hero section.
        The strap originates from above the viewport (-70px) behind the fixed navbar (z-50).
        The card can be dragged freely across the full section, swinging behind the hero text (z-20).
      */}
      {mounted && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <LanyardBadge
            strapColor="#265E62"
            inkColor="#D8EDE9"
            cardColor="#F0F5F4"
            strapText="VERONICA WAEO"
            strapLabel="UI/UX & SYSTEM ANALYST"
            cardWidth={cardWidth}
            anchorX={anchorX}
            topOffset={-70}
            buckleY={buckleY}
            flipButton={false}
            height="100%"
            className="w-full h-full pointer-events-none"
            front={<BadgeFront cardWidth={cardWidth} />}
            back={<BadgeBack cardWidth={cardWidth} />}
          />
        </div>
      )}

      {/* ───────────── Hero Content Container (z-20) ───────────── */}
      {/*
        Sits in front of the lanyard badge (z-20 vs z-10).
        Text & CTA buttons remain fully readable and interactive as the card moves around/behind them.
      */}
      <Container className="relative z-20 pointer-events-none w-full">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-8">
          {/* Left Column: Introduction & CTAs (~58% on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-center pointer-events-auto">
            {/* Availability indicator */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex"
            >
              {/* <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 shadow-2xs backdrop-blur-xs">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Open to Opportunities
              </span> */}
            </motion.div>

            {/* Introductory label */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-stone-400"
            >
              HELLO, I&apos;M
            </motion.p>

            {/* Main heading */}
            <motion.h1
              aria-label={`${heroName}.`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl font-extrabold tracking-tight text-stone-900 sm:text-6xl lg:text-7xl"
            >
              <span
                aria-hidden="true"
                className="inline-flex whitespace-nowrap bg-violet-600 px-5 py-2 text-white shadow-[8px_8px_0_rgba(196,181,253,0.65)] ring-1 ring-white/70 sm:px-6 sm:py-2.5"
              >
                {typedName}
                <span
                  className={`ml-1 inline-block h-[0.8em] w-[0.07em] self-center rounded-sm bg-white ${
                    typedName.length < heroName.length ? 'animate-pulse' : 'opacity-0'
                  }`}
                />
              </span>
            </motion.h1>

            {/* Professional subtitle */}
            {/* <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-3 text-base font-semibold text-stone-700 sm:text-lg"
            >
              Informatics Engineering Graduate
            </motion.p> */}

            {/* Supporting text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4 max-w-xl text-base leading-relaxed text-stone-500 sm:text-lg"
            >
              I design intuitive digital experiences, analyze complex
              systems, and build functional web applications. Passionate
              about connecting creativity, technology, and
              problem-solving.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button
                href={personalInfo.cvPath}
                download
                variant="primary"
                size="lg"
              >
                <Download className="h-4 w-4" />
                Download CV
              </Button>
              <Button href="#projects" variant="secondary" size="lg">
                Explore My Work
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-10 pt-6 border-t border-stone-200/60"
            >
              <SocialLinks links={personalInfo.socialLinks} />
            </motion.div>

            {/* Mobile-only interaction hint */}
            <p className="mt-4 text-center text-[11px] font-medium tracking-widest uppercase text-stone-400 select-none lg:hidden">
              Drag to swing · Tap to flip
            </p>
          </div>

          {/* Right Column: Natural resting area for the badge on desktop (~42%) */}
          <div className="lg:col-span-5 hidden lg:flex flex-col items-center justify-end pb-12 pointer-events-none min-h-[550px]">
            <div className="pointer-events-auto">
              <p className="text-center text-[11px] font-medium tracking-widest uppercase text-stone-400 select-none">
                Drag to swing · Tap to flip
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-20 pointer-events-none"
      >
        <span className="text-[11px] font-medium tracking-widest uppercase text-stone-400">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ArrowDown className="h-4 w-4 text-stone-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
