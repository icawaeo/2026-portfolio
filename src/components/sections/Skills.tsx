import Container from '@/components/shared/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import SkillCard from '@/components/ui/SkillCard';
import { skillCategories } from '@/data/skills';

export default function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          title="What I Bring to the Table."
          subtitle="A diverse toolkit spanning design, analysis, development, and collaboration."
        />
        <div className="grid gap-4 max-w-3xl">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
