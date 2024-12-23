import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      exclude: ["**/node_modules/**", "**/index.ts"],
    },
    globals: true,
    restoreMocks: true,
  },
  plugins: [tsconfigPaths()],
});
