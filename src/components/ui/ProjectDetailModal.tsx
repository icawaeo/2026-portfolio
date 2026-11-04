'use client';

import { useId, useLayoutEffect, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import ProjectGallery from '@/components/ui/ProjectGallery';
import type { Project, ProjectDetail } from '@/types/portfolio';

interface ProjectDetailModalProps {
  project: Project | null;
  detail?: ProjectDetail;
  onClose: () => void;
}

function subscribeToNothing() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export default function ProjectDetailModal({
  project,
  detail,
  onClose,
}: ProjectDetailModalProps) {
  const mounted = useSyncExternalStore(subscribeToNothing, getClientSnapshot, getServerSnapshot);
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const summaryId = useId();

  useLayoutEffect(() => {
    if (!project || !mounted) return;

    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousBodyStyles = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
      htmlOverflow: html.style.overflow,
    };

    html.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    body.style.paddingRight = `${window.innerWidth - html.clientWidth}px`;
    closeButtonRef.current?.focus();

    return () => {
      body.style.position = previousBodyStyles.position;
      body.style.top = previousBodyStyles.top;
      body.style.width = previousBodyStyles.width;
      body.style.overflow = previousBodyStyles.overflow;
      body.style.paddingRight = previousBodyStyles.paddingRight;
      html.style.overflow = previousBodyStyles.htmlOverflow;
      window.scrollTo(0, scrollY);
      previousFocus?.focus();
    };
  }, [project, mounted]);

  const onDialogKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== 'Tab') return;

    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );
    if (focusable.length === 0) {
      event.preventDefault();
      dialog.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && detail ? (
        <motion.div
          key={project.id}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/65 p-0 backdrop-blur-sm sm:p-4 lg:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={summaryId}
            tabIndex={-1}
            onKeyDown={onDialogKeyDown}
            className="relative grid h-[100svh] max-h-[100svh] w-full grid-rows-[minmax(0,0.85fr)_minmax(0,1.15fr)] overflow-hidden bg-white text-stone-900 shadow-2xl outline-none sm:h-[88svh] sm:max-h-[900px] sm:rounded-[24px] lg:max-w-[1320px] lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:grid-rows-1"
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.985, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white/90 text-stone-600 shadow-sm transition hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-700 sm:right-6 sm:top-6"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="min-h-0 overflow-y-auto overscroll-contain px-6 pb-7 pt-14 sm:px-9 sm:pb-9 sm:pt-16 lg:px-11 lg:pb-10 lg:pt-12">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-stone-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-600">
                  {project.categoryFilter}
                </span>
                <span className="rounded-full border border-stone-200 px-3 py-1 text-[11px] font-medium text-stone-500">
                  {project.year}
                </span>
              </div>

              <h2 id={titleId} className="max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
                {project.title}
              </h2>
              <p id={summaryId} className="mt-3 max-w-xl text-sm leading-6 text-stone-500 sm:text-[15px]">
                {project.description}
              </p>

              {project.highlight && (
                <p className="mt-5 rounded-xl border border-amber-200/80 bg-amber-50/70 px-4 py-3 text-sm leading-6 text-amber-950">
                  {project.highlight}
                </p>
              )}

              <div className="mt-7 space-y-5">
                <section>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                    The challenge
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{detail.problem}</p>
                </section>
                <section>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                    Project goal
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{detail.goal}</p>
                </section>
                <section>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                    My contribution
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{detail.contribution}</p>
                </section>
              </div>

              <div className="mt-7 border-t border-stone-100 pt-5">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                  Role &amp; tools
                </h3>
                <p className="mt-2 text-sm font-medium leading-6 text-stone-700">{detail.role}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-1.5 text-xs font-medium text-stone-600"
                    >
                      <CheckCircle2 className="h-3 w-3 text-stone-400" />
                      {technology}
                    </span>
                  ))}
                </div>
              </div>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-stone-800 hover:text-stone-500"
                >
                  Visit project <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>

            <div className="flex min-h-0 flex-col border-t border-stone-100 bg-stone-50/70 px-4 pb-4 pt-3 sm:px-6 sm:pb-6 sm:pt-5 lg:border-l lg:border-t-0 lg:px-6 lg:pb-6 lg:pt-6">
              <div className="mb-3 flex shrink-0 items-center justify-between pr-12">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-700">
                    Project gallery
                  </h3>
                  <p className="mt-1 text-[11px] text-stone-400">
                    {detail.gallery.length} screens · scroll to explore
                  </p>
                </div>
              </div>
              <ProjectGallery images={detail.gallery} projectTitle={project.title} />
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
