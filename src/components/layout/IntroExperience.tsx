'use client';

import {
  createContext,
  useCallback,
  useState,
  type ReactNode,
} from 'react';
import { LayoutGroup } from 'motion/react';
import IntroScreen from '@/components/animations/intro';

export const IntroRevealContext = createContext<boolean | null>(null);

interface IntroExperienceProps {
  children: ReactNode;
}

export default function IntroExperience({ children }: IntroExperienceProps) {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [introExited, setIntroExited] = useState(false);
  const revealHero = useCallback(() => setHeroRevealed(true), []);
  const unlockPage = useCallback(() => setIntroExited(true), []);

  return (
    <LayoutGroup id="portfolio-intro">
      <IntroRevealContext.Provider value={heroRevealed}>
        <div inert={!introExited}>{children}</div>
        <IntroScreen onReveal={revealHero} onExitComplete={unlockPage} />
      </IntroRevealContext.Provider>
    </LayoutGroup>
  );
}
