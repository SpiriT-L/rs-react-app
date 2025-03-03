import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './app/setupTests.ts',
    coverage: {
      all: true,
      include: ['app/**/*.tsx'],
      reporter: ['text', 'json', 'html'],
      provider: 'v8',
      reportsDirectory: './coverage',
      exclude: [
        '**/__tests__/**',
        '**/components/Catalog/**',
        '**/components/ErrorButton/**',
        '**/components/ErrorDisplay/**',
        '**/_app.tsx/**',
      ],
    },
  },
});
