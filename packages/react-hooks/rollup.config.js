import resolve from '@rollup/plugin-node-resolve';
import ts from 'rollup-plugin-typescript2';
import path from 'path';
import fs from 'fs';
import commonjs from '@rollup/plugin-commonjs';

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
      fs.mkdirSync(distFolder, { recursive: true });
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
  // progress(),
  movePackageJson(),
  commonjs({
    include: [
      /node_modules\/prop-types/,
      /node_modules\/hoist-non-react-statics/,
      /node_modules\/invariant/,
      /node_modules\/react-is/,
      /node_modules\/warning/,
    ],
  }),
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
        target: 'es5',
        module: 'es6',
      },
    },
  }),
];

const cjsPlugins = [
  ...commonPlugins,
  ts({
    tsconfig: `${__dirname}/tsconfig.json`,
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
const entryPoints = [
  'auth/index',
  'audits/index',
  // Main Entry Point
  'index',
];
const nodeModules = [
  // 'tslib',
  // 'react',
  '@frontegg/rest-api',
  '@frontegg/redux-store',
  '@frontegg/redux-store/auth',
  '@frontegg/redux-store/audits',
  // '/node_modules/',
];

const isExternal = (id) => {
  if (
    !!nodeModules.find((t) => id.indexOf(t) !== -1) ||
    id === 'react' ||
    id === 'react-dom'
    // && id !== 'react-redux'
    // && id !== 'hoist-non-react-statics'
    // && id !== 'prop-types'
    // && id !== 'react-is'
  ) {
    return true;
  }
  return false;
};

export default [
  {
    input: entryPoints.reduce((p, n) => ({ ...p, [n]: `./src/${n}` }), {}),
    plugins: esmPlugins,
    external: isExternal,
    output: {
      dir: distFolder,
      entryFileNames: '[name].js',
      sourcemap: true,
      format: 'es',
    },
  },
  {
    input: './src/index.ts',
    plugins: cjsPlugins,
    external: isExternal,
    output: {
      file: path.join(distFolder, 'index.cjs.js'),
      sourcemap: true,
      format: 'cjs',
    },
  },
];
