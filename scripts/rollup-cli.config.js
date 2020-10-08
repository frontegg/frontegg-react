import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import ts from 'rollup-plugin-typescript2';
import progress from 'rollup-plugin-progress';
import fs from 'fs';
import path from 'path';
import transformTypesAlias from './rollup.transform-types-alias';

const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), './package.json')));
const tsConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), './tsconfig.json')));
const distFolder = path.join(process.cwd(), `./dist/`);
const isProduction = process.env.NODE_ENV === 'production';

const plugins = [
  replace({
    __BUILD_ENV__: isProduction ? 'prod' : 'dev',
    __BUILD_DATE__: () => new Date(),
    'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
    'process.env.FRONTEGG_DEBUG_LEVEL': JSON.stringify(isProduction ? 'error' : 'debug'),
  }),
  resolve({
    jsnext: true,
    browser: false,
    preferBuiltins: true,
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  }),
  commonjs({
    include: [/node_modules/],
    sourceMap: false,
  }),
  isProduction ? terser({
    ecma: '6', module: true,
  }) : progress(),
  ts({
    rollupCommonJSResolveHack: true,
    clean: true,
    tsconfig: `${process.cwd()}/tsconfig.json`,
  }),
  transformTypesAlias({ distFolder, tsConfig }),
  {
    writeBundle: () => {
      const content = fs.readFileSync(path.join(distFolder, 'index.js'), { encoding: 'utf-8' });
      fs.writeFileSync(path.join(distFolder, 'index.js'), `#!/usr/bin/env node\n\n${content}`, { encoding: 'utf-8' });
    },
  },
];

export default {
  input: './src/index.ts',
  plugins,
  inlineDynamicImports: true,
  external: (id)=> !id.startsWith('.'),
  output: {
    sourcemap: !isProduction,
    dir: distFolder,
    format: 'cjs',
  },
};
