import { Experience } from '@/types/portfolio';

export const experiences: Experience[] = [
  {
    id: 'pln-intern',
    position: 'IT Intern',
    logo: '/images/logo-pln.png',
    organization: 'PT PLN (Persero) – Unit Pelaksana Proyek Sulawesi Utara',
    period: 'June 2025 – August 2025',
    type: 'Internship',
    description: 'Contributed to the development and analysis of operational web-based systems for project management and administrative workflows.',
    highlights: [
      'Developed 3 operational web-based systems for attendance tracking, visitor registration, and land acquisition project management.',
      'Analyzed stakeholder requirements and documented system workflows, UML diagrams, ERDs, and SRS to guide development.',
      'Implemented facial verification and geolocation-based attendance features for 45 TAD employees.',
      'Developed project dashboards, document management, and hierarchical approval workflows supporting 50+ project documents.',
      'Created user guides and provided application training.',
      'Provided technical support including printer and scanner installation and configuration.',
    ],
    technologies: ['Laravel', 'MySQL', 'JavaScript', 'Microsoft Office', 'Draw.io'],
    gallery: [
      { src: '/images/experiences/pln-1.jpeg', alt: 'Dokumentasi magang di PLN' },
      { src: '/images/experiences/pln-2.jpeg', alt: 'Kegiatan proyek PLN' },
      { src: '/images/experiences/pln-3.jpeg', alt: 'Kegiatan proyek PLN' },
],
  },
  {
    id: 'unsrat-lab-assistant',
    position: 'Laboratory Assistant',
    logo: '/images/logo-lab.png',
    organization: 'UNSRAT Informatics Laboratory',
    period: 'February 2025 – July 2026',
    type: 'Part-time',
    description: 'Supported laboratory operations and facilitated academic activities for informatics students.',
    highlights: [
      'Supported laboratory operations and academic activities.',
      'Managed attendance records and tracked 30+ laboratory assets to maintain accurate inventory and documentation.',
      'Assisted students during practical sessions.',
    ],
    technologies: ['Microsoft Office', 'Google Workspace'],
  },
  {
    id: 'db-teaching-assistant',
    position: 'Lecturer Assistant – Database Technology',
    logo: '/images/logo-unsrat.png',
    organization: 'Sam Ratulangi University',
    period: 'May 2024 – November 2024',
    type: 'Academic',
    description: 'Assisted in delivering PostgreSQL practical sessions and managed academic administration.',
    highlights: [
      'Assisted lecturers in conducting Database Technology practical sessions for 50+ students.',
      'Guided students in database design, SQL queries, data manipulation, and PostgreSQL database management.',
      'Provided technical guidance and troubleshooting to support students in completing database practical assignments.',
    ],
    technologies: ['PostgreSQL', 'Docker', 'SQL'],
  },
];
