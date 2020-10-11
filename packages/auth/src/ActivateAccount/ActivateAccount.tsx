import React, { FC } from 'react';
import { ActivateAccountSuccessRedirect, ActivateAccountSuccessRedirectProps } from './ActivateAccountSuccessRedirect';
import { ActivateAccountFailedRedirect, ActivateAccountFailedRedirectProps } from './ActivateAccountFailedRedirect';
import { ActivateAccountForm, ActivateAccountFormProps } from './ActivateAccountForm';
import { ComponentsTypesWithProps, useDynamicComponents } from '@frontegg/react-core';
import { authPageWrapper } from '../components';
import { useAuth } from '../hooks';
import { ActivateStep } from '../Api/ActivateState';

type Components = {
  ActivateAccountForm: ActivateAccountFormProps;
  ActivateAccountSuccessRedirect: ActivateAccountSuccessRedirectProps;
  ActivateAccountFailedRedirect: ActivateAccountFailedRedirectProps;
};
const defaultComponents = { ActivateAccountSuccessRedirect, ActivateAccountFailedRedirect, ActivateAccountForm };

export interface ActivateAccountProps {
  components?: ComponentsTypesWithProps<Components>;
}

export const ActivateAccount: FC<ActivateAccountProps> = (props) => {
  const { step } = useAuth((state) => state.activateState);
  const Dynamic = useDynamicComponents(defaultComponents, props);

  const url = new URL(window?.location.href);
  const userId = url.searchParams.get('userId') || '';
  const token = url.searchParams.get('token') || '';

  let components: any;
  if (!userId || !token) {
    components = <Dynamic.ActivateAccountFailedRedirect />;
  } else if (step === ActivateStep.success) {
    components = <Dynamic.ActivateAccountSuccessRedirect />;
  } else {
    components = <Dynamic.ActivateAccountForm userId={userId} token={token} />;
  }
  return <div className='fe-activate-account-component'>{components}</div>;
};

export const ActivateAccountPage = authPageWrapper(ActivateAccount);
