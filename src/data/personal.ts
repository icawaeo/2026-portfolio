import { PersonalInfo, NavItem } from '@/types/portfolio';

export const personalInfo: PersonalInfo = {
  name: 'Veronica Waeo',
  firstName: 'Veronica',
  tagline: 'Informatics Engineering Graduate | UI/UX Designer | System Analyst | Web Developer',
  description: 'I enjoy turning complex problems into intuitive digital experiences through thoughtful design, structured analysis, and technology.',
  email: 'veronica.waeo@email.com',
  location: 'Manado, Indonesia',
  availability: 'Open to opportunities',
  cvPath: '/cv/veronica-waeo-cv.pdf',
  socialLinks: [
    { platform: 'Email', url: 'mailto:veronica.waeo@email.com', icon: 'Mail' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/veronicawaeo', icon: 'Linkedin' },
    { platform: 'GitHub', url: 'https://github.com/veronicawaeo', icon: 'Github' },
    { platform: 'Behance', url: 'https://behance.net/veronicawaeo', icon: 'Behance' },
  ],
  stats: [
    { value: '3.91/4.00', label: 'GPA' },
    { value: '3+', label: 'Years UI/UX Experience' },
    { value: '5+', label: 'Design & Dev Projects' },
  ],
};

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Activities', href: '#activities' },
  { label: 'Contact', href: '#contact' },
];
