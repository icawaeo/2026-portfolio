'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { ExternalLink, FolderOpen, ArrowUpRight, X, Sparkles, CheckCircle2 } from 'lucide-react';
import Badge from '@/components/shared/Badge';
import { Project } from '@/types/portfolio';

interface ProjectCardProps {
  project: Project;
  index: number;
  showCard?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export default function ProjectCard({
  project,
  index,
  showCard = true,
  isOpen: controlledIsOpen,
  onOpenChange,
}: ProjectCardProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen ?? internalIsOpen;
  const setIsOpen = (nextIsOpen: boolean) => {
    if (controlledIsOpen === undefined) setInternalIsOpen(nextIsOpen);
    onOpenChange?.(nextIsOpen);
  };

  return (
    <>
      {showCard && (
        <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-xl"
      >
        {/* Thumbnail area with editorial gradient and category tag */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-stone-100 via-stone-50 to-stone-200/40 border-b border-stone-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80 shadow-xs backdrop-blur-xs transition-transform duration-500 group-hover:scale-110">
              <FolderOpen className="h-7 w-7 text-stone-600 transition-colors group-hover:text-amber-600" />
            </div>
          </div>

          {/* Top category label */}
          <div className="absolute top-3 left-3">
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-stone-600 shadow-2xs backdrop-blur-xs border border-stone-200/50">
              {project.categoryFilter}
            </span>
          </div>

          {project.highlight && (
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-medium text-amber-900 shadow-xs border border-amber-200/60 backdrop-blur-xs">
                <Sparkles className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                <span className="truncate">{project.highlight}</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="mb-1 text-xs font-semibold tracking-wider text-stone-400 uppercase">
            {project.category}
          </p>
          <h3 className="mb-2 text-lg font-bold tracking-tight text-stone-900 transition-colors group-hover:text-stone-700">
            {project.title}
          </h3>
          <p className="mb-4 flex-1 text-sm leading-relaxed text-stone-500 line-clamp-3">
            {project.description}
          </p>

          {/* Technology tags */}
          <div className="mb-5 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-stone-50 px-2.5 py-1 text-xs font-medium text-stone-600 border border-stone-200/60"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="rounded-md bg-stone-100/70 px-2 py-1 text-xs font-medium text-stone-500">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>

          {/* Action footer */}
          <div className="flex items-center justify-between pt-3 border-t border-stone-100 mt-auto">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-900 hover:text-stone-600 transition-colors cursor-pointer"
            >
              View Details
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {project.caseStudyUrl ? (
              <a
                href={project.caseStudyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-stone-500 hover:text-stone-800 transition-colors"
              >
                Case Study
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <span className="text-xs text-stone-400">Archived project</span>
            )}
          </div>
        </div>
        </motion.article>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-stone-950/40 backdrop-blur-xs transition-opacity"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.25 }}
              className="relative my-8 w-full max-w-5xl overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl sm:p-10 z-10"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-3">
                <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-stone-700">
                  {project.category}
                </span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl mb-3">
                {project.title}
              </h3>

              {project.imageUrl && (
                <Image
                  src={project.imageUrl}
                  alt={`${project.title} project preview`}
                  width={1600}
                  height={1000}
                  unoptimized
                  className="mb-6 max-h-[50svh] w-full rounded-lg border border-stone-200 object-cover object-top"
                />
              )}

              {project.highlight && (
                <div className="mb-5 flex items-center gap-2 rounded-xl bg-amber-50/80 p-3.5 border border-amber-200 text-sm font-medium text-amber-900">
                  <Sparkles className="h-4 w-4 text-amber-600 shrink-0" />
                  <span>{project.highlight}</span>
                </div>
              )}

              <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
                <p>{project.description}</p>
                <p className="text-stone-500 text-sm">
                  Engineered with an emphasis on maintainability, modular architecture, and seamless user interaction tailored for real-world academic and enterprise workflows.
                </p>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2.5">
                  Technologies &amp; Architecture
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700 border border-stone-200"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-stone-400" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-stone-100">
                <div className="flex items-center gap-2 text-xs text-stone-400">
                  <span>Category filter:</span>
                  <Badge variant="outline">{project.categoryFilter}</Badge>
                </div>

                <div className="flex items-center gap-2">
                  {project.caseStudyUrl && (
                    <a
                      href={project.caseStudyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Case Study
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full bg-stone-900 px-5 py-2 text-sm font-medium text-white hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
