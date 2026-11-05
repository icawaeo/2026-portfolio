'use client';

import { useContext, useEffect, useState, useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import { Download, ArrowDown } from 'lucide-react';
import Container from '@/components/shared/Container';
import Button from '@/components/ui/Button';
import ShapeGrid from '@/components/animations/shape-grid';
import { IntroRevealContext } from '@/components/layout/IntroExperience';
import { personalInfo } from '@/data/personal';
import {
  BadgeBack,
  BadgeFront,
} from './HeroBadge';
import {
  DESKTOP_LANYARD_CONFIG,
  HERO_DESCRIPTION,
  LAPTOP_LANYARD_CONFIG,
  MOBILE_LANYARD_CONFIG,
  TABLET_LANYARD_CONFIG,
  type LanyardConfig,
} from './hero-config';

const LanyardBadge = dynamic(
  () => import('@/components/animations/lanyard'),
  { ssr: false }
);


function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function subscribeToReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function subscribeWindowResize(callback: () => void) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

function getLanyardClientSnapshot(): LanyardConfig {
  if (typeof window === 'undefined') return DESKTOP_LANYARD_CONFIG;
  const width = window.innerWidth;
  if (width < 640) return MOBILE_LANYARD_CONFIG;
  if (width < 1024) return TABLET_LANYARD_CONFIG;
  if (width < 1600) return LAPTOP_LANYARD_CONFIG;
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
  const introContext = useContext(IntroRevealContext);
  const introComplete = introContext ?? true;
  const mounted = useIsMounted();
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const { cardWidth, anchorX, buckleY } = useLanyardConfig();
  const [typedDescription, setTypedDescription] = useState('');
  const heroName = personalInfo.name;
  const heroDescription = HERO_DESCRIPTION;

  useEffect(() => {
    if (!introComplete) return;

    if (reducedMotion) {
      const completionFrame = window.requestAnimationFrame(() => {
        setTypedDescription(heroDescription);
      });

      return () => window.cancelAnimationFrame(completionFrame);
    }

    let characterIndex = 0;
    const typingInterval = window.setInterval(() => {
      characterIndex += 1;
      setTypedDescription(heroDescription.slice(0, characterIndex));

      if (characterIndex >= heroDescription.length) {
        window.clearInterval(typingInterval);
      }
    }, 16);

    return () => window.clearInterval(typingInterval);
  }, [heroDescription, introComplete, reducedMotion]);

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
        <div className="absolute top-20 right-10 h-96 w-96 rounded-full bg-stone-200/40 blur-3xl xl:h-[28rem] xl:w-[28rem]" />
        <div className="absolute bottom-20 left-10 h-80 w-80 rounded-full bg-amber-100/30 blur-3xl xl:h-96 xl:w-96" />
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
            strapColor="#1C1917"
            inkColor="#FAFAF9"
            cardColor="#FAFAF9"
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
              animate={
                introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
              }
              transition={{ duration: reducedMotion ? 0 : 0.5 }}
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
              animate={
                introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
              }
              transition={{
                duration: reducedMotion ? 0 : 0.5,
                delay: reducedMotion ? 0 : 0.1,
              }}
              className="mb-2 text-lg font-semibold tracking-tight text-black sm:text-4xl lg:text-[clamp(2.5rem,3.2vw,3.75rem)]"
            >
              Hello, I&apos;m
            </motion.p>

            {/* Main heading */}
            <motion.h1
              aria-label={`${heroName}.`}
              initial={{ opacity: 0, y: 20 }}
              animate={
                introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: reducedMotion ? 0 : 0.6 }}
              className="text-3xl font-extrabold tracking-tight text-stone-900 sm:text-6xl lg:text-[clamp(4.5rem,5.2vw,6.25rem)]"
            >
              <motion.span
                layoutId="portfolio-veronica-name"
                aria-hidden="true"
                className="inline-flex origin-left -rotate-[5deg] whitespace-nowrap bg-yellow-500 px-5 py-2 text-white shadow-[8px_8px_0_rgba(234,179,8,0.35)] ring-1 ring-white/70 sm:px-6 sm:py-2.5"
              >
                {heroName}
              </motion.span>
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
              animate={
                introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{
                duration: reducedMotion ? 0 : 0.5,
                delay: reducedMotion ? 0 : 0.5,
              }}
              className="mt-15 min-h-[8.125em] max-w-2xl text-base leading-relaxed text-black-500 sm:min-h-[5em] sm:text-lg xl:text-xl"
              aria-label={heroDescription}
            >
              <span aria-hidden="true">{typedDescription}</span>
              <span
                aria-hidden="true"
                className={`ml-0.5 inline-block h-[1em] w-[0.06em] translate-y-[0.12em] bg-violet-600 ${
                  typedDescription.length < heroDescription.length
                    ? 'animate-pulse'
                    : 'opacity-0'
                }`}
              />
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{
                duration: reducedMotion ? 0 : 0.5,
                delay: reducedMotion ? 0 : 1,
              }}
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

            {/* Social Links
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={
                introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
              }
              transition={{
                duration: reducedMotion ? 0 : 0.5,
                delay: reducedMotion ? 0 : 1.2,
              }}
              className="mt-10 pt-6 border-t border-stone-200/60"
            >
              <SocialLinks links={personalInfo.socialLinks} />
            </motion.div>

            {/* Mobile-only interaction hint */}
            {/* <p className="mt-4 text-center text-[11px] font-medium tracking-widest uppercase text-stone-400 select-none lg:hidden">
              Drag to swing · Tap to flip
            </p> */}
          </div>

          {/* Right Column: Natural resting area for the badge on desktop (~42%) */}
          {/* <div className="lg:col-span-5 hidden lg:flex flex-col items-center justify-end pb-12 pointer-events-none min-h-[550px]">
            <div className="pointer-events-auto">
              <p className="text-center text-[11px] font-medium tracking-widest uppercase text-stone-400 select-none">
                Drag to swing · Tap to flip
              </p>
            </div>
          </div> */}
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={introComplete ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration: reducedMotion ? 0 : 0.5,
          delay: reducedMotion ? 0 : 1,
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-20 pointer-events-none"
      >
        <span className="text-[11px] font-medium tracking-widest uppercase text-stone-400">
          Explore my work
        </span>
        <motion.div
          animate={reducedMotion ? { y: 0 } : { y: [0, 5, 0] }}
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
