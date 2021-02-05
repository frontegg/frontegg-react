import React, { FC, useEffect } from 'react';
import { ComponentsTypesWithProps, useDynamicComponents } from '@frontegg/react-core';
import { ForgotPasswordStep } from '@frontegg/redux-store/auth';
import { ResetPasswordSuccessRedirect, ResetPasswordSuccessRedirectProps } from './ResetPasswordSuccessRedirect';
import { ResetPasswordFailed, ResetPasswordFailedProps } from './ResetPasswordFailedRedirect';
import { ResetPasswordForm, ResetPasswordFormProps } from './ResetPasswordForm';
import { authPageWrapper } from '../components';
import { useForgotPasswordActions, useForgotPasswordState } from '../ForgotPassword';

type Components = {
  ResetPasswordForm: ResetPasswordFormProps;
  ResetPasswordSuccessRedirect: ResetPasswordSuccessRedirectProps;
  ResetPasswordFailed: ResetPasswordFailedProps;
};

export interface ResetPasswordProps {
  components?: ComponentsTypesWithProps<Components>;
}

const defaultComponent = { ResetPasswordForm, ResetPasswordSuccessRedirect, ResetPasswordFailed };
export const ResetPassword: FC<ResetPasswordProps> = (props) => {
  const Dynamic = useDynamicComponents(defaultComponent, props);
  const { step } = useForgotPasswordState();
  const { loadPasswordConfig, resetForgotPasswordState } = useForgotPasswordActions();

  const url = new URL(window?.location.href);
  const userId = url.searchParams.get('userId') || '';
  const token = url.searchParams.get('token') || '';

  useEffect(() => {
    loadPasswordConfig();
    return resetForgotPasswordState;
  }, []);

  let components;
  if (!userId || !token) {
    components = <Dynamic.ResetPasswordFailed />;
  } else if (step === ForgotPasswordStep.success) {
    components = <Dynamic.ResetPasswordSuccessRedirect />;
  } else {
    components = <Dynamic.ResetPasswordForm userId={userId} token={token} />;
  }

  return <div className='fe-forgot-password-component'>{components}</div>;
};

export const ResetPasswordPage = authPageWrapper(ResetPassword);
