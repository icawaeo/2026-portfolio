'use client';

import { useEffect, useRef } from 'react';
import './InteractiveFrames.css';
import { createInteractiveFramesEngine } from './frame-engine';

export default function InteractiveFrames() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (canvasElement === null) {
      throw new Error('InteractiveFrames could not find its canvas element.');
    }
    const canvas: HTMLCanvasElement = canvasElement;

    return createInteractiveFramesEngine(canvas);
  }, []);

  return <canvas ref={canvasRef} className="interactive-frames-canvas" aria-hidden="true" />;
}
