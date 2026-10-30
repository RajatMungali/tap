import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Container, Dot, asset } from './ui';

const words = ['Talent', 'is', 'universal.', 'Opportunity', 'is', 'not.'];

const Philosophy: React.FC = () => {
  const ref = useRef<HTMLQuoteElement>(null);
  const [lit, setLit] = useState(0);

  // Words light up one by one as the quote scrolls through the viewport
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLit(words.length);
      return;
    }
    let ticking = false;
    const update = () => {
      const el = ref.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const start = vh * 0.85;
        const end = vh * 0.3;
        const p = Math.min(1, Math.max(0, (start - r.top) / (start - end)));
        setLit(Math.round(p * words.length));
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
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="philosophy" className="relative bg-paper py-24 text-ink md:py-40">
      <Container>
        <p className="reveal mb-10 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-ember">
          <span className="h-px w-8 bg-ember" />
          Philosophy
        </p>
        <blockquote
          ref={ref}
          className="font-display text-[clamp(2.6rem,8vw,9rem)] font-medium leading-[0.98] tracking-[-0.045em]"
        >
          {words.map((w, i) => (
            <React.Fragment key={i}>
              <span
                className={`inline-block transition-[color,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  i < lit ? 'translate-y-0 text-ink' : 'translate-y-2 text-ink/15'
                } ${i >= 3 && i < lit ? 'serif-i !text-ember-600' : ''}`}
              >
                {w.endsWith('.') ? (
                  <>
                    {w.slice(0, -1)}
                    <Dot className={i < lit ? 'bg-ember' : 'bg-ink/15'} />
                  </>
                ) : (
                  w
                )}
              </span>
              {i === 2 ? <br /> : ' '}
            </React.Fragment>
          ))}
        </blockquote>

        <div className="img-reveal relative mt-16 aspect-[16/9] overflow-hidden bg-ink md:mt-24 md:aspect-[21/8]">
          <div className="img-inner absolute inset-0">
            <img
              src={asset('media/grad.jpg')}
              alt="Graduates tossing their caps at sunset"
              data-speed="-0.12"
              className="absolute inset-[-14%] h-[128%] w-[128%] max-w-none object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="reveal flex flex-col gap-6 pt-10 md:flex-row md:items-center md:justify-between md:gap-12">
          <p className="max-w-2xl text-lg leading-relaxed text-ink/65">
            Every part of our work is meant to give students outside the big cities a fair route into the job
            market.
          </p>
          <a
            href="#contact"
            className="link-underline group inline-flex shrink-0 items-center gap-2 pb-1 text-lg font-medium text-ink hover:text-ember-600"
          >
            Work with us
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </Container>
    </section>
  );
};

export default Philosophy;
