import { SSORouter } from './SSORouter';
import { SSOPage, SSOHeader } from './SSOPage';
import { SSOToggle } from './SSOToggle';
import { SSOOverviewPage, SSOSteps, SSONoDataPlaceholder } from './SSOOverviewPage';
import { SSOClaimDomainPage } from './SSOClaimDomainPage';
import { SSOConfigureIDPPage } from './SSOConfigureIDPPage';

export default SSOPage;
export {
  SSORouter as Router,
  SSOPage as Page,
  SSOToggle as Toggle,
  SSOOverviewPage as OverviewPage,
  SSOClaimDomainPage as ClaimDomainPage,
  SSOConfigureIDPPage as ConfigureIDPPage,
  SSOHeader as Header,
  SSOSteps as Steps,
  SSONoDataPlaceholder as NoDataPlaceholder,
};
