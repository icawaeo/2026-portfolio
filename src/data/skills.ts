import { SkillCategory } from '@/types/portfolio';

export const skillCategories: SkillCategory[] = [
  {
    id: 'design',
    title: 'Design & Experience',
    icon: 'Palette',
    skills: [
      'UI/UX Design', 'User Research', 'Wireframing', 'Prototyping',
      'Design Systems', 'Responsive Design', 'Figma', 'FigJam',
      'Adobe XD', 'Canva', 'Photoshop',
    ],
  },
  {
    id: 'analysis',
    title: 'System & Analysis',
    icon: 'FileSearch',
    skills: [
      'Requirement Analysis', 'Business Process Modeling', 'UML Diagrams',
      'Entity Relationship Diagrams', 'Software Requirement Specification',
      'System Documentation', 'Draw.io', 'Jira', 'Miro',
    ],
  },
  {
    id: 'development',
    title: 'Development & Technology',
    icon: 'Code2',
    skills: [
      'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React.js', 'Next.js',
      'PHP', 'Laravel', 'Node.js', 'NestJS', 'PostgreSQL', 'MySQL',
      'Git', 'Docker', 'Postman',
    ],
  },
  {
    id: 'collaboration',
    title: 'Collaboration & Delivery',
    icon: 'Users',
    skills: [
      'Agile & Scrum', 'Project Coordination', 'Cross-functional Collaboration',
      'Technical Documentation', 'Problem Solving', 'Communication',
      'Teamwork', 'Mentoring',
    ],
  },
];
