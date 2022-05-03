import resolve from '@rollup/plugin-node-resolve';
import ts from 'rollup-plugin-typescript2';
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
      enhancedPkg.main = enhancedPkg.main.replace('dist/', '');
      if (enhancedPkg.module) {
        enhancedPkg.module = enhancedPkg.module.replace('dist/', '');
      }
      enhancedPkg.types = enhancedPkg.types.replace('dist/', '');
      fs.mkdirSync(distFolder, { recursive: true });
      fs.writeFileSync(path.join(distFolder, 'package.json'), JSON.stringify(enhancedPkg, null, 2), {
        encoding: 'utf8',
      });
      fs.rmdirSync(nodeModulesPath, { recursive: true });
      fs.symlinkSync(distFolder, nodeModulesPath, 'dir');
    },
  };
}

const cjsPlugins = [
  resolve({
    browser: false,
    preferBuiltins: false,
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  }),
  movePackageJson(),
  ts({
    tsconfig: `${__dirname}/tsconfig.json`,
    useTsconfigDeclarationDir: true,
    tsconfigOverride: {
      compilerOptions: {
        declaration: true,
        declarationDir: distFolder,
        target: 'ES5',
        module: 'ES6',
      },
    },
  }),
];

const isExternal = (id) => {
  return (
    id !== 'AuthorizedContent' &&
    id !== 'FronteggConfig' &&
    id !== 'FronteggMiddleware' &&
    id !== 'FronteggProvider' &&
    id !== 'helpers' &&
    id !== 'types' &&
    id !== 'withFronteggApp'
  );
};

export default [
  {
    input: './src/index.ts',
    plugins: cjsPlugins,
    external: isExternal,
    output: {
      dir: distFolder,
      sourcemap: true,
      format: 'cjs',
    },
  },
];
