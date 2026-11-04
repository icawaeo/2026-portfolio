import * as React from 'react';

export function Ornament({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  const ring = Array.from({ length: 16 }, (_, i) => i * 22.5)
  return (
    <svg viewBox="-100 -100 200 200" fill="none" stroke="currentColor" strokeWidth={1.4} className={className} style={style} aria-hidden="true">
      <circle r={96} />
      <circle r={86} />
      <circle r={60} />
      <circle r={25} />
      {ring.map((a) => (
        <ellipse key={a} cx={0} cy={-73} rx={6.5} ry={12} transform={"rotate(" + a + ")"} />
      ))}
      {ring.map((a) => (
        <circle key={"d" + a} cx={0} cy={-91} r={1.8} fill="currentColor" transform={"rotate(" + (a + 11.25) + ")"} />
      ))}
      {ring.slice(0, 8).map((_, i) => (
        <path key={"p" + i} d="M0 -25 C 12 -38, 10 -50, 0 -58 C -10 -50, -12 -38, 0 -25" transform={"rotate(" + i * 45 + ")"} />
      ))}
      <circle r={6} fill="currentColor" />
    </svg>
  )
}

export function Arrow({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 20 200" fill="none" stroke="currentColor" strokeWidth={1.4} className={className} style={style} aria-hidden="true">
      <path d="M10 4 L10 196 M3 18 L10 4 L17 18 M4 182 L10 170 L16 182 M4 194 L10 182 L16 194" />
    </svg>
  )
}
