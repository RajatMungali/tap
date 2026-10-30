import React, { useEffect, useRef } from 'react';
import { Button, Container, Split, asset } from './ui';

const Hero: React.FC = () => {
  const mediaRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  // Video drifts slower than the page and the copy fades as you leave the hero
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight * 1.2);
        if (mediaRef.current) {
          mediaRef.current.style.transform = `translate3d(0, ${y * 0.28}px, 0) scale(${1 + y / 4000})`;
        }
        if (copyRef.current) {
          copyRef.current.style.transform = `translate3d(0, ${y * -0.1}px, 0)`;
          copyRef.current.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.75)));
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-white">
      <div ref={mediaRef} className="absolute inset-0 will-change-transform">
        <video
          className="h-full w-full object-cover"
          src={asset('media/hero.mp4')}
          poster={asset('media/campus.jpg')}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>
      {/* Warm grade + legibility gradients */}
      <div className="absolute inset-0 bg-ember/10 mix-blend-soft-light" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent" />

      <div ref={copyRef} className="absolute inset-0 will-change-transform">
        <Container className="flex h-full items-end pb-12 md:pb-14">
          <div className="grid w-full grid-cols-1 items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p
                className="fade-up mb-6 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-white/80"
                style={{ animationDelay: '0.2s' }}
              >
                <span className="h-2 w-2 rounded-full bg-ember pulse-dot" />
                Institutional placement excellence
              </p>
              <Split
                as="h1"
                mode="load"
                text="Bridging untapped talent with opportunity."
                em={['opportunity.']}
                breakAfter={[2]}
                className="font-display text-[clamp(2.9rem,8.4vw,9.5rem)] font-medium leading-[0.94] tracking-[-0.045em]"
              />
              <p
                className="fade-up mt-8 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl"
                style={{ animationDelay: '1.2s' }}
              >
                ASCEND runs placements for colleges in emerging cities. We connect their students with employers and
                prepare them for the roles those employers are hiring for.
              </p>
              <div className="fade-up mt-8 flex flex-col gap-3 sm:flex-row lg:hidden" style={{ animationDelay: '1.35s' }}>
                <Button href="#contact">Partner with us</Button>
                <Button href="#approach" variant="outline" arrow={false}>
                  See how it works
                </Button>
              </div>
            </div>

            {/* Floating card, like a featured link on the reference site */}
            <a
              href="#approach"
              data-cursor="Explore"
              className="fade-up group hidden w-[300px] rounded-[1.75rem] bg-ink/70 p-3 ring-1 ring-white/10 backdrop-blur-xl transition-colors duration-500 hover:bg-ink/85 lg:block"
              style={{ animationDelay: '1.5s' }}
            >
              <div className="px-3 pb-3 pt-2">
                <p className="text-xs uppercase tracking-[0.18em] text-white/55">Our approach</p>
                <p className="mt-2 text-lg font-medium leading-snug">
                  Two sides of every <span className="serif-i text-ember-300">partnership</span>
                </p>
              </div>
              <div className="relative h-36 overflow-hidden rounded-2xl">
                <img
                  src={asset('media/team.jpg')}
                  alt="Students collaborating at a table"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-45">
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 14L14 6M7 6h7v7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </a>
          </div>
        </Container>
      </div>

      {/* Scroll cue */}
      <div className="fade-up absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/60 xl:flex" style={{ animationDelay: '1.8s' }}>
        <span>Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/20">
          <span className="absolute inset-0 bg-ember" style={{ animation: 'scroll-cue 2.2s var(--ease-io) infinite' }} />
        </span>
      </div>
    </section>
  );
};

export default Hero;
