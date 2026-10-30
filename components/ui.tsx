import React, { useEffect, useRef, useState } from 'react';

export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`w-full px-5 sm:px-8 lg:px-12 xl:px-16 ${className}`}>{children}</div>;

export const ArrowRight: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Round orange full stop, echoing the dot in the logo. */
export const Dot: React.FC<{ className?: string }> = ({ className = 'bg-ember' }) => (
  <span
    aria-hidden="true"
    className={`ml-[0.05em] inline-block h-[0.15em] w-[0.15em] rounded-full align-baseline transition-colors duration-700 ${className}`}
  />
);

export const Logo: React.FC<{ className?: string }> = ({ className = 'h-7' }) => (
  <img
    src={`${import.meta.env.BASE_URL}ascend-logo.png`}
    alt="ASCEND"
    width={666}
    height={140}
    className={`w-auto select-none ${className}`}
    draggable={false}
  />
);

export const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;

/**
 * Headline that rises in word by word. `em` words are set in the italic serif.
 * mode "scroll" plays when scrolled into view, "load" plays after the loader.
 */
export const Split: React.FC<{
  text: string;
  em?: string[];
  mode?: 'scroll' | 'load';
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  offset?: number;
  breakAfter?: number[];
}> = ({ text, em = [], mode = 'scroll', as: Tag = 'h2', className = '', offset = 0, breakAfter = [] }) => {
  const words = text.split(' ');
  return (
    <Tag className={`${mode === 'load' ? 'split-load' : 'split'} ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="w" aria-hidden="true">
            <span style={{ '--i': i + offset } as React.CSSProperties} className={em.includes(w) ? 'serif-i' : ''}>
              {w}
            </span>
          </span>
          {' '}
          {breakAfter.includes(i) && <br className="hidden md:block" />}
        </React.Fragment>
      ))}
    </Tag>
  );
};

export const SectionHeader: React.FC<{
  title: string;
  em?: string[];
  intro?: React.ReactNode;
  tone?: 'dark' | 'light';
  eyebrow?: string;
}> = ({ title, em, intro, tone = 'light', eyebrow }) => (
  <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-16">
    <div>
      {eyebrow && (
        <p className="reveal mb-6 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-ember">
          <span className="h-px w-8 bg-ember" />
          {eyebrow}
        </p>
      )}
      <Split
        text={title}
        em={em}
        className="font-display text-[clamp(2.4rem,5.4vw,5.5rem)] font-medium leading-[1] tracking-[-0.035em]"
      />
    </div>
    {intro && (
      <p
        className={`reveal max-w-xl text-lg leading-relaxed md:justify-self-end ${
          tone === 'dark' ? 'text-white/60' : 'text-ink/60'
        }`}
      >
        {intro}
      </p>
    )}
  </div>
);

/** Number that counts up the first time it scrolls into view. */
export const CountUp: React.FC<{ to: number; pad?: number; className?: string }> = ({ to, pad = 2, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(to);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1600;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setN(Math.round((1 - Math.pow(1 - p, 4)) * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref} className={className}>
      {String(n).padStart(pad, '0')}
    </span>
  );
};

/** Pulls an element slightly toward the cursor while hovered (fine pointers only). */
export function useMagnetic<T extends HTMLElement>(strength = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || strength === 0) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onLeave = () => {
      el.style.transform = '';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return ref;
}

type Variant = 'primary' | 'outline' | 'light' | 'dark';

const variants: Record<Variant, { base: string; fill: string }> = {
  // orange, fills ink on hover
  primary: { base: 'bg-ember text-ink hover:text-white', fill: '#1A1511' },
  // outlined on dark imagery, fills white on hover
  outline: { base: 'border border-white/40 text-white hover:border-white hover:text-ink', fill: '#FFFFFF' },
  // white, fills orange on hover
  light: { base: 'bg-white text-ink', fill: '#F26B1D' },
  // ink, fills white on hover
  dark: { base: 'bg-ink text-white hover:text-ink', fill: '#FFFFFF' },
};

export const Button: React.FC<{
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  magnetic?: boolean;
  className?: string;
  onClick?: () => void;
  target?: string;
}> = ({ href, children, variant = 'primary', arrow = true, magnetic = true, className = '', onClick, target }) => {
  const ref = useMagnetic<HTMLAnchorElement>(magnetic ? 0.25 : 0);
  const v = variants[variant];
  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      style={{ '--btn-fill': v.fill } as React.CSSProperties}
      className={`btn group inline-flex items-center justify-center gap-2.5 px-7 py-4 font-medium ${v.base} ${className}`}
    >
      {children}
      {arrow && (
        <span className="arrow-swap">
          <ArrowRight />
          <ArrowRight />
        </span>
      )}
    </a>
  );
};
