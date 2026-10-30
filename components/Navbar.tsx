import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Logo } from './ui';

const links = [
  { id: 'mission', label: 'About' },
  { id: 'approach', label: 'Approach' },
  { id: 'services', label: 'Services' },
  { id: 'why', label: 'Why ASCEND' },
  { id: 'philosophy', label: 'Philosophy' },
];

type LenisLike = { stop: () => void; start: () => void };
const lenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Slide away when scrolling down, return when scrolling up
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 500);
        lastY = y;
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (open) lenis()?.stop();
    else if (!document.documentElement.classList.contains('is-loading')) lenis()?.start();
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        hidden && !open ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <Container>
        <nav
          aria-label="Primary"
          className={`mt-3 flex h-[64px] items-center justify-between gap-6 rounded-full px-4 pl-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:mt-4 ${
            solid
              ? 'bg-ink/75 shadow-[0_10px_40px_-12px_rgba(26,21,17,0.45)] ring-1 ring-white/10 backdrop-blur-xl'
              : 'bg-transparent ring-1 ring-transparent'
          }`}
        >
          <a href="#top" className="fade-up shrink-0" onClick={() => setOpen(false)} aria-label="ASCEND home">
            <Logo className="h-6 md:h-7" />
          </a>

          <div className="relative hidden items-center gap-1 lg:flex">
            {links.map((l, i) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                style={{ animationDelay: `${0.25 + i * 0.07}s` }}
                className={`fade-up relative rounded-full px-4 py-2 text-[15px] transition-colors duration-500 ${
                  active === l.id ? 'text-ink' : 'text-white/75 hover:text-white'
                }`}
              >
                {/* Highlight slides to the active section */}
                {active === l.id && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-white" />
                )}
                <span className="relative">{l.label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button href="#contact" className="!hidden !px-5 !py-2.5 text-[15px] sm:!inline-flex">
              Book a call
            </Button>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full text-white lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3.5 w-6">
                <span
                  className={`absolute left-0 h-0.5 w-6 bg-current transition-all duration-300 ${
                    open ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 bg-current transition-all duration-300 ${
                    open ? 'top-1.5 w-6 -rotate-45' : 'top-3 w-4'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </Container>

      <div
        ref={progressRef}
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-ember"
        aria-hidden="true"
      />

      {/* Full-screen mobile menu */}
      <div
        className={`fixed inset-0 -z-10 bg-ink transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] lg:hidden ${
          open ? '[clip-path:circle(150%_at_90%_5%)]' : '[clip-path:circle(0%_at_90%_5%)]'
        }`}
      >
        <Container className="flex h-full flex-col justify-center pb-10 pt-24">
          {links.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${0.35 + i * 0.07}s` : '0s' }}
              className={`flex items-center justify-between border-b border-white/10 py-5 text-4xl font-medium tracking-[-0.03em] text-white transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              {l.label}
              <span className={`h-2.5 w-2.5 rounded-full ${active === l.id ? 'bg-ember' : 'bg-white/15'}`} />
            </a>
          ))}
          <Button href="#contact" onClick={() => setOpen(false)} magnetic={false} className="mt-10">
            Book a call
          </Button>
        </Container>
      </div>
    </header>
  );
};

export default Navbar;
