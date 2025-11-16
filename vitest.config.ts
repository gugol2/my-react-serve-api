import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: [
      "hexagonal-architecture/src/**/*.test.{ts,tsx}",
      "hexagonal-architecture/src/**/*.integration.test.{ts,tsx}",
      "clean-architecture/src/**/*.test.{ts,tsx}",
      "clean-architecture/src/**/*.integration.test.{ts,tsx}",
    ],
    coverage: {
      provider: "v8",
      include: [
        "hexagonal-architecture/src/**/*.{ts,tsx}",
        "clean-architecture/src/**/*.{ts,tsx}",
      ],
      exclude: [
        "hexagonal-architecture/src/**/*.test.{ts,tsx}",
        "hexagonal-architecture/src/**/*.integration.test.{ts,tsx}",
        "clean-architecture/src/**/*.test.{ts,tsx}",
        "clean-architecture/src/**/*.integration.test.{ts,tsx}",
      ],
      // all: true,
    },
  },
});
