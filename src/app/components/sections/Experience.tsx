import Container from '@/components/shared/Container';
import SectionHeading from '@/app/components/ui/SectionHeading';
import ExperienceCard from '@/app/components/ui/ExperienceCard';
import { experiences } from '@/data/experiences';

export default function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          title="Where I've Worked."
          subtitle="A timeline of my professional experiences and contributions."
        />
        <div className="max-w-3xl">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
