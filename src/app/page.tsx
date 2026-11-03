import Footer from '@/app/components/layout/Footer';
import Hero from '@/app/components/sections/Hero';
import ScatteredNav from '@/app/components/sections/ScatteredNav';
import About from '@/app/components/sections/About';
import Experience from '@/app/components/sections/Experience';
import Projects from '@/app/components/sections/Projects';
import Skills from '@/app/components/sections/Skills';
import Organization from '@/app/components/sections/Organization';
import Volunteer from '@/app/components/sections/Volunteer';
import Contact from '@/app/components/sections/Contact';

export default function Home() {
  return (
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
  );
}
