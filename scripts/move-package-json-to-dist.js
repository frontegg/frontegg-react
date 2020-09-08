const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

function movePackageJson(packagePath) {
  if (packagePath.indexOf('demo-saas') !== -1) {
    return;
  }
  const pkg = JSON.parse(fs.readFileSync(`${packagePath}/package.json`, { encoding: 'utf8' }));
  const distFolder = `${packagePath}/dist`;

  const { scripts, main, typings, devDependencies, jest, prettier, standard, ...newPkg } = pkg;
  newPkg.main = './index.js';
  newPkg.typings = './index.d.ts';
  if (newPkg.bin) {
    for (const k in newPkg.bin) {
      newPkg.bin[k] = newPkg.bin[k].substring('dist/'.length);
    }
    execSync(`tsc --project '${path.join(packagePath, 'cli', 'tsconfig.json')}' --outDir '${path.join(distFolder, 'cli')}'`);
  }

  const peerDeps = [
    'react',
    'react-dom',
    'react-router-dom',
    '@frontegg/react',
    '@frontegg/react-core',
    '@frontegg/react-auth',
    '@frontegg/react-elements-semantic',
  ];
  newPkg.peerDependencies = {
    ...(newPkg.peerDependencies || {}),
    ...(peerDeps
      .map(dep => newPkg.dependencies[dep] ? { [dep]: newPkg.dependencies[dep] } : {})
      .reduce((p, n) => ({ ...p, ...n }), {})),
  };

  peerDeps.forEach(dep => {
    delete newPkg.dependencies[dep];
  });


  fs.writeFileSync(path.join(distFolder, 'package.json'), JSON.stringify(newPkg, null, 2), { encoding: 'utf8' });
}

movePackageJson(process.argv[2]);
