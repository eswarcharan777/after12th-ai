import { useEffect, useState } from 'react';

export default function Typewriter({ text, speed = 90, className = '', style = {} }) {
  const [shown, setShown] = useState('');
  useEffect(() => {
    setShown('');
    let i = 0;
    const t = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return (
    <span className={className} style={style}>
      {shown}
      <span style={{ display: 'inline-block', width: 2, marginLeft: 2, background: 'currentColor', animation: 'a12-caret 0.9s steps(1) infinite', verticalAlign: '-0.05em' }}>&nbsp;</span>
    </span>
  );
}
