import React from 'react';
const BOOKS = [
  { name: 'HC Verma Physics Vol 1', link: 'https://amzn.to/hcverma1', price: '₹380', img: '📕' },
  { name: 'HC Verma Physics Vol 2', link: 'https://amzn.to/hcverma2', price: '₹380', img: '📗' },
  { name: 'MTG Objective NCERT (NEET)', link: 'https://amzn.to/mtgncert', price: '₹550', img: '📘' },
  { name: 'Trueman\'s Biology', link: 'https://amzn.to/trueman', price: '₹720', img: '📙' },
  { name: 'DC Pandey Physics JEE', link: 'https://amzn.to/dcpandey', price: '₹640', img: '📕' },
  { name: 'Cengage Maths', link: 'https://amzn.to/cengage', price: '₹890', img: '📗' },
];
export default function BooksStore() {
  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🛒 Books Store</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>Recommended NEET/JEE books · Amazon affiliate links</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
        {BOOKS.map(b => (
          <div key={b.name} className="glass" style={{ padding: 20, borderRadius: 14, textAlign: 'center' }}>
            <div style={{ fontSize: 60 }}>{b.img}</div>
            <div style={{ fontWeight: 700, marginTop: 10, minHeight: 40 }}>{b.name}</div>
            <div style={{ color: 'var(--pink-2)', fontWeight: 800, margin: '10px 0' }}>{b.price}</div>
            <a href={b.link} target="_blank" rel="noopener" className="btn-primary" style={{ width: '100%' }}>Buy on Amazon</a>
          </div>
        ))}
      </div>
    </div>
  );
}
