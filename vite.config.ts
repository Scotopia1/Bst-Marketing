import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Fix: use '.' instead of process.cwd() to avoid TS error "Property 'cwd' does not exist on type 'Process'"
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    define: {
      // Map process.env.API_KEY to the VITE_ env var for production build
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY || process.env.API_KEY)
    }
  };
});