'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Palette, FileSearch, Code2, Users } from 'lucide-react';
import { SkillCategory } from '@/types/portfolio';

interface SkillCardProps {
  category: SkillCategory;
  index: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Palette,
  FileSearch,
  Code2,
  Users,
};

export default function SkillCard({ category, index }: SkillCardProps) {
  const [isExpanded, setIsExpanded] = useState(index === 0);
  const Icon = iconMap[category.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left rounded-xl border border-stone-200 bg-white transition-all duration-300 hover:border-stone-300 hover:shadow-md overflow-hidden cursor-pointer"
      >
        <div className="flex items-center justify-between p-5 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone-50 border border-stone-100">
              {Icon && <Icon className="h-5 w-5 text-stone-600" />}
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900">{category.title}</h3>
              <p className="text-xs text-stone-400 mt-0.5">{category.skills.length} skills</p>
            </div>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-stone-400 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                <div className="flex flex-wrap gap-2 pt-3 border-t border-stone-100">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-stone-50 border border-stone-200 px-3 py-1.5 text-sm text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}
