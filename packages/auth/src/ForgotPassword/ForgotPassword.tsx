import React, { FC } from 'react';
import { ForgotPasswordStep } from '../Api';
import { useDynamicComponents, ComponentsTypesWithProps } from '@frontegg/react-core';
import { authPageWrapper } from '../components';
import { ForgotPasswordSuccessRedirect, ForgotPasswordSuccessRedirectProps } from './ForgotPasswordSuccessRedirect';
import { ForgotPasswordForm, ForgotPasswordFormProps } from './ForgotPasswordForm';
import { useAuth } from '../hooks';

type Components = {
  ForgotPasswordSuccessRedirect: ForgotPasswordSuccessRedirectProps;
  ForgotPasswordForm: ForgotPasswordFormProps;
};

export interface ForgotPasswordProps {
  components?: ComponentsTypesWithProps<Components>;
}

const defaultComponents = { ForgotPasswordSuccessRedirect, ForgotPasswordForm };
export const ForgotPassword: FC<ForgotPasswordProps> = (props) => {
  const Dynamic = useDynamicComponents(defaultComponents, props);
  const { step } = useAuth(({ forgetPasswordState: { step } }) => ({ step }));
  let components;
  if (step === ForgotPasswordStep.success) {
    components = <Dynamic.ForgotPasswordSuccessRedirect />;
  } else {
    components = <Dynamic.ForgotPasswordForm />;
  }

  return <div className='fe-forgot-password-component'>{components}</div>;
};
export const ForgotPasswordPage = authPageWrapper(ForgotPassword);
