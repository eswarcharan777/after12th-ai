import React, { useEffect, useState } from 'react';

export default function OfflineIndicator() {
  const [online, setOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [justCameBack, setJustCameBack] = useState(false);

  useEffect(() => {
    const goOnline = () => {
      setOnline(true);
      setJustCameBack(true);
      setTimeout(() => setJustCameBack(false), 2500);
    };
    const goOffline = () => setOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  if (online && !justCameBack) return null;

  const style = {
    position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
    padding: '10px 18px', borderRadius: 999,
    fontSize: 13, fontWeight: 600, zIndex: 9999,
    boxShadow: '0 6px 24px rgba(0,0,0,0.35)',
    background: online ? 'rgba(16,185,129,0.95)' : 'rgba(30,30,40,0.95)',
    color: online ? '#04231a' : '#FDE68A',
    border: online ? '1px solid #10B981' : '1px solid #F5A623',
    backdropFilter: 'blur(10px)',
  };

  return (
    <div style={style} role="status" aria-live="polite">
      {online
        ? '✅ Back online — syncing'
        : '📴 You are offline — Notes, Flashcards & saved data still work'}
    </div>
  );
}
