import path from 'node:path';
import react from '@vitejs/plugin-react';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import { viteMockServe } from 'vite-plugin-mock';

export default defineConfig({
	plugins: [
		react(),
		AutoImport({
			imports: ['react', 'react-router-dom'],
		}),
		viteMockServe({
			logger: true,
			mockPath: './mocks/',
			watchFiles: true,
			enable: true,
		}),
		compression({
			threshold: 10240,
			deleteOriginFile: true,
		}),
	],
	resolve: {
		alias: {
			'@': path.join(__dirname, 'src'),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {},
		},
	},
	build: {
		chunkSizeWarningLimit: 2000,
		outDir: '../../dist/admin',
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
		rollupOptions: {
			output: {
				chunkFileNames: 'assets/js/[name]-[hash].js',
				entryFileNames: 'assets/js/[name]-[hash].js',
				assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
				manualChunks: {
					'bundle-react-core': ['react', 'react-dom', 'react-router-dom'],
					'bundle-redux-core': [
						'react-redux',
						'@reduxjs/toolkit',
						'redux-persist',
					],
					'bundle-antd-core': ['antd', '@ant-design/pro-components'],
				},
			},
		},
	},
	server: {
		host: true,
		port: 4000,
		open: false,
		proxy: {
			'/dev-api': {
				target: 'http://222.186.21.32:9015/',
				changeOrigin: true,
				rewrite: (path: string) => path.replace(/^\/dev-api/, ''),
			},
		},
	},
});
