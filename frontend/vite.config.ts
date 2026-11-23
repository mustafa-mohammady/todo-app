import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // The backend allows exactly this origin (CORS), so do not change the port.
    port: 5173,
    strictPort: true,
  },
});
