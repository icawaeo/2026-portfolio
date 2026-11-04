import Container from '@/components/shared/Container';

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-stone-500">
            Designed &amp; Built by{' '}
            <span className="font-semibold text-stone-800">Veronica Waeo</span>.
          </p>
          <p className="text-xs text-stone-400">
            Informatics Engineering Graduate • UI/UX Designer • System Analyst • Web Developer
          </p>
        </div>
      </Container>
    </footer>
  );
}

