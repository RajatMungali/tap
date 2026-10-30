import React, { useEffect, useRef, useState } from 'react';

type State = 'idle' | 'link' | 'label';

/**
 * Soft ring that trails the pointer. It grows over links and shows a short label
 * over anything carrying data-cursor="Label". Fine pointers only.
 */
const Cursor: React.FC = () => {
  const pos = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>('idle');
  const [label, setLabel] = useState('');
  const [shown, setShown] = useState(false);

  const [enabled, setEnabled] = useState(false);

  // Desktop only: a hover-capable fine pointer on a wide screen
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setEnabled(mq.matches && !reduced.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      if (pos.current) pos.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      setShown(true);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const withLabel = t?.closest<HTMLElement>('[data-cursor]');
      if (withLabel) {
        setLabel(withLabel.dataset.cursor || '');
        setState('label');
      } else if (t?.closest('a, button, input, textarea')) {
        setState('link');
      } else {
        setState('idle');
      }
    };
    const onLeave = () => setShown(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const size = state === 'label' ? 'h-24 w-24 -m-12 bg-ember text-ink' : state === 'link' ? 'h-14 w-14 -m-7 bg-ember/15' : 'h-3 w-3 -m-1.5 bg-ember';

  return (
    <div ref={pos} className="pointer-events-none fixed left-0 top-0 z-[90]" aria-hidden="true">
      <div
        className={`grid place-items-center rounded-full border border-ember text-[11px] font-semibold uppercase tracking-[0.14em] transition-[width,height,margin,background-color,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${size} ${
          shown ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {state === 'label' && label}
      </div>
    </div>
  );
};

export default Cursor;
