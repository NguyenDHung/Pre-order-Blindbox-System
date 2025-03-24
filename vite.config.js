import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import envCompatible from 'vite-plugin-env-compatible';
export default defineConfig({
  plugins: [react(), envCompatible()],
  server: {
    port: 5173,
    strictPort: true, 
  },
})
