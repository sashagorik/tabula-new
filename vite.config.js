import { defineConfig } from 'vite';

export default defineConfig({
  // другие настройки Vite...
  build: {
    rollupOptions: {
      external: ['firebase/app'], // явно исключаем Firebase
    },
  },
  server: {
    port: 3000,       // Укажите порт для dev server
    open: true,       // Автоматически открывать браузер при запуске dev server
    host: true,       // Делает сервер доступным через локальную сеть
  },
});