import React, { useEffect, useState } from 'react';

/**
 * Floating "Install App" banner that appears once the browser fires
 * `beforeinstallprompt`. On iOS (where the event never fires) we show
 * a manual hint after a short delay.
 *
 * User-dismissed state is persisted in localStorage so we don't nag.
 */
const STORAGE_KEY = 'after12th_install_dismissed';

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState(null);
  const [show, setShow] = useState(false);
  const [iosHint, setIosHint] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    // Standard install prompt (Android / desktop Chrome / Edge)
    const onPrompt = (e) => {
      e.preventDefault();
      setDeferred(e);
      setShow(true);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);

    // Already installed? Don't show.
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    // iOS Safari fallback — never fires beforeinstallprompt
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS) {
      const t = setTimeout(() => { setIosHint(true); setShow(true); }, 8000);
      return () => { clearTimeout(t); window.removeEventListener('beforeinstallprompt', onPrompt); };
    }

    return () => window.removeEventListener('beforeinstallprompt', onPrompt);
  }, []);

  const install = async () => {
    if (!deferred) return;
    deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === 'accepted') localStorage.setItem(STORAGE_KEY, '1');
    setDeferred(null);
    setShow(false);
  };

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 16, left: 16, right: 16,
      maxWidth: 460, margin: '0 auto',
      background: 'rgba(15,21,48,0.92)',
      backdropFilter: 'blur(28px) saturate(150%)',
      WebkitBackdropFilter: 'blur(28px) saturate(150%)',
      border: '1px solid rgba(139,92,246,0.45)',
      borderRadius: 16,
      padding: 18,
      boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 50px rgba(139,92,246,0.3)',
      zIndex: 9998,
      display: 'flex', alignItems: 'center', gap: 14,
      animation: 'slideUp 0.45s cubic-bezier(.22,1,.36,1)',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: 'linear-gradient(135deg, #8B5CF6, #EC4899, #06B6D4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22, flexShrink: 0,
        boxShadow: '0 6px 22px rgba(139,92,246,0.5)',
      }}>📲</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 14, color: '#F8FAFC', marginBottom: 2 }}>
          Install After12th AI
        </div>
        <div style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.4 }}>
          {iosHint
            ? 'Tap Share → "Add to Home Screen" for the full app experience.'
            : 'One-tap install. Works offline. No ads.'}
        </div>
      </div>

      {!iosHint && (
        <button onClick={install} style={{
          background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
          color: 'white', border: '1px solid rgba(255,255,255,0.18)',
          padding: '9px 18px', borderRadius: 10,
          fontFamily: 'Sora', fontWeight: 700, fontSize: 13,
          cursor: 'pointer', whiteSpace: 'nowrap',
          boxShadow: '0 6px 18px rgba(139,92,246,0.5)',
        }}>Install</button>
      )}

      <button onClick={dismiss} aria-label="Dismiss" style={{
        background: 'transparent', border: 'none',
        color: '#64748B', cursor: 'pointer',
        fontSize: 20, padding: 4, flexShrink: 0,
      }}>✕</button>

      <style>{`@keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
