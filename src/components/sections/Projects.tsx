'use client';

import { useRef, useState } from 'react';
import Container from '@/components/shared/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectCard from '@/components/ui/ProjectCard';
import TumbleDeckShowcase, { type TumbleCard } from '@/components/ui/tumble-deck-showcase';
import { projects } from '@/data/projects';

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const deckCards: TumbleCard[] = projects.map((project) => ({
    src: project.imageUrl,
    alt: `${project.title} project preview`,
    title: project.title,
    year: project.year,
    category: project.category,
    projectType: `${project.categoryFilter} Project`,
    description: project.description,
    technologies: project.technologies,
    highlight: project.highlight,
    accent:
      project.categoryFilter === 'UI/UX Design'
        ? '#be123c'
        : project.categoryFilter === 'System Analysis'
          ? '#0e7490'
          : '#b45309',
    onSelect: () => setSelectedProjectId(project.id),
  }));

  const selectedProject = projects.find((project) => project.id === selectedProjectId);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative flex min-h-svh items-start overflow-visible bg-stone-50/50 py-0"
    >
      <Container className="w-full pt-2">
        <SectionHeading
          title="Things I've Built."
          subtitle="A collection of projects that showcase my design, analysis, and development work."
          align="center"
          subtitleCentered
          className="mb-10"
          titleClassName="!text-4xl !font-semibold sm:!text-5xl lg:!text-6xl"
        />

        <TumbleDeckShowcase
          cards={deckCards}
          height="min(54svh, 560px)"
          aspect={2.06}
          pinTargetRef={sectionRef}
          ariaLabel="Selected projects"
        />

        {selectedProject && (
          <ProjectCard
            project={selectedProject}
            index={0}
            showCard={false}
            isOpen
            onOpenChange={(isOpen) => {
              if (!isOpen) setSelectedProjectId(null);
            }}
          />
        )}
      </Container>
    </section>
  );
}
