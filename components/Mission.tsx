import React from 'react';
import { ArrowRight, Container, CountUp, asset } from './ui';

const figures = [
  { n: 1, label: 'Goal', desc: 'A fair route into the job market.' },
  { n: 2, label: 'Sides of every partnership', desc: 'The college and its students, together.' },
  { n: 3, label: 'Gaps we close', desc: 'Infrastructure, visibility and industry exposure.' },
  { n: 4, label: 'Core services', desc: 'Covering the cycle from first call to offer letter.' },
];

const Mission: React.FC = () => {
  return (
    <section id="mission" className="relative bg-paper pb-24 pt-10 text-ink md:pb-36 md:pt-16">
      <Container>
        <p className="reveal mb-8 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-ember">
          <span className="h-px w-8 bg-ember" />
          What we do
        </p>

        {/* Statement with photos opening up inline */}
        <h2 className="reveal max-w-[18ch] font-display text-[clamp(2.4rem,6.2vw,6.5rem)] font-medium leading-[1.04] tracking-[-0.04em] md:max-w-none">
          An extended placement office for <span className="serif-i text-ember-600">Tier-2</span> and{' '}
          <span className="serif-i text-ember-600">Tier-3</span> colleges.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-20">
          <div className="img-reveal relative aspect-[4/3] overflow-hidden bg-paper-300" data-cursor="View">
            <div className="img-inner absolute inset-0">
              <img
                src={asset('media/campus.jpg')}
                alt="Campus building of a regional college"
                data-speed="-0.08"
                className="absolute inset-[-10%] h-[120%] w-[120%] max-w-none object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="reveal space-y-6 text-lg leading-relaxed text-ink/70 md:text-xl">
              <p>
                ASCEND works with colleges in emerging cities to run their placement function. We handle corporate
                outreach, recruiter relationships and student preparation, the same work a Tier-1 placement office does.
              </p>
              <p>
                Students at these colleges are often as capable as their peers in large cities. They have fewer ways to
                reach recruiters. We build those connections so that where a student studies does not limit where they
                can work.
              </p>
            </div>
            <a
              href="#approach"
              className="reveal group mt-10 inline-flex w-fit items-center gap-3 rounded-full border border-ink/15 py-2 pl-6 pr-2 font-medium transition-colors duration-500 hover:border-ember hover:bg-ember"
            >
              See our approach
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:rotate-[-45deg]">
                <ArrowRight />
              </span>
            </a>
          </div>
        </div>

        {/* Key figures */}
        <div className="relative mt-24 md:mt-36">
          <div className="draw absolute inset-x-0 top-0 h-px bg-ink/15" />
          <dl className="stagger grid grid-cols-2 gap-x-6 gap-y-12 pt-12 md:grid-cols-4 md:gap-x-10">
            {figures.map((f, i) => (
              <div key={f.label} style={{ '--i': i } as React.CSSProperties} className="group">
                <dd className="font-display text-[clamp(4rem,9vw,8.5rem)] font-light leading-none tracking-[-0.06em]">
                  <CountUp to={f.n} pad={2} />
                  <span className="serif-i text-ember">.</span>
                </dd>
                <dt className="mt-5 flex items-center gap-2 text-base font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember transition-transform duration-500 group-hover:scale-[2]" />
                  {f.label}
                </dt>
                <p className="mt-2 max-w-[22ch] text-sm leading-relaxed text-ink/55">{f.desc}</p>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
};

export default Mission;
