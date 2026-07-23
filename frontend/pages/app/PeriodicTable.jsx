import React, { useState, useMemo } from 'react';

// [symbol, atomic#, period (row), group (col), category, name, atomic mass]
// Lanthanides & actinides get placed on rows 8 & 9 with proper spacing.
const CAT = {
  nonmetal:      { color: '#06B6D4', label: 'Non-metal' },
  noble:         { color: '#F5A623', label: 'Noble gas' },
  alkali:        { color: '#EC4899', label: 'Alkali metal' },
  alkaline:      { color: '#8B5CF6', label: 'Alkaline earth' },
  transition:    { color: '#F472B6', label: 'Transition metal' },
  postTransition:{ color: '#94A3B8', label: 'Post-transition' },
  metalloid:     { color: '#10B981', label: 'Metalloid' },
  halogen:       { color: '#EF4444', label: 'Halogen' },
  lanthanide:    { color: '#A855F7', label: 'Lanthanide' },
  actinide:      { color: '#F97316', label: 'Actinide' },
  unknown:       { color: '#64748B', label: 'Unknown' },
};

const E = [
  ['H',1,1,1,'nonmetal','Hydrogen',1.008],
  ['He',2,1,18,'noble','Helium',4.003],
  ['Li',3,2,1,'alkali','Lithium',6.94],['Be',4,2,2,'alkaline','Beryllium',9.012],
  ['B',5,2,13,'metalloid','Boron',10.81],['C',6,2,14,'nonmetal','Carbon',12.011],['N',7,2,15,'nonmetal','Nitrogen',14.007],['O',8,2,16,'nonmetal','Oxygen',15.999],['F',9,2,17,'halogen','Fluorine',18.998],['Ne',10,2,18,'noble','Neon',20.180],
  ['Na',11,3,1,'alkali','Sodium',22.990],['Mg',12,3,2,'alkaline','Magnesium',24.305],
  ['Al',13,3,13,'postTransition','Aluminium',26.982],['Si',14,3,14,'metalloid','Silicon',28.085],['P',15,3,15,'nonmetal','Phosphorus',30.974],['S',16,3,16,'nonmetal','Sulfur',32.06],['Cl',17,3,17,'halogen','Chlorine',35.45],['Ar',18,3,18,'noble','Argon',39.948],
  ['K',19,4,1,'alkali','Potassium',39.098],['Ca',20,4,2,'alkaline','Calcium',40.078],
  ['Sc',21,4,3,'transition','Scandium',44.956],['Ti',22,4,4,'transition','Titanium',47.867],['V',23,4,5,'transition','Vanadium',50.942],['Cr',24,4,6,'transition','Chromium',51.996],['Mn',25,4,7,'transition','Manganese',54.938],['Fe',26,4,8,'transition','Iron',55.845],['Co',27,4,9,'transition','Cobalt',58.933],['Ni',28,4,10,'transition','Nickel',58.693],['Cu',29,4,11,'transition','Copper',63.546],['Zn',30,4,12,'transition','Zinc',65.38],
  ['Ga',31,4,13,'postTransition','Gallium',69.723],['Ge',32,4,14,'metalloid','Germanium',72.630],['As',33,4,15,'metalloid','Arsenic',74.922],['Se',34,4,16,'nonmetal','Selenium',78.971],['Br',35,4,17,'halogen','Bromine',79.904],['Kr',36,4,18,'noble','Krypton',83.798],
  ['Rb',37,5,1,'alkali','Rubidium',85.468],['Sr',38,5,2,'alkaline','Strontium',87.62],
  ['Y',39,5,3,'transition','Yttrium',88.906],['Zr',40,5,4,'transition','Zirconium',91.224],['Nb',41,5,5,'transition','Niobium',92.906],['Mo',42,5,6,'transition','Molybdenum',95.95],['Tc',43,5,7,'transition','Technetium',98],['Ru',44,5,8,'transition','Ruthenium',101.07],['Rh',45,5,9,'transition','Rhodium',102.91],['Pd',46,5,10,'transition','Palladium',106.42],['Ag',47,5,11,'transition','Silver',107.87],['Cd',48,5,12,'transition','Cadmium',112.41],
  ['In',49,5,13,'postTransition','Indium',114.82],['Sn',50,5,14,'postTransition','Tin',118.71],['Sb',51,5,15,'metalloid','Antimony',121.76],['Te',52,5,16,'metalloid','Tellurium',127.60],['I',53,5,17,'halogen','Iodine',126.90],['Xe',54,5,18,'noble','Xenon',131.29],
  ['Cs',55,6,1,'alkali','Caesium',132.91],['Ba',56,6,2,'alkaline','Barium',137.33],
  // Row 6 skips group 3 (lanthanide placeholder), then continues Hf onwards
  ['Hf',72,6,4,'transition','Hafnium',178.49],['Ta',73,6,5,'transition','Tantalum',180.95],['W',74,6,6,'transition','Tungsten',183.84],['Re',75,6,7,'transition','Rhenium',186.21],['Os',76,6,8,'transition','Osmium',190.23],['Ir',77,6,9,'transition','Iridium',192.22],['Pt',78,6,10,'transition','Platinum',195.08],['Au',79,6,11,'transition','Gold',196.97],['Hg',80,6,12,'transition','Mercury',200.59],
  ['Tl',81,6,13,'postTransition','Thallium',204.38],['Pb',82,6,14,'postTransition','Lead',207.2],['Bi',83,6,15,'postTransition','Bismuth',208.98],['Po',84,6,16,'postTransition','Polonium',209],['At',85,6,17,'halogen','Astatine',210],['Rn',86,6,18,'noble','Radon',222],
  ['Fr',87,7,1,'alkali','Francium',223],['Ra',88,7,2,'alkaline','Radium',226],
  ['Rf',104,7,4,'transition','Rutherfordium',267],['Db',105,7,5,'transition','Dubnium',270],['Sg',106,7,6,'transition','Seaborgium',271],['Bh',107,7,7,'transition','Bohrium',270],['Hs',108,7,8,'transition','Hassium',277],['Mt',109,7,9,'unknown','Meitnerium',278],['Ds',110,7,10,'unknown','Darmstadtium',281],['Rg',111,7,11,'unknown','Roentgenium',282],['Cn',112,7,12,'transition','Copernicium',285],
  ['Nh',113,7,13,'unknown','Nihonium',286],['Fl',114,7,14,'unknown','Flerovium',289],['Mc',115,7,15,'unknown','Moscovium',290],['Lv',116,7,16,'unknown','Livermorium',293],['Ts',117,7,17,'unknown','Tennessine',294],['Og',118,7,18,'unknown','Oganesson',294],
  // Lanthanides — row 9 (visually separated below main table), columns 3-17
  ['La',57,9,3,'lanthanide','Lanthanum',138.91],['Ce',58,9,4,'lanthanide','Cerium',140.12],['Pr',59,9,5,'lanthanide','Praseodymium',140.91],['Nd',60,9,6,'lanthanide','Neodymium',144.24],['Pm',61,9,7,'lanthanide','Promethium',145],['Sm',62,9,8,'lanthanide','Samarium',150.36],['Eu',63,9,9,'lanthanide','Europium',151.96],['Gd',64,9,10,'lanthanide','Gadolinium',157.25],['Tb',65,9,11,'lanthanide','Terbium',158.93],['Dy',66,9,12,'lanthanide','Dysprosium',162.50],['Ho',67,9,13,'lanthanide','Holmium',164.93],['Er',68,9,14,'lanthanide','Erbium',167.26],['Tm',69,9,15,'lanthanide','Thulium',168.93],['Yb',70,9,16,'lanthanide','Ytterbium',173.05],['Lu',71,9,17,'lanthanide','Lutetium',174.97],
  // Actinides — row 10
  ['Ac',89,10,3,'actinide','Actinium',227],['Th',90,10,4,'actinide','Thorium',232.04],['Pa',91,10,5,'actinide','Protactinium',231.04],['U',92,10,6,'actinide','Uranium',238.03],['Np',93,10,7,'actinide','Neptunium',237],['Pu',94,10,8,'actinide','Plutonium',244],['Am',95,10,9,'actinide','Americium',243],['Cm',96,10,10,'actinide','Curium',247],['Bk',97,10,11,'actinide','Berkelium',247],['Cf',98,10,12,'actinide','Californium',251],['Es',99,10,13,'actinide','Einsteinium',252],['Fm',100,10,14,'actinide','Fermium',257],['Md',101,10,15,'actinide','Mendelevium',258],['No',102,10,16,'actinide','Nobelium',259],['Lr',103,10,17,'actinide','Lawrencium',266],
];

export default function PeriodicTable() {
  const [sel, setSel] = useState(null);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return new Set(E.filter(e => e[0].toLowerCase().includes(q) || e[5].toLowerCase().includes(q) || String(e[1]) === q).map(e => e[0]));
  }, [query]);

  return (
    <div className="page-enter">
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🌍 Interactive Periodic Table</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 16 }}>All 118 elements. Click any element for details.</p>

      <div style={{ marginBottom: 14 }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by name, symbol or atomic number..."
          style={{ width: '100%', maxWidth: 380, padding: '10px 14px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)' }}
        />
      </div>

      <div className="glass" style={{ padding: 14, borderRadius: 16, overflowX: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(18, minmax(46px, 1fr))', gap: 3, minWidth: 900 }}>
          {E.map(([sym, num, row, col, cat, name, mass]) => {
            const c = CAT[cat] || CAT.unknown;
            const dim = filtered && !filtered.has(sym);
            return (
              <button
                key={sym}
                onClick={() => setSel({ sym, num, name, mass, cat })}
                title={`${name} (${sym}) · Atomic #${num}`}
                style={{
                  gridRow: row, gridColumn: col,
                  padding: '4px 2px',
                  background: `${c.color}${dim ? '11' : '2A'}`,
                  border: `1px solid ${c.color}${dim ? '44' : 'CC'}`,
                  borderRadius: 6, color: 'var(--text)', cursor: 'pointer',
                  textAlign: 'center', opacity: dim ? 0.25 : 1,
                  transition: 'opacity 0.15s, transform 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.zIndex = 5; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.zIndex = 1; }}
              >
                <div style={{ fontSize: 9, color: 'var(--text-dim)' }}>{num}</div>
                <div style={{ fontWeight: 800, fontSize: 13 }}>{sym}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14, marginBottom: 8 }}>
        {Object.entries(CAT).map(([key, c]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-dim)' }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: c.color }} /> {c.label}
          </div>
        ))}
      </div>

      {sel && (
        <div className="glass-strong" style={{ padding: 24, borderRadius: 14, marginTop: 16 }}>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ padding: '18px 24px', background: `${(CAT[sel.cat] || CAT.unknown).color}33`, border: `2px solid ${(CAT[sel.cat] || CAT.unknown).color}`, borderRadius: 12, textAlign: 'center', minWidth: 100 }}>
              <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{sel.num}</div>
              <div style={{ fontFamily: 'Sora', fontWeight: 900, fontSize: 40 }}>{sel.sym}</div>
              <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{sel.mass}</div>
            </div>
            <div>
              <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 22 }}>{sel.name}</div>
              <div style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 4 }}>{(CAT[sel.cat] || CAT.unknown).label}</div>
              <div style={{ color: 'var(--text-mid)', fontSize: 13, marginTop: 4 }}>Atomic number: {sel.num} · Atomic mass: {sel.mass}</div>
              <a href={`https://en.wikipedia.org/wiki/${encodeURIComponent(sel.name)}`} target="_blank" rel="noopener noreferrer"
                 style={{ color: 'var(--violet-2)', fontSize: 13, textDecoration: 'none', marginTop: 8, display: 'inline-block' }}>
                Read more on Wikipedia →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
