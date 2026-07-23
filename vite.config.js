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
        name: 'After12th AI - NEET & JEE Prep',
        short_name: 'After12th AI',
        description: 'Your free AI tutor for NEET & JEE - mock tests, rank predictor, college finder, voice tutor.',
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
        navigateFallback: '/app.html',
        cleanupOutdatedCaches: true,
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
      input: {
        app: resolve(__dirname, 'app.html'),
        home: resolve(__dirname, 'index.html'),
        neet: resolve(__dirname, 'neet.html'),
        jee: resolve(__dirname, 'jee.html'),
        colleges: resolve(__dirname, 'colleges.html'),
        pricing: resolve(__dirname, 'pricing.html'),
        about: resolve(__dirname, 'about.html'),
        blog: resolve(__dirname, 'blog.html'),
        freeNeetMock: resolve(__dirname, 'free-neet-mock-test.html'),
        freeJeeMock: resolve(__dirname, 'free-jee-mock-test.html'),
        neetRank: resolve(__dirname, 'neet-rank-predictor.html'),
        jeeRank: resolve(__dirname, 'jee-rank-predictor.html'),
        blogNeet: resolve(__dirname, 'blog/how-to-crack-neet-2026.html'),
        blogVs: resolve(__dirname, 'blog/neet-vs-jee-which-to-choose.html'),
        blogJee: resolve(__dirname, 'blog/jee-mains-preparation-tips.html'),
        blogNeetCutoff: resolve(__dirname, 'blog/neet-2026-cutoff-marks-vs-rank.html'),
        blogJeePercentile: resolve(__dirname, 'blog/jee-main-marks-vs-percentile.html'),
        blogJeeBooks: resolve(__dirname, 'blog/best-books-for-jee-main-2026.html'),
      },
      output: {
        manualChunks: {
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
