import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// PWA was removed to eliminate stale-cache blank-page bugs.
// Actively unregister any leftover SW from previous deploys so users
// with cached workers get fresh HTML immediately.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => {
    if (regs.length === 0) return;
    Promise.all(regs.map(r => r.unregister())).then(() => {
      if ('caches' in window) caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
    });
  });
}
