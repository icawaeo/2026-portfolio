'use client';

import { motion } from 'motion/react';
import { GraduationCap, Award, Briefcase } from 'lucide-react';
import Container from '@/components/shared/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { personalInfo } from '@/data/personal';

const statIcons = [GraduationCap, Award, Briefcase];

export default function About() {
  return (
    <section id="about" className="bg-stone-50/50 py-14 sm:py-28 2xl:py-32 lg:pb-[18svh]">
      <Container>
        <SectionHeading title="A Little About Me." />

        <div className="grid gap-12 lg:grid-cols-5 xl:gap-16 2xl:gap-20">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="prose prose-stone max-w-none">
              <p className="text-base leading-relaxed text-stone-600 sm:text-lg 2xl:text-xl">
                I&apos;m an Informatics Engineering graduate from{' '}
                <strong className="text-stone-800">Sam Ratulangi University</strong> with a GPA of{' '}
                <strong className="text-stone-800">3.91/4.00</strong>. My journey in technology
                spans across UI/UX design, system analysis, and web application development.
              </p>
              <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg 2xl:text-xl">
                I&apos;m passionate about building user-centered and functional digital solutions
                that solve real problems. Whether it&apos;s designing intuitive interfaces,
                analyzing complex business requirements, or writing clean code, I bring a
                multidisciplinary approach to every project.
              </p>
              <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg 2xl:text-xl">
                I thrive in collaborative environments and enjoy working with multidisciplinary
                teams to create impactful technology solutions.
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="lg:col-span-2">
            <div className="grid gap-4 xl:gap-5">
              {personalInfo.stats.map((stat, index) => {
                const Icon = statIcons[index];
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="flex min-w-0 items-center gap-4 rounded-xl border border-stone-200 bg-white p-5 shadow-sm xl:gap-5 xl:p-6"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-stone-100 bg-stone-50 xl:h-14 xl:w-14">
                      <Icon className="h-5 w-5 text-stone-600 xl:h-6 xl:w-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-2xl font-bold text-stone-900 xl:text-3xl">{stat.value}</p>
                      <p className="text-sm text-stone-500 xl:text-base">{stat.label}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
