import React from 'react';
import { AuthState, ForgotPasswordStep } from '../Api';
import { ResetPasswordSuccessRedirect, ResetPasswordSuccessRedirectProps } from './ResetPasswordSuccessRedirect';
import { ResetPasswordFailed, ResetPasswordFailedProps } from './ResetPasswordFailedRedirect';
import { ResetPasswordForm, ResetPasswordFormProps } from './ResetPasswordForm';
import { ComponentsTypesWithProps, FronteggClass } from '@frontegg/react-core';
import { authPageWrapper } from '../components/authPageWrapper';
import { withAuth } from '../HOCs';

const stateMapper = ({ forgetPasswordState }: AuthState) => ({ forgetPasswordState });

type Components = {
  ResetPasswordForm: ResetPasswordFormProps;
  ResetPasswordSuccessRedirect: ResetPasswordSuccessRedirectProps;
  ResetPasswordFailed: ResetPasswordFailedProps;
}

export interface ResetPasswordProps {
  components?: ComponentsTypesWithProps<Components>
}

type Props = ReturnType<typeof stateMapper> & ResetPasswordProps

class ResetPasswordComponent extends FronteggClass<Components, Props> {

  constructor(props: Props) {
    super(props, { ResetPasswordForm, ResetPasswordSuccessRedirect, ResetPasswordFailed });
  }

  render() {
    const { ResetPasswordForm, ResetPasswordSuccessRedirect, ResetPasswordFailed } = this.comps;
    const { forgetPasswordState: { step } } = this.props;

    const url = new URL(window?.location.href);
    const userId = url.searchParams.get('userId') || '';
    const token = url.searchParams.get('token') || '';

    let components = null;
    if (!userId || !token) {
      components = <ResetPasswordFailed/>;
    } else if (step === ForgotPasswordStep.success) {
      components = <ResetPasswordSuccessRedirect/>;
    } else {

      components = <ResetPasswordForm userId={userId} token={token}/>;
    }

    return <div className='fe-forgot-password-component'>{components}</div>;
  }
}

export const ResetPassword = withAuth(ResetPasswordComponent, stateMapper);

export const ResetPasswordPage = authPageWrapper(ResetPassword);
