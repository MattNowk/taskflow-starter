import { defineConfig } from 'vite'

export default defineConfig(() => {
  const isPages = process.env.GITHUB_PAGES === 'true'

  return {
    base: isPages ? '/taskflow-starter/' : '/',
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
  }
})