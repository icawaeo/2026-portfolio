'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Container from '@/components/shared/Container';
import SectionHeading from '@/app/components/ui/SectionHeading';
import ProjectCard from '@/app/components/ui/ProjectCard';
import { projects, projectCategories } from '@/data/projects';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.categoryFilter === activeCategory);

  return (
    <section id="projects" className="py-20 sm:py-28 bg-stone-50/50">
      <Container>
        <SectionHeading
          title="Things I've Built."
          subtitle="A collection of projects that showcase my design, analysis, and development work."
        />

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-10 flex flex-wrap gap-2"
        >
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300 hover:text-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

