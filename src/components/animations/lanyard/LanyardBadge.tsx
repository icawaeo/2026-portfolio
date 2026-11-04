"use client"
import * as React from "react"
import { DISPLAY } from './lanyard-config'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { useLanyardPhysics } from './hooks/useLanyardPhysics'
import { Arrow, Ornament } from './components/BadgeOrnaments'
import { DefaultBadgeFront } from './components/DefaultBadgeFront'
export { integrate, solve, spinStep, swingAngle } from './utils/physics'
export type { Pt, Link, Spin } from './utils/physics'
export { DefaultBadgeFront } from './components/DefaultBadgeFront'

/**
 * Lanyard Badge — an event badge hanging from a patterned lanyard.
 *
 * Two strands come down from above the frame and meet at a side-release
 * buckle; a short strap and a ring hold the card. The strap is a verlet rope
 * drawn as a textured ribbon on a 2D canvas (the ornament, script line and
 * label are generated, not images). The card is real HTML turned in 3D with
 * CSS, so both faces can hold anything — pass `front` / `back`, or use the
 * built-in design and just change the words.
 *
 * Drag the card and the strap pulls taut; flick it sideways and it spins on
 * the ring; tap it (or press Enter) to flip it over.
 *
 * Self-contained: React is the only import. No 3D library, no model file.
 */

export interface LanyardBadgeProps {
  /** Card front. Replaces the built-in front entirely. */
  front?: React.ReactNode
  /** Card back. Replaces the built-in back entirely. */
  back?: React.ReactNode
  /** Built-in front: the event title. */
  title?: string
  /** Built-in front: the line under the title. */
  subtitle?: string
  /** Built-in back: the wearer's name. */
  name?: string
  /** Built-in back: the wearer's role. */
  role?: string
  /** Built-in front: wearer's profile photo URL. */
  photoUrl?: string
  /** Script line printed along the strap. */
  strapText?: string
  /** Condensed label printed along the strap, between the script lines. */
  strapLabel?: string
  /** Strap colour, #rrggbb. */
  strapColor?: string
  /** Ornament and print colour, on the strap and the built-in card. */
  inkColor?: string
  /** Built-in card stock colour. */
  cardColor?: string
  /** Show the "Show back / Show front" button in the top corner. */
  flipButton?: boolean
  /** Card width in px. Height follows at 3:2, strap width at a tenth. */
  cardWidth?: number
  /** Root height. A definite length — never a percentage. */
  height?: string
  /** Extra root class names. */
  className?: string
  /** Horizontal anchor point (0 to 1, or absolute px). Default is 0.5 (center). */
  anchorX?: number
  /** Top anchor Y offset in px. Default is -sw * 3 (behind/above top). */
  topOffset?: number
  /** Buckle Y position in px. If omitted, calculated automatically. */
  buckleY?: number
}


export default function LanyardBadge({
  front,
  back,
  name = "VERONICA WAEO",
  role = "UI/UX DESIGNER & SYSTEM ANALYST",
  photoUrl = "/images/profile.jpeg",
  strapText = "VERONICA WAEO",
  strapLabel = "UI/UX & SYSTEM ANALYST",
  strapColor = "#265E62",
  inkColor = "#D8EDE9",
  cardColor = "#e8dfcc",
  flipButton = true,
  cardWidth = 240,
  height = "100svh",
  className = "",
  anchorX,
  topOffset,
  buckleY,
}: LanyardBadgeProps) {
  const rootRef = React.useRef<HTMLElement | null>(null)
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const cardRef = React.useRef<HTMLDivElement | null>(null)
  const innerRef = React.useRef<HTMLDivElement | null>(null)
  const reduced = usePrefersReducedMotion()
  const flipRef = React.useRef<() => void>(() => {})
  // which face is turned toward the viewer; the effect owns the physics, this
  // mirrors it for the button label and survives the effect rebuilding
  const [showBack, setShowBack] = React.useState(false)
  const backRef = React.useRef(showBack)

  React.useEffect(() => {
    backRef.current = showBack
  }, [showBack])

  const cw = cardWidth
  const ch = Math.round(cardWidth * 1.5)
  const ringR = Math.max(7, Math.round(cw * 0.036))
  const clipH = Math.round(cw * 0.1)

  const look = React.useRef({ strapText, strapLabel, strapColor, inkColor })
  React.useEffect(() => {
    look.current = { strapText, strapLabel, strapColor, inkColor }
  }, [strapText, strapLabel, strapColor, inkColor])
  const lookKey = [strapText, strapLabel, strapColor, inkColor].join("|")

  useLanyardPhysics({
    rootRef,
    canvasRef,
    cardRef,
    innerRef,
    reduced,
    cw,
    ch,
    ringR,
    clipH,
    look,
    lookKey,
    anchorX,
    topOffset,
    buckleY,
    backRef,
    flipRef,
    setShowBack,
  })


  const face: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: cw * 0.06,
    overflow: "hidden",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    boxShadow: "0 18px 40px -12px rgba(0,0,0,0.45), 0 2px 6px rgba(0,0,0,0.2)",
  }
  const shade = (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background:
          "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.28) 50%, transparent 65%) var(--lyd-shine, 50%) 0 / 250% 100% no-repeat, rgba(0,0,0,var(--lyd-dim, 0))",
      }}
    />
  )
  const slot = (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: cw * 0.05,
        left: "50%",
        width: cw * 0.2,
        height: cw * 0.035,
        transform: "translateX(-50%)",
        borderRadius: 999,
        background: "rgba(0,0,0,0.28)",
        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)",
      }}
    />
  )
  const s = cw / 240 // built-in faces are laid out at 240px and scale with the card

  const defaultFront = (
    <DefaultBadgeFront
      cardWidth={cw}
      name={name}
      role={role}
      photoUrl={photoUrl}
    />
  )
  const defaultBack = (
    <div className="relative h-full w-full" style={{ background: cardColor }}>
      <Ornament className="absolute" style={{ width: 150 * s, right: -30 * s, top: 30 * s, color: inkColor, opacity: 0.6, maxWidth: "none" }} />
      <div className="absolute" style={{ left: 22 * s, top: 70 * s, color: strapColor }}>
        <Ornament style={{ width: 26 * s, color: inkColor }} />
        <div style={{ width: 16 * s, height: 2 * s, background: strapColor, margin: (14 * s) + "px 0 " + (8 * s) + "px" }} />
        <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 17 * s, lineHeight: 1.05, textTransform: "uppercase" }}>{name}</div>
        <div style={{ fontSize: 7 * s, marginTop: 3 * s, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.7 }}>{role}</div>
      </div>
      <div className="absolute overflow-hidden" style={{ left: 0, right: 0, bottom: 0, height: "44%", background: strapColor, borderTopLeftRadius: 40 * s, color: cardColor }}>
        <Ornament className="absolute" style={{ width: 230 * s, left: -20 * s, top: -40 * s, opacity: 0.85, maxWidth: "none" }} />
        <Arrow className="absolute" style={{ width: 12 * s, height: 220 * s, left: 150 * s, top: -40 * s, transform: "rotate(62deg)", maxWidth: "none" }} />
      </div>
    </div>
  )

  return (
    <section
      ref={rootRef}
      className={"relative w-full overflow-hidden select-none " + className}
      style={{ height }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", maxWidth: "none", display: "block", pointerEvents: "none" }}
      />
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-label="Badge. Drag to swing, press to flip."
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            flipRef.current()
          }
        }}
        aria-pressed={showBack}
        className="absolute left-0 top-0 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] pointer-events-auto"
        style={{ width: cw, height: ch + ringR + clipH, transformOrigin: "50% 0", cursor: "grab", touchAction: "none", willChange: "transform", pointerEvents: "auto" }}
      >
        {/* badge clip: hooks the ring, bites the card */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: cw * 0.075,
            height: clipH + cw * 0.05,
            transform: "translateX(-50%)",
            borderRadius: cw * 0.02,
            background: "linear-gradient(90deg, #f4efe4, #a8a090 50%, #ece6da)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.35)",
            zIndex: 2,
          }}
        />
        <div
          ref={innerRef}
          style={{ position: "absolute", left: 0, right: 0, top: ringR + clipH * 0.6, height: ch, transformStyle: "preserve-3d" }}
        >
          <div style={face}>
            {front ?? defaultFront}
            {slot}
            {shade}
          </div>
          <div style={{ ...face, transform: "rotateY(180deg)" }}>
            {back ?? defaultBack}
            {slot}
            {shade}
          </div>
        </div>
      </div>
      {flipButton && (
        <button
          type="button"
          onClick={() => flipRef.current()}
          aria-pressed={showBack}
          className="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-background)]/80 px-4 py-2 text-sm font-medium text-[var(--color-foreground)] shadow-sm backdrop-blur transition-colors hover:bg-[var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
        >
          <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-500 motion-reduce:transition-none" style={{ transform: showBack ? "scaleX(-1)" : "none" }}>
            <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
            <path d="M3 21v-5h5" />
          </svg>
          {showBack ? "Show front" : "Show back"}
        </button>
      )}
    </section>
  )
}
