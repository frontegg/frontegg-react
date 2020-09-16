import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export const usingTypescript = (): boolean => fs.existsSync(path.join(process.cwd(), 'tsconfig.json'));
export const usingYarn = (): boolean => {
  let cwd = process.cwd();
  let packageLockFound = false;
  do {
    packageLockFound = fs.existsSync(path.join(cwd, 'package-lock.json'));
    if (
      fs.existsSync(path.join(cwd, 'lerna.json')) ||
      fs.existsSync(path.join(process.cwd(), 'yarn.lock')) ||
      fs.existsSync(path.join(cwd, 'node_modules')) ||
      fs.existsSync(path.join(cwd, '.git'))
    ) {
      return false;
    }
    cwd = path.join(cwd, '../');
  } while (!packageLockFound);
  return packageLockFound;
};
export const getPackageJson = (): any =>
  JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), { encoding: 'utf8' }));
export const isFileExistsInSrc = (fileName: string): boolean =>
  fs.existsSync(path.join(process.cwd(), 'src', fileName));
export const createFileInSrc = (fileName: string, data: string) =>
  fs.writeFileSync(path.join(process.cwd(), 'src', fileName), data, { encoding: 'utf8' });

const coreName = '@frontegg/react-core';
export const extractVersion = (v: string): string => {
  let version = v.trim();
  if (version.indexOf(coreName) !== -1) {
    version = version.substring(version.lastIndexOf(coreName) + coreName.length);
  }
  if (version.indexOf('@') !== -1) {
    version = version.substring(version.indexOf('@') + 1);
  }
  if (version.startsWith('^')) {
    version = version.substring(1);
  }
  if (version.indexOf('\n') !== -1) {
    version = version.substring(0, version.indexOf('\n'));
  }
  if (version.indexOf(' ') !== -1) {
    version = version.substring(0, version.indexOf(' '));
  }
  return version.trim();
};

export const createLoader = () => {
  const text = 'Frontegg-React';
  const gap = text.length;
  const p: any = [];
  for (let i = 0; i < gap * 3; i++) {
    const preSpace = i < gap ? 0 : i - gap;
    const postSpace = i <= gap ? 2 * gap - i : i < 2 * gap ? 2 * gap + 1 - i : 0;

    let t = text;
    if (i < gap) {
      t = text.substring(gap - i);
    } else if (i > 2 * gap) {
      t = text.substring(0, 3 * gap - i);
    }
    p.push(`[${Array(preSpace).join('.')}${t}${Array(postSpace).join('.')}]`);
  }
  let x = 0;
  return setInterval(() => {
    process.stdout.write('\r' + p[x++]);
    x = x < p.length ? x : 0;
  }, 100);
};

export const printVersions = (installedPackages: string[], lastVersion: string) => {
  console.log(chalk.yellow('You are UP-TO-DATE! :D'), '\nversion:');
  installedPackages.forEach((p) => {
    console.log(chalk.green(` - ${p}@${lastVersion}`));
  });
};
