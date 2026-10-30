import React, { useState } from 'react';
import { Container, SectionHeader, asset } from './ui';

const services = [
  {
    title: 'Placement outsourcing and corporate relations',
    desc: 'We manage the recruitment cycle end to end and act as the main point of contact between your college and hiring companies.',
    img: 'media/towers.jpg',
  },
  {
    title: 'CV and interview preparation',
    desc: 'Students build CVs around their real projects and practise interviews in the formats used by consulting and corporate recruiters.',
    img: 'media/meeting.jpg',
  },
  {
    title: 'Skill alignment and partner integration',
    desc: 'We match student training to the technical and workplace requirements of our partner companies.',
    img: 'media/class.jpg',
  },
  {
    title: 'Role-fit placement',
    desc: 'We place each student in a role that suits their skills and goals. Fit matters more to us than the number of offers.',
    img: 'media/team.jpg',
  },
];

const WhatWeDo: React.FC = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="relative bg-paper py-24 text-ink md:py-36">
      <Container>
        <SectionHeader
          eyebrow="Services"
          title="What we do"
          em={['do']}
          intro="Four services that cover the placement cycle, from the first conversation with a recruiter to a signed offer letter."
        />

        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <div className="reveal">
            {services.map((s, i) => {
              const on = active === i;
              return (
                <article
                  key={s.title}
                  onMouseEnter={() => setActive(i)}
                  className="group relative border-t border-ink/15 last:border-b"
                >
                  <span
                    className={`absolute inset-x-0 top-[-1px] h-px origin-left bg-ember transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      on ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                  <button
                    type="button"
                    aria-expanded={on}
                    onClick={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="flex w-full items-start gap-5 py-7 text-left md:gap-8 md:py-9"
                  >
                    <span className={`serif-i pt-1 text-xl transition-colors duration-500 ${on ? 'text-ember' : 'text-ink/35'}`}>
                      0{i + 1}
                    </span>
                    <span
                      className={`flex-1 text-2xl font-medium leading-tight tracking-[-0.025em] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:text-[2rem] ${
                        on ? 'translate-x-2' : 'text-ink/60'
                      }`}
                    >
                      {s.title}
                    </span>
                    <span
                      className={`mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                        on ? 'rotate-45 border-ember bg-ember text-ink' : 'border-ink/20'
                      }`}
                    >
                      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
                        <path d="M10 4v12M4 10h12" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl pb-9 pl-[3.2rem] text-base leading-relaxed text-ink/65 md:pl-[4.6rem] md:text-lg">
                        {s.desc}
                      </p>
                      <div className="mb-9 ml-[3.2rem] h-52 overflow-hidden rounded-2xl lg:hidden">
                        <img src={asset(s.img)} alt="" className="h-full w-full object-cover" loading="lazy" />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Image follows whichever service is open */}
          <div className="relative hidden lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink">
              {services.map((s, i) => (
                <img
                  key={s.img}
                  src={asset(s.img)}
                  alt=""
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    active === i ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-white">
                <span className="serif-i text-6xl leading-none">0{active + 1}</span>
                <span className="text-sm uppercase tracking-[0.18em] text-white/70">of 04</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhatWeDo;
