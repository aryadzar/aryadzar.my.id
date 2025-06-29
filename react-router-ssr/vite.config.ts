import { defineConfig } from "vite"
import react from '@vitejs/plugin-react'
import path from "path"
import mdx from '@mdx-js/rollup';
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { splitVendorChunkPlugin } from 'vite';
import type { Config } from '@react-router/dev/config';

// export default defineConfig({
//   plugins: [react(), mdx(), splitVendorChunkPlugin()
//     , sentryVitePlugin({
//       org: "aryadzar",
//       project: "new-portofolio",
//       authToken: `${process.env.SENTRY_AUTH_TOKEN}`,
//     }), sentryVitePlugin({
//       org: "aryadzar",
//       project: "new-portofolio"
//     })],
//     ssr: true,
//   server: {
//     proxy: {
//       '/api/now-playing': {
//         target: 'https://now-play.vercel.app',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api\/now-playing/, '/api/generate?uid=d7db6b1a-c866-430d-872f-f6236a927ad2'),
//       },
//     }
//   },
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   build: {
//     minify: "esbuild",
//     sourcemap: false,
//     rollupOptions: {
//       onwarn(warning, warn) {
//         // Abaikan warning tertentu
//         if (
//           warning.code === 'MODULE_LEVEL_DIRECTIVE' ||
//           warning.code === 'UNUSED_EXTERNAL_IMPORT' ||
//           warning.code === 'THIS_IS_UNDEFINED'
//         ) return;

//         // Tampilkan warning lain seperti biasa
//         warn(warning);
//       },
//       output: {
//         banner: `/*! 
//  * @license aryadzar.my.id
//  * (c) 2025 M Arya Dzaky Arenanto
//  * This build is licensed under MIT.
//  */`,
//         chunkFileNames: 'assets/vendor.[hash].js',

//         // manualChunks(id) {
//         //   if (id.includes('node_modules')) {
//         //     if (id.includes('react-dom')) return 'react-dom';
//         //     if (id.includes('react-router-dom')) return 'react-router';
//         //     if (id.includes('react')) return 'react'; // ini akan menangkap 'react' tanpa 'dom' atau 'router'
//         //     if (id.includes('redux')) return 'redux';
//         //     if (id.includes('zustand')) return 'zustand';
//         //     if (id.includes('axios')) return 'axios';
//         //     if (id.includes('lodash')) return 'lodash';
//         //     if (id.includes('dayjs')) return 'dayjs';
//         //     if (id.includes('classnames')) return 'classnames';
//         //     if (id.includes('react-dom.production')) return 'react-dom.production';
//         //   }
//         // }
//       }
//     },
//   },
// }) satisfies Config


export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  // presets: [vercelPreset()],
} satisfies Config;