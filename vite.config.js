import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "@tailwindcss/vite";

// Deployed under /Vivek-Portfolio/. The trailing slash matters: asset() and
// index.html append paths straight onto BASE_URL. Preview serves the build,
// so it needs the same base as build.
const deployBase = (process.env.VITE_BASE_PATH || "/Vivek-Portfolio/").replace(/\/?$/, "/");

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  plugins: [react(), tailwindcss()],
  base: command === "build" || isPreview ? deployBase : "/",
}));
