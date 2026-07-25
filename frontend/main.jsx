import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Service worker: if the deployed bundle changed since the last visit,
// pick up the new version automatically instead of serving a stale (blank)
// page. The user's first click after a deploy now Just Works.
if ('serviceWorker' in navigator) {
  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() { updateSW(true); },  // auto-apply new version
    onOfflineReady() { /* offline cache ready */ },
    onRegisteredSW(_url, reg) {
      // Poll for updates every 60s so long-running tabs pick them up quickly.
      if (reg) setInterval(() => reg.update(), 60_000);
    },
  });
}
