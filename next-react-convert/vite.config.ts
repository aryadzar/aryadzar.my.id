import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import mdx from "@mdx-js/rollup"
export default defineConfig({
  plugins: [react(), mdx()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      onwarn(warning, warn) {
        // Abaikan warning tertentu
        if (
          warning.code === "MODULE_LEVEL_DIRECTIVE" ||
          warning.code === "UNUSED_EXTERNAL_IMPORT" ||
          warning.code === "THIS_IS_UNDEFINED"
        )
          return

        // Tampilkan warning lain seperti biasa
        warn(warning)
      },
      output: {
        banner: `/*! 
 * @license aryadzar.my.id
 * (c) 2025 M Arya Dzaky Arenanto
 * This build is licensed under MIT.
 */`,
      },
    },
  },
})
