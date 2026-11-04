import {
  FADE_DURATION,
  FRAME_COLORS,
  MAX_RECTANGLES,
  VISIBLE_DURATION,
} from './frame-config';
import {
  isInteractiveTarget,
  isTextTarget,
  type ActivePointer,
  type Frame,
} from './frame-utils';

export function createInteractiveFramesEngine(canvas: HTMLCanvasElement) {
  const canvasContext = canvas.getContext('2d');
  if (canvasContext === null) {
    throw new Error('InteractiveFrames could not initialize its canvas context.');
  }
  const context: CanvasRenderingContext2D = canvasContext;

  const frames: Frame[] = [];
  let activePointer: ActivePointer | null = null;
  let colorIndex = 0;
  let animationFrame = 0;
  let pixelRatio = 1;
  let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scheduleFrame = () => {
    if (!animationFrame) animationFrame = window.requestAnimationFrame(render);
  };

  const resizeCanvas = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    pixelRatio = Math.min(
      window.devicePixelRatio || 1,
      2,
      Math.sqrt(4_000_000 / Math.max(1, width * height)),
    );
    canvas.width = Math.max(1, Math.round(width * pixelRatio));
    canvas.height = Math.max(1, Math.round(height * pixelRatio));
    scheduleFrame();
  };

  function render(now: number) {
    animationFrame = 0;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, canvas.width / pixelRatio, canvas.height / pixelRatio);

    for (let index = frames.length - 1; index >= 0; index -= 1) {
      const frame = frames[index];
      if (frame.releasedAt !== null) {
        const age = now - frame.releasedAt;
        if (age >= VISIBLE_DURATION + FADE_DURATION) {
          frames.splice(index, 1);
          continue;
        }

        context.globalAlpha =
          age <= VISIBLE_DURATION || reducedMotion
            ? 0.78
            : 0.78 * (1 - (age - VISIBLE_DURATION) / FADE_DURATION);
      } else {
        context.globalAlpha = 0.78;
      }

      context.strokeStyle = frame.color;
      context.lineWidth = 1.2;
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      context.strokeRect(
        Math.min(frame.startX, frame.currentX) - scrollX,
        Math.min(frame.startY, frame.currentY) - scrollY,
        Math.abs(frame.currentX - frame.startX),
        Math.abs(frame.currentY - frame.startY),
      );
    }

    context.globalAlpha = 1;
    if (activePointer || frames.length > 0) scheduleFrame();
  }

  const beginFrame = (pointer: ActivePointer, x: number, y: number) => {
    const frame: Frame = {
      color: pointer.color,
      startX: pointer.startX,
      startY: pointer.startY,
      currentX: x,
      currentY: y,
      releasedAt: null,
    };
    pointer.frame = frame;
    frames.push(frame);
    if (frames.length > MAX_RECTANGLES) frames.shift();
    scheduleFrame();
  };

  const onPointerDown = (event: PointerEvent) => {
    if (
      activePointer ||
      !event.isPrimary ||
      (event.pointerType === 'mouse' && event.button !== 0) ||
      isInteractiveTarget(event.target) ||
      isTextTarget(event.target)
    ) {
      return;
    }

    const pointer: ActivePointer = {
      id: event.pointerId,
      startX: event.clientX + window.scrollX,
      startY: event.clientY + window.scrollY,
      startClientX: event.clientX,
      startClientY: event.clientY,
      color: FRAME_COLORS[colorIndex % FRAME_COLORS.length],
      frame: null,
      awaitingTouchIntent: event.pointerType === 'touch',
    };
    colorIndex += 1;
    activePointer = pointer;

    if (!pointer.awaitingTouchIntent) {
      beginFrame(pointer, event.clientX, event.clientY);
    }
  };

  const onPointerMove = (event: PointerEvent) => {
    const pointer = activePointer;
    if (!pointer || event.pointerId !== pointer.id) return;

    if (pointer.awaitingTouchIntent) {
      const deltaX = event.clientX - pointer.startClientX;
      const deltaY = event.clientY - pointer.startClientY;
      if (Math.hypot(deltaX, deltaY) < 10) return;

      if (Math.abs(deltaY) > Math.abs(deltaX) * 0.8) {
        activePointer = null;
        return;
      }

      pointer.awaitingTouchIntent = false;
      beginFrame(pointer, event.clientX + window.scrollX, event.clientY + window.scrollY);
    }

    if (!pointer.frame) return;
    pointer.frame.currentX = event.clientX + window.scrollX;
    pointer.frame.currentY = event.clientY + window.scrollY;
    scheduleFrame();
  };

  const finishPointer = (event: PointerEvent, cancelled: boolean) => {
    const pointer = activePointer;
    if (!pointer || event.pointerId !== pointer.id) return;

    if (pointer.frame) {
      const frame = pointer.frame;
      frame.currentX = event.clientX + window.scrollX;
      frame.currentY = event.clientY + window.scrollY;
      if (
        cancelled ||
        (Math.abs(frame.currentX - frame.startX) < 1 &&
          Math.abs(frame.currentY - frame.startY) < 1)
      ) {
        const index = frames.indexOf(frame);
        if (index !== -1) frames.splice(index, 1);
      } else {
        frame.releasedAt = performance.now();
      }
    }
    activePointer = null;
    scheduleFrame();
  };

  const onPointerUp = (event: PointerEvent) => finishPointer(event, false);
  const onPointerCancel = (event: PointerEvent) => finishPointer(event, true);
  const onWindowBlur = () => {
    if (activePointer?.frame) {
      const index = frames.indexOf(activePointer.frame);
      if (index !== -1) frames.splice(index, 1);
    }
    activePointer = null;
    scheduleFrame();
  };
  const onMotionPreferenceChange = (event: MediaQueryListEvent) => {
    reducedMotion = event.matches;
    scheduleFrame();
  };

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  window.addEventListener('pointerdown', onPointerDown, true);
  window.addEventListener('pointermove', onPointerMove, true);
  window.addEventListener('pointerup', onPointerUp, true);
  window.addEventListener('pointercancel', onPointerCancel, true);
  window.addEventListener('blur', onWindowBlur);
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('scroll', scheduleFrame, { capture: true, passive: true });
  motionPreference.addEventListener('change', onMotionPreferenceChange);
  resizeCanvas();

  return () => {
    window.removeEventListener('pointerdown', onPointerDown, true);
    window.removeEventListener('pointermove', onPointerMove, true);
    window.removeEventListener('pointerup', onPointerUp, true);
    window.removeEventListener('pointercancel', onPointerCancel, true);
    window.removeEventListener('blur', onWindowBlur);
    window.removeEventListener('resize', resizeCanvas);
    window.removeEventListener('scroll', scheduleFrame, true);
    motionPreference.removeEventListener('change', onMotionPreferenceChange);
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
  };
}
