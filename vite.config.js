import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // Forward /api requests from Vite to our Express server.
  server: {
    proxy: {
   "/api": "http://127.0.0.1:3001",
    },
  },
});