export default async ({context, github}) => {
  const {default: fs} = await import('fs');
  let changelog = fs.readFileSync('./CHANGELOG.md', {encoding: 'utf8'});
  const {version} = JSON.parse(fs.readFileSync('./lerna.json', {encoding: "utf-8"}));


  const {data: pullsData} = await github.rest.pulls.list({
    owner: context.repo.owner,
    repo: context.repo.repo,
    base: 'master',
    state: 'closed',
    sort: 'merged_at',
    direction: 'desc'
  });

  let changelogStr = ''

  const mergedPulls = pullsData.filter(pull => pull.merged_at != null);
  const lastReleaseIndex = mergedPulls.findIndex(pull => pull.head.ref === 'release/next')
  const lastRelease = mergedPulls[lastReleaseIndex]
  const pullsFromLastRelease = mergedPulls.slice(0, lastReleaseIndex);

  const reactChanges = pullsFromLastRelease.filter(pull => pull.head.ref !== 'upgrade-admin-portal')
  const adminPortalChanges = pullsFromLastRelease.filter(pull => pull.head.ref === 'upgrade-admin-portal')

  adminPortalChanges.forEach(pull => {
    changelogStr += `${formatAdminPortalChangeLog(pull.body)}\n`
  });
  changelogStr += '\n';
  if (reactChanges.length > 0) {
    changelogStr += `### React Wrapper ${version}:\n`
  }
  reactChanges.forEach(pull => {
    changelogStr += `- ${pull.title}\n`
  });

  changelog = changelog.replace(/# Change Log\n/g, '');
  const dateNow = new Date();
  const date = `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`
  let newChangelog = `# Change Log\n\n## [${version}](https://github.com/frontegg/frontegg-react/compare/${lastRelease.title}...v${version}) (${date})\n\n`
  newChangelog += changelogStr
  newChangelog += changelog.replace(/# Change Log\n/g, '\n');

  fs.writeFileSync('./CHANGELOG.md', newChangelog, {encoding: 'utf8'});
  return changelogStr;
}

function formatAdminPortalChangeLog(body) {
  if (body?.split('\n')?.[0]?.includes('### Change Log')) {
    return body.split('\n').slice(1).join('\n');
  }
  return body;
}
