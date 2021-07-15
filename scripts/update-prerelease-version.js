const path = require('path');
const fs = require('fs');

function updatePreReleaseVersion(packagePath, nextVersion) {
  if (packagePath.indexOf('demo-saas') !== -1) {
    return;
  }
  const pkg = JSON.parse(fs.readFileSync(`${packagePath}/package.json`, { encoding: 'utf8' }));
  const distPkg = JSON.parse(fs.readFileSync(`${packagePath}/dist/package.json`, { encoding: 'utf8' }));
  const lernaJSON = JSON.parse(fs.readFileSync(path.join(`${packagePath}/../../lerna.json`), { encoding: 'utf8' }));

  pkg.version = nextVersion;
  distPkg.version = nextVersion;
  lernaJSON.version = nextVersion;

  [
    '@frontegg/react-core',
    '@frontegg/react-auth',
    '@frontegg/react-audits',
    '@frontegg/react-connectivity',
    '@frontegg/react-elements-material-ui',
    '@frontegg/react-elements-semantic',
  ].forEach(dep => {
    if (pkg.dependencies && pkg.dependencies[dep]) {
      pkg.dependencies[dep] = `${nextVersion}`;
    }
    if (distPkg.dependencies && distPkg.dependencies[dep]) {
      distPkg.dependencies[dep] = `${nextVersion}`;
    }
    if (pkg.devDependencies && pkg.devDependencies[dep]) {
      pkg.devDependencies[dep] = `${nextVersion}`;
    }
    if (distPkg.devDependencies && distPkg.devDependencies[dep]) {
      distPkg.devDependencies[dep] = `${nextVersion}`;
    }
    if (pkg.peerDependencies && pkg.peerDependencies[dep]) {
      pkg.peerDependencies[dep] = `${nextVersion}`;
    }
    if (distPkg.peerDependencies && distPkg.peerDependencies[dep]) {
      distPkg.peerDependencies[dep] = `${nextVersion}`;
    }
  });

  fs.writeFileSync(`${packagePath}/package.json`, JSON.stringify(pkg, null, 2), { encoding: 'utf-8' });
  fs.writeFileSync(`${packagePath}/dist/package.json`, JSON.stringify(distPkg, null, 2), { encoding: 'utf-8' });
  fs.writeFileSync(path.join(`${packagePath}/../../lerna.json`), JSON.stringify(lernaJSON, null, 2), { encoding: 'utf-8' });
}

updatePreReleaseVersion(process.argv[2], process.argv[3]);
