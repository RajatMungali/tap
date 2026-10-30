import React from 'react';
import { Container, SectionHeader, asset } from './ui';

const tracks = [
  {
    no: '01',
    lead: 'For ',
    em: 'colleges',
    img: 'media/campus.jpg',
    alt: 'Regional college campus building',
    desc: 'We set up and run the corporate relations and recruitment process that a Tier-1 college would have, and help the institution build its reputation with employers.',
    items: ['Placement office outsourcing', 'Corporate relationship management', 'Institutional branding'],
  },
  {
    no: '02',
    lead: 'For ',
    em: 'students',
    img: 'media/portrait.jpg',
    alt: 'Confident graduate in a blazer',
    desc: 'We train students in the skills and interview preparation that employers ask for, so they are ready for roles at startups and Fortune 500 companies alike.',
    items: ['Skill alignment programmes', 'Interview training', 'Professional readiness'],
  },
];

const Approach: React.FC = () => {
  return (
    <section id="approach" className="relative bg-paper-200 py-24 text-ink md:py-36">
      <Container>
        <SectionHeader
          eyebrow="Our approach"
          title="Two sides of every partnership"
          em={['partnership']}
          intro="We work with the college and its students at the same time. Stronger institutions attract better recruiters, and better-prepared students convert those opportunities into offers."
        />

        <div className="stagger mt-16 grid grid-cols-1 gap-5 md:mt-24 md:grid-cols-2 md:gap-6">
          {tracks.map((t, ti) => (
            <article
              key={t.no}
              style={{ '--i': ti } as React.CSSProperties}
              data-cursor="Explore"
              className="group relative isolate flex min-h-[600px] flex-col justify-end overflow-hidden rounded-[2rem] bg-ink p-7 text-white sm:p-10 md:min-h-[720px]"
            >
              <img
                src={asset(t.img)}
                alt={t.alt}
                loading="lazy"
                className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/5" />
              <div className="absolute inset-0 -z-10 bg-ember opacity-0 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-30" />

              <span className="absolute left-7 top-7 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur-md sm:left-10 sm:top-10">
                {t.no}
              </span>
              <span className="absolute right-7 top-7 grid h-12 w-12 place-items-center rounded-full bg-white text-ink transition-all duration-500 group-hover:rotate-45 group-hover:bg-ember sm:right-10 sm:top-10">
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 14L14 6M7 6h7v7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>

              <h3 className="text-5xl font-medium leading-none tracking-[-0.04em] md:text-6xl">
                {t.lead}
                <span className="serif-i text-ember-300">{t.em}</span>
              </h3>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">{t.desc}</p>
              <ul className="mt-8">
                {t.items.map((item) => (
                  <li
                    key={item}
                    className="group/item flex cursor-default items-center justify-between border-t border-white/20 py-4 text-base font-medium transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:pl-3"
                  >
                    {item}
                    <span className="h-1.5 w-1.5 rounded-full bg-ember transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/item:w-8" />
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Approach;
