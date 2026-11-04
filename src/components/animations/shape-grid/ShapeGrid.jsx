'use client';
import { useEffect, useRef } from 'react';
import { useShapeGridCanvas } from './hooks/useShapeGridCanvas';
import './ShapeGrid.css';
import { SHAPES, DIRECTIONS } from './shape-grid-config';
import { clamp, fadeMask, lightnessOf } from './utils/geometry';

export default function ShapeGrid({
  shape = 'square',
  cellSize = 40,
  lineWidth = 1,
  direction = 'diagonal',
  speed = 0.5,
  lineColor = '#2a2734',
  hoverColor = '#ffffff',
  hoverFillColor,
  fillOpacity = 0.15,
  rainbow = false,
  tiltX = 0,
  tiltY = 0,
  radius = 1.5,
  trail = 0.6,
  glow = 0.35,
  twinkle = 0,
  fade = 1,
  clickCascade = true,
  intro = true,
  opacity = 1,
  backgroundColor = 'transparent',
  paused = false,
  dpr = undefined,
  className = '',
  style = undefined,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const settingsRef = useRef(null);
  useEffect(() => {
    settingsRef.current = {
      shape: SHAPES.includes(shape) ? shape : 'square',
      cellSize: Math.max(8, cellSize),
      lineWidth: Math.max(0.25, lineWidth),
      direction: DIRECTIONS[direction] ? direction : 'diagonal',
      speed: Math.max(0, speed),
      lineColor,
      hoverColor,
      hoverFillColor: hoverFillColor ?? hoverColor,
      fillOpacity: clamp(fillOpacity, 0, 1),
      rainbow,
      tone: clamp(lightnessOf(hoverColor), 0.45, 0.68),
      tiltX: clamp(tiltX, -70, 70),
      tiltY: clamp(tiltY, -70, 70),
      radius: Math.max(0, radius),
      trail: Math.max(0.05, trail),
      glow: clamp(glow, 0, 1),
      twinkle: clamp(twinkle, 0, 1),
      clickCascade,
      intro,
      paused,
      dpr
    };
    engineRef.current?.redraw();
  });
  useShapeGridCanvas(containerRef, canvasRef, engineRef, settingsRef);
  const mask = fadeMask(clamp(fade, 0, 1));
  return (
    <div
      ref={containerRef}
      className={`shape-grid ${className}`.trim()}
      style={{
        opacity: clamp(opacity, 0, 1),
        backgroundColor,
        ...(mask === 'none'
          ? null
          : {
              maskImage: mask,
              WebkitMaskImage: mask,
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in'
            }),
        ...style
      }}
    >
      <canvas ref={canvasRef} className="shape-grid-canvas" />
    </div>
  );
}
