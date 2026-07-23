import React, { useState } from 'react';

const E = [
  ['H',1,1,1,'#EC4899'],['He',2,1,18,'#F5A623'],['Li',3,2,1,'#8B5CF6'],['Be',4,2,2,'#8B5CF6'],['B',5,2,13,'#10B981'],['C',6,2,14,'#06B6D4'],['N',7,2,15,'#06B6D4'],['O',8,2,16,'#06B6D4'],['F',9,2,17,'#EC4899'],['Ne',10,2,18,'#F5A623'],
  ['Na',11,3,1,'#8B5CF6'],['Mg',12,3,2,'#8B5CF6'],['Al',13,3,13,'#94A3B8'],['Si',14,3,14,'#10B981'],['P',15,3,15,'#06B6D4'],['S',16,3,16,'#06B6D4'],['Cl',17,3,17,'#EC4899'],['Ar',18,3,18,'#F5A623'],
  ['K',19,4,1,'#8B5CF6'],['Ca',20,4,2,'#8B5CF6'],['Fe',26,4,8,'#F472B6'],['Cu',29,4,11,'#F472B6'],['Zn',30,4,12,'#F472B6'],['Br',35,4,17,'#EC4899'],
  ['Ag',47,5,11,'#F472B6'],['I',53,5,17,'#EC4899'],['Au',79,6,11,'#F472B6'],['Hg',80,6,12,'#F472B6'],['Pb',82,6,14,'#94A3B8'],
];
const INFO = { H: 'Hydrogen · 1.008', He: 'Helium · 4.003', Li: 'Lithium · 6.94', Na: 'Sodium · 22.99', Fe: 'Iron · 55.85' };

export default function PeriodicTable() {
  const [sel, setSel] = useState(null);
  return (
    <div className="page-enter">
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🌍 Interactive Periodic Table</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>Click any element</p>
      <div className="glass" style={{ padding: 20, borderRadius: 16, overflowX: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(18, minmax(48px, 1fr))', gap: 4, minWidth: 900 }}>
          {E.map(([sym, num, row, col, color]) => (
            <button key={sym} onClick={() => setSel({ sym, num, info: INFO[sym] || `${sym} · Atomic #${num}` })}
              style={{ gridRow: row, gridColumn: col, padding: 6, background: `${color}22`, border: `1px solid ${color}`, borderRadius: 6, color: 'var(--text)', cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>{num}</div>
              <div style={{ fontWeight: 800 }}>{sym}</div>
            </button>
          ))}
        </div>
      </div>
      {sel && <div className="glass-strong" style={{ padding: 20, borderRadius: 14, marginTop: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 60, fontFamily: 'Sora', fontWeight: 900, background: 'var(--aurora)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{sel.sym}</div>
        <div>{sel.info}</div>
      </div>}
    </div>
  );
}
