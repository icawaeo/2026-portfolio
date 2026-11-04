import { INTERACTIVE_SELECTOR, TEXT_SELECTOR } from './frame-config';

export interface Frame {
  color: string;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  releasedAt: number | null;
}

export interface ActivePointer {
  id: number;
  startX: number;
  startY: number;
  startClientX: number;
  startClientY: number;
  color: string;
  frame: Frame | null;
  awaitingTouchIntent: boolean;
}

export function isInteractiveTarget(target: EventTarget | null): boolean {
  return target instanceof Element && target.closest(INTERACTIVE_SELECTOR) !== null;
}

export function isTextTarget(target: EventTarget | null): boolean {
  return target instanceof Element && target.closest(TEXT_SELECTOR) !== null;
}
