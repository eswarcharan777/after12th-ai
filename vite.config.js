import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['pwa-icon.svg', 'apple-touch-icon.svg'],
      manifest: {
        name: 'After12th AI â€” NEET & JEE Prep',
        short_name: 'After12th AI',
        description: 'Your free AI tutor for NEET & JEE â€” mock tests, rank predictor, college finder, voice tutor.',
        theme_color: '#8B5CF6',
        background_color: '#0B0F1F',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        lang: 'en-IN',
        categories: ['education', 'productivity', 'reference'],
        icons: [
          { src: '/pwa-icon.svg',          sizes: '192x192', type: 'image/svg+xml', purpose: 'any' },
          { src: '/pwa-icon.svg',          sizes: '512x512', type: 'image/svg+xml', purpose: 'any' },
          { src: '/pwa-icon-maskable.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'maskable' },
          { src: '/apple-touch-icon.svg',  sizes: '180x180', type: 'image/svg+xml', purpose: 'any' },
        ],
        shortcuts: [
          { name: 'AI Tutor',   short_name: 'Tutor',  url: '/app/tutor',     icons: [{ src: '/pwa-icon.svg', sizes: '192x192' }] },
          { name: 'Mock Test',  short_name: 'Test',   url: '/app/mocktest',  icons: [{ src: '/pwa-icon.svg', sizes: '192x192' }] },
          { name: 'Dashboard',  short_name: 'Home',   url: '/app/dashboard', icons: [{ src: '/pwa-icon.svg', sizes: '192x192' }] },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /^https:\/\/i\.ytimg\.com\/.*/,
            handler: 'CacheFirst',
            options: { cacheName: 'youtube-thumbs', expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 } },
          },
          {
            urlPattern: /\/api\/chat/,
            handler: 'NetworkOnly', // AI calls must always hit the live backend
          },
        ],
        navigateFallbackDenylist: [/^\/api\//],
      },
      devOptions: { enabled: false },
    }),
  ],
  server: {
    proxy: {
      '/api': { target: 'https://after12th-ai.onrender.com', changeOrigin: true },
    },
  },
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'app.html'),
    },
  },
});
