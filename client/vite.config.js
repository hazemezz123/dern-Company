import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      // This enables the new JSX transform and removes the need to import React
      jsxRuntime: "automatic",
    }),
  ],
});
