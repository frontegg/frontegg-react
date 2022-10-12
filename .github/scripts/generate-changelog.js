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
  const reactChanges = pullsData.filter(pull => pull.head.ref !== 'upgrade-admin-portal')
  const adminPortalChanges = pullsData.find(pull => pull.head.ref === 'upgrade-admin-portal')

  reactChanges.forEach(pull => {
    changelogStr += ` - ${pull.title}\n`
  });
  changelogStr += '\n';

  if (adminPortalChanges != null) {
    changelogStr += adminPortalChanges.body;
  }
  console.log(changelogStr);
  // // changelog = changelog.substring(changelog.indexOf('# ['));
  // // changelog = changelog.substring(changelog.indexOf('\n')).trim();
  // changelog.substring(0, changelog.indexOf('# [') - 2);
}
