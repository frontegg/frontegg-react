import React, { FC, useCallback } from 'react';
import { ComponentsTypesWithProps, useDynamicComponents } from '@frontegg/react-core';
import { AuthState, SignUpStage } from '@frontegg/redux-store/auth';
import { SignUpForm } from './SignUpForm';
import { authPageWrapper } from '../components';
import { AuthStateMapper, useAuth } from '../hooks';
import { SignUpSuccess } from './SignUpSuccess';
import { SocialLoginsSignUpWithWrapper } from '../SocialLogins';

interface Components {
  SignUpForm: {};
  SocialLogins: {};
}

export interface SignUpProps {
  components?: ComponentsTypesWithProps<Components>;
  withCompanyName?: boolean;
}

const defaultComponents = {
  SignUpForm,
  SocialLogins: SocialLoginsSignUpWithWrapper,
};

const stateMapper: AuthStateMapper<Pick<AuthState, 'routes' | 'onRedirectTo' | 'signUpState'>> = ({
  routes,
  onRedirectTo,
  signUpState,
}: AuthState) => ({ onRedirectTo, routes, signUpState });

export const SignUp: FC<SignUpProps> = (props) => {
  const { routes, onRedirectTo, signUpState } = useAuth(stateMapper);
  const Dynamic = useDynamicComponents(defaultComponents, props);
  const redirectToLogin = useCallback(() => {
    onRedirectTo(routes.loginUrl);
  }, []);

  if (!signUpState.firstLoad && !signUpState.allowSignUps) {
    redirectToLogin();
  }

  switch (signUpState.stage) {
    case SignUpStage.SignUpSuccess:
      return <SignUpSuccess />;
    case SignUpStage.SignUp:
    default:
      return (
        <>
          <Dynamic.SignUpForm withCompanyName={props.withCompanyName} />
          <Dynamic.SocialLogins />
        </>
      );
  }
};

export const SignUpPageComponent = authPageWrapper(SignUp);
