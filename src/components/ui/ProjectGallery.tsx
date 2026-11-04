'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { ProjectGalleryImage } from '@/types/portfolio';

interface ProjectGalleryProps {
  images: ProjectGalleryImage[];
  projectTitle: string;
}

const AUTO_SCROLL_SPEED = 30;
const RESUME_DELAY = 1400;

export default function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || images.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let animationFrame = 0;
    let resumeTimer: number | undefined;
    let lastTimestamp = 0;
    let pauseUntil = 0;
    let nextScrollTop = viewport.scrollTop;
    let hovered = viewport.matches(':hover');

    const stopAnimation = () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      lastTimestamp = 0;
    };

    const animate = (timestamp: number) => {
      animationFrame = 0;
      const maxScroll = viewport.scrollHeight - viewport.clientHeight;

      if (maxScroll <= 1) return;
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = Math.min((timestamp - lastTimestamp) / 1000, 0.05);
      lastTimestamp = timestamp;
      nextScrollTop = Math.min(nextScrollTop + AUTO_SCROLL_SPEED * elapsed, maxScroll);
      if (nextScrollTop >= maxScroll) {
        viewport.scrollTop = maxScroll;
        return;
      }

      viewport.scrollTop = nextScrollTop;
      animationFrame = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (animationFrame || hovered || performance.now() < pauseUntil) return;
      lastTimestamp = 0;
      nextScrollTop = viewport.scrollTop;
      animationFrame = window.requestAnimationFrame(animate);
    };

    const scheduleResume = () => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        pauseUntil = 0;
        startAnimation();
      }, RESUME_DELAY);
    };

    const pauseForInteraction = () => {
      window.clearTimeout(resumeTimer);
      pauseUntil = performance.now() + RESUME_DELAY;
      nextScrollTop = viewport.scrollTop;
      stopAnimation();
    };

    const onPointerEnter = () => {
      hovered = true;
      stopAnimation();
    };
    const onPointerLeave = () => {
      hovered = false;
      scheduleResume();
    };
    const onTouchStart = () => pauseForInteraction();
    const onPointerDown = () => pauseForInteraction();
    const onPointerUp = () => scheduleResume();
    const onManualScroll = () => {
      pauseForInteraction();
      scheduleResume();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) {
        onManualScroll();
      }
    };

    viewport.addEventListener('pointerenter', onPointerEnter);
    viewport.addEventListener('pointerleave', onPointerLeave);
    viewport.addEventListener('pointerdown', onPointerDown);
    viewport.addEventListener('pointerup', onPointerUp);
    viewport.addEventListener('pointercancel', onPointerUp);
    viewport.addEventListener('wheel', onManualScroll, { passive: true });
    viewport.addEventListener('touchstart', onTouchStart, { passive: true });
    viewport.addEventListener('touchend', onPointerUp, { passive: true });
    viewport.addEventListener('keydown', onKeyDown);

    const resizeObserver = new ResizeObserver(startAnimation);
    resizeObserver.observe(viewport);
    const track = viewport.firstElementChild;
    if (track) resizeObserver.observe(track);
    startAnimation();

    return () => {
      stopAnimation();
      window.clearTimeout(resumeTimer);
      resizeObserver.disconnect();
      viewport.removeEventListener('pointerenter', onPointerEnter);
      viewport.removeEventListener('pointerleave', onPointerLeave);
      viewport.removeEventListener('pointerdown', onPointerDown);
      viewport.removeEventListener('pointerup', onPointerUp);
      viewport.removeEventListener('pointercancel', onPointerUp);
      viewport.removeEventListener('wheel', onManualScroll);
      viewport.removeEventListener('touchstart', onTouchStart);
      viewport.removeEventListener('touchend', onPointerUp);
      viewport.removeEventListener('keydown', onKeyDown);
    };
  }, [images.length]);

  return (
    <div
      ref={viewportRef}
      tabIndex={0}
      aria-label={`${projectTitle} project gallery. Scroll to view all images.`}
      className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-stone-400 sm:space-y-6"
    >
      {images.map((image, index) => (
        <figure
          key={`${image.caption}-${index}`}
          className="overflow-hidden rounded-xl border border-stone-200 bg-stone-50"
        >
          <div className="relative w-full" style={{ aspectRatio: image.aspectRatio }}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-contain"
            />
          </div>
          <figcaption className="border-t border-stone-200/80 bg-white px-4 py-3 text-xs font-medium text-stone-500 sm:text-sm">
            {image.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
