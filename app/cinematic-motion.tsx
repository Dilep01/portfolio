'use client';

import { useEffect, useRef, useState } from 'react';

export default function CinematicMotion() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);
  const [systemReduced, setSystemReduced] = useState(false);
  const stopped = paused || systemReduced;

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setSystemReduced(preference.matches);
    sync();
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = stopped ? 'off' : 'on';
    const nodes = document.querySelectorAll('.content-section .section-heading, .about-grid > div, .skill-card, .timeline-card, .project-card, .education-card, .resume-section');
    if (stopped || !('IntersectionObserver' in window)) {
      nodes.forEach(node => node.classList.remove('reveal-pending'));
      return;
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-pending');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0, rootMargin: '100px 0px' });
    nodes.forEach(node => {
      if (node.getBoundingClientRect().top > window.innerHeight) node.classList.add('reveal-pending');
      observer.observe(node);
    });
    return () => { observer.disconnect(); nodes.forEach(node => node.classList.remove('reveal-pending')); };
  }, [stopped]);

  useEffect(() => {
    const surface = canvas.current;
    const context = surface?.getContext('2d');
    if (!surface || !context) return;
    let frame = 0;
    let phase = 0;
    let visible = true;
    let width = 0;
    let height = 0;
    let last = 0;
    let elapsed = 0;
    let scrolling = false;
    let idleTimer: ReturnType<typeof setTimeout>;
    const resize = () => {
      width = surface.clientWidth; height = surface.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      surface.width = width * ratio; surface.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const draw = (time = 0) => {
      if (!stopped && !scrolling && visible && !document.hidden) frame = requestAnimationFrame(draw);
      if (time && time - last < 33) return;
      const delta = last && time ? Math.min(time - last, 80) : 33;
      last = time;
      elapsed += stopped ? 0 : delta / 1000;
      context.clearRect(0, 0, width, height);
      phase += stopped ? 0 : delta * .00009;
      const radius = Math.min(width * .42, 370);
      const points = Array.from({ length: 44 }, (_, i) => {
        const y = 1 - (i / 43) * 2;
        const ring = Math.sqrt(1 - y * y);
        const a = i * 2.39996 + phase;
        const z = Math.sin(a) * ring;
        return { x: width * .5 + Math.cos(a) * ring * radius, y: height * .5 + y * radius * .8, z };
      });
      // A slowly moving light trail adds depth without loading video or 3D assets.
      context.save();
      context.globalCompositeOperation = 'lighter';
      // Three batched paths replace 109 separately blurred strokes.
      context.shadowBlur = 0;
      for (let band = 2; band >= 0; band--) {
        context.beginPath();
        for (let i = 0; i <= 72; i++) {
          const angle = elapsed * .38 - i * .065;
          const x = width * .5 + Math.cos(angle) * radius * 1.13;
          const y = height * .51 + Math.sin(angle) * radius * .32 + Math.sin(angle * 1.8) * 25;
          if (i === 0) context.moveTo(x,y); else context.lineTo(x,y);
        }
        context.strokeStyle = ['rgba(255,200,140,.65)','rgba(255,110,55,.16)','rgba(255,90,35,.06)'][band];
        context.lineWidth = [1.5,6,13][band];
        context.stroke();
      }
      context.shadowBlur = 0;
      for (let i = 0; i < 24; i++) {
        const x = (i * 137.51) % Math.max(width,1);
        const y = ((i * 91.7 - elapsed * (4 + i % 5)) % Math.max(height,1) + height) % Math.max(height,1);
        context.fillStyle = `rgba(255,169,95,${.12 + (Math.sin(elapsed + i) + 1) * .15})`;
        context.fillRect(x,y,i % 4 === 0 ? 2 : 1, i % 4 === 0 ? 2 : 1);
      }
      context.restore();
      points.forEach((p, i) => {
        for (let j = i + 1; j < points.length; j++) {
          const q = points[j];
          const distance = Math.hypot(p.x - q.x, p.y - q.y);
          if (distance > radius * .29 || Math.abs(p.z - q.z) > .65) continue;
          context.strokeStyle = `rgba(244,144,87,${(1-distance/(radius*.29))*.19})`;
          context.beginPath(); context.moveTo(p.x,p.y); context.lineTo(q.x,q.y); context.stroke();
        }
        context.fillStyle = `rgba(255,177,124,${.18 + (p.z+1)*.18})`;
        context.beginPath(); context.arc(p.x,p.y,p.z>0 ? 1.7 : 1,0,Math.PI*2); context.fill();
      });
    };
    const restart = () => { cancelAnimationFrame(frame); if (!scrolling && visible && !document.hidden) draw(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; restart(); });
    observer.observe(surface);
    const resizeObserver = new ResizeObserver(() => { resize(); restart(); });
    resizeObserver.observe(surface);
    const onScroll = () => {
      scrolling = true;
      cancelAnimationFrame(frame);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => { scrolling = false; last = 0; restart(); }, 150);
    };
    addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', restart);
    resize(); draw();
    return () => { cancelAnimationFrame(frame); clearTimeout(idleTimer); removeEventListener('scroll',onScroll); observer.disconnect(); resizeObserver.disconnect(); document.removeEventListener('visibilitychange', restart); };
  }, [stopped]);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.hero');
    const pointer = (event: PointerEvent) => {
      if (!hero || stopped || event.pointerType !== 'mouse') return;
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty('--pointer-x', `${((event.clientX - rect.left) / rect.width - .5) * 12}px`);
      hero.style.setProperty('--pointer-y', `${((event.clientY - rect.top) / rect.height - .5) * 8}px`);
    };
    const reset = () => { hero?.style.setProperty('--pointer-x','0px'); hero?.style.setProperty('--pointer-y','0px'); };
    hero?.addEventListener('pointermove', pointer);
    hero?.addEventListener('pointerleave', reset);
    if (stopped) reset();
    const closeMenu = (event: Event) => {
      if ((event.target as Element).closest('.mobile-menu a')) document.querySelector<HTMLDetailsElement>('.mobile-nav')?.removeAttribute('open');
    };
    const escapeMenu = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        const menu = document.querySelector<HTMLDetailsElement>('.mobile-nav[open]');
        if (menu) { menu.removeAttribute('open'); menu.querySelector('summary')?.focus(); }
      }
    };
    document.addEventListener('click', closeMenu);
    document.addEventListener('keydown', escapeMenu);
    return () => { hero?.removeEventListener('pointermove',pointer); hero?.removeEventListener('pointerleave',reset); document.removeEventListener('click',closeMenu); document.removeEventListener('keydown',escapeMenu); reset(); };
  }, [stopped]);


  useEffect(() => {
    const progress = document.querySelector<HTMLElement>('.reading-progress');
    let frame = 0;
    let travel = 1;
    const update = () => {
      frame = 0;
      // Only this layer changes. No inherited CSS variables or layout reads.
      if (progress) progress.style.transform = `scaleX(${Math.min(1, Math.max(0, scrollY / travel))})`;
    };
    const measure = () => { travel = Math.max(1, document.documentElement.scrollHeight - innerHeight); update(); };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', measure);
    measure();
    return () => { observer.disconnect(); removeEventListener('scroll', schedule); removeEventListener('resize', measure); cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    const scenes = document.querySelectorAll('.hero, .project-card');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      entry.target.classList.toggle('scene-offscreen', !entry.isIntersecting);
    }));
    scenes.forEach(scene => observer.observe(scene));
    return () => { observer.disconnect(); scenes.forEach(scene => scene.classList.remove('scene-offscreen')); };
  }, []);

  useEffect(() => {
    if (stopped || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const cards = document.querySelectorAll<HTMLElement>('.skill-card, .flow-card');
    const move = (event: PointerEvent) => {
      const card = event.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      card.style.setProperty('--tilt-x', `${-y * 7}deg`);
      card.style.setProperty('--tilt-y', `${x * 7}deg`);
      card.style.setProperty('--light-x', `${(x + .5) * 100}%`);
      card.style.setProperty('--light-y', `${(y + .5) * 100}%`);
    };
    const reset = (event: PointerEvent) => {
      const card = event.currentTarget as HTMLElement;
      card.style.setProperty('--tilt-x', '0deg'); card.style.setProperty('--tilt-y', '0deg');
    };
    cards.forEach(card => { card.addEventListener('pointermove',move); card.addEventListener('pointerleave',reset); });
    return () => cards.forEach(card => {
      card.removeEventListener('pointermove',move); card.removeEventListener('pointerleave',reset);
      card.style.setProperty('--tilt-x','0deg'); card.style.setProperty('--tilt-y','0deg');
    });
  }, [stopped]);

  return <>
    <div className="reading-progress" aria-hidden="true" />
    <canvas ref={canvas} className="neural-field" aria-hidden="true" />
    <button className="motion-toggle" onClick={() => setPaused(!paused)} disabled={systemReduced} aria-pressed={stopped} aria-label={systemReduced ? 'Reduced motion enabled by your device' : paused ? 'Resume animations' : 'Pause animations'}>
      <span aria-hidden="true">{stopped ? 'Ⅱ' : '◌'}</span> {stopped ? 'Motion off' : 'Motion on'}
    </button>
  </>;
}
