import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

/** @type {import('rollup').RollupOptions} */
export default {
	input: 'src/index.ts',
    output: [
        { file: 'dist/index.cjs.js', format: 'cjs' }, // 输出CommonJS格式
        { file: 'dist/index.esm.js', format: 'es' } // 输出ESM格式
    ],
    plugins: [
        json(),
        resolve(), // 处理Node.js模块路径
        commonjs(), // 转换CommonJS模块
        typescript({ tsconfig: './tsconfig.json' }) // 处理TypeScript文件
    ]
};