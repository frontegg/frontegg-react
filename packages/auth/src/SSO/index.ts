import { SSORouter } from './SSORouter';
import { SSOPage } from './SSOPage';
import { SSOHeader } from './SSOHeader';
import { SSOToggle } from './SSOToggle';
import { SSOOverviewPage, SSOSteps, SSONoDataPlaceholder } from './SSOOverviewPage';
import { SSOClaimDomainPage, SSOClaimDomainGuide, SSOClaimDomainForm } from './SSOClaimDomainPage';
import { SSOConfigureIDPPage } from './SSOConfigureIDPPage';

export const SSO = {
  Page: SSOPage,
  Header: SSOHeader,
  Router: SSORouter,
  Toggle: SSOToggle,
  OverviewPage: SSOOverviewPage,
  ClaimDomainPage: SSOClaimDomainPage,
  ConfigureIDPPage: SSOConfigureIDPPage,
  Steps: SSOSteps,
  NoDataPlaceholder: SSONoDataPlaceholder,
  ClaimDomainGuide: SSOClaimDomainGuide,
  ClaimDomainForm: SSOClaimDomainForm,
};
