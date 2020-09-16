import { createFileInSrc, createLoader, isFileExistsInSrc, printVersions, usingTypescript, usingYarn } from './helpers';
import chalk from 'chalk';
import prompts from 'prompts';
import handlebars from 'handlebars';
import withFronteggTemplate from './withFronteggTemplate';
import { exec, execSync } from 'child_process';
import path from 'path';

const uiLibraryCss: any = {
  semantic: 'https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css',
  bootstrap: 'not supported',
  antd: 'not supported',
};
const buildSelectedPluginsJS = (selectedPluginsJS: string[]): object => {
  const js = [];
  const importJs = [];
  if (selectedPluginsJS.indexOf('auth') !== -1) {
    js.push(
      `  AuthPlugin({\n    /* auth options, find more information at https://github.com/frontegg/frontegg-react/tree/master/packages/auth */\n  })`
    );
    importJs.push(`import { AuthPlugin } from '@frontegg/react-auth';`);
  }

  return {
    plugins: js.join('\n'),
    imports: importJs.join('\n'),
  };
};
export default async ({ argv }: any) => {
  const isTypescript = usingTypescript();
  const constants = {
    fileName: 'withFrontegg.js',
    installCommand: 'npm install --save',
  };
  if (isTypescript) {
    constants.fileName = 'withFrontegg.tsx';
  }
  if (usingYarn()) {
    constants.installCommand = 'yarn add';
  }

  console.log(chalk.cyan('Initializing Frontegg React...'));

  if (isFileExistsInSrc(constants.fileName) && !argv.force) {
    console.log(chalk.green('withFrontegg file already exists in src folder.'));
    console.log(chalk.yellow('if you want to reinitialize it, use --force or -f to overwrite it.'));
    return;
  }

  const { selectedPlugins, withRouter, baseUrl, uiLibrary } = await prompts([
    {
      type: 'multiselect',
      name: 'selectedPlugins',
      message: 'Select the plugins you want to install',
      choices: [
        { title: 'Authentication Plugin (for secure access integration)', value: 'auth', selected: true },
        {
          title:
            'bellow plugins are already included in @frontegg/react:\n\t- Team Management Plugin\n\t- Notifications Plugin\n\t- Reports Plugin\n\t- Integrations Plugin',
          value: 'audits',
          disabled: true,
        },
      ],
      instructions: '\n\n Space to select. Return to submit',
    } as any,
    {
      type: 'select',
      name: 'withRouter',
      message: `Do you want use Standard ReactRouter or Frontegg's Router?`,
      choices: [
        { title: 'Frontegg Router', value: true, description: 'recommended for auth plugin interrupts' },
        {
          title: 'React Router',
          value: false,
          description: 'not recommended, you may need to implement auth interrupts',
        },
      ],
      initial: 0,
    },
    {
      type: 'select',
      name: 'uiLibrary',
      message: 'Which UI Library do you use in your project?',
      choices: [
        { title: 'Semantic', value: 'semantic' },
        { title: 'Material UI', value: 'material-ui' },
        { title: 'Bootstrap (coming soon)', value: 'bootstrap', disabled: true },
        { title: 'Antd (coming soon)', value: 'antd', disabled: true },
      ],
      initial: 0,
    },
    {
      type: 'text',
      name: 'baseUrl',
      message: 'What is your server address?',
      initial: 'http://localhost:8080',
    },
  ]);
  const loader = createLoader();

  const jsFile = handlebars.compile(withFronteggTemplate)({
    typescript: isTypescript,
    withRouter,
    baseUrl,
    uiLibrary,
    ...buildSelectedPluginsJS(selectedPlugins),
  });

  const toInstall = [
    `@frontegg/react-core`,
    `@frontegg/react-elements-${uiLibrary}`,
    ...selectedPlugins.map((pluginName: string) => `@frontegg/react-${pluginName}`),
  ];

  const lastVersion = execSync('npm view @frontegg/react-core version', { encoding: 'utf8' }).trim();
  const command = `${constants.installCommand} @frontegg/react ${toInstall
    .map((d) => `${d}@${lastVersion}`)
    .join(' ')}`;

  createFileInSrc(constants.fileName, jsFile);
  const filePath = path.join(process.cwd(), 'src', constants.fileName);
  const exec1 = exec(command);
  exec1.on('exit', () => {
    clearInterval(loader);
    process.stdout.write('\r                                          \n');
    printVersions([`@frontegg/react-core`, ...toInstall], lastVersion);

    console.log(chalk.black(`\nGenerated ${constants.fileName} location:`), chalk.yellow(filePath));

    console.log(
      chalk.yellow(`\n----------------------------------------------------------------------------------------------------
==> NEXT STEP:
==>   1. wrap you entire application with this HOC (withFrontegg)
${
  uiLibraryCss[uiLibrary] &&
  `==>   2. add this link to index html (only if you are not using ${uiLibrary} in your project)
         <link rel="stylesheet" href="${uiLibraryCss[uiLibrary]}">`
}
----------------------------------------------------------------------------------------------------\n`)
    );
    process.exit(0);
  });
};
