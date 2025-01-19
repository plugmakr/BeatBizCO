import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: mode === "development",
    minify: "esbuild",
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react',
            'react-dom',
            'react-router-dom',
            '@supabase/supabase-js',
            '@tanstack/react-query',
          ],
          ui: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-toast',
            '@radix-ui/react-avatar',
            '@radix-ui/react-slot',
            '@radix-ui/react-label',
            'lucide-react',
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
          ],
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@supabase/supabase-js',
      '@tanstack/react-query',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-toast',
      '@radix-ui/react-avatar',
      '@radix-ui/react-slot',
      '@radix-ui/react-label',
      'lucide-react',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
    ],
  },
}));
