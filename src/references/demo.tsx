"use client"

import LanyardBadge from "../app/components/ui/lanyard-badge";

export default function Demo() {
  return (
    // w-full: 21st centres demos in a flex wrapper that would shrink this to 0px.
    <div className="relative w-full bg-[var(--color-background)]">
      <LanyardBadge />
    </div>
  )
}