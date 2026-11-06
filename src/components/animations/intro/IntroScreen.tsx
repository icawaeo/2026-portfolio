'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const GREETING = ['Hello,', "I'm"];
const INTRO_SEEN_KEY = 'portfolio-intro-seen';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeToReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

interface IntroScreenProps {
  onReveal: () => void;
  onExitComplete: () => void;
}

function hasSeenIntro() {
  try {
    return window.sessionStorage.getItem(INTRO_SEEN_KEY) === 'true';
  } catch (error) {
    if (error instanceof DOMException && error.name === 'SecurityError') {
      return false;
    }

    throw error;
  }
}

export default function IntroScreen({
  onReveal,
  onExitComplete,
}: IntroScreenProps) {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const revealed = useRef(false);
  const dismissed = useRef(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    const reveal = () => {
      if (revealed.current) return;
      revealed.current = true;
      onReveal();
      setVisible(false);
    };

    if (
      reducedMotion ||
      hasSeenIntro()
    ) {
      reveal();
      return;
    }

    const loadingTimer = window.setTimeout(() => {
      setLoading(true);
    }, 2600);
    const exitTimer = window.setTimeout(reveal, 4100);

    return () => {
      window.clearTimeout(loadingTimer);
      window.clearTimeout(exitTimer);
    };
  }, [onReveal, reducedMotion]);

  const handleExitComplete = () => {
    if (dismissed.current) return;
    dismissed.current = true;

    try {
      window.sessionStorage.setItem(INTRO_SEEN_KEY, 'true');
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'SecurityError')) {
        throw error;
      }
    }

    onExitComplete();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="portfolio-intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.65,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-50 px-6 text-center"
        >
          <div className="flex flex-col items-center">
            <h1
              aria-label="Hello, I'm Veronica Waeo."
              className="flex max-w-4xl flex-wrap justify-center gap-x-[0.24em] gap-y-1 text-[clamp(2rem,10vw,3rem)] font-extrabold tracking-tight text-stone-900 sm:text-6xl lg:text-7xl"
            >
              {GREETING.map((word, index) => (
                <motion.span
                  key={word}
                  aria-hidden="true"
                  initial={
                    reducedMotion ? false : { opacity: 0, y: 18 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.55,
                    delay: reducedMotion ? 0 : index * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                layoutId="portfolio-veronica-name"
                aria-hidden="true"
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.55,
                  delay: reducedMotion ? 0 : 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block whitespace-nowrap text-yellow-500"
              >
                Veronica Waeo
              </motion.span>
              <span aria-hidden="true" className="inline-block text-yellow-500">
                .
              </span>
            </h1>

            <div
              aria-hidden="true"
              className="mt-10 h-1 w-16 overflow-hidden rounded-full bg-yellow-100"
            >
              {loading && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.9,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                  className="h-full rounded-full bg-yellow-600"
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
