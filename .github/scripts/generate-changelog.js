export default async ({context, github, core}) => {
  const {default: fs} = await import('fs');
  let changelog = fs.readFileSync('./CHANGELOG.md', {encoding: 'utf8'});

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
  const lastRelease = mergedPulls.findIndex(pull => pull.head.ref === 'release/next')
  const pullsFromLastRelease = mergedPulls.slice(0, lastRelease);

  const reactChanges = pullsFromLastRelease.filter(pull => pull.head.ref !== 'upgrade-admin-portal')
  const adminPortalChanges = pullsFromLastRelease.filter(pull => pull.head.ref === 'upgrade-admin-portal')

  if (reactChanges.length > 0) {
    changelogStr += "## @frontegg/react changes:\n\n"
  }
  reactChanges.forEach(pull => {
    changelogStr += `- ${pull.title}\n`
  });
  changelogStr += '\n';

  if (adminPortalChanges.length > 0) {
    changelogStr += "## @frontegg/js changes:\n\n"
  }
  adminPortalChanges.forEach(pull => {
    changelogStr += `${pull.body}\n`
  });
  console.log(changelogStr);
  return changelogStr;
}
