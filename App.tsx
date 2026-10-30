import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Mission from './components/Mission';
import TheProblem from './components/TheProblem';
import Approach from './components/Approach';
import WhatWeDo from './components/WhatWeDo';
import WhyAscend from './components/WhyAscend';
import Philosophy from './components/Philosophy';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [ready, setReady] = useState(false);

  // Smooth inertial scrolling, paused while the loader is up
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.085, anchors: { offset: -24 } });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.stop();
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  useEffect(() => {
    if (ready) (window as unknown as { __lenis?: Lenis }).__lenis?.start();
  }, [ready]);

  // Reveal-on-scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    document.querySelectorAll('.reveal, .stagger, .draw, .split, .img-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Parallax: [data-speed] elements drift against the scroll
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-speed]'));
    let raf = 0;
    const update = () => {
      const vh = window.innerHeight;
      els.forEach((el) => {
        const host = el.parentElement;
        if (!host) return;
        const r = host.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const offset = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.speed || '0');
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col font-sans">
      <Loader onDone={() => setReady(true)} />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Mission />
        <TheProblem />
        <Approach />
        <WhatWeDo />
        <WhyAscend />
        <Philosophy />
      </main>
      <Footer />
    </div>
  );
};

export default App;
