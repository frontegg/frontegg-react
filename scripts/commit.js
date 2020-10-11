const chalk = require('chalk');
const prompts = require('prompts');
const clear = require('clear');
const { execSync } = require('child_process');


async function run() {
  clear();
  console.log(chalk.cyan('Go over the files before committing your changes:\n'), execSync('git status', { encoding: 'utf8' }));
  const { confirmGit } = await prompts([{
    type: 'select',
    name: 'confirmGit',
    initial: false,
    message: 'Do you see changes you dont want to commit?',
    onRender(kleur) {
      this.msg = kleur.magenta(this.msg);
    },
    choices: [
      { title: 'Yes, do not commit', value: false },
      { title: 'No, we can continue', value: true },
    ],
  }]);

  if (!confirmGit) {
    console.log(chalk.cyan('Git:'), 'stash your unneeded changes');
    return;
  }

  console.log(chalk.cyan('Prettier:'), 'checking formatting...');
  try {
    execSync('yarn prettier-check-hook', { encoding: 'utf8' });
  } catch (e) {
    const { prettier } = await prompts([{
      type: 'toggle',
      name: 'prettier',
      active: 'yes',
      inactive: 'no',
      initial: true,
      message: 'Do you want to run prettier?',
      onRender(kleur) {
        this.msg = kleur.magenta(this.msg);
      },
    }]);
    if (prettier) {
      console.log(chalk.cyan('Prettier:'), 'formatting the code...');
      execSync('yarn prettier-hook');
      console.log(chalk.cyan('Prettier:'), 'your code is formatted.');
      console.log(chalk.magenta('Please go over the formatted files and add them to the commit'));

    }
    return;
  }

  const { type, scope, summary } = await prompts([
    {
      type: 'select',
      name: 'type',
      message: 'Select commit <type>',
      choices: [
        {
          title: 'refactor',
          description: ' A code change that neither fixes a bug nor adds a feature',
          value: 'refactor',
        },
        { title: 'fix', description: ' Fix a bug (equivalent to a PATCH in Semantic Versioning)', value: 'fix' },
        {
          title: 'feat',
          description: ' Add a new feature (equivalent to a MINOR in Semantic Versioning)',
          value: 'feat',
        },
        { title: 'docs', description: ' Documentation only changes', value: 'docs' },
        { title: 'test', description: ' Adding missing tests or correcting existing tests', value: 'test' },
        { title: 'perf', description: ' A code change that improves performance', value: 'perf' },
        {
          title: 'ci',
          description: ' Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)',
          value: 'ci',
        },
        {
          title: 'build',
          description: ' Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
          value: 'build',
        },
        {
          title: 'chore',
          description: ' Update something without impacting the user (ex: bump a dependency in package.json)',
          value: 'chore',
        },
      ],
      instructions: '\n\n Space to select. Return to submit',
      onRender(kleur) {
        this.msg = kleur.magenta(this.msg);
      },
    },
    {
      type: 'select',
      name: 'scope',
      message: `Select changes <scope>`,
      choices: [
        {
          title: 'Global scope',
          description: 'General changes affects all libs. Useful for style, test and refactor changes',
          value: null,
        },
        { title: 'Demo Project', description: 'Changes affects `demo-saas` project', value: 'demo' },
        { title: 'Core Project', description: 'Changes affects `@frontegg/react-core` lib', value: 'core' },
        { title: 'Auth Project', description: 'Changes affects `@frontegg/react-auth` lib', value: 'auth' },
        {
          title: 'Elements Projects',
          description: 'Changes affects `@frontegg/react-elements-*` lib',
          value: 'elements',
        },
        { title: 'Cli', description: 'Changes affects `@frontegg/react-cli` lib', value: 'cli' },
        { title: 'Config', description: 'Changes repository configurations', value: 'config' },
        { title: 'Localize', description: 'Localization changes', value: 'localize' },
        { title: 'Changelog', description: 'Used for updating the release notes in CHANGELOG.md', value: 'changelog' },
        {
          title: 'Packaging',
          description: 'Used for changes that change the npm package layout in all of our packages, e.g. public path changes, package.json changes done to all packages, d.ts file/format changes, changes to bundles, etc',
          value: 'Packaging',
        },
        { title: 'Upgrade', description: 'Used for updating the external libraries', value: 'upgrade' },
      ],
      onRender(kleur) {
        this.msg = kleur.magenta(this.msg);
      },
      initial: 0,
    },
    {
      type: 'text',
      name: 'summary',
      message: '',
      onRender(kleur) {
        this.msg = kleur.magenta('Enter a short summary of your changes:\n') + kleur.grey('   - use the imperative, "add" not "added", "change" not "changed" nor "changes"\n' +
          '   - don\'t capitalize the first letter\n' +
          '   - no dot (.) at the end\n');
      },
      format: value => value.trim(),
      validate: value => value === 'Start typing...' ? 'Summary should not be empty' : (value.trim().length < 10 ? `very short summary` : (value.trim().length > 80 ? `very long summary` : true)),
    },
  ]);

  if (type === undefined || scope === undefined || summary === undefined) {
    return;
  }


  const bodyPlaceholder = '<leave empty to skip>';
  const { body } = await prompts([{
    type: 'text',
    name: 'body',
    message: 'Do you want to add description to the commit body? (Optional)\n',
    initial: bodyPlaceholder,
    onRender(kleur) {
      this.msg = kleur.magenta(this.msg);
    },
    format: value => (value === bodyPlaceholder ? '' : value).trim(),
  }]);
  if (body === undefined) {
    return;
  }

  const footerPlaceholder = 'Enter task id or leave empty, Ex: #FE123';
  const { footer } = body ? await prompts([{
    type: 'text',
    name: 'footer',
    message: 'Is these changes related to a specific task?\n',
    initial: footerPlaceholder,
    onRender(kleur) {
      this.msg = kleur.magenta(this.msg);
    },
    format: value => (value === footerPlaceholder ? '' : value).trim(),
  }]) : { footer: '' };
  if (footer === undefined) {
    return;
  }


  const commitMessage = `${type}${scope ? `(${scope})` : ''}: ${summary}${body ? `\n\n${body}${footer ? `\n\n${footer}` : ''}` : ''}`.trim();

  console.log(`-----------Commit Message--------------`);
  console.log(commitMessage);
  console.log('---------------------------------------');
  console.log(`Branch: ${execSync(`git rev-parse --abbrev-ref HEAD`)}`);
  console.log('---------------------------------------');
  const { confirm } = await prompts([{
    type: 'toggle',
    name: 'confirm',
    active: 'yes',
    inactive: 'no',
    initial: true,
    message: 'Is this commit message Ok?',
    onRender(kleur) {
      this.msg = kleur.magenta(this.msg);
    },
  }]);
  if (confirm === undefined) {
    return;
  }
  console.log(chalk.cyan('GIT:'), 'committing...');
  if (confirm) {
    execSync(`git commit -m "${commitMessage}"`);
    execSync(`git push`);
  }

}


run();
