import React, { FC } from 'react';
import { ActivateStep } from '../Api';
import { ActivateAccountSuccessRedirect, ActivateAccountSuccessRedirectProps } from './ActivateAccountSuccessRedirect';
import { ActivateAccountFailedRedirect, ActivateAccountFailedRedirectProps } from './ActivateAccountFailedRedirect';
import { ActivateAccountForm, ActivateAccountFormProps } from './ActivateAccountForm';
import { ComponentsTypesWithProps, useDynamicComponents } from '@frontegg/react-core';
import { authPageWrapper } from '../components/authPageWrapper';
import { useAuth } from '../hooks';

type Components = {
  ActivateAccountForm: ActivateAccountFormProps;
  ActivateAccountSuccessRedirect: ActivateAccountSuccessRedirectProps;
  ActivateAccountFailedRedirect: ActivateAccountFailedRedirectProps;
}
const defaultComponents = { ActivateAccountSuccessRedirect, ActivateAccountFailedRedirect, ActivateAccountForm };

export interface ActivateAccount2Props {
  components?: ComponentsTypesWithProps<Components>
}

export const ActivateAccount: FC<ActivateAccount2Props> = (props) => {
  const step = useAuth((state => state.activateState.step));
  const Dynamic = useDynamicComponents(defaultComponents, props);

  const url = new URL(window?.location.href);
  const userId = url.searchParams.get('userId') || '';
  const token = url.searchParams.get('token') || '';

  let components: any;
  if (!userId || !token) {
    components = <Dynamic.ActivateAccountFailedRedirect/>;
  } else if (step === ActivateStep.success) {
    components = <Dynamic.ActivateAccountSuccessRedirect/>;
  } else {
    components = <Dynamic.ActivateAccountForm userId={userId} token={token}/>;
  }
  return <div className='fe-activate-account-component'>{components}</div>;
};


export const ActivateAccountPage = authPageWrapper(ActivateAccount);
