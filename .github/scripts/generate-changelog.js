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

  reactChanges.forEach(pull => {
    changelogStr += ` - ${pull.title}\n`
  });
  changelogStr += '\n';

  adminPortalChanges.forEach(pull => {
    changelogStr += `${pull.body}\n`
  });
  console.log(changelogStr);
  // // changelog = changelog.substring(changelog.indexOf('# ['));
  // // changelog = changelog.substring(changelog.indexOf('\n')).trim();
  // changelog.substring(0, changelog.indexOf('# [') - 2);
}
