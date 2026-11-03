import { Project } from '@/types/portfolio';

export const projects: Project[] = [
  {
    id: 'pwa-room-reservation',
    title: 'PWA Room Reservation System',
    category: 'Web Development / System Analysis',
    categoryFilter: 'Web Development',
    description: 'Progressive Web App for room reservation management at the Faculty of Engineering, Sam Ratulangi University.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'Firebase'],
    highlight: 'Lighthouse score of 100 in Cache Online and Cache Offline scenarios.',
  },
  {
    id: 'd-landrow',
    title: 'D-LANDROW',
    category: 'System Development',
    categoryFilter: 'System Analysis',
    description: 'Land acquisition and right-of-way project management system developed during the PLN internship.',
    technologies: ['Laravel', 'Tailwind CSS', 'MySQL'],
  },
  {
    id: 'attendance-tracking',
    title: 'Attendance Tracking System',
    category: 'Web Application',
    categoryFilter: 'Web Development',
    description: 'Web-based attendance system with geolocation and camera-based verification.',
    technologies: ['Laravel', 'MySQL', 'HTML5 Geolocation API'],
  },
  {
    id: 'visitor-registration',
    title: 'Visitor Registration System',
    category: 'Web Application',
    categoryFilter: 'Web Development',
    description: 'Digital visitor registration application with camera validation.',
    technologies: ['Laravel', 'JavaScript', 'MySQL'],
  },
  {
    id: 'calmie-mobile',
    title: 'CALMIE Mobile',
    category: 'UI/UX Design',
    categoryFilter: 'UI/UX Design',
    description: 'Mobile application concept designed to support users experiencing anxiety and panic attacks.',
    technologies: ['Figma', 'FigJam', 'Azure Speech-to-Text', 'Gemini API'],
  },
  {
    id: 'e-voting-unity',
    title: 'E-Voting App UNITY',
    category: 'UI/UX Design',
    categoryFilter: 'UI/UX Design',
    description: 'A digital voting application with web and mobile interfaces.',
    technologies: ['Figma', 'FigJam'],
  },
];

export const projectCategories = ['All', 'UI/UX Design', 'Web Development', 'System Analysis'];
