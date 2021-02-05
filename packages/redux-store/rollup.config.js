import resolve from '@rollup/plugin-node-resolve';
import ts from 'rollup-plugin-typescript2';
import progress from 'rollup-plugin-progress';
import path from 'path';

const distFolder = path.join(__dirname, './dist/');

const commonPlugins = [
  resolve({
    browser: false,
    preferBuiltins: false,
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  }),
  progress(),
];

const esmPlugins = [
  ...commonPlugins,
  ts({
    tsconfig: `${__dirname}/tsconfig.json`,
    useTsconfigDeclarationDir: true,
    tsconfigOverride: {
      'compilerOptions': {
        'declaration': true,
        'declarationDir': distFolder,
        'target': 'ES6',
        'module': 'ES6',
      },
    },
  }),
];

const entryPoints = [
  'auth/index',

  // Main Entry Point
  'index',
];
const nodeModules = [
  'tslib',
  '@reduxjs/toolkit',
  'redux-saga/effects',
  '@frontegg/rest-api',
  '/node_modules/',
];

export default {
  input: entryPoints.reduce((p, n) => ({ ...p, [n]: `./src/${n}` }), {}),
  plugins: esmPlugins,
  external: (id) => {
    if (!!nodeModules.find(t => id.indexOf(t) !== -1)) {
      return true;
    }
    return false;
  },
  output: {
    dir: distFolder,
    entryFileNames: '[name].js',
    sourcemap: true,
    format: 'es',
  },
};

