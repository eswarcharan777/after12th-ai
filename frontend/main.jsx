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

// vite-plugin-pwa (registerType: 'autoUpdate' + skipWaiting/clientsClaim
// in vite.config.js) auto-injects the service-worker registration. Also
// force any old service worker to refresh once so users on the previous
// build get the new bundle on their next navigation, not the one after.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.update()));
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    // A new SW just took over — reload once so we're on the latest bundle.
    if (!window.__a12Reloaded) { window.__a12Reloaded = true; window.location.reload(); }
  });
}
