import { SSORouter } from './SSORouter';
import { SSOPage } from './SSOPage';
import { SSOHeader } from './SSOHeader';
import { SSOToggle } from './SSOToggle';
import { SSOOverviewPage, SSOSteps, SSONoDataPlaceholder } from './SSOOverviewPage';
import { SSOClaimDomainComponent, SSOClaimDomainPage, SSOClaimDomainGuide, SSOClaimDomainForm } from './SSOClaimDomainPage';
import { SSOConfigureIDPComponent, SSOConfigureIDPPage } from './SSOConfigureIDPPage';
import { SSOManageAuthorizationComponent, SSOManageAuthorizationPage } from './SSOManageAuthorizationPage';

export const SSO = {
  Page: SSOPage,
  Header: SSOHeader,
  Router: SSORouter,
  Toggle: SSOToggle,
  OverviewPage: SSOOverviewPage,
  ClaimDomainPage: SSOClaimDomainPage,
  ClaimDomainComponent: SSOClaimDomainComponent,
  ConfigureIDPPage: SSOConfigureIDPPage,
  ConfigureIDPComponent: SSOConfigureIDPComponent,
  ManageAuthorizationPage: SSOManageAuthorizationPage,
  ManageAuthorizationComponent: SSOManageAuthorizationComponent,
  Steps: SSOSteps,
  NoDataPlaceholder: SSONoDataPlaceholder,
  ClaimDomainGuide: SSOClaimDomainGuide,
  ClaimDomainForm: SSOClaimDomainForm,
};
