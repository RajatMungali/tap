import React from 'react';

const items = [
  'Placement outsourcing',
  'Corporate relations',
  'CV & interview preparation',
  'Skill alignment',
  'Role-fit placement',
  'Institutional branding',
];

/** Slow ticker that sits over the lower edge of the hero. */
const Marquee: React.FC = () => {
  const row = [...items, ...items];
  return (
    <div className="marquee relative z-10 -mt-px overflow-hidden rounded-t-[2rem] bg-paper py-7 md:rounded-t-[3rem] md:py-9" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((t, i) => (
              <span key={`${k}-${i}`} className="flex items-center whitespace-nowrap">
                <span className={`px-8 text-3xl tracking-[-0.03em] md:text-5xl ${i % 2 ? 'serif-i text-ink/55' : 'font-medium text-ink'}`}>
                  {t}
                </span>
                <span className="h-2.5 w-2.5 rounded-full bg-ember" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
