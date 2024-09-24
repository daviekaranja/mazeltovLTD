import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // base: "/static/", // Set the base to match where FastAPI serves the static files
  server: {
    port: 5173, // You can set the Vite dev server port explicitly if needed
    proxy: {
      "/api": "http://localhost:8000", // Proxy API requests to your FastAPI server
    },
    hmr: {
      protocol: "ws", // Ensure the protocol is WebSocket (ws)
      host: "localhost", // Explicitly set the host
      port: 5173, // Ensure the port matches your server port
    },
  },
});
