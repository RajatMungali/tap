import React from 'react';
import { Container, Split, asset } from './ui';

const issues = [
  {
    title: 'Limited placement infrastructure',
    desc: 'Many colleges do not have a dedicated placement team or an established list of corporate contacts, so they struggle to bring recruiters to campus.',
  },
  {
    title: 'Talent recruiters cannot find',
    desc: 'Employers find it hard to identify job-ready candidates outside the major cities, and strong students are often overlooked.',
  },
  {
    title: 'Little industry exposure',
    desc: 'Students get few chances for structured mentoring or contact with industry, so many walk into interviews underprepared.',
  },
];

const TheProblem: React.FC = () => {
  return (
    <section className="grain relative overflow-hidden bg-ink py-24 text-white md:py-36">
      {/* Skyline sits behind the copy and drifts as you scroll */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.16]">
        <img
          src={asset('media/towers.jpg')}
          alt=""
          data-speed="0.12"
          className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover grayscale"
          loading="lazy"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[520px] w-[520px] rounded-full bg-ember/15 blur-[140px]" />

      <Container className="relative">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="reveal mb-6 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-ember">
              <span className="h-px w-8 bg-ember" />
              The problem
            </p>
            <Split
              text="Why current placement systems fall short"
              em={['fall', 'short']}
              className="font-display text-[clamp(2.4rem,5vw,5rem)] font-medium leading-[1] tracking-[-0.035em]"
            />
            <p className="reveal mt-8 max-w-md text-lg leading-relaxed text-white/60">
              Colleges in smaller cities have capable students but weak links to employers. The same three problems
              come up again and again.
            </p>
          </div>

          <div className="stagger">
            {issues.map((issue, i) => (
              <article
                key={issue.title}
                style={{ '--i': i } as React.CSSProperties}
                className="group relative border-t border-white/15 py-10 first:border-t-0 first:pt-0 md:py-12 md:first:pt-0"
              >
                <div className="flex items-start gap-6 md:gap-10">
                  <span className="serif-i text-5xl leading-none text-white/25 transition-colors duration-500 group-hover:text-ember md:text-7xl">
                    0{i + 1}
                  </span>
                  <div className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">
                    <h3 className="text-2xl font-medium tracking-[-0.02em] md:text-3xl">{issue.title}</h3>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-white/55 transition-colors duration-500 group-hover:text-white/80">
                      {issue.desc}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TheProblem;
