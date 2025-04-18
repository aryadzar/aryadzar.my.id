import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import mdx from '@mdx-js/rollup'; 
export default defineConfig({
  plugins: [react(), mdx()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

