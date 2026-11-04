'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Briefcase } from 'lucide-react';
import Badge from '@/components/shared/Badge';
import { Experience } from '@/types/portfolio';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export default function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 pb-10 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-[7px] top-3 bottom-0 w-px bg-stone-200 last:hidden" />

      {/* Timeline dot */}
      <div className="absolute left-0 top-2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-stone-300 bg-white">
        <div className="h-1.5 w-1.5 rounded-full bg-stone-400" />
      </div>

      {/* Card */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left rounded-xl border border-stone-200 bg-white p-5 sm:p-6 transition-all duration-300 hover:border-stone-300 hover:shadow-md cursor-pointer"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <Badge variant="outline">{experience.type}</Badge>
              <span className="text-xs text-stone-400">{experience.period}</span>
            </div>
            <h3 className="text-lg font-semibold text-stone-900">{experience.position}</h3>
            <p className="mt-0.5 flex items-center gap-1.5 text-sm text-stone-500">
              <Briefcase className="h-3.5 w-3.5" />
              {experience.organization}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-stone-500">{experience.description}</p>
          </div>
          <ChevronDown
            className={`h-5 w-5 flex-shrink-0 text-stone-400 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-stone-100">
                <h4 className="mb-2 text-sm font-medium text-stone-700">Key Responsibilities</h4>
                <ul className="space-y-1.5">
                  {experience.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-stone-500">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-stone-400" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                {experience.technologies.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-stone-50 px-2 py-0.5 text-xs font-medium text-stone-600 border border-stone-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}
