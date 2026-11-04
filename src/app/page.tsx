import Footer from '@/components/layout/Footer';
import IntroExperience from '@/components/layout/IntroExperience';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Experience from '@/components/sections/Experience';
import Hero from '@/components/sections/Hero';
import Organization from '@/components/sections/Organization';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Volunteer from '@/components/sections/Volunteer';
import ScatteredNav from '@/components/animations/scattered-nav';

export default function Home() {
  return (
    <IntroExperience>
      <div className="flex min-h-screen flex-col bg-stone-50/30 text-stone-900 selection:bg-stone-200 selection:text-stone-900">
        <main className="flex-1">
          <Hero />
          <ScatteredNav />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Organization />
          <Volunteer />
          <Contact />
        </main>
        <Footer />
      </div>
    </IntroExperience>
  );
}
