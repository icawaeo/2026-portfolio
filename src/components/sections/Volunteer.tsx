'use client';

import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import Container from '@/components/shared/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { volunteerActivities } from '@/data/volunteer';

export default function Volunteer() {
  if (volunteerActivities.length === 0) {
    return (
      <section id="volunteer" className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            title="Giving Back & Getting Involved."
            subtitle="Community involvement, volunteering, and competitions."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-stone-50/50 py-16 px-6 text-center"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-stone-100">
              <Heart className="h-6 w-6 text-stone-400" />
            </div>
            <h3 className="text-lg font-semibold text-stone-700">More to Come</h3>
            <p className="mt-2 max-w-sm text-sm text-stone-500 leading-relaxed">
              This section will be updated with volunteer experiences, community involvement, and
              competition participations as they become available.
            </p>
          </motion.div>
        </Container>
      </section>
    );
  }

  return (
    <section id="volunteer" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          title="Giving Back & Getting Involved."
          subtitle="Community involvement, volunteering, and competitions."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {volunteerActivities.map((activity, index) => (
            <motion.article
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-xl border border-stone-200 bg-white p-6"
            >
              <p className="text-xs font-medium uppercase tracking-widest text-stone-400 mb-2">
                {activity.period}
              </p>
              <h3 className="text-base font-semibold text-stone-900">{activity.title}</h3>
              <p className="mt-1 text-sm text-stone-500">{activity.organization}</p>
              <p className="mt-1 text-sm font-medium text-stone-600">{activity.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-stone-500">{activity.description}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
