import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import ts from 'rollup-plugin-typescript2';
import progress from 'rollup-plugin-progress';
import postcss from 'rollup-plugin-postcss';
import typescript from 'typescript';
import fs from 'fs';
import path from 'path';
import transformTypesAlias from './rollup.transform-types-alias';

const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), './package.json')));
const tsConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), './tsconfig.json')));
const distFolder = path.join(process.cwd(), `./dist/`);
const isProduction = process.env.NODE_ENV === 'production';


const esmFolder = path.join(process.cwd(), './dist/esm/');
const cjsFolder = path.join(process.cwd(), './dist/cjs/');
const umdFolder = path.join(process.cwd(), './dist/bundles/');
const declarationFolder = path.join(process.cwd(), './dist/');


const commonPlugins = [
  replace({
    __BUILD_ENV__: isProduction ? 'prod' : 'dev',
    __BUILD_DATE__: () => new Date(),
    'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
    'process.env.FRONTEGG_DEBUG_LEVEL': JSON.stringify(isProduction ? 'error' : 'debug'),
  }),
  json(),
  postcss({
    extensions: ['.css','.scss', '.sass'],
    minimize: true,
  }),
  resolve({
    browser: true,
    preferBuiltins: true,
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  }),
  commonjs({
    include: [/node_modules/],
    sourceMap: false,
  }),
];


const esmPlugins = [
  ...commonPlugins,
  ts({
    tsconfig: `${process.cwd()}/tsconfig.json`,
    useTsconfigDeclarationDir:false,
    declarationDir: declarationFolder,
    tsconfigOverride: {
      'compilerOptions': {
        'declaration': true,
        'declarationDir': declarationFolder,
        'target': 'ES2015',
        'module': 'ES2015',
      },
    },
  }),
];

const umdPlugins = [
  ...commonPlugins,
  ts({
    tsconfig: `${process.cwd()}/tsconfig.json`,
    tsconfigOverride: {
      'compilerOptions': {
        'declaration': false,
        'target': 'umd',
        'module': 'ES2015',
      },
    },
  }),
];


// const plugins = [
//     ...commonPlugins,
//   json(),
//   resolve({
//     jsnext: true,
//     browser: false,
//     preferBuiltins: true,
//     extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
//   }),
//   postcss({
//     extensions: ['.css','.scss', '.sass'],
//     minimize: true,
//   }),
//   commonjs({
//     include: [/node_modules/],
//     sourceMap: false,
//   }),
//   isProduction ? terser({
//     ecma: '6', module: true,
//   }) : progress(),
//   ts({
//     rollupCommonJSResolveHack: true,
//     clean: true,
//     tsconfig: `${process.cwd()}/tsconfig.json`,
//     tsconfigOverride: {
//       'target': 'ESNext',
//       'module': 'ESNext',
//     },
//   }),
//   transformTypesAlias({ distFolder, tsConfig }),
// ];


export default [
  {
    input: './src/index.ts',
    plugins: esmPlugins,
    external: [
      'react',
      'react-is',
      'react-dom',
      'prop-types',
      'react-router',
      'react-router-dom',
      'history',
      'moment',
      'redux',
      'yup',
      'react-redux',
      'redux-saga',
      '@reduxjs/toolkit',
      'react-i18next',
    ],
    output: {
      exports: 'named',
      dir: esmFolder,
      format: 'esm',
    },
  },
//   {
//     input: './src/index.ts',
//     plugins: umdPlugins,
//     output: {
//       dir: umdFolder,
//       name: 'index.umd.js',
//       moduleName: 'FronteggCore',
//       format: 'umd',
//     },
//   },
];

