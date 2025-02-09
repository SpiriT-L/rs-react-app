import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      all: true,
      include: ['src/**/*.tsx'],
      reporter: ['text', 'json', 'html'],
      provider: 'v8',
      reportsDirectory: './coverage',
    },
  },
});
