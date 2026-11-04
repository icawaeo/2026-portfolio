import Container from '@/components/shared/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { Timeline } from '@/components/ui/timeline';
import { experiences } from '@/data/experiences';
import Image from 'next/image';

export default function Experience() {
  const timelineData = experiences.map((experience, index) => ({
    title: experience.period,
    content: (
      <article className={index === experiences.length - 1 ? 'pb-[30svh]' : 'pb-8'}>
        <h4 className="text-base font-semibold tracking-tight text-stone-900 sm:text-lg xl:text-2xl 2xl:text-[1.75rem]">
          {experience.organization}
        </h4>
        <p className="mt-1 text-xs font-medium text-stone-500 sm:text-sm xl:text-lg 2xl:text-xl">
          {experience.position} <span aria-hidden="true">·</span> {experience.type}
        </p>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-stone-600 sm:text-base xl:text-xl xl:leading-8 2xl:text-[1.375rem]">
          {experience.description}
        </p>

        <div className="mt-4">
          <h5 className="text-xs font-semibold uppercase tracking-[0.12em] text-violet-700 xl:text-base">
            Key contributions
          </h5>
          <ul className="mt-2 space-y-1.5">
            {experience.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-2.5 text-xs leading-5 text-stone-500 sm:text-sm xl:text-lg xl:leading-7"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h5 className="text-xs font-semibold text-stone-900 xl:text-base">Tools Used</h5>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {experience.technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-sm border border-violet-100 bg-violet-50/50 px-2 py-0.5 text-[10px] font-medium text-violet-700 sm:text-xs xl:px-2.5 xl:py-1 xl:text-sm"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>

        <div
          aria-label={`${experience.organization} photos`}
          className="mt-4 grid grid-cols-2 gap-3 sm:gap-4"
        >
          {Array.from(
            { length: Math.max(4, experience.gallery?.length ?? 0) },
            (_, index) => {
              const photo = experience.gallery?.[index];

              return (
                <div
                  key={photo?.src ?? `${experience.id}-photo-${index}`}
                  className="relative aspect-[2/1] overflow-hidden bg-stone-200"
                >
                  {photo ? (
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 40vw, (max-width: 1024px) 28vw, 22vw"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label={`Photo ${index + 1} placeholder`}
                      className="h-full w-full"
                    />
                  )}
                </div>
              );
            },
          )}
        </div>
      </article>
    ),
  }));

  return (
    <section id="experience" className="relative z-0 isolate py-20 sm:py-28 2xl:py-32">
      <Container>
        <SectionHeading
          title="Where I've Worked."
          subtitle="A timeline of my professional experiences and contributions."
          align="center"
          subtitleCentered
          className="mb-10"
          titleClassName="!text-4xl !font-semibold sm:!text-5xl lg:!text-6xl 2xl:!text-7xl"
        />
        <Timeline data={timelineData} />
      </Container>
    </section>
  );
}
