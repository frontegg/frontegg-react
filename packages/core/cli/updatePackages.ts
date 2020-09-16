import { createLoader, extractVersion, getPackageJson, printVersions, usingYarn } from './helpers';
import { exec, execSync } from 'child_process';
import chalk from 'chalk';

const packages = [
  '@frontegg/react-core',
  '@frontegg/react-auth',
  '@frontegg/react-elements-semantic',
  '@frontegg/react-elements-material-ui',
];
export default ({ argv }: any) => {
  const pkg = getPackageJson();
  const installedPackages = Object.keys(pkg.dependencies || {}).filter((dep) => packages.indexOf(dep) !== -1);

  if (installedPackages.length === 0) {
    throw Error('package.json missing @frontegg/react- dependencies');
  }

  console.log(chalk.cyan('checking for updates...'));

  const commands = {
    getCurrentVersion: 'npm list --depth=0 | grep @frontegg/react-core',
    getLatestVersion: (version: string, latest: boolean) =>
      `npm view @frontegg/react-core@'${latest ? '>' : '^'}${version}' version`,
    updateVersion: 'npm install --save',
  };
  if (usingYarn()) {
    commands.getCurrentVersion = 'yarn list --depth=0 --pattern @frontegg/react-core';
    commands.updateVersion = 'yarn add';
  }

  const currentVersion = extractVersion(execSync(commands.getCurrentVersion).toString('utf8'));
  const lastVersion = extractVersion(execSync(commands.getLatestVersion(currentVersion, argv.latest)).toString('utf8'));

  if (currentVersion === lastVersion) {
    printVersions(installedPackages, currentVersion);
    return;
  }

  console.log(chalk.cyan('updating frontegg packages:'), chalk.red(currentVersion), '->', chalk.green(lastVersion));
  const updateCommand = `${commands.updateVersion} ${installedPackages.map((p) => `${p}@${lastVersion}`).join(' ')}`;

  console.log(chalk.gray(`> exec: ${updateCommand}`));
  const loader = createLoader();
  const exec1 = exec(updateCommand);
  exec1.stdout?.on('data', (data) => {
    console.log('> ' + data.toString());
  });

  exec1.stderr?.on('data', (data) => {
    console.log('> ' + data.toString());
  });
  exec1.on('exit', () => {
    clearInterval(loader);
    process.stdout.write('\r                                          \n');
    printVersions(installedPackages, lastVersion);
    process.exit(0);
  });
};
