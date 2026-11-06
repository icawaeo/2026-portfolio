'use client';

import { motion } from 'motion/react';
import { Send } from 'lucide-react';
import Container from '@/components/shared/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import SocialLinks from '@/components/ui/SocialLinks';
import { personalInfo } from '@/data/personal';

export default function Contact() {
  return (
    <section id="contact" className="bg-stone-50/50 py-14 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            title="Let's Create Something Together."
            subtitle="Have a project in mind, an opportunity to share, or simply want to connect? I'd love to hear from you."
            align="center"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-8"
          >
            <Button
              href={`mailto:${personalInfo.email}`}
              variant="primary"
              size="lg"
            >
              <Send className="h-4 w-4" />
              Contact Me
            </Button>

            <SocialLinks links={personalInfo.socialLinks} className="justify-center" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
