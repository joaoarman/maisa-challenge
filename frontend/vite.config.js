import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file from root directory
  const rootEnv = loadEnv(mode, path.resolve(__dirname, '..'), '')
  console.log('rootEnv:', rootEnv)
  return {
    plugins: [vue()],
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(`http://localhost:${rootEnv.API_PORT}/api/v1`)
    }
  }
})
