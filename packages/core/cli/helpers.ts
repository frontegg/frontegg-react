import fs from 'fs';
import path from 'path';

export const usingYarn = (): boolean => !fs.existsSync(path.join(process.cwd(), 'package-lock.json'));
export const getPackageJson = (): any => JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), { encoding: 'utf8' }));
