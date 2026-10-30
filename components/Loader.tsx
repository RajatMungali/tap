import React, { useEffect, useState } from 'react';
import { Logo } from './ui';

const DURATION = 2400;

/**
 * Opening sequence: logo wipes in on a warm ink screen while a counter runs to 100,
 * then the screen splits open and lifts away to reveal the page.
 */
const Loader: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<'in' | 'out' | 'gone'>('in');

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const total = reduced ? 300 : DURATION;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / total);
      // ease in-out so the number lingers at the start and end
      const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setCount(Math.round(e * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setPhase('out');
          document.documentElement.classList.remove('is-loading');
          onDone();
          setTimeout(() => setPhase('gone'), 1400);
        }, reduced ? 0 : 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === 'gone') return null;

  const out = phase === 'out';
  const panel =
    'absolute inset-x-0 bg-ink transition-transform duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)]';

  return (
    <div className="fixed inset-0 z-[100]" aria-hidden="true" role="presentation">
      <div className={`${panel} top-0 h-1/2 ${out ? '-translate-y-full' : ''}`} />
      <div className={`${panel} bottom-0 h-1/2 ${out ? 'translate-y-full' : ''}`} />

      <div
        className={`grain absolute inset-0 flex items-center justify-center overflow-hidden transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          out ? '-translate-y-10 opacity-0' : ''
        }`}
      >
        <div className="pointer-events-none absolute -bottom-1/3 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-ember/20 blur-[120px]" />

        <div className="relative w-[min(64vw,420px)]">
          <div style={{ animation: 'logo-wipe 1.5s cubic-bezier(0.76,0,0.24,1) 0.2s both' }}>
            <Logo className="h-auto w-full" />
          </div>
          <div className="mt-8 h-px w-full bg-white/15">
            <div className="h-full origin-left bg-ember" style={{ transform: `scaleX(${count / 100})` }} />
          </div>
          <div className="mt-4 flex items-baseline justify-between text-white/50">
            <span className="text-xs uppercase tracking-[0.22em]">Institutional placement</span>
            <span className="serif-i text-3xl leading-none text-white">
              {String(count).padStart(2, '0')}
              <span className="text-ember">%</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
