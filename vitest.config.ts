import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./frontend/__tests__/setupFiles.ts",
  },
});
