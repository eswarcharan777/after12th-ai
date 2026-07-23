import React, { useState } from 'react';

export default function Calculator() {
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState('');
  const btn = (v) => setExpr(e => e + v);
  const calc = () => {
    try {
      const safe = expr.replace(/π/g, 'Math.PI').replace(/e/g, 'Math.E')
        .replace(/sin/g, 'Math.sin').replace(/cos/g, 'Math.cos').replace(/tan/g, 'Math.tan')
        .replace(/log/g, 'Math.log10').replace(/ln/g, 'Math.log').replace(/√/g, 'Math.sqrt')
        .replace(/\^/g, '**');
      setResult(String(eval(safe)));
    } catch { setResult('Error'); }
  };
  const keys = ['sin(', 'cos(', 'tan(', '^', 'π', '7', '8', '9', '/', '√(', '4', '5', '6', '*', 'log(', '1', '2', '3', '-', 'ln(', '0', '.', '(', '+', ')'];
  return (
    <div className="page-enter" style={{ maxWidth: 480, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 20 }}>🧮 Scientific Calculator</h1>
      <div className="glass" style={{ padding: 20, borderRadius: 16 }}>
        <input value={expr} onChange={e => setExpr(e.target.value)} style={{ width: '100%', padding: 14, fontSize: 20, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', marginBottom: 10 }} />
        <div style={{ textAlign: 'right', fontSize: 24, color: 'var(--pink-2)', minHeight: 32, fontFamily: 'monospace', fontWeight: 700 }}>{result}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginTop: 14 }}>
          {keys.map(k => <button key={k} onClick={() => btn(k)} style={{ padding: 14, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontWeight: 600 }}>{k}</button>)}
          <button onClick={() => { setExpr(''); setResult(''); }} style={{ padding: 14, borderRadius: 10, background: '#EF444422', border: '1px solid #EF4444', color: 'var(--text)' }}>C</button>
          <button onClick={calc} className="btn-primary" style={{ gridColumn: 'span 4' }}>= Solve</button>
        </div>
      </div>
    </div>
  );
}
