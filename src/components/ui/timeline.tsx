"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useCallback, useRef, useSyncExternalStore } from "react";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
}

export const Timeline = ({ data }: TimelineProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const subscribeToHeight = useCallback((onStoreChange: () => void) => {
    const timeline = timelineRef.current;
    if (!timeline) return () => {};

    const resizeObserver = new ResizeObserver(onStoreChange);
    resizeObserver.observe(timeline);
    timeline.addEventListener("load", onStoreChange, true);
    onStoreChange();

    return () => {
      resizeObserver.disconnect();
      timeline.removeEventListener("load", onStoreChange, true);
    };
  }, []);
  const getHeightSnapshot = useCallback(
    () => timelineRef.current?.getBoundingClientRect().height ?? 0,
    [],
  );
  const height = useSyncExternalStore(subscribeToHeight, getHeightSnapshot, () => 0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={containerRef} className="relative w-full">
      <div ref={timelineRef} className="relative mx-auto w-full pb-12 md:pb-16">
        {data.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="relative flex justify-start pt-8 md:gap-12 md:pt-14 xl:gap-16"
          >
            <div className="absolute left-0 top-8 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-stone-50 md:hidden">
              <div className="h-4 w-4 rounded-full border-2 border-violet-300 bg-violet-100 shadow-[0_0_0_4px_rgb(250_248_255)]" />
            </div>

            <div className="sticky top-28 z-20 hidden h-fit self-start md:w-[38%] md:shrink-0 md:flex md:items-start xl:w-[42%]">
              <div className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-stone-50">
                <div className="h-4 w-4 rounded-full border-2 border-violet-300 bg-violet-100 shadow-[0_0_0_4px_rgb(250_248_255)]" />
              </div>
              <h3 className="pl-16 pt-1 text-4xl font-semibold leading-tight tracking-tight text-stone-900 lg:text-5xl 2xl:text-6xl">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full min-w-0 pl-20 pr-1 md:flex-1 md:pl-8 md:pr-4 xl:pl-12 xl:pr-6">
              <h3 className="mb-3 text-2xl font-semibold leading-tight tracking-tight text-stone-900 md:hidden">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        <div
          aria-hidden="true"
          style={{ height }}
          className="absolute left-5 top-0 w-0.5 overflow-hidden rounded-full bg-gradient-to-b from-transparent via-violet-200 to-transparent"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-full rounded-full bg-gradient-to-b from-violet-500 via-violet-400 to-violet-300"
          />
        </div>
      </div>
    </div>
  );
};
