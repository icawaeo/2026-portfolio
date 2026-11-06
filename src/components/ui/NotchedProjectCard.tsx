"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface NotchedProjectCardProps {
  href?: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  badge?: string;
  notchLogo?: { src: string; alt: string };
  tags?: string[];
  highlights?: string[];
  screen?: { src: string; alt: string; className?: string };
  dim?: number;
  monochrome?: boolean;
  surface?: string;
  accent?: string;
  accentForeground?: string;
  className?: string;
}

const DISC = 64;
const BLOCK = 80;
const FILLET = 28;

export function NotchedProjectCard({
  href,
  title,
  subtitle,
  description,
  image,
  imageAlt = "",
  badge,
  notchLogo,
  tags = [],
  highlights = [],
  screen,
  dim = screen ? 0.45 : 0,
  monochrome = false,
  surface = "var(--color-background)",
  accent,
  accentForeground = "#0a0a0a",
  className,
}: NotchedProjectCardProps) {
  const tone = monochrome
    ? "grayscale transition-[filter,scale] duration-500 group-hover:grayscale-0 group-focus-visible:grayscale-0"
    : "transition-[scale] duration-500";
  const cardClassName = cn(
    "group flex flex-col rounded-[28px] outline-none",
    href &&
      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background",
    className,
  );

  const content = (
    <>
      <div className="relative">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-muted">
          {image ? (
            <Image
              src={image}
              alt={screen ? "" : imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized={!image.startsWith("/")}
              className={cn(
                "absolute inset-0 h-full w-full object-cover",
                tone,
                !screen && "group-hover:scale-[1.04]",
              )}
            />
          ) : (
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_25%,rgba(245,158,11,0.5),transparent_35%),linear-gradient(135deg,#292524,#57534e_55%,#a8a29e)]"
            />
          )}
          {dim > 0 && (
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ backgroundColor: `rgb(0 0 0 / ${dim})` }}
            />
          )}
          {screen && (
            <Image
              src={screen.src}
              alt={screen.alt}
              width={800}
              height={600}
              unoptimized={!screen.src.startsWith("/")}
              className={cn(
                "absolute bottom-0 right-0 w-[82%] origin-bottom-right drop-shadow-[0_18px_40px_rgba(0,0,0,0.5)] group-hover:scale-[1.07]",
                tone,
                screen.className,
              )}
            />
          )}
          {badge && (
            <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center pt-4">
              <span className="rounded-full border border-white/40 bg-black/30 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                {badge}
              </span>
            </div>
          )}
        </div>

        <div
          aria-hidden
          className="absolute bottom-0 right-0"
          style={{
            width: BLOCK,
            height: BLOCK,
            borderTopLeftRadius: BLOCK - DISC / 2,
            background: surface,
          }}
        />
        {[
          { bottom: BLOCK, right: 0 },
          { bottom: 0, right: BLOCK },
        ].map((pos, i) => (
          <div
            key={i}
            aria-hidden
            className="absolute"
            style={{
              ...pos,
              width: FILLET,
              height: FILLET,
              background: `radial-gradient(circle at top left, transparent ${FILLET - 0.5}px, ${surface} ${FILLET}px)`,
            }}
          />
        ))}

        {notchLogo ? (
          <span
            className="absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-white p-1 shadow-sm transition-transform duration-300 group-hover:scale-105"
            style={{ width: DISC, height: DISC }}
          >
            <Image
              src={notchLogo.src}
              alt={notchLogo.alt}
              width={56}
              height={56}
              unoptimized={!notchLogo.src.startsWith("/")}
              className="h-full w-full object-contain"
            />
          </span>
        ) : href ? (
          <span
            aria-hidden
            className={cn(
              "absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-[background-color,color,scale] duration-300 group-hover:scale-105",
              accent
                ? "group-hover:bg-[var(--card-accent)] group-hover:text-[var(--card-accent-fg)]"
                : "group-hover:bg-primary group-hover:text-primary-foreground",
            )}
            style={
              {
                width: DISC,
                height: DISC,
                "--card-accent": accent,
                "--card-accent-fg": accentForeground,
              } as React.CSSProperties
            }
          >
            <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        ) : null}
      </div>

      <h3 className="mt-5 text-2xl font-medium tracking-tight text-foreground">{title}</h3>
      {subtitle && <p className="mt-1 text-sm font-medium text-muted-foreground">{subtitle}</p>}
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      )}
      {highlights.length > 0 && (
        <ul className="mt-4 space-y-1.5 border-t border-stone-200/70 pt-4">
          {highlights.map((highlight, i) => (
            <li key={`${highlight}-${i}`} className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-stone-400" />
              {highlight}
            </li>
          ))}
        </ul>
      )}
      {tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <li
              key={`${tag}-${i}`}
              className="rounded-md bg-secondary px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-secondary-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </>
  );

  return href ? (
    <a href={href} className={cardClassName}>
      {content}
    </a>
  ) : (
    <article className={cardClassName}>{content}</article>
  );
}

export default NotchedProjectCard;
