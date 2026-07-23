import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }) {
  const location = useLocation();
  const [display, setDisplay] = useState(children);
  const [phase, setPhase] = useState('in');
  const lastPath = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname === lastPath.current) {
      setDisplay(children);
      return;
    }
    setPhase('out');
    const t = setTimeout(() => {
      lastPath.current = location.pathname;
      setDisplay(children);
      setPhase('in');
    }, 220);
    return () => clearTimeout(t);
  }, [location.pathname, children]);

  return (
    <>
      <div key={lastPath.current} style={{
        animation: phase === 'out' ? 'a12-page-out 0.22s ease forwards' : 'a12-page-in 0.35s cubic-bezier(.22,1,.36,1)',
      }}>{display}</div>
      <div aria-hidden style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998,
        background: 'linear-gradient(120deg, rgba(139,92,246,0.6), rgba(236,72,153,0.6), rgba(6,182,212,0.6))',
        transform: phase === 'out' ? 'translateX(0)' : 'translateX(-110%)',
        transition: 'transform 0.35s cubic-bezier(.22,1,.36,1)',
      }} />
    </>
  );
}
