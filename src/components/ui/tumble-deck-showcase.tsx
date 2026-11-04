'use client';

import * as React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export type TumbleCard = {
  src?: string;
  alt?: string;
  title?: string;
  year?: number;
  category?: string;
  projectType?: string;
  description?: string;
  technologies?: string[];
  highlight?: string;
  accent?: string;
  onSelect?: () => void;
};

export type TumbleDeckShowcaseProps = {
  cards: TumbleCard[];
  height?: number | string;
  aspect?: number;
  scrollPerCard?: number;
  depth?: number;
  pinTargetRef?: React.RefObject<HTMLElement | null>;
  background?: string;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
};

export const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

export function fallAngle(progress: number): number {
  const clampedProgress = clamp01(progress);
  const landPoint = 0.78;

  if (clampedProgress <= landPoint) {
    const fallProgress = clampedProgress / landPoint;
    const easedFall = fallProgress ** 3 * (fallProgress * (fallProgress * 6 - 15) + 10);
    return -90 * easedFall;
  }

  const settleProgress = (clampedProgress - landPoint) / (1 - landPoint);
  return -90 + 3 * Math.sin(Math.PI * settleProgress) ** 2;
}

export function deckAdvance(position: number): number {
  const wholeCard = Math.floor(position);
  const progress = position - wholeCard;
  const easedProgress = clamp01((progress - 0.28) / 0.6);
  return wholeCard + easedProgress ** 2 * (3 - 2 * easedProgress);
}

type Pose = { angle: number; z: number; lift: number; opacity: number; flat: boolean };

function cardPose(cardIndex: number, position: number, depth: number): Pose {
  const elapsed = position - cardIndex;
  const lift = (cardIndex - Math.floor(position) + 3) * 0.6;

  if (elapsed >= 1) {
    return { angle: -90, z: 0, lift, opacity: elapsed < 3 ? 1 : 0, flat: true };
  }
  if (elapsed > 0) return { angle: fallAngle(elapsed), z: 0, lift, opacity: 1, flat: false };

  const relativeIndex = cardIndex - deckAdvance(position);
  return {
    angle: 0,
    z: -Math.max(relativeIndex, 0),
    lift: 0,
    opacity: clamp01(depth + 1 - relativeIndex),
    flat: false,
  };
}

export default function TumbleDeckShowcase({
  cards,
  height = '100svh',
  aspect = 1.45,
  scrollPerCard = 360,
  depth = 5,
  background = 'var(--color-background)',
  className,
  style,
  pinTargetRef,
  ariaLabel = 'Project showcase',
}: TumbleDeckShowcaseProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const sceneRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const position = React.useRef(0);
  const geometry = React.useRef({ height: 200, gap: 44 });
  const [frontCardIndex, setFrontCardIndex] = React.useState(0);
  const frontCardIndexRef = React.useRef(0);
  const dragRef = React.useRef<{ pointerId: number; y: number; moved: boolean } | null>(null);
  const triggerRef = React.useRef<ScrollTrigger | null>(null);
  const dragged = React.useRef(false);
  const userHasScrolled = React.useRef(false);
  const cardCount = cards.length;

  const paint = React.useCallback(() => {
    const nextFrontIndex = Math.max(0, Math.min(cardCount - 1, Math.floor(position.current + 0.5)));
    if (frontCardIndexRef.current !== nextFrontIndex) {
      frontCardIndexRef.current = nextFrontIndex;
      setFrontCardIndex(nextFrontIndex);
    }

    cardRefs.current.forEach((element, index) => {
      if (!element || index >= cardCount) return;
      const pose = cardPose(index, position.current, depth);
      element.style.zIndex = String(cardCount - Math.abs(index - Math.round(position.current)));
      element.style.transform = `translate3d(0, ${-pose.lift}px, ${pose.z * geometry.current.gap}px) rotateX(${pose.angle}deg)`;
      element.style.opacity = String(pose.opacity);
      element.style.visibility = pose.opacity > 0 ? 'visible' : 'hidden';
      element.style.setProperty('--td-shade', String(pose.flat ? 0.06 : (-pose.angle / 90) * 0.06));
    });
  }, [cardCount, depth]);

  React.useLayoutEffect(() => {
    const root = rootRef.current;
    const scene = sceneRef.current;
    if (!root || !scene) return;

    const fit = () => {
      const rootWidth = root.clientWidth;
      const rootHeight = root.clientHeight;
      const cardAspect = rootWidth < 520 ? Math.min(aspect, 1.25) : aspect;
      const widthFraction = rootWidth < 520 ? 0.9 : 0.92;
      const cardHeight = Math.max(60, Math.min((rootWidth * widthFraction) / cardAspect, rootHeight * 0.9, 620));
      const cardWidth = cardHeight * cardAspect;
      const top = Math.max(44, (rootHeight - cardHeight) / 2 + 52);

      geometry.current = { height: cardHeight, gap: 0.24 * cardHeight };
      scene.style.perspective = `${6 * cardHeight}px`;
      scene.style.perspectiveOrigin = `50% ${top - 0.6 * cardHeight}px`;
      root.style.setProperty('--td-w', `${cardWidth}px`);
      root.style.setProperty('--td-h', `${cardHeight}px`);
      root.style.setProperty('--td-top', `${top}px`);
      paint();
    };

    fit();
    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(root);
    return () => resizeObserver.disconnect();
  }, [aspect, paint]);

  React.useEffect(() => {
    const pinTarget = pinTargetRef?.current;
    if (!pinTarget || cardCount <= 1) {
      position.current = 0;
      paint();
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    userHasScrolled.current = false;
    const trigger = ScrollTrigger.create({
      trigger: pinTarget,
      pin: pinTarget,
      start: () => {
        const nav = document.querySelector<HTMLElement>('[aria-label="Main navigation"]');
        const heading = pinTarget.querySelector<HTMLElement>('h2');
        const headingOffset = heading
          ? heading.getBoundingClientRect().top - pinTarget.getBoundingClientRect().top
          : 0;
        const headingTarget = (nav?.getBoundingClientRect().height ?? 80) + 64;
        return `top top+=${Math.ceil(headingTarget - headingOffset)}`;
      },
      end: () => `+=${(cardCount - 1) * Math.max(window.innerHeight * 0.5, scrollPerCard)}`,
      scrub: reducedMotion ? false : 0.8,
      snap: reducedMotion
        ? undefined
        : {
            snapTo: (progress) =>
              userHasScrolled.current
                ? gsap.utils.snap(1 / (cardCount - 1), progress)
                : progress,
            directional: true,
            delay: 0.16,
            duration: { min: 0.55, max: 0.9 },
            ease: 'power3.inOut',
            inertia: false,
          },
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (!userHasScrolled.current) {
          position.current = 0;
          paint();
          return;
        }
        const deckPosition = self.progress * (cardCount - 1);
        position.current = reducedMotion ? Math.round(deckPosition) : deckPosition;
        paint();
      },
    });

    const markUserScroll = (event: Event) => {
      if (!event.isTrusted || !trigger.isActive) return;
      userHasScrolled.current = true;
    };
    const markKeyboardScroll = (event: KeyboardEvent) => {
      if (
        ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)
      ) {
        markUserScroll(event);
      }
    };

    window.addEventListener('wheel', markUserScroll, { passive: true });
    window.addEventListener('touchmove', markUserScroll, { passive: true });
    window.addEventListener('keydown', markKeyboardScroll);

    triggerRef.current = trigger;
    trigger.update();

    return () => {
      trigger.kill();
      window.removeEventListener('wheel', markUserScroll);
      window.removeEventListener('touchmove', markUserScroll);
      window.removeEventListener('keydown', markKeyboardScroll);
      if (triggerRef.current === trigger) triggerRef.current = null;
    };
  }, [cardCount, paint, pinTargetRef, scrollPerCard]);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || event.pointerType !== 'mouse') return;
      dragRef.current = { pointerId: event.pointerId, y: event.clientY, moved: false };
      dragged.current = false;
    };

    const onPointerMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      const deltaY = drag.y - event.clientY;
      drag.y = event.clientY;
      if (Math.abs(deltaY) < 1) return;
      drag.moved = true;
      dragged.current = true;
      if (!root.hasPointerCapture(event.pointerId)) root.setPointerCapture(event.pointerId);
      window.scrollBy({ top: deltaY, behavior: 'auto' });
    };

    const onPointerUp = (event: PointerEvent) => {
      if (dragRef.current?.pointerId === event.pointerId) dragRef.current = null;
    };

    root.addEventListener('pointerdown', onPointerDown);
    root.addEventListener('pointermove', onPointerMove);
    root.addEventListener('pointerup', onPointerUp);
    root.addEventListener('pointercancel', onPointerUp);
    return () => {
      root.removeEventListener('pointerdown', onPointerDown);
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerup', onPointerUp);
      root.removeEventListener('pointercancel', onPointerUp);
    };
  }, []);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowDown' && event.key !== 'ArrowLeft' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
    const nextPosition = Math.max(0, Math.min(cardCount - 1, Math.round(position.current) + direction));
    const trigger = triggerRef.current;
    if (trigger && cardCount > 1) {
      userHasScrolled.current = true;
      trigger.scroll(trigger.start + ((trigger.end - trigger.start) * nextPosition) / (cardCount - 1));
      ScrollTrigger.update();
    } else {
      position.current = nextPosition;
      paint();
    }
  };

  const activeCard = cards[frontCardIndex];

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={['td-root relative w-full touch-pan-y overflow-visible outline-none select-none', className].filter(Boolean).join(' ')}
      style={{ height, background, ...style }}
    >
      <style>{`
        .td-scene { position: absolute; inset: 0; transform-style: preserve-3d; }
        .td-meta { position: absolute; z-index: 20; top: 4px; left: 50%; display: grid; width: min(calc(var(--td-w) * 1.12), calc(100% - 32px)); grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 16px; transform: translateX(-50%); color: #0c0a09; font-family: var(--font-montserrat), sans-serif; font-size: clamp(13px, 1.35vw, 17px); font-weight: 600; line-height: 1.25; letter-spacing: -.025em; text-transform: uppercase; }
        .td-meta-title { min-width: 0; overflow-wrap: anywhere; }
        .td-meta-type { text-align: right; }
        .td-card { position: absolute; left: 50%; top: var(--td-top); width: var(--td-w); height: var(--td-h); margin-left: calc(var(--td-w) / -2); transform-origin: 50% 100%; transform-style: preserve-3d; backface-visibility: visible; will-change: transform; border-radius: 6px; overflow: visible; cursor: grab; background: #fff; box-shadow: 0 0 0 1px rgba(28,25,23,.12), 0 22px 54px rgba(28,25,23,.2); }
        .td-card:active { cursor: grabbing; }
        .td-card::after { content: ""; position: absolute; inset: 0; pointer-events: none; background: #000; opacity: var(--td-shade, 0); }
        .td-card-content { display: block; width: 100%; height: 100%; overflow: hidden; padding: 0; border: 0; border-radius: 6px; background: transparent; color: inherit; text-align: left; cursor: inherit; }
        .td-card-image { display: block; width: 100%; height: 100%; max-width: none; object-fit: cover; object-position: 50% 0%; pointer-events: none; }
        .td-project-face { display: flex; height: 100%; flex-direction: column; padding: clamp(14px, 2.2vw, 28px); background: radial-gradient(ellipse at 82% 18%, color-mix(in srgb, var(--td-accent) 20%, transparent), transparent 44%), linear-gradient(145deg, #fff 0%, color-mix(in srgb, var(--td-accent) 8%, #fff) 100%); }
        .td-project-top { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(28,25,23,.12); padding-bottom: 12px; color: #57534e; font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
        .td-project-body { display: flex; min-height: 0; flex: 1; flex-direction: column; justify-content: flex-start; }
        .td-project-title { margin: 8px 0; color: var(--td-accent); font-size: clamp(20px, 2.8vw, 36px); font-weight: 800; line-height: 1.06; }
        .td-project-description { display: -webkit-box; max-width: 46rem; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 2; color: #57534e; font-size: clamp(12px, 1.2vw, 14px); line-height: 1.45; }
        .td-project-bottom { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
        .td-project-tag { border: 1px solid rgba(28,25,23,.14); border-radius: 4px; background: rgba(255,255,255,.72); padding: 5px 8px; color: #57534e; font-size: 10px; font-weight: 600; }
        .td-project-highlight { margin-top: 8px; color: #292524; font-size: 12px; font-weight: 600; }
        .td-root:focus-visible { box-shadow: inset 0 0 0 2px var(--color-primary); }
        @media (max-width: 520px) { .td-meta { top: 4px; width: calc(100% - 24px); gap: 8px; font-size: clamp(11px, 3vw, 14px); } .td-project-face { padding: 14px; } .td-project-title { font-size: 24px; } .td-project-description { -webkit-line-clamp: 2; font-size: 12px; } .td-project-bottom { gap: 5px; margin-top: 12px; } .td-project-tag { padding: 4px 7px; font-size: 9px; } .td-project-highlight { display: none; } }
      `}</style>
      {activeCard && (
        <div className="td-meta" aria-hidden="true">
          <span className="td-meta-title">
            {activeCard.title ?? 'Selected project'}
            {activeCard.year ? ` - ${activeCard.year}` : ''}
          </span>
          <span className="td-meta-type">{activeCard.projectType ?? activeCard.category ?? 'Project'}</span>
        </div>
      )}
      <div ref={sceneRef} className="td-scene">
        {cards.map((card, cardIndex) => (
          <div
            key={card.title ?? cardIndex}
            ref={(element) => {
              cardRefs.current[cardIndex] = element;
            }}
            className="td-card"
            aria-hidden={cardIndex !== frontCardIndex}
          >
            <button
              type="button"
              className="td-card-content"
              aria-label={`View details for ${card.title ?? 'selected project'}`}
              tabIndex={cardIndex === frontCardIndex ? 0 : -1}
              onClick={() => {
                if (dragged.current) {
                  dragged.current = false;
                  return;
                }
                card.onSelect?.();
              }}
            >
              {card.src ? (
                <Image
                  src={card.src}
                  alt={card.alt ?? ''}
                  width={1200}
                  height={Math.round(1200 / aspect)}
                  draggable={false}
                  unoptimized
                  className="td-card-image"
                />
              ) : (
                <div className="td-project-face" style={{ '--td-accent': card.accent ?? '#0e7490' } as React.CSSProperties}>
                  <div className="td-project-top">
                    <span>{card.category ?? 'Project'}</span>
                    <span>{String(cardIndex + 1).padStart(2, '0')} / {String(cardCount).padStart(2, '0')}</span>
                  </div>
                  <div className="td-project-body">
                    <h3 className="td-project-title">{card.title ?? 'Selected project'}</h3>
                    <p className="td-project-description">{card.description}</p>
                    {card.highlight && <p className="td-project-highlight">{card.highlight}</p>}
                    <div className="td-project-bottom">
                      {card.technologies?.slice(0, 5).map((technology) => (
                        <span className="td-project-tag" key={technology}>{technology}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </button>
          </div>
        ))}
      </div>
      <span className="sr-only" aria-live="polite">
        {cardCount} projects. Showing {cards[frontCardIndex]?.title ?? 'selected project'}. Scroll, drag, click or use the arrow keys to browse.
      </span>
    </div>
  );
}