import React, { ComponentType } from 'react';
import { AuthState, ForgotPasswordStep } from '../Api';
import { ComponentsTypesWithProps, FronteggClass } from '@frontegg/react-core';
import { withAuth } from '../HOCs';
import { authPageWrapper } from '../components/authPageWrapper';
import { ForgotPasswordSuccessRedirect, ForgotPasswordSuccessRedirectProps } from './ForgotPasswordSuccessRedirect';
import { ForgotPasswordForm, ForgotPasswordFormProps } from './ForgotPasswordForm';

const stateMapper = ({ forgetPasswordState }: AuthState) => ({ forgetPasswordState });

type Components = {
  ForgotPasswordSuccessRedirect: ForgotPasswordSuccessRedirectProps;
  ForgotPasswordForm: ForgotPasswordFormProps;
}

export interface ForgotPasswordProps {
  components?: ComponentsTypesWithProps<Components>
}

type Props = ReturnType<typeof stateMapper> & ForgotPasswordProps

class ForgotPasswordComponent extends FronteggClass<Components, Props> {

  constructor(props: Props) {
    super(props, { ForgotPasswordSuccessRedirect, ForgotPasswordForm });
  }

  render() {
    const { forgetPasswordState: { step } } = this.props;
    const { ForgotPasswordSuccessRedirect, ForgotPasswordForm } = this.comps;

    let components = null;
    if (step === ForgotPasswordStep.success) {
      components = <ForgotPasswordSuccessRedirect/>;
    } else {
      components = <ForgotPasswordForm/>;
    }

    return <div className='fe-forgot-password-component'>
      {components}
    </div>;
  }
}

export const ForgotPassword = withAuth(ForgotPasswordComponent, stateMapper) as ComponentType<ForgotPasswordProps>;
export const ForgotPasswordPage = authPageWrapper(ForgotPassword);
