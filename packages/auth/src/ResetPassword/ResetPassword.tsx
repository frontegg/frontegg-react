import React, { FC, useEffect } from 'react';
import { ResetPasswordSuccessRedirect, ResetPasswordSuccessRedirectProps } from './ResetPasswordSuccessRedirect';
import { ResetPasswordFailed, ResetPasswordFailedProps } from './ResetPasswordFailedRedirect';
import { ResetPasswordForm, ResetPasswordFormProps } from './ResetPasswordForm';
import { ComponentsTypesWithProps, useDynamicComponents } from '@frontegg/react-core';
import { authPageWrapper } from '../components';
import { useAuth } from '../hooks';
import { ForgotPasswordStep } from '../Api';

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
  const { step, loadPasswordConfig, resetForgotPasswordState } = useAuth((state) => state.forgotPasswordState);

  const url = new URL(window?.location.href);
  const userId = url.searchParams.get('userId') || '';
  const token = url.searchParams.get('token') || '';

  useEffect((): (() => void) => {
    loadPasswordConfig({ userId });
    return resetForgotPasswordState;
  }, [userId]);

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
