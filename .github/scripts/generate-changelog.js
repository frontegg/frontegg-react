
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
  console.log(pullsData);
  // // changelog = changelog.substring(changelog.indexOf('# ['));
  // // changelog = changelog.substring(changelog.indexOf('\n')).trim();
  // changelog.substring(0, changelog.indexOf('# [') - 2);
}
