import { defineConfig } from "vite";

export default defineConfig({
  base: "/game/",
  build: {
    outDir: "dist/client",
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
  },
});
