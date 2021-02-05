import React, { FC } from 'react';
import { ComponentsTypesWithProps, useDynamicComponents } from '@frontegg/react-core';
import { ActivateAccountStep } from '@frontegg/redux-store/auth';
import { ActivateAccountSuccessRedirect, ActivateAccountSuccessRedirectProps } from './ActivateAccountSuccessRedirect';
import { ActivateAccountFailedRedirect, ActivateAccountFailedRedirectProps } from './ActivateAccountFailedRedirect';
import { ActivateAccountForm, ActivateAccountFormProps } from './ActivateAccountForm';
import { authPageWrapper } from '../components';
import { useActivateAccountState } from './hooks';

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
  const { step } = useActivateAccountState();
  const Dynamic = useDynamicComponents(defaultComponents, props);

  const url = new URL(window?.location.href);
  const userId = url.searchParams.get('userId') || '';
  const token = url.searchParams.get('token') || '';

  let components: any;
  if (!userId || !token) {
    components = <Dynamic.ActivateAccountFailedRedirect />;
  } else if (step === ActivateAccountStep.success) {
    components = <Dynamic.ActivateAccountSuccessRedirect />;
  } else {
    components = <Dynamic.ActivateAccountForm userId={userId} token={token} />;
  }
  return <div className='fe-activate-account-component'>{components}</div>;
};

export const ActivateAccountPage = authPageWrapper(ActivateAccount);
