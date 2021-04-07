import React, { FC } from 'react';
import { ComponentsTypesWithProps, useDynamicComponents } from '@frontegg/react-core';
import { ActivateAccountStep } from '@frontegg/redux-store/auth';
import { useActivateAccountState } from '@frontegg/react-hooks/auth';
import { ActivateAccountSuccessRedirect, ActivateAccountSuccessRedirectProps } from './ActivateAccountSuccessRedirect';
import { ActivateAccountFailedRedirect, ActivateAccountFailedRedirectProps } from './ActivateAccountFailedRedirect';
import { ActivateAccountForm, ActivateAccountFormProps } from './ActivateAccountForm';
import { ActivateAccountResendEmail, ActivateAccountResendEmailProps } from './ActivateAccountResendEmail';
import { authPageWrapper } from '../components';

type Components = {
  ActivateAccountForm: ActivateAccountFormProps;
  ActivateAccountSuccessRedirect: ActivateAccountSuccessRedirectProps;
  ActivateAccountFailedRedirect: ActivateAccountFailedRedirectProps;
  ActivateAccountResendEmail: ActivateAccountResendEmailProps;
};
const defaultComponents = {
  ActivateAccountSuccessRedirect,
  ActivateAccountFailedRedirect,
  ActivateAccountForm,
  ActivateAccountResendEmail,
};

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
  if (step === ActivateAccountStep.resend) {
    components = <Dynamic.ActivateAccountResendEmail />;
  } else if (!userId || !token) {
    components = <Dynamic.ActivateAccountFailedRedirect />;
  } else if (step === ActivateAccountStep.success) {
    components = <Dynamic.ActivateAccountSuccessRedirect />;
  } else {
    components = <Dynamic.ActivateAccountForm userId={userId} token={token} />;
  }
  return <div className='fe-activate-account-component'>{components}</div>;
};

export const ActivateAccountPage = authPageWrapper(ActivateAccount);
