import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import excludeDependencies from "rollup-plugin-exclude-dependencies-from-bundle"
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json'

/** @type {import('rollup').RollupOptions} */
export default {
  input: 'src/index.ts', // 输入文件路径
  output: {
    file: 'dist/index.js', // 输出文件路径
    format: 'esm', // 输出格式为 CommonJS
    exports: 'named', // 导出方式
  },
  plugins: [
    nodeResolve(), // 解析模块
    commonjs(), // 转换 CommonJS 模块
    typescript(), // 编译 TypeScript
		json(),
		// 依赖排除
		excludeDependencies(),
		// 代码压缩
		terser(),
  ]
};
