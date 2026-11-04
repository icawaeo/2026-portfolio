export interface NavButtonConfig {
  label: string;
  href: string;
  color: string;
  x: number;
  y: number;
  mobileX: number;
  mobileY: number;
  rotate: number;
}

export const NAV_BUTTONS: NavButtonConfig[] = [
  { label: 'About', href: '#about', color: '#7861FF', x: 0.17, y: 0.16, mobileX: 0.24, mobileY: 0.13, rotate: -8 },
  { label: 'Experience', href: '#experience', color: '#A78BFA', x: 0.5, y: 0.16, mobileX: 0.76, mobileY: 0.32, rotate: 5 },
  { label: 'Projects', href: '#projects', color: '#FF79A9', x: 0.83, y: 0.16, mobileX: 0.76, mobileY: 0.13, rotate: 7 },
  { label: 'Skills', href: '#skills', color: '#60B5FF', x: 0.17, y: 0.84, mobileX: 0.24, mobileY: 0.76, rotate: -6 },
  { label: 'Activities', href: '#activities', color: '#4ADE80', x: 0.5, y: 0.84, mobileX: 0.24, mobileY: 0.32, rotate: 4 },
  { label: 'Contact', href: '#contact', color: '#FFBF24', x: 0.83, y: 0.84, mobileX: 0.76, mobileY: 0.76, rotate: -10 },
];
