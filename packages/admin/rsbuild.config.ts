import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSass } from '@rsbuild/plugin-sass';
import AutoImport from 'unplugin-auto-import/rspack'

export default defineConfig({
	tools: {
		rspack: {
			plugins: [AutoImport({
				imports: ['react', 'react-router-dom', 'ahooks'],
			})]
		}
	},
  plugins: [pluginReact(), pluginSass()],
});
