'use client';

import { motion } from 'motion/react';
import Container from '@/components/shared/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import NotchedProjectCard from '@/components/ui/NotchedProjectCard';
import { organizations } from '@/data/organizations';

export default function Organization() {
  return (
    <section id="activities" className="bg-stone-50/50 py-14 sm:py-28 2xl:py-32">
      <Container>
        <SectionHeading
          title="Beyond the Classroom."
          subtitle="Leadership, community engagement, and extracurricular involvement."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {organizations.map((org, index) => (
            <motion.div
              key={org.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="h-full"
            >
              <NotchedProjectCard
                title={org.name}
                subtitle={org.role}
                description={org.description}
                image={org.image}
                imageAlt={org.imageAlt}
                monochrome
                badge={org.period}
                notchLogo={{
                  src: '/images/logo-unsrat.png',
                  alt: 'Logo Universitas Sam Ratulangi',
                }}
                highlights={org.contributions}
                surface="#fafaf9"
                className="h-full"
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
