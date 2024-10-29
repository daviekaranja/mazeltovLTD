import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Check the environment variable to set base path
const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [react()],
  base: isProduction ? "/static/" : "/",
  server: {
    port: 5173, // Development server port
    proxy: {
      "/api": "http://localhost:8000", // Proxy API requests to your FastAPI server
    },
    hmr: {
      protocol: "ws", // WebSocket protocol for hot module replacement
      host: "localhost", // Host for HMR
      port: 5173, // Port for HMR
    },
  },
});
