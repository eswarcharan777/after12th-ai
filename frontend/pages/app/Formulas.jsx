import React, { useState, useMemo } from 'react';
import Reveal from '../../components/Reveal';

const FORMULAS = {
  Physics: {
    'Mechanics': [
      ['Newton\'s 2nd Law', 'F = ma'],
      ['Work-Energy Theorem', 'W = ΔKE = ½mv² − ½mu²'],
      ['Kinetic Energy', 'KE = ½mv²'],
      ['Potential Energy', 'PE = mgh'],
      ['Momentum', 'p = mv'],
      ['Impulse', 'J = FΔt = Δp'],
      ['Force on incline', 'F = mg sinθ'],
      ['Centripetal Force', 'F = mv²/r'],
      ['Angular Velocity', 'ω = 2π/T = 2πf'],
      ['Moment of Inertia (sphere)', 'I = (2/5)MR²'],
    ],
    'Gravitation & SHM': [
      ['Universal Gravitation', 'F = Gm₁m₂/r²'],
      ['Escape Velocity', 'v = √(2gR) ≈ 11.2 km/s'],
      ['Orbital Velocity', 'v = √(GM/r)'],
      ['Time Period of SHM', 'T = 2π√(m/k)'],
      ['Simple Pendulum', 'T = 2π√(L/g)'],
      ['Velocity in SHM', 'v = ω√(A² − x²)'],
    ],
    'Thermodynamics': [
      ['1st Law', 'ΔU = Q − W'],
      ['Ideal Gas Law', 'PV = nRT'],
      ['Adiabatic Process', 'PV^γ = constant'],
      ['Efficiency (Carnot)', 'η = 1 − T₂/T₁'],
      ['Specific Heat', 'Q = mcΔT'],
    ],
    'Waves & Optics': [
      ['Wave Speed', 'v = fλ'],
      ['Lens Formula', '1/v − 1/u = 1/f'],
      ['Mirror Formula', '1/v + 1/u = 1/f'],
      ['Magnification', 'm = v/u'],
      ['Power of Lens', 'P = 1/f (in meters), unit: Dioptre'],
      ['Snell\'s Law', 'n₁sinθ₁ = n₂sinθ₂'],
      ['Critical Angle', 'sinθc = 1/n'],
      ['Doppler Effect', 'f\' = f(v ± vo)/(v ∓ vs)'],
    ],
    'Electricity & Magnetism': [
      ['Coulomb\'s Law', 'F = kq₁q₂/r²'],
      ['Electric Field', 'E = F/q = kQ/r²'],
      ['Capacitance', 'C = Q/V = ε₀A/d'],
      ['Ohm\'s Law', 'V = IR'],
      ['Power', 'P = VI = I²R = V²/R'],
      ['Resistance in series', 'R = R₁ + R₂ + ...'],
      ['Resistance in parallel', '1/R = 1/R₁ + 1/R₂ + ...'],
      ['Magnetic Field (loop)', 'B = μ₀I/(2R)'],
      ['EMF (induction)', 'ε = −N·dΦ/dt'],
    ],
    'Modern Physics': [
      ['Photoelectric Effect', 'KE_max = hf − φ'],
      ['de Broglie Wavelength', 'λ = h/p = h/(mv)'],
      ['Mass-Energy Equivalence', 'E = mc²'],
      ['Half-life Decay', 'N = N₀(½)^(t/T₁/₂)'],
      ['Bohr Radius (n=1)', 'a₀ = 0.529 Å'],
    ],
  },
  Chemistry: {
    'Stoichiometry': [
      ['Moles', 'n = mass / molar mass'],
      ['Molarity', 'M = moles of solute / L of solution'],
      ['Molality', 'm = moles of solute / kg of solvent'],
      ['Mole Fraction', 'x = n_i / n_total'],
      ['Avogadro\'s Number', '6.022 × 10²³ /mol'],
    ],
    'Gases & Solutions': [
      ['Ideal Gas Law', 'PV = nRT'],
      ['Boyle\'s Law', 'P₁V₁ = P₂V₂'],
      ['Charles\'s Law', 'V₁/T₁ = V₂/T₂'],
      ['Raoult\'s Law', 'P = P°·x_solvent'],
      ['ΔTb (BP elevation)', 'ΔTb = Kb·m'],
      ['ΔTf (FP depression)', 'ΔTf = Kf·m'],
    ],
    'Thermodynamics': [
      ['1st Law', 'ΔU = Q + W'],
      ['Enthalpy', 'H = U + PV'],
      ['Gibbs Free Energy', 'ΔG = ΔH − TΔS'],
      ['Spontaneous if', 'ΔG < 0'],
    ],
    'Equilibrium & Kinetics': [
      ['Kc', 'Kc = [products]/[reactants]'],
      ['Kp = Kc·(RT)^Δn'],
      ['pH', 'pH = −log[H⁺]'],
      ['Henderson-Hasselbalch', 'pH = pKa + log([A⁻]/[HA])'],
      ['Rate Law', 'rate = k[A]^m[B]^n'],
      ['First-order half-life', 't₁/₂ = 0.693/k'],
      ['Arrhenius', 'k = A·e^(−Ea/RT)'],
    ],
    'Electrochemistry': [
      ['Nernst Equation', 'E = E° − (0.0591/n)·log Q'],
      ['Faraday\'s Law', 'm = ZIt'],
      ['ΔG° = −nFE°'],
    ],
  },
  Biology: {
    'Cell Biology': [
      ['Magnification', 'M = image size / actual size'],
      ['Cell membrane model', 'Fluid Mosaic (Singer & Nicolson, 1972)'],
      ['Prokaryote size', '1–10 μm'],
      ['Eukaryote size', '10–100 μm'],
      ['Mitochondria DNA', 'Circular, maternally inherited'],
    ],
    'Genetics': [
      ['Mendel\'s ratio (F₂)', '3 : 1 (monohybrid), 9 : 3 : 3 : 1 (dihybrid)'],
      ['Test cross ratio', '1 : 1'],
      ['Chargaff\'s Rule', 'A = T, G = C'],
      ['DNA length per bp', '3.4 Å'],
      ['Codons total', '64 (61 sense + 3 stop)'],
      ['Hardy-Weinberg', 'p² + 2pq + q² = 1'],
    ],
    'Human Physiology': [
      ['Cardiac Output', 'CO = HR × Stroke Volume'],
      ['Normal BP', '120/80 mmHg'],
      ['Vital Capacity', 'VC = TV + IRV + ERV ≈ 4500 mL'],
      ['GFR (kidney)', '~125 mL/min'],
      ['Hb oxygen capacity', '1.34 mL O₂ per g Hb'],
      ['Nerve impulse speed', '~100 m/s (myelinated)'],
    ],
    'Ecology': [
      ['Population growth (exp)', 'dN/dt = rN'],
      ['Logistic growth', 'dN/dt = rN·(K−N)/K'],
      ['10% Energy Rule', 'Only 10% energy passes to next trophic level'],
      ['Simpson Index', 'D = Σ(nᵢ/N)²'],
      ['Shannon-Weaver Index', 'H = −Σ pᵢ·ln pᵢ'],
    ],
    'Biotechnology': [
      ['PCR steps', 'Denaturation (94°C) → Annealing (55°C) → Extension (72°C)'],
      ['Ti Plasmid host', 'Agrobacterium tumefaciens'],
      ['Restriction enzyme naming', 'EcoRI = Escherichia coli, strain R, 1st enzyme'],
      ['Gel electrophoresis', 'DNA moves + → − (anode)'],
    ],
    'Reproduction & Development': [
      ['Human gestation', '~280 days (40 weeks)'],
      ['Sperm count (normal)', '60–150 million/mL'],
      ['Menstrual cycle', '28 days average'],
      ['Ovulation day', 'Day 14 of cycle'],
    ],
  },
  Mathematics: {
    'Algebra': [
      ['Quadratic Formula', 'x = (−b ± √(b² − 4ac))/(2a)'],
      ['Discriminant', 'D = b² − 4ac'],
      ['AP nth term', 'aₙ = a + (n−1)d'],
      ['AP sum', 'Sₙ = (n/2)(2a + (n−1)d)'],
      ['GP nth term', 'aₙ = ar^(n−1)'],
      ['GP sum', 'Sₙ = a(rⁿ − 1)/(r − 1)'],
      ['Infinite GP', 'S∞ = a/(1−r), |r| < 1'],
    ],
    'Trigonometry': [
      ['sin²θ + cos²θ', '= 1'],
      ['1 + tan²θ', '= sec²θ'],
      ['sin(A±B)', '= sinA·cosB ± cosA·sinB'],
      ['cos(A±B)', '= cosA·cosB ∓ sinA·sinB'],
      ['sin 2θ', '= 2sinθ·cosθ'],
      ['cos 2θ', '= cos²θ − sin²θ = 1 − 2sin²θ'],
      ['Sine Rule', 'a/sinA = b/sinB = c/sinC'],
      ['Cosine Rule', 'c² = a² + b² − 2ab·cosC'],
    ],
    'Calculus': [
      ['d/dx(xⁿ)', '= nx^(n−1)'],
      ['d/dx(sin x)', '= cos x'],
      ['d/dx(cos x)', '= −sin x'],
      ['d/dx(ln x)', '= 1/x'],
      ['d/dx(eˣ)', '= eˣ'],
      ['∫xⁿ dx', '= x^(n+1)/(n+1) + C'],
      ['∫(1/x) dx', '= ln|x| + C'],
      ['∫eˣ dx', '= eˣ + C'],
      ['Chain Rule', 'd/dx[f(g(x))] = f\'(g(x))·g\'(x)'],
      ['Product Rule', '(uv)\' = u\'v + uv\''],
    ],
    'Coordinate Geometry': [
      ['Distance Formula', 'd = √((x₂−x₁)² + (y₂−y₁)²)'],
      ['Midpoint', '((x₁+x₂)/2, (y₁+y₂)/2)'],
      ['Slope', 'm = (y₂−y₁)/(x₂−x₁)'],
      ['Line (point-slope)', 'y − y₁ = m(x − x₁)'],
      ['Circle (centre h,k)', '(x−h)² + (y−k)² = r²'],
    ],
    'Probability & Vectors': [
      ['P(A∪B)', '= P(A) + P(B) − P(A∩B)'],
      ['Bayes Theorem', 'P(A|B) = P(B|A)·P(A)/P(B)'],
      ['Dot Product', 'a·b = |a||b|cosθ'],
      ['Cross Product Magnitude', '|a×b| = |a||b|sinθ'],
    ],
  },
};

export default function Formulas() {
  const user = JSON.parse(localStorage.getItem('after12th_user') || '{}');
  const isNEET = (user.exam || 'NEET') !== 'JEE';
  // NEET students see Bio (no Maths). JEE students see Maths (no Bio).
  const subjects = isNEET
    ? ['Physics', 'Chemistry', 'Biology']
    : ['Physics', 'Chemistry', 'Mathematics'];
  const [subject, setSubject] = useState(subjects[0]);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const data = FORMULAS[subject];
    if (!search) return data;
    const q = search.toLowerCase();
    const result = {};
    Object.entries(data).forEach(([chapter, list]) => {
      const matches = list.filter(([n, f]) => n.toLowerCase().includes(q) || f.toLowerCase().includes(q));
      if (matches.length) result[chapter] = matches;
    });
    return result;
  }, [subject, search]);

  return (
    <div className="page-enter">
      <Reveal variant="up">
        <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 28, color: 'var(--text)', marginBottom: 6 }}>📐 Formula Sheet</h2>
        <p style={{ color: 'var(--text-dim)', marginBottom: 22 }}>Quick reference for the most-used NEET/JEE formulas. Search any formula instantly.</p>
      </Reveal>

      <div style={{ display: 'flex', gap: 10, marginBottom: 22, flexWrap: 'wrap', alignItems: 'center' }}>
        {subjects.map(s => {
          const active = subject === s;
          return (
            <button key={s} onClick={() => setSubject(s)} style={{
              padding: '10px 22px', borderRadius: 22, fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'all 0.25s',
              border: `1px solid ${active ? 'var(--violet)' : 'var(--border)'}`,
              background: active ? 'var(--aurora)' : 'rgba(255,255,255,0.03)',
              color: active ? 'white' : 'var(--text-mid)',
              fontFamily: 'inherit',
              boxShadow: active ? '0 6px 22px rgba(139,92,246,0.4)' : 'none',
            }}>{s}</button>
          );
        })}
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search formula..." style={{
          flex: 1, minWidth: 200, marginLeft: 'auto',
          padding: '11px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 14, color: 'var(--text)',
        }} />
      </div>

      {Object.keys(filtered).length === 0 && (
        <div className="glass" style={{ padding: 40, textAlign: 'center', color: 'var(--text-dim)' }}>
          No formulas match "{search}". Try a different search.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 18 }}>
        {Object.entries(filtered).map(([chapter, items], i) => (
          <Reveal key={chapter} variant="up" delay={i * 60}>
            <div className="glass" style={{ padding: 22, borderRadius: 14 }}>
              <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 15, color: 'var(--violet-2)', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid var(--border)', letterSpacing: 1, textTransform: 'uppercase' }}>
                {chapter}
              </div>
              {items.map(([name, formula], j) => (
                <div key={j} style={{ padding: '10px 0', borderBottom: j === items.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 4 }}>{name}</div>
                  <div style={{ fontFamily: 'Consolas, monospace', fontSize: 14, color: 'var(--text)', fontWeight: 500, padding: '6px 12px', background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 8, display: 'inline-block' }}>
                    {formula}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
