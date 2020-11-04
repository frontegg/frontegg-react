const path = require('path');
const fs = require('fs');

function updatePreReleaseVersion(packagePath, nextVersion) {
  if (packagePath.indexOf('demo-saas') !== -1) {
    return;
  }
  const pkg = JSON.parse(fs.readFileSync(`${packagePath}/package.json`, { encoding: 'utf8' }));

  pkg.version = nextVersion;

  [
    '@frontegg/rest-api',
    '@frontegg/react-core',
    '@frontegg/react-auth',
    '@frontegg/react-elements-material-ui',
    '@frontegg/react-elements-semantic',
  ].forEach(dep => {
    if (pkg.dependencies[dep]) {
      pkg.dependencies[dep] = `${nextVersion}`;
    }
  });

  fs.writeFileSync(`${packagePath}/package.json`, JSON.stringify(pkg, null, 2), { encoding: 'utf-8' });
}

updatePreReleaseVersion(process.argv[2], process.argv[3]);
