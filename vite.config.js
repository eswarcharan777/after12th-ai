import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// ═══════════════════════════════════════════════════════════════════
// NOTE: PWA / service-worker was intentionally removed. It kept
// serving stale cached HTML which caused persistent blank-page bugs
// on the marketing pages. The app now behaves like a normal static
// site — every visit fetches fresh HTML from Vercel.
// Notes / Flashcards / MockTest already work offline via localStorage
// so removing the SW does not affect the offline experience.
// ═══════════════════════════════════════════════════════════════════

export default defineConfig({
  plugins: [react()],
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
