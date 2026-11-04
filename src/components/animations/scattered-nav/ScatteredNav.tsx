'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { NAV_BUTTONS, type NavButtonConfig } from './nav-config';

interface Offset {
  x: number;
  y: number;
}

function scrollToSection(href: string) {
  const element = document.getElementById(href.slice(1));
  if (!element) return;

  const top = element.getBoundingClientRect().top + window.scrollY - 76;
  window.scrollTo({
    top,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'instant'
      : 'smooth',
  });
}

function TaglineWord({
  word,
  index,
  progress,
  prefersReducedMotion,
}: {
  word: string;
  index: number;
  progress: MotionValue<number>;
  prefersReducedMotion: boolean;
}) {
  const start = index * 0.13;
  const opacity = useTransform(
    progress,
    [0, start, start + 0.2],
    prefersReducedMotion ? [1, 1, 1] : [0.18, 0.18, 1]
  );

  return (
    <motion.span className="inline-block" style={{ opacity }}>
      {word}
    </motion.span>
  );
}

function AnimatedNavButton({
  button,
  index,
  progress,
  offset,
  prefersReducedMotion,
  isActive,
  onActivate,
}: {
  button: NavButtonConfig;
  index: number;
  progress: MotionValue<number>;
  offset: Offset;
  prefersReducedMotion: boolean;
  isActive: boolean;
  onActivate: () => void;
}) {
  const x = useTransform(progress, [0, 0.26, 0.74, 1], prefersReducedMotion ? [0, 0, 0, 0] : [offset.x, offset.x * 0.82, offset.x * 0.25, 0]);
  const y = useTransform(progress, [0, 0.26, 0.74, 1], prefersReducedMotion ? [0, 0, 0, 0] : [offset.y, offset.y * 0.82, offset.y * 0.25, 0]);
  const rotate = useTransform(progress, [0, 0.3, 0.78, 1], prefersReducedMotion ? [0, 0, 0, 0] : [button.rotate, button.rotate * 0.7, button.rotate * 0.2, 0]);
  const scale = useTransform(progress, [0, 0.3, 0.8, 1], prefersReducedMotion ? [1, 1, 1, 1] : [1.38, 1.3, 1.08, 1]);
  const scatterLabelOpacity = useTransform(progress, [0, 0.78, 0.94, 1], [1, 1, 0, 0]);
  const navbarLabelOpacity = useTransform(progress, [0, 0.78, 0.94, 1], [0, 0, 1, 1]);
  const backgroundColor = useTransform(progress, [0, 0.55, 0.88, 1], [
    button.color,
    button.color,
    'rgba(0, 0, 0, 0)',
    'rgba(0, 0, 0, 0)',
  ]);
  const borderColor = useTransform(progress, [0, 0.55, 0.88, 1], [
    'rgba(255, 255, 255, 0.3)',
    'rgba(255, 255, 255, 0.3)',
    'rgba(0, 0, 0, 0)',
    'rgba(0, 0, 0, 0)',
  ]);
  const shadow = useTransform(progress, [0, 0.62, 0.88], [
    '0 10px 24px rgba(28, 25, 23, 0.14)',
    '0 5px 14px rgba(28, 25, 23, 0.09)',
    '0 0 0 rgba(28, 25, 23, 0)',
  ]);
  return (
    <motion.a
      href={button.href}
      onClick={(event) => {
        event.preventDefault();
        onActivate();
        scrollToSection(button.href);
      }}
      style={{ x, y, rotate, scale }}
      className="group relative inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-2"
      aria-label={`Navigate to ${button.label}`}
      aria-current={isActive ? 'location' : undefined}
      tabIndex={0}
      data-nav-index={index}
    >
      <motion.span
        className="relative inline-flex items-center justify-center whitespace-nowrap rounded-full border px-5 py-3 text-base font-semibold sm:px-7 sm:py-3.5 sm:text-lg"
        style={{ backgroundColor, borderColor, boxShadow: shadow }}
        whileHover={
          prefersReducedMotion ? undefined : { scale: 1.035, y: -2 }
        }
        transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      >
        <span
          className={`absolute inset-0 rounded-full shadow-lg transition-opacity duration-300 ease-out ${
            isActive
            ? 'opacity-100'
            : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
          } ${prefersReducedMotion ? 'transition-none' : ''}`}
          style={{
            backgroundColor: `color-mix(in srgb, ${button.color} ${isActive ? '100%' : '50%'}, transparent)`,
          }}
          aria-hidden="true"
        />
        <span
          className={`absolute inset-0 rounded-full border transition-opacity duration-300 ease-out ${
            isActive
            ? 'opacity-100'
            : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
          } ${prefersReducedMotion ? 'transition-none' : ''}`}
          style={{ borderColor: button.color }}
          aria-hidden="true"
        />
        <span className="relative z-10 grid">
          <motion.span
            className="col-start-1 row-start-1 whitespace-nowrap font-semibold text-white"
            style={{ opacity: scatterLabelOpacity }}
          >
            {button.label}
          </motion.span>
          <motion.span
            className={`col-start-1 row-start-1 whitespace-nowrap transition-colors duration-300 ${
              isActive
                ? 'font-semibold text-white'
                : 'font-normal text-stone-700 group-hover:text-black/50 group-focus-visible:text-white'
            }`}
            style={{ opacity: navbarLabelOpacity }}
          >
            {button.label}
          </motion.span>
        </span>
      </motion.span>
    </motion.a>
  );
}

export default function ScatteredNav() {
  const sectionRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const buttonRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [offsets, setOffsets] = useState<Offset[]>(() =>
    NAV_BUTTONS.map(() => ({ x: 0, y: 0 }))
  );
  const [navVisible, setNavVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const headings = NAV_BUTTONS.map((button) => ({
      href: button.href,
      element:
        button.href === '#contact'
          ? document.querySelector(button.href)
          : document.querySelector(`${button.href} h2`),
    })).filter(
      (item): item is { href: string; element: Element } => item.element !== null
    );
    let frameId = 0;

    const updateActiveSection = () => {
      frameId = 0;
      const activationLine = window.innerHeight * 0.3;
      let activeSection: string | null = null;

      for (const { href, element } of headings) {
        const sectionLine =
          href === '#contact'
            ? window.innerHeight * 0.65
            : activationLine;
        if (element.getBoundingClientRect().top <= sectionLine) {
          activeSection = href;
        }
      }

      setActiveHref((current) =>
        current === activeSection ? current : activeSection
      );
    };

    const scheduleUpdate = () => {
      if (frameId === 0) frameId = window.requestAnimationFrame(updateActiveSection);
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frameId !== 0) window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    const measureOffsets = () => {
      const { innerWidth, innerHeight } = window;
      const isMobile = innerWidth < 640;
      const scatterScale = isMobile ? 1.24 : 1.38;

      setOffsets(
        NAV_BUTTONS.map((button, index) => {
          const element = buttonRefs.current[index];
          if (!element) return { x: 0, y: 0 };

          const finalCenterX = element.offsetLeft + element.offsetWidth / 2;
          const finalCenterY = element.offsetTop + element.offsetHeight / 2;
          const x = innerWidth * (isMobile ? button.mobileX : button.x);
          const y = innerHeight * (isMobile ? button.mobileY : button.y);
          const halfWidth = element.offsetWidth * scatterScale / 2;
          const halfHeight = element.offsetHeight * scatterScale / 2;
          const targetCenterX = Math.min(
            innerWidth - halfWidth - 12,
            Math.max(halfWidth + 12, x)
          );
          const targetCenterY = Math.min(
            innerHeight - halfHeight - 16,
            Math.max(halfHeight + 16, y)
          );

          return {
            x: targetCenterX - finalCenterX,
            y: targetCenterY - finalCenterY,
          };
        })
      );
    };

    const updateVisibility = () => {
      const section = sectionRef.current;
      if (section) setNavVisible(section.getBoundingClientRect().top <= 1);
    };

    measureOffsets();
    updateVisibility();
    window.addEventListener('resize', measureOffsets);
    window.addEventListener('scroll', updateVisibility, { passive: true });

    const resizeObserver = navRef.current
      ? new ResizeObserver(measureOffsets)
      : null;
    if (navRef.current && resizeObserver) resizeObserver.observe(navRef.current);

    return () => {
      window.removeEventListener('resize', measureOffsets);
      window.removeEventListener('scroll', updateVisibility);
      resizeObserver?.disconnect();
    };
  }, []);

  const navBackground = useTransform(scrollYProgress, [0, 0.62, 1], [
    'rgba(250, 250, 249, 0)',
    'rgba(250, 250, 249, 0.55)',
    'rgba(250, 250, 249, 0.92)',
  ]);
  const navBorder = useTransform(scrollYProgress, [0, 0.62, 1], [
    'rgba(231, 229, 228, 0)',
    'rgba(231, 229, 228, 0.35)',
    'rgba(231, 229, 228, 0.8)',
  ]);
  const navShadow = useTransform(scrollYProgress, [0, 0.7, 1], [
    '0 0 0 rgba(28, 25, 23, 0)',
    '0 2px 8px rgba(28, 25, 23, 0.03)',
    '0 2px 8px rgba(28, 25, 23, 0.06)',
  ]);

  return (
    <>
      <section
        ref={sectionRef}
        aria-label="Scattered navigation"
        className="relative h-[230svh] md:h-[240svh]"
        style={{ height: prefersReducedMotion ? '100svh' : undefined }}
      >
        <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-[radial-gradient(#e7e5e4_1px,transparent_1px)] [background-size:32px_32px] opacity-25" />
          </div>

          <p
            aria-label="I make buttons look clickable."
            className="pointer-events-none relative z-0 mx-auto max-w-[90vw] select-none text-center text-[clamp(2.7rem,8vw,6.8rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-stone-950 sm:max-w-[88vw]"
          >
            <TaglineWord word="I" index={0} progress={scrollYProgress} prefersReducedMotion={prefersReducedMotion} />{' '}
            <TaglineWord word="make" index={1} progress={scrollYProgress} prefersReducedMotion={prefersReducedMotion} />{' '}
            <TaglineWord word="buttons" index={2} progress={scrollYProgress} prefersReducedMotion={prefersReducedMotion} />
            <br />
            <TaglineWord word="look" index={3} progress={scrollYProgress} prefersReducedMotion={prefersReducedMotion} />{' '}
            <TaglineWord word="clickable." index={4} progress={scrollYProgress} prefersReducedMotion={prefersReducedMotion} />
          </p>
        </div>
      </section>

      <motion.header
        style={{
          backgroundColor: navBackground,
          borderColor: navBorder,
          boxShadow: navShadow,
        }}
        className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-opacity duration-300 ${
          navVisible ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        aria-hidden={!navVisible}
      >
        <nav
          ref={navRef}
          aria-label="Main navigation"
          className="mx-auto flex min-h-14 max-w-5xl flex-wrap items-center justify-center gap-1 px-2 py-2 sm:min-h-16 sm:gap-1.5 sm:px-4"
        >
          {NAV_BUTTONS.map((button, index) => (
            <span
              key={button.label}
              className="inline-flex"
              ref={(element) => {
                const anchor = element?.querySelector('a') ?? null;
                buttonRefs.current[index] = anchor;
              }}
            >
              <AnimatedNavButton
                button={button}
                index={index}
                progress={scrollYProgress}
                offset={offsets[index]}
                prefersReducedMotion={prefersReducedMotion}
                isActive={activeHref === button.href}
                onActivate={() => setActiveHref(button.href)}
              />
            </span>
          ))}
        </nav>
      </motion.header>
    </>
  );
}
