'use client';

import { motion } from 'motion/react';
import { Users } from 'lucide-react';
import Container from '@/components/shared/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Badge from '@/components/shared/Badge';
import { organizations } from '@/data/organizations';

export default function Organization() {
  return (
    <section id="activities" className="bg-stone-50/50 py-20 sm:py-28 2xl:py-32">
      <Container>
        <SectionHeading
          title="Beyond the Classroom."
          subtitle="Leadership, community engagement, and extracurricular involvement."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {organizations.map((org, index) => (
            <motion.article
              key={org.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group flex flex-col rounded-xl border border-stone-200 bg-white p-6 transition-all duration-300 hover:border-stone-300 hover:shadow-md xl:p-8"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-stone-100 bg-stone-50 xl:h-12 xl:w-12">
                <Users className="h-5 w-5 text-stone-600 xl:h-6 xl:w-6" />
              </div>

              <Badge variant="outline" className="self-start mb-3">
                {org.period}
              </Badge>

              <h3 className="text-base font-semibold text-stone-900 xl:text-lg">{org.name}</h3>
              <p className="mt-1 text-sm font-medium text-stone-500 xl:text-base">{org.role}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-500 xl:text-base">{org.description}</p>

              <ul className="mt-4 space-y-1.5 pt-4 border-t border-stone-100">
                {org.contributions.map((contribution, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-stone-500 xl:text-sm">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-stone-400" />
                    {contribution}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
