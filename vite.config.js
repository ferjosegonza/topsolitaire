import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const useBase44Plugin = Boolean(env.VITE_BASE44_APP_ID || env.BASE44_APP_ID)

  return {
    base: './',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    plugins: [
      ...(useBase44Plugin
        ? [
            base44({
              // Support for legacy code that imports the base44 SDK with @/integrations, @/entities, etc.
              // can be removed if the code has been updated to use the new SDK imports from @base44/sdk
              legacySDKImports: env.BASE44_LEGACY_SDK_IMPORTS === 'true',
              hmrNotifier: true,
              navigationNotifier: true,
              analyticsTracker: true,
              visualEditAgent: true
            })
          ]
        : []),
      react(),
    ]
  }
})
