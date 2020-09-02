import React, { ComponentType } from 'react';
import { ActivateStep, AuthState } from '../Api';
import { ActivateAccountSuccessRedirect, ActivateAccountSuccessRedirectProps } from './ActivateAccountSuccessRedirect';
import { ActivateAccountFailedRedirect, ActivateAccountFailedRedirectProps } from './ActivateAccountFailedRedirect';
import { ActivateAccountForm, ActivateAccountFormProps } from './ActivateAccountForm';
import { ComponentsTypesWithProps, FronteggClass } from '@frontegg/react-core';
import { authPageWrapper } from '../components/authPageWrapper';
import { withAuth } from '../HOCs';

const stateMapper = ({ activateState }: AuthState) => ({ activateState });

type Components = {
  ActivateAccountForm: ActivateAccountFormProps;
  ActivateAccountSuccessRedirect: ActivateAccountSuccessRedirectProps;
  ActivateAccountFailedRedirect: ActivateAccountFailedRedirectProps;
}

export interface ActivateAccountProps {
  components?: ComponentsTypesWithProps<Components>
}

type Props = ReturnType<typeof stateMapper> & ActivateAccountProps

class ActivateAccountComponent extends FronteggClass<Components, Props> {

  constructor(props: Props) {
    super(props, { ActivateAccountForm, ActivateAccountSuccessRedirect, ActivateAccountFailedRedirect });
  }

  render() {
    const { ActivateAccountForm, ActivateAccountSuccessRedirect, ActivateAccountFailedRedirect } = this.comps;
    const { activateState: { step } } = this.props;

    const url = new URL(window?.location.href);
    const userId = url.searchParams.get('userId') || '';
    const token = url.searchParams.get('token') || '';

    let components: any;
    if (!userId || !token) {
      components = <ActivateAccountFailedRedirect/>;
    } else if (step === ActivateStep.success) {
      components = <ActivateAccountSuccessRedirect/>;
    } else {
      components = <ActivateAccountForm userId={userId} token={token}/>;
    }

    return <div className='fe-activate-account-component'>{components}</div>;
  }
}

export const ActivateAccount = withAuth(ActivateAccountComponent, stateMapper) as ComponentType<ActivateAccountProps>;

export const ActivateAccountPage = authPageWrapper(ActivateAccount);
