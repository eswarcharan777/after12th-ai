import React, { createContext, useCallback, useContext, useState } from 'react';

const ToastCtx = createContext({ toast: () => {} });

export function useToast() { return useContext(ToastCtx).toast; }

let seq = 0;

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const toast = useCallback((message, type = 'info', timeout = 3200) => {
    const id = ++seq;
    setItems(list => [...list, { id, message, type }]);
    setTimeout(() => setItems(list => list.filter(t => t.id !== id)), timeout);
  }, []);

  // Expose a global helper so non-React code can fire toasts
  if (typeof window !== 'undefined') window.__a12Toast = toast;

  const color = (t) => t === 'success' ? '#10B981' : t === 'error' ? '#EF4444' : t === 'warn' ? '#F5A623' : '#8B5CF6';
  const icon = (t) => t === 'success' ? '✓' : t === 'error' ? '✕' : t === 'warn' ? '⚠' : '★';

  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}
      <div style={{ position: 'fixed', top: 80, right: 16, zIndex: 100000, display: 'flex', flexDirection: 'column', gap: 10, pointerEvents: 'none' }}>
        {items.map(t => (
          <div key={t.id} className="glass-strong" style={{
            padding: '12px 16px', borderRadius: 12, minWidth: 220,
            display: 'flex', alignItems: 'center', gap: 10,
            borderLeft: `3px solid ${color(t.type)}`,
            boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
            animation: 'a12-toast-in 0.35s cubic-bezier(.22,1,.36,1)',
            pointerEvents: 'auto',
          }}>
            <span style={{ color: color(t.type), fontWeight: 800, fontSize: 16 }}>{icon(t.type)}</span>
            <span style={{ color: 'var(--text)', fontSize: 14, fontWeight: 500 }}>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
