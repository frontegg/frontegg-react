/* eslint-disable no-undef,@typescript-eslint/no-var-requires */
const { execSync } = require('child_process');

const delay = () => new Promise(resolve => setTimeout(() => resolve(), 1000));

module.exports = async (github, packages, version) => {
  let timeout = 60;

  console.log(`Waiting for publish of version ${version} of ${packages[0]}`)

  const checkPackages = async () => {
    if (timeout === 0) {
      throw Error('TIMEOUT: Some packages does not appear in NPM registry');
    }

    let allPackagesIndexed = true;

    for (let i in packages) {
      try {
        const result = JSON.parse(execSync(`npm show ${packages[i]} --json dist-tags`).toString('utf8').trim());
        console.log("Found versions: ", result)
        allPackagesIndexed = allPackagesIndexed && (result.alpha === version || result.latest === version);
      } catch (e) {
        console.error('Failed to check version for', packages[i], e);
        allPackagesIndexed = false;
      }
    }

    if (!allPackagesIndexed) {
      timeout--;
      await delay();
      await checkPackages();
    }
  };

  await checkPackages();
};
