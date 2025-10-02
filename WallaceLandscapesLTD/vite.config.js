// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // IMPORTANT: must match your GitHub repo name exactly
  base: "/WallaceLandscapesLtd/",
});
