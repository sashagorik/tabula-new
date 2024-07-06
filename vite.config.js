import { defineConfig } from 'vite';

export default defineConfig({
  // другие настройки Vite...
  build: {
    rollupOptions: {
      external: ['firebase/app'], // явно исключаем Firebase
    },
  },
});