/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { localAdmin } from "./scripts/local-admin-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  // localAdmin: dev-server-only API behind /admin (see scripts/local-admin-plugin.ts).
  plugins: [react(), localAdmin(__dirname)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["src/test/setup.ts"],
    restoreMocks: true,
    // Dummy key so the contact form builds its request; fetch is mocked in tests.
    env: { VITE_WEB3FORMS_KEY: "test-access-key" },
  },
});
