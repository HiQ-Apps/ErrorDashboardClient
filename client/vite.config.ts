import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import tsConfigPaths from "vite-tsconfig-paths";
import commonjs from "@rollup/plugin-commonjs";

const port = process.env.VITE_PORT ? parseInt(process.env.VITE_PORT, 10) : 3000;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsConfigPaths(),
    svgr(),
    commonjs({
      include: "/node_modules/",
    }),
  ],
  build: {
    outDir: "../../ErrorDashboardServer/server/static/dist",
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        format: "es",
      },
    },
  },
  server: {
    host: true,
    port,
    proxy: {
      "^/api": "http://localhost:8000",
    },
  },
  optimizeDeps: {
    include: ["@canvasjs/react-charts"],
  },
});
