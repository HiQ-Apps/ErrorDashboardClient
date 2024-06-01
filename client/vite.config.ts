import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import tsConfigPaths from "vite-tsconfig-paths";

const port = process.env.VITE_PORT ? parseInt(process.env.VITE_PORT, 10) : 3000;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths(), svgr()],
  server: {
    port,
  },
});
