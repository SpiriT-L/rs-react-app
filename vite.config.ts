import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/rs-react-app/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
});
