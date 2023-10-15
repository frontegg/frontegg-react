/* eslint-disable @typescript-eslint/no-var-requires,no-undef,no-console */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
// const generateChangelog = require('../.github/scripts/generate-changelog');
const { execSync } = require('child_process');
const { Octokit } = require('@octokit/core');

const GH_TOKEN = process.argv[2] ? process.argv[2] : process.env.GH_ACCESS_TOKEN;
const GH_USER = process.argv[3] ? process.argv[3] : 'x-access-token';

const githubApi = new Octokit({ auth: GH_TOKEN });
const branchName = 'upgrade-frontegg-react';

async function cloneRepo(TAG, repoName, destinationFolder) {
  try {
    fs.rmdirSync(destinationFolder, { recursive: true });
  } catch (e) {
  }
  try {
    fs.mkdirSync(destinationFolder, { recursive: true });
  } catch (e) {
  }

  console.log(chalk.cyan(TAG), 'Cloning...');
  execSync(`git clone https://${GH_USER}:${GH_TOKEN}@github.com/frontegg/${repoName}.git ${destinationFolder}`);
  console.log(chalk.cyan(TAG), 'Cloned to ', destinationFolder);
}

async function checkoutBranch(TAG, frameworkDir) {
  console.log(chalk.cyan(TAG), `Checkout branch ${branchName}`);
  const isRemoteBranchExists = execSync(`git ls-remote --heads origin ${branchName}`, { cwd: frameworkDir });

  if (isRemoteBranchExists.toString()) {
    execSync(`git checkout -b ${branchName} --track origin/${branchName}`, { cwd: frameworkDir });
  } else {
    execSync(`git checkout -b ${branchName}`, { cwd: frameworkDir });
    console.log(chalk.cyan(TAG), `New branch created ${branchName}`);
  }
}

async function updateDependenciesVersion(TAG, packageDir, fronteggVersion, packagesToUpdate, installDir = '../') {
  const packageJson = JSON.parse(fs.readFileSync(path.join(packageDir, 'package.json'), { encoding: 'utf8' }));

  console.log(chalk.cyan(TAG), 'Updating oauth service frontend package...');
    try {
      const dependencies = packageJson.dependencies ? packageJson.dependencies : {};
      const devDependencies = packageJson.devDependencies ? packageJson.devDependencies : {};

      let changed = false;
      packagesToUpdate.forEach(frPkg => {
        if (dependencies[frPkg]) {
          dependencies[frPkg] = fronteggVersion;
          changed = true;
        }

        if (devDependencies[frPkg]) {
          devDependencies[frPkg] = fronteggVersion;
          changed = true;
        }
      });

      if (changed) {
        fs.writeFileSync(path.join(packageDir, 'package.json'), JSON.stringify(packageJson, null, 2) + '\n', { encoding: 'utf8' });
      }
    } catch (e) {
      console.log('Failed to update frontegg react with the error:', e);
    }
  execSync('yarn install', { cwd: path.join(packageDir, installDir) });
}

async function commitChanges(TAG, frameworkDir, fronteggVersion, repoName) {

  console.log(chalk.cyan(TAG), 'Committing changed files');

  const gitStatus = execSync(`git status`, { cwd: frameworkDir });
  const isUpToDate = gitStatus.toString().indexOf('Changes not staged for commit') === -1;

  if (isUpToDate) {
    console.log(chalk.cyan(TAG), `Repository is up to date`);

    return false;
  }

  execSync(`git config --global user.name 'frontegg'`, { cwd: frameworkDir });
  execSync(`git config --global user.email 'frontegg@users.noreply.github.com'`, { cwd: frameworkDir });
  execSync(`git remote set-url origin https://${GH_USER}:${GH_TOKEN}@github.com/frontegg/${repoName}.git`, { cwd: frameworkDir });
  execSync(`git add .`, { cwd: frameworkDir });
  execSync(`git commit -m "update admin-portal ${fronteggVersion}"`, { cwd: frameworkDir });

  console.log(chalk.cyan(TAG), `Pushing ${branchName} to origin`);
  execSync(`git push --set-upstream origin ${branchName}`, { cwd: frameworkDir });

  return true;
}

async function getPullRequest(TAG, repoName) {
  console.log(chalk.cyan(TAG), `Searching for existing Pull Requests`);
  const { data: pulls } = await githubApi.request(`GET /repos/frontegg/${repoName}/pulls`, {
    owner: 'frontegg',
    repo: repoName,
    state: 'open',
    head: `frontegg:${branchName}`,
    base: 'master',
  });
  const existingPulls = pulls.find(d => d.head.ref === branchName && d.state === 'open');

  if (existingPulls) {
    console.log(chalk.cyan(TAG), `Found unmerged pull request for upgrading AdminPortal`);

    return existingPulls;
  } else {
    console.log(chalk.cyan(TAG), `No pull request found for upgrading AdminPortal`);

    return null;
  }
}

async function createPullRequest(TAG, repoName, fronteggVersion, changelog) {

  const oldPullRequest = await getPullRequest(TAG, repoName);
  let res;

  if (oldPullRequest) {
    console.log(chalk.cyan(TAG), `Updating existing pull request`);
    res = await githubApi.request(`PATCH /repos/frontegg/${repoName}/pulls/${oldPullRequest.number}`, {
      owner: 'frontegg',
      repo: repoName,
      head: branchName,
      base: 'master',
      pull_number: oldPullRequest.number,
      title: `Update Frontegg React to ${fronteggVersion}`,
      body: changelog + '\n\n' + oldPullRequest.body,
    });
  } else {
    console.log(chalk.cyan(TAG), `Creating new pull`);
    res = await githubApi.request(`POST /repos/frontegg/${repoName}/pulls`, {
      owner: 'frontegg',
      repo: repoName,
      head: branchName,
      base: 'master',
      title: `Update Frontegg React to ${fronteggVersion}`,
      body: changelog,
    });
  }

  return res.data.html_url;
}

async function clean(TAG, frameworkDir) {
  console.log(chalk.cyan(TAG), `Cleaning framework temp dir ${frameworkDir}`);
  fs.rmdirSync(frameworkDir, { recursive: true });
}

async function triggerOauthUpgrade(fronteggVersion, changelog) {
  const TAG = 'Oauth service:';
  console.log('\n');
  console.log(chalk.cyan(TAG), 'Start');

  const repoName = 'oauth-service';
  const frameworkDir = path.join(__dirname, '../', 'wrappers/oauth-service');
  await cloneRepo(TAG, repoName, frameworkDir);
  await checkoutBranch(TAG, frameworkDir);

  console.log(chalk.cyan(TAG), 'Updating frontegg react package version to latest');
  const packageDir = path.join(frameworkDir, './frontend');
  const packagesToUpdate = ['@frontegg/react'];
  await updateDependenciesVersion(TAG, packageDir, fronteggVersion, packagesToUpdate);

  await commitChanges(TAG, frameworkDir, fronteggVersion, repoName);

  const pullRequestUrl = await createPullRequest(TAG, repoName, fronteggVersion, changelog);

  await clean(TAG, frameworkDir);

  return pullRequestUrl;
}

async function triggerBuildForFrameworks(fronteggVersion, changelog) {
  const pullRequests = [];
  pullRequests.push(await triggerOauthUpgrade(fronteggVersion, changelog));

  console.log(`Cleaning temp dirs`);
  fs.rmdirSync(path.join(__dirname, '../wrappers'), { recursive: true });

  console.log('\n');
  console.log(chalk.green('Pull Requests:'), pullRequests);
}

function getCurrentVersion() {
  return require(path.join(__dirname, '../lerna.json')).version;
}

function getCurrentChangeLog() {
  return fs.readFileSync(path.join(__dirname, '../CHANGELOG.md'), { encoding: 'utf8' }).split('# Change Log')?.[1]
}

async function publishFronteggReact() {
  const version = getCurrentVersion();
  console.log(`Publishing Frontegg React version ${version}`);
  const changelog = getCurrentChangeLog();
  await triggerBuildForFrameworks(version, changelog);
}

publishFronteggReact();
