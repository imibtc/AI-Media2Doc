import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [vue()],
    server: {
      host: '0.0.0.0',              // 允许局域网
      port: 5173,
      allowedHosts: [
        'localhost',
        '127.0.0.1',
        '192.168.1.118',
        'imibtc.yyboxdns.com'        // ← 你的远程域名
      ],
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Resource-Policy': 'same-origin'
      },
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true
        }
      },
      cors: true
    },
    define: {
      'process.env': {}
    }
  }
})
