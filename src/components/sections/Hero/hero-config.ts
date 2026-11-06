export interface LanyardConfig {
  cardWidth: number;
  anchorX: number;
  buckleY: number;
}

export const DESKTOP_LANYARD_CONFIG: LanyardConfig = {
  cardWidth: 340,
  anchorX: 0.73,
  buckleY: 195,
};

export const LAPTOP_LANYARD_CONFIG: LanyardConfig = {
  cardWidth: 295,
  anchorX: 0.73,
  buckleY: 180,
};

export const TABLET_LANYARD_CONFIG: LanyardConfig = {
  cardWidth: 170,
  anchorX: 0.65,
  buckleY: 540,
};

export const MOBILE_LANYARD_CONFIG: LanyardConfig = {
  cardWidth: 150,
  anchorX: 0.6,
  buckleY: 570,
};

export const HERO_DESCRIPTION =
  'I design intuitive digital experiences, analyze complex systems, and build functional web applications. Passionate about connecting creativity, technology, and problem-solving.';
