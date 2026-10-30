import React from 'react';
import { Button, Container, Split, asset } from './ui';

const pillars = [
  { title: 'Merit-based', desc: 'Students are put forward on ability and nothing else.' },
  { title: 'Transparent', desc: 'Partner colleges see the same data and outcomes we do.' },
  { title: 'Outcome-driven', desc: 'We measure our work by the students who get hired.' },
  { title: 'Long-term', desc: 'We build recruiter relationships that last beyond a single season.' },
];

const WhyAscend: React.FC = () => {
  return (
    <section id="why" className="relative bg-paper-200 py-24 text-ink md:py-36">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-16">
          <div>
            <p className="reveal mb-6 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-ember">
              <span className="h-px w-8 bg-ember" />
              Why ASCEND
            </p>
            <Split
              text="Why colleges work with ASCEND"
              em={['ASCEND']}
              className="font-display text-[clamp(2.4rem,5.4vw,5.5rem)] font-medium leading-[1] tracking-[-0.035em]"
            />
          </div>
          <div className="reveal md:justify-self-end">
            <p className="max-w-xl text-lg leading-relaxed text-ink/60">
              Capable students are spread across the country, but access to recruiters is concentrated in a few
              cities. We give partner colleges that access and help their students make use of it.
            </p>
            <Button href="#contact" variant="dark" className="mt-8">
              Talk to our team
            </Button>
          </div>
        </div>

        {/* Wide film strip with parallax */}
        <div className="img-reveal relative mt-16 aspect-[16/10] overflow-hidden bg-ink md:mt-24 md:aspect-[21/9]">
          <div className="img-inner absolute inset-0">
            <div data-speed="-0.1" className="absolute inset-[-12%] h-[124%] w-[124%]">
              <video
                className="h-full w-full object-cover"
                src={asset('media/students.mp4')}
                poster={asset('media/team.jpg')}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          <p className="absolute bottom-6 left-6 max-w-sm text-xl font-medium leading-snug text-white md:bottom-10 md:left-10 md:text-2xl">
            Where a student studies should not limit <span className="serif-i text-ember-300">where they work.</span>
          </p>
        </div>

        <div className="relative mt-16 md:mt-24">
          <div className="draw absolute inset-x-0 top-0 h-px bg-ink/15" />
          <div className="stagger grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                style={{ '--i': i } as React.CSSProperties}
                className={`group relative border-b border-ink/15 py-10 xl:border-b-0 xl:py-12 ${
                  i % 2 === 1 ? 'sm:border-l sm:pl-8' : 'sm:pr-8'
                } ${i > 0 ? 'xl:border-l xl:pl-8' : ''} ${i < 3 ? 'xl:pr-8' : ''}`}
              >
                <span className="serif-i text-lg text-ember">0{i + 1}</span>
                <h3 className="mt-4 text-2xl font-medium tracking-[-0.02em] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5">
                  {p.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink/60">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyAscend;
