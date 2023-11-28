/* eslint-disable no-undef,@typescript-eslint/no-var-requires */
const { execSync } = require('child_process');

const delay = () => new Promise(resolve => setTimeout(() => resolve(), 1000));

module.exports = async (github, packages, version) => {
  let timeout = 60;


  const checkPackages = async () => {
    if (timeout === 0) {
      throw Error('TIMEOUT: Some packages does not appear in NPM registry');
    }

    let allPackagesIndexed = true;


    const fe_react_version = process.env.PR_VERSION;
    const owner = 'frontegg';
    const dispatchActionsData = [
      {
        repo: 'oauth-service',
        workflow_id: 'update-react-dependency.yaml'
      },
      {
        repo: 'dashboard',
        workflow_id: 'update-frontegg-react-dependency.yaml'
      }
    ];
    const [oauthDispatchData, dashboardDispatchData] = await Promise.all(dispatchActionsData.map(({ repo, workflow_id }) => github.rest.actions.createWorkflowDispatch({
      owner,
      repo,
      workflow_id,
      ref: 'master',
      inputs: {
        fe_react_version,
      }}))
    );

    for (let i in packages) {
      console.log(`Waiting for publish of version ${version} of ${packages[i]}`)
      try {
        const result = JSON.parse(execSync(`npm show ${packages[i]} --json dist-tags`).toString('utf8').trim());
        console.log("Found versions: ", result)
        allPackagesIndexed = allPackagesIndexed && (result.alpha === version || result.next === version || result.latest === version);
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
