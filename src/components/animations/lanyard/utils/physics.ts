export type Pt = { x: number; y: number; px: number; py: number; w: number };
export type Link = [number, number, number];
export type Spin = { a: number; v: number };

export function integrate(
  pts: Pt[],
  dt: number,
  gravity: number,
  damping: number,
) {
  for (const p of pts) {
    if (!p.w) continue;
    const vx = (p.x - p.px) * damping;
    const vy = (p.y - p.py) * damping;
    p.px = p.x;
    p.py = p.y;
    p.x += vx;
    p.y += vy + gravity * dt * dt;
  }
}

export function solve(pts: Pt[], links: Link[], iterations: number) {
  for (let k = 0; k < iterations; k++) {
    for (const [i, j, rest] of links) {
      const a = pts[i];
      const b = pts[j];
      const ws = a.w + b.w;
      if (!ws) continue;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const d = Math.hypot(dx, dy) || 1e-6;
      const f = (d - rest) / (d * ws);
      a.x += dx * f * a.w;
      a.y += dy * f * a.w;
      b.x -= dx * f * b.w;
      b.y -= dy * f * b.w;
    }
  }
}

export function spinStep(s: Spin, target: number, dt: number, drive: number) {
  s.v += (-(s.a - target) * 18 - s.v * 3.2 + drive) * dt;
  s.a += s.v * dt;
}

export function swingAngle(top: Pt, bottom: Pt) {
  return Math.atan2(bottom.x - top.x, bottom.y - top.y);
}
