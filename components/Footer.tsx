import React from 'react';
import { Button, Container, Logo, Split } from './ui';

const explore = [
  { href: '#mission', label: 'About' },
  { href: '#approach', label: 'Approach' },
  { href: '#services', label: 'Services' },
  { href: '#why', label: 'Why ASCEND' },
  { href: '#philosophy', label: 'Philosophy' },
];

const socials = [
  { label: 'Linktree', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Email', href: '#' },
];

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-paper text-white">
      {/* Call to action */}
      <div className="relative overflow-hidden rounded-b-[2rem] bg-ember text-ink md:rounded-b-[3rem]">
        <div className="pointer-events-none absolute -bottom-[60%] -right-[12%] aspect-square w-[60vw] max-w-[900px] rounded-full border border-ink/15" />
        <div className="pointer-events-none absolute -bottom-[45%] -right-[2%] aspect-square w-[40vw] max-w-[600px] rounded-full border border-ink/15" />
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-ember-300/50 blur-[100px]" />
        <Container className="relative py-24 md:py-36">
          <p className="reveal mb-8 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em]">
            <span className="h-px w-8 bg-ink" />
            Let&apos;s talk
          </p>
          <Split
            text="Bring a stronger placement process to your campus."
            em={['stronger']}
            className="max-w-5xl font-display text-[clamp(2.8rem,7.4vw,8rem)] font-medium leading-[0.98] tracking-[-0.045em]"
          />
          <div className="reveal mt-12 flex flex-col gap-8 md:mt-16 md:flex-row md:items-center md:justify-between">
            <p className="max-w-xl text-lg leading-relaxed text-ink/75 md:text-xl">
              Tell us about your college and its students. We will explain how a partnership with ASCEND would work
              for you.
            </p>
            <Button href="#" variant="dark" className="self-start !px-9 !py-5 text-lg md:self-auto">
              Start a conversation
            </Button>
          </div>
        </Container>
      </div>

      {/* Links */}
      <div className="grain relative -mt-[2rem] overflow-hidden bg-ink pt-[2rem] md:-mt-[3rem] md:pt-[3rem]">
        <Container className="relative">
          <div className="stagger grid grid-cols-2 gap-12 py-16 md:grid-cols-4 md:py-20">
            <div style={{ '--i': 0 } as React.CSSProperties} className="col-span-2">
              <Logo className="h-8" />
              <p className="mt-6 max-w-sm text-base leading-relaxed text-white/55">
                Institutional recruitment and placement outsourcing for Tier-2 and Tier-3 colleges.
              </p>
            </div>

            <div style={{ '--i': 1 } as React.CSSProperties}>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/40">Explore</p>
              <ul className="mt-5 space-y-3 text-base text-white/80">
                {explore.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="link-underline hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ '--i': 2 } as React.CSSProperties}>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/40">Connect</p>
              <ul className="mt-5 space-y-3 text-base text-white/80">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} className="link-underline hover:text-white">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Oversized wordmark */}
          <div className="reveal select-none overflow-hidden" aria-hidden="true">
            <p className="font-display text-[clamp(5rem,23vw,30rem)] font-semibold leading-[0.8] tracking-[-0.06em] text-white/[0.07]">
              ASCEND<span className="text-ember">.</span>
            </p>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
            <p>&copy; 2025 ASCEND Institutional Recruitment. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="link-underline hover:text-white">Privacy</a>
              <a href="#" className="link-underline hover:text-white">Terms</a>
              <a href="#" className="link-underline hover:text-white">Security</a>
              <a
                href="#top"
                aria-label="Back to top"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-ember hover:bg-ember hover:text-ink"
              >
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4" aria-hidden="true">
                  <path d="M10 16V4M5 9l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
