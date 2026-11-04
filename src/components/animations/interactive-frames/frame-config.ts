export const FRAME_COLORS = [
  '#7861FF',
  '#A78BFA',
  '#D8D1FF',
  '#FF79A9',
  '#60B5FF',
  '#4ADE80',
  '#FFBF24',
];

export const MAX_RECTANGLES = 20;
export const VISIBLE_DURATION = 2400;
export const FADE_DURATION = 1200;

export const INTERACTIVE_SELECTOR = [
  'a',
  'button',
  'input',
  'textarea',
  'select',
  'option',
  'label',
  'summary',
  '[role="button"]',
  '[role="link"]',
  '[role="slider"]',
  '[role="switch"]',
  '[role="checkbox"]',
  '[role="radio"]',
  '[role="tab"]',
  '[role="menuitem"]',
  '[role="textbox"]',
  '[contenteditable="true"]',
  '[draggable="true"]',
  '[data-no-interactive-frames]',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export const TEXT_SELECTOR =
  'p,h1,h2,h3,h4,h5,h6,span,li,blockquote,figcaption,dt,dd,th,td,small,strong,em,code';
