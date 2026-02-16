import { defineConfig } from "vitest/config";
import path from "path";

// Force DATABASE_URL before any module is loaded
process.env.DATABASE_URL =
  "postgresql://da_user:da_password@localhost:5432/da_manager_test";

export default defineConfig({
  test: {
    // Disable parallel file execution: tests share one DB and truncate between runs.
    fileParallelism: false,

    // One-time setup: creates da_manager_test DB and runs Drizzle migrations.
    globalSetup: "./__tests__/global-setup.ts",

    // Per-file setup: truncates all tables before each test.
    setupFiles: ["./__tests__/setup.ts"],

    // Only pick up files in __tests__/
    include: ["__tests__/**/*.test.ts"],

    // DB operations can be slow on first connection
    testTimeout: 15_000,

    // Coverage for SonarCloud
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      reportsDirectory: "./coverage",
      include: ["lib/db/queries/**", "app/api/**"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
