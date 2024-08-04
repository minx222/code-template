import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'

import electron from 'vite-plugin-electron'
import renderer from "vite-plugin-electron-renderer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    AutoImport({
      imports: ['react', 'react-router-dom', 'ahooks'],
    }),
		electron([
			{
				// Main-Process entry file of the Electron App.
				entry: "electron/main/index.ts",
				onstart(options) {
					if (process.env.VSCODE_DEBUG) {
						console.log(
							/* For `.vscode/.debug.script.mjs` */ "[startup] Electron App"
						);
					} else {
						options.startup();
					}
				},
				vite: {
					build: {
						outDir: "dist-electron/main",
					}
				}
			},
			{
				entry: "electron/preload/index.ts",
				onstart(options) {
					// Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
					// instead of restarting the entire Electron App.
					options.reload();
				},
				vite: {
					build: {
						outDir: "dist-electron/preload",
					}
				}
			}
		]),
		renderer(),
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
  },
  css: {
    preprocessorOptions: {
      scss: {}
    }
  },
})
