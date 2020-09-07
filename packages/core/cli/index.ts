#!/usr/bin/env node

import yargs from 'yargs';
import initProject from './initProject';
import updatePackages from './updatePackages';
import chalk from 'chalk';
import figlet from 'figlet';
import clear from 'clear';

let valid = false;
const hookCommand = (fn: any) => (args: any) => {
  valid = true;
  fn(args);
};

clear();
console.log('\n');
console.log(chalk.hex('#243c4b')(figlet.textSync('Frontegg - React', { horizontalLayout: 'full' })));
console.log('\n            React pre-built Component for faster and simpler integration with Frontegg services.\n');
console.log(
  '-------------------------------------------------------------------------------------------------------------'
);

const argv = yargs
  .usage('Usage: $0 <command> [options]')
  .command('init', 'Initialize and inject Frontegg Provider to the project', hookCommand(initProject))
  .command('update', 'Update frontegg packages using npm update', hookCommand(updatePackages))
  .demandCommand(1, 1, '', '')
  .option('latest', {
    describe: 'frontegg update --latest; force update to latest version. (this may break components)',
  })
  .help('h')
  .alias('h', 'help')
  .alias('f', 'force')
  .epilog(`Frontegg LTD Copyright ${new Date().getFullYear()}`).argv;
