const path = require('path');
const fs = require('fs');

function movePackageJson(packagePath) {
  if (packagePath.indexOf('demo-saas') !== -1 || packagePath.indexOf('sanity-check') !== -1) {
    console.log('skip packagePath:', packagePath);
    return;
  }

  const distFolder = `${packagePath}/dist`;
  const pkg = JSON.parse(fs.readFileSync(`${packagePath}/package.json`, {encoding: 'utf8'}));

  if (!packagePath.endsWith('/react')) {

    const {scripts, main, typings, devDependencies, jest, prettier, standard, ...newPkg} = pkg;
    newPkg.main = 'index.js';
    newPkg.module = 'index.esm.js';
    newPkg.es2015 = 'index.es.js';
    newPkg.types = 'index.d.ts';
    if (newPkg.bin) {
      for (const k in newPkg.bin) {
        newPkg.bin[k] = newPkg.bin[k].substring('dist/'.length);
      }
    }

    const peerDeps = [
      'react',
      'react-dom',
      'react-router-dom',
      '@frontegg/react-core',
      '@frontegg/react-auth',
      '@frontegg/react-audits',
      '@frontegg/react-connectivity',
      '@frontegg/react-elements-semantic',
      '@frontegg/react-elements-material-ui',
      '@material-ui/core',
      '@material-ui/icons',
    ];
    newPkg.peerDependencies = {
      ...(newPkg.peerDependencies || {}),
      ...(peerDeps
        .map(dep => newPkg.dependencies && newPkg.dependencies[dep] ? {[dep]: newPkg.dependencies[dep]} : {})
        .reduce((p, n) => ({...p, ...n}), {})),
    };

    peerDeps.forEach(dep => {
      if (newPkg.dependencies) {
        delete newPkg.dependencies[dep];
      }
    });


    fs.writeFileSync(path.join(distFolder, 'package.json'), JSON.stringify(newPkg, null, 2), {encoding: 'utf8'});
  }
  const readMePath = path.join(__dirname, `../README.md`);
  const changelogPath = path.join(__dirname, `../CHANGELOG.md`);
  if (fs.existsSync(readMePath)) {
    fs.writeFileSync(path.join(distFolder, `./README.md`), fs.readFileSync(readMePath), {encoding: 'utf8'});
  }
  if (fs.existsSync(changelogPath)) {
    fs.writeFileSync(path.join(distFolder, `./CHANGELOG.md`), fs.readFileSync(changelogPath), {encoding: 'utf8'});
  }
}

movePackageJson(process.argv[2]);
