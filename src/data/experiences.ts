import { Experience } from '@/types/portfolio';

export const experiences: Experience[] = [
  {
    id: 'pln-intern',
    position: 'IT Intern',
    organization: 'PT PLN (Persero) – Unit Pelaksana Proyek Sulawesi Utara',
    period: 'June 2025 – August 2025',
    type: 'Internship',
    description: 'Contributed to the development and analysis of operational web-based systems for project management and administrative workflows.',
    highlights: [
      'Contributed to the development of operational web-based systems.',
      'Worked on attendance tracking, visitor registration, and project management applications.',
      'Translated stakeholder requirements into workflows, UML diagrams, and database structures.',
      'Assisted with system implementation and feature development.',
    ],
    technologies: ['Laravel', 'MySQL', 'JavaScript', 'UML', 'Draw.io'],
  },
  {
    id: 'unsrat-lab-assistant',
    position: 'Laboratory Assistant',
    organization: 'UNSRAT Informatics Laboratory',
    period: 'February 2025 – July 2026',
    type: 'Part-time',
    description: 'Supported laboratory operations and facilitated academic activities for informatics students.',
    highlights: [
      'Supported laboratory operations and academic activities.',
      'Assisted students during practical sessions.',
      'Managed laboratory assets and administrative documentation.',
    ],
    technologies: ['Lab Management', 'Documentation', 'Student Mentoring'],
  },
  {
    id: 'db-teaching-assistant',
    position: 'Lecturer Assistant – Database Technology',
    organization: 'Sam Ratulangi University',
    period: '2024',
    type: 'Academic',
    description: 'Assisted in delivering PostgreSQL practical sessions and managed academic administration.',
    highlights: [
      'Assisted lecturers in delivering PostgreSQL practical sessions.',
      'Supported academic administration, assignment grading, and score recording.',
    ],
    technologies: ['PostgreSQL', 'Database Design', 'SQL'],
  },
];
