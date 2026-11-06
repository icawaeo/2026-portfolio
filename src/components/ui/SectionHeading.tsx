'use client';

import { motion } from 'motion/react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  subtitleCentered?: boolean;
  className?: string;
  titleClassName?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = 'left',
  subtitleCentered = false,
  className = 'mb-12 md:mb-16',
  titleClassName = '',
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={`${className} ${align === 'center' ? 'text-center' : ''}`}
    >
      <h2 className={`text-[clamp(1.75rem,7vw,2.25rem)] font-bold leading-tight tracking-tight text-stone-900 sm:text-4xl lg:text-5xl 2xl:text-6xl ${titleClassName}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-3xl text-base text-stone-500 sm:text-lg xl:text-xl leading-relaxed ${subtitleCentered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
