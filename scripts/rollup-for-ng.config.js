import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import ts from 'rollup-plugin-typescript2';
import progress from 'rollup-plugin-progress';
import postcss from 'rollup-plugin-postcss';
import fs from 'fs';
import path from 'path';
import transformTypesAlias from './rollup.transform-types-alias';

const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), './package.json')));
const tsConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), './tsconfig.json')));
const isProduction = process.env.NODE_ENV === 'production';
const isWatching = process.argv.includes('-w') || process.argv.includes('--watch');
let packageName = pkg.name.substring('@frontegg/react-'.length);
packageName = packageName.substring(0, 1).toUpperCase() + packageName.substring(1);


const esmFolder = path.join(process.cwd(), './dist/');
const esFolder = path.join(process.cwd(), './dist/');
const cjsFolder = path.join(process.cwd(), './dist/');
const umdFolder = path.join(process.cwd(), './dist/');
const declarationFolder = path.join(process.cwd(), './dist/');

const isExternal = (id) => {
  const exact = [
    'react-redux',
    'formik',
    '@reduxjs/toolkit',
  ];
  const startWith = [
    '@babel/runtime',
    '.',
  ];
  const contains = [
    'style-inject',
  ];
  if (exact.includes(id)) {
    return false;
  }
  if (startWith.find(s => id.indexOf(s) === 0)) {
    return false;
  }
  return !contains.find(s => id.indexOf(s) !== -1);

};

const commonPlugins = [
  replace({
    __BUILD_ENV__: isProduction ? 'prod' : 'dev',
    __BUILD_DATE__: () => new Date(),
    'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
    'process.env.FRONTEGG_DEBUG_LEVEL': JSON.stringify(isProduction ? 'error' : 'debug'),
  }),
  resolve({
    browser: false,
    preferBuiltins: true,
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  }),
  json(),
  postcss({
    extensions: ['.css', '.scss', '.sass'],
    minimize: true,
    inject: true,
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
    useTsconfigDeclarationDir: true,
    tsconfigOverride: {
      'compilerOptions': {
        'declaration': true,
        'declarationDir': declarationFolder,
        'target': 'ES6',
        'module': 'ES6',
      },
    },
  }),
];

const esPlugins = [
  ...commonPlugins,
  ts({
    tsconfig: `${process.cwd()}/tsconfig.json`,
    useTsconfigDeclarationDir: false,
    tsconfigOverride: {
      'compilerOptions': {
        'declaration': false,
        'target': 'ES5',
        'module': 'ES6',
      },
    },
  }),
];

const cjsPlugins = [
  ...commonPlugins,
  ts({
    tsconfig: `${process.cwd()}/tsconfig.json`,
    useTsconfigDeclarationDir: false,
    tsconfigOverride: {
      'compilerOptions': {
        'declaration': false,
        'target': 'ES5',
        'module': 'ES6',
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
        'target': 'ES2015',
        'module': 'ES2015',
      },
    },
  }),
];

export default [
  {
    input: './src/index.ts',
    plugins: esmPlugins,
    external: isExternal,
    output: {
      dir: esmFolder,
      sourcemap: true,
      format: 'esm',
      name:'index.cjs.js'
    },
  }
  , {
    input: './src/index.ts',
    plugins: esPlugins,
    external: isExternal,
    output: {
      dir: esFolder,
      sourcemap: true,
      format: 'es',
    },
  }, {
    input: './src/index.ts',
    plugins: cjsPlugins,
    external: isExternal,
    output: {
      dir: cjsFolder,
      sourcemap: true,
      format: 'cjs',
    },
  },
  ...(isWatching ? [] : [{
    input: './src/index.ts',
    plugins: umdPlugins,
    external: [
      'react',
      'react-dom',
      '@frontegg/react-cli',
      '@frontegg/react-core',
      '@frontegg/react-auth',
      '@frontegg/react-elements-material-ui',
      '@frontegg/react-elements-semantic',
    ],
    output: {
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        '@frontegg/react-core': 'FronteggCore',
        '@frontegg/react-auth': 'FronteggAuth',
        '@frontegg/react-elements-material-ui': 'FronteggElementsMaterialUi',
        '@frontegg/react-elements-semantic': 'FronteggElementsSemantic',
      },
      file: path.join(umdFolder, 'index.js'),
      name: `Frontegg${packageName}`,
      format: 'umd',
    },
  }]),
];

