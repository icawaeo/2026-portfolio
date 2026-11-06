import { Organization } from '@/types/portfolio';

export const organizations: Organization[] = [
  {
    id: 'it-community',
    name: 'UKM UNSRAT IT Community',
    role: 'UI/UX Coordinator',
    period: '2023 – 2024',
    description: 'Led UI/UX initiatives and coordinated design activities within the university IT community.',
    image: '/images/activities/unity-1.jpeg',
    imageAlt: 'Anggota UNSRAT IT Community berkumpul bersama',
    contributions: [
      'Coordinated UI/UX design workshops and knowledge-sharing sessions.',
      'Mentored junior members in design thinking and prototyping.',
      'Contributed to community project interfaces and visual identity.',
    ],
  },
  {
    id: 'hme-unsrat',
    name: 'Himpunan Mahasiswa Elektro Fakultas Teknik UNSRAT',
    role: 'Member of Academic & Reasoning Division',
    period: '2022 – 2023',
    description: 'Active member of the academic and reasoning division, supporting educational initiatives.',
    image: '/images/activities/hme-1.jpeg',
    imageAlt: 'Mahasiswa Himpunan Mahasiswa Elektro di acara TechFest',
    contributions: [
      'Participated in organizing academic events and competitions.',
      'Contributed to study group facilitation and peer learning activities.',
    ],
  },
  {
    id: 'penalaran-unsrat',
    name: 'UKM Penalaran UNSRAT',
    role: 'Satria Data Competition Member',
    period: '2023',
    description: 'Represented the university in data science and analytical reasoning competitions.',
    image: '/images/activities/penalaran-1.jpeg',
    imageAlt: 'Anggota UKM Penalaran UNSRAT bersama peserta kegiatan',
    contributions: [
      'Participated in Satria Data national competition.',
      'Developed analytical and data processing skills through competitive problem-solving.',
    ],
  },
];
