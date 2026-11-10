import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import './landing/landing.css';

const CoupleScene = lazy(() => import('./landing/CoupleScene'));
export type Person = 'yujoo' | 'hyungjun';

const people = [
  { id: 'yujoo' as const, name: '이유주', role: 'Frontend', email: 'mail@leeyujoo.com' },
  { id: 'hyungjun' as const, name: '박형준', role: 'Backend', email: 'kong8715@gmail.com' },
];

function Arrow() {
  return <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function App() {
  const [motion, setMotion] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [activePerson, setActivePerson] = useState<Person | null>(null);
  const [sceneReady, setSceneReady] = useState(false);
  const stageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setMotion(!query.matches);
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = motion ? 'on' : 'off';
    const stage = stageRef.current;
    if (!stage) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let previous = 0;
    const letters = Array.from(stage.querySelectorAll<HTMLElement>('.letter > span')).map(node => ({ node, x: 0, y: 0, vx: 0, vy: 0, targetX: 0, targetY: 0 }));
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const rect = stage.getBoundingClientRect();
      targetX = (event.clientX - rect.left) / rect.width - 0.5;
      targetY = (event.clientY - rect.top) / rect.height - 0.5;
      for (const letter of letters) {
        const bounds = letter.node.getBoundingClientRect();
        const dx = event.clientX - bounds.x - bounds.width / 2;
        const dy = event.clientY - bounds.y - bounds.height / 2;
        const distance = Math.hypot(dx, dy);
        const influence = Math.max(0, 1 - distance / Math.min(320, rect.width * .24));
        letter.targetX = -dx / Math.max(distance, 1) * influence * 32;
        letter.targetY = -dy / Math.max(distance, 1) * influence * 28;
      }
    };
    const reset = () => { targetX = 0; targetY = 0; letters.forEach(letter => { letter.targetX = 0; letter.targetY = 0; }); };
    const update = (time: number) => {
      const dt = Math.min((time - previous) / 1000, .032);
      previous = time;
      x += (targetX - x) * 0.075;
      y += (targetY - y) * 0.075;
      stage.style.setProperty('--pointer-x', motion ? x.toFixed(4) : '0');
      stage.style.setProperty('--pointer-y', motion ? y.toFixed(4) : '0');
      for (const letter of letters) {
        letter.vx += ((letter.targetX - letter.x) * 140 - letter.vx * 13) * dt;
        letter.vy += ((letter.targetY - letter.y) * 140 - letter.vy * 13) * dt;
        letter.x += letter.vx * dt;
        letter.y += letter.vy * dt;
        letter.node.style.translate = motion ? `${letter.x.toFixed(2)}px ${letter.y.toFixed(2)}px` : '0 0';
        letter.node.style.rotate = motion ? `${(letter.vx * .045).toFixed(2)}deg` : '0deg';
      }
      if (motion) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    stage.addEventListener('pointermove', move);
    stage.addEventListener('pointerleave', reset);
    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener('pointermove', move);
      stage.removeEventListener('pointerleave', reset);
    };
  }, [motion]);

  return <>
    <a className="skip-link" href="#main">본문으로 건너뛰기</a>
    <main id="main" className={`landing ${sceneReady ? 'scene-ready' : ''}`} ref={stageRef} data-person={activePerson || 'none'}>
      <header className="site-header">
        <svg className="brand-symbol" viewBox="0 0 72 40" fill="none" aria-hidden="true">
          <path d="m16 10-10 10 10 10m40-20 10 10-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M36 30S23 22 23 15a7 7 0 0 1 13-3 7 7 0 0 1 13 3c0 7-13 15-13 15Z" fill="currentColor" />
        </svg>
        <button className="motion-button" onClick={() => setMotion(value => !value)} aria-label={motion ? '애니메이션 일시정지' : '애니메이션 재생'} aria-pressed={!motion} title={motion ? '모션 끄기' : '모션 켜기'}>
          <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={motion ? 'M9 6v12M15 6v12' : 'm8 5 11 7-11 7Z'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </header>

      <div className="scene-fallback" aria-hidden="true"><span className="fallback-heart">♥</span><svg viewBox="0 0 1400 900" preserveAspectRatio="none"><path d="M-100 640C210 920 570 670 730 360S1200 40 1530 320" /></svg></div>
      <Suspense fallback={null}><CoupleScene motion={motion} activePerson={activePerson} onReady={setSceneReady} /></Suspense>

      <div className="title-group">
        <p className="hero-description">우리는 부부개발자!</p>
        <h1 id="hero-title" aria-label="bubu.dev">
          <span className="wordmark" aria-hidden="true">{'bubu'.split('').map((letter, index) => <span className={`letter letter-${index}`} key={index}><span data-letter={letter}>{letter}</span></span>)}</span>
          <span className="domain-suffix" aria-hidden="true">.dev<span className="suffix-dot" /></span>
        </h1>
      </div>

      <a className="scroll-cue" href="#people" aria-label="두 사람 소개 보기">
        <svg viewBox="0 0 100 110" fill="none" aria-hidden="true">
          <defs><linearGradient id="arrow-light" x1="25" y1="10" x2="70" y2="90" gradientUnits="userSpaceOnUse"><stop stopColor="#e0d3f5" /><stop offset=".45" stopColor="#c9b4e8" /><stop offset="1" stopColor="#ad94d1" /></linearGradient></defs>
          <path d="M50 16v66M24 56l26 26 26-26" stroke="url(#arrow-light)" strokeWidth="19" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>

      {people.map(person => <a className={`person person--${person.id}`} id={person.id === 'yujoo' ? 'people' : undefined} href={`mailto:${person.email}`} key={person.id}
        onPointerEnter={() => setActivePerson(person.id)} onPointerLeave={() => setActivePerson(null)}
        onFocus={() => setActivePerson(person.id)} onBlur={() => setActivePerson(null)}>
        <div className="portrait" aria-hidden="true">
          <span className="portrait-halo" />
          <img src={`/assets/images/memoji-${person.id}.png`} alt="" width="280" height="280" draggable={false} />
          <span className="portrait-envelope"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.6" /><path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg></span>
        </div>
        <div className="person-info"><div className="person-heading"><h2>{person.name}</h2><span>{person.role}</span></div><span className="email-link"><span>{person.email}</span><Arrow /></span></div>
      </a>)}

      <div className="tiny-flower" aria-hidden="true"><svg viewBox="0 0 100 100"><path d="M50 25C20-15 0 20 25 50-15 80 20 110 50 75c30 40 65 5 25-25C115 20 80-15 50 25Z" fill="currentColor" /><circle cx="50" cy="50" r="10" fill="#fff8ed" /></svg></div>
      <footer className="site-footer"><span>© {new Date().getFullYear()}</span><span className="footer-mark" aria-hidden="true">{'{'}<span>♥</span>{'}'}</span></footer>
    </main>
  </>;
}
