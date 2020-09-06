import path from 'path';
import * as fs from 'fs';
import { getPackageJson, usingYarn } from './helpers';
import { execSync } from 'child_process';
import chalk from 'chalk';

export default ({ argv }: any) => {
  const pkg = getPackageJson();
  const installedPackages = Object.keys(pkg.dependencies || {}).filter(dep => dep.startsWith('@frontegg/react-'));
  if (installedPackages.length === 0) {
    throw Error('package.json missing @frontegg dependencies');
  }

  console.log(chalk.cyan('checking for updates...'));
  const currentVersion = execSync('npm version @frontegg/react-core').toString('utf8')
  const lastVersion = execSync('npm show @frontegg/react-core version').toString('utf8');

  console.log(currentVersion, lastVersion);
  if (argv.latest) {

  }
  let command;
  if (usingYarn()) {
    command = 'yarn upgrade';
  } else {
    command = 'npm update';
  }
  // execSync('');
  // console.log('updatePackages', installedPackages);
}
