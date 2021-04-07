import resolve from '@rollup/plugin-node-resolve';
import ts from 'rollup-plugin-typescript2';
import progress from 'rollup-plugin-progress';
import path from 'path';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), './package.json')));
const distFolder = path.join(__dirname, './dist/');
const nodeModulesPath = path.join(__dirname, '../../node_modules', pkg.name);

function movePackageJson() {
  return {
    name: 'move-package-json',
    buildEnd() {
      let enhancedPkg = pkg;
      enhancedPkg.dep;
      enhancedPkg.main = enhancedPkg.main.replace('dist/', '');
      enhancedPkg.module = enhancedPkg.module.replace('dist/', '');
      enhancedPkg.types = enhancedPkg.types.replace('dist/', '');
      fs.writeFileSync(path.join(distFolder, 'package.json'), JSON.stringify(enhancedPkg, null, 2), {
        encoding: 'utf8',
      });
      console.log('removing existing symlink from node_modules', nodeModulesPath);
      fs.rmdirSync(nodeModulesPath, { recursive: true });

      console.log('creating new symlink from node_modules', nodeModulesPath);
      fs.symlinkSync(distFolder, nodeModulesPath, 'dir');
    },
  };
}

const commonPlugins = [
  resolve({
    browser: false,
    preferBuiltins: false,
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  }),
  progress(),
  movePackageJson(),
];

const esmPlugins = [
  ...commonPlugins,
  ts({
    tsconfig: `${__dirname}/tsconfig.json`,
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

const entryPoints = [
  'auth/index',
  'audits/index',
  'toolkit/index',
  // Main Entry Point
  'index',
];
const nodeModules = [
  'tslib',
  'redux',
  '@reduxjs/toolkit',
  'redux-saga',
  'redux-saga/effects',
  '@frontegg/rest-api',
  '/node_modules/',
];

export default {
  input: entryPoints.reduce((p, n) => ({ ...p, [n]: `./src/${n}` }), {}),
  plugins: esmPlugins,
  external: (id) => {
    if (!!nodeModules.find((t) => id.indexOf(t) !== -1)) {
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
