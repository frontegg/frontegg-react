// import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import ts from 'rollup-plugin-typescript2';
import progress from 'rollup-plugin-progress';
import postcss from 'rollup-plugin-postcss';
import fs from 'fs';
import path from 'path';

const workDir = process.cwd();
const distFolder = path.join(workDir, './dist/');

const pkg = JSON.parse(fs.readFileSync(path.join(workDir, './package.json')));
const isProduction = process.env.NODE_ENV === 'production';
const isWatching = process.argv.includes('-w') || process.argv.includes('--watch');

console.warn('****************************************');
console.log('* Building   :', pkg.libName);
console.log('* ENV        :', isProduction ? 'PRODUCTION' : 'DEVELOPMENT');
console.log('* isWatching :', isWatching);
console.log('* INCLUDES   :', process.env.INCLUDES || 'none');
console.warn('****************************************');

const entryPoints = process.env.INCLUDES
  ? process.env.INCLUDES.split(':').reduce((a, c) => ({ ...a, [c]: `./src/${c}/index.ts` }), {
      index: './src/index.ts',
    })
  : './src/index.ts';

const outputProps = process.env.INCLUDES
  ? {
      esm: {
        dir: distFolder,
        entryFileNames: '[name].esm.js',
        sourcemap: !isProduction,
        format: 'esm',
      },
      cjs: {
        dir: distFolder,
        entryFileNames: '[name].js',
        sourcemap: !isProduction,
        format: 'cjs',
      },
    }
  : {
      esm: {
        file: path.join(distFolder, 'index.esm.js'),
        sourcemap: !isProduction,
        format: 'esm',
      },
      cjs: {
        file: path.join(distFolder, 'index.js'),
        sourcemap: !isProduction,
        format: 'cjs',
      },
    };

const isExternal = (id) => {
  const internal = [
    // "@reduxjs/toolkit",
    // "classnames",
    // "formik",
    // "i18next",
    // "jwt-decode",
    // "moment",
    // "react-i18next",
    // "react-popper-tooltip",
    'classnames',
    // 'react-redux',
    // "hoist-non-react-statics",
    // 'owasp-password-strength-test',
    // "react-table",
    // "rc-dialog",
    // "redux-saga",
    // "underscore",
    // "yup"
    // 'react',
    // 'react-dom',
  ];
  // const exact = [
  //   'react-redux',
  //   'formik',
  //   'immer',
  //   '@reduxjs/toolkit',
  // ];
  const startWith = ['@babel/runtime', '.'];
  const contains = ['style-inject'];
  if (internal.includes(id)) {
    return false;
  }
  if (startWith.find((s) => id.indexOf(s) === 0)) {
    return false;
  }
  return !contains.find((s) => id.indexOf(s) !== -1);
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
  isWatching && progress(),
];

const esmPlugins = [
  ...commonPlugins,
  ts({
    tsconfig: `${workDir}/tsconfig.json`,
    useTsconfigDeclarationDir: true,
    tsconfigOverride: {
      compilerOptions: {
        declaration: true,
        declarationDir: distFolder,
        target: 'ES6',
        module: 'ES6',
      },
    },
  }),
];

const cjsPlugins = [
  ...commonPlugins,
  ts({
    tsconfig: `${workDir}/tsconfig.json`,
    useTsconfigDeclarationDir: false,
    tsconfigOverride: {
      compilerOptions: {
        declaration: false,
        target: 'ES5',
        module: 'ES6',
      },
    },
  }),
];

export default [
  {
    input: entryPoints,
    plugins: cjsPlugins,
    external: isExternal,
    output: outputProps.cjs,
  },
  ...(isWatching
    ? []
    : [
        {
          input: entryPoints,
          plugins: esmPlugins,
          external: isExternal,
          output: outputProps.esm,
        },
      ]),
];
