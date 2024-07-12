import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    proxy: {
      '/dev-api': {
        target: 'http://localhost:3020/api', // 将会代理到 ws://localhost:3000/rsbuild-hmr
        ws: true,
        pathRewrite: { '^/dev-api': '' },
      },
    },
  },
});
