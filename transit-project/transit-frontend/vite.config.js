import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:8080",
      "/ws": {
        target: "http://localhost:8080",
        ws: true, // proxy WebSocket upgrade requests too
      },
    },
  },
  define: {
    global: "window", // polyfill Node's `global` for sockjs-client in the browser
  },
});