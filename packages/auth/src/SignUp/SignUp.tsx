import React, { FC, useCallback } from 'react';
import { SignUpForm } from './SignUpForm';
import { authPageWrapper } from '../components';
import { AuthState } from '../Api';
import { AuthStateMapper, useAuth } from '../hooks';
import { SignUpStage } from '../Api/SignUp/interfaces';
import { SignUpSuccess } from './SignUpSuccess';

const stateMapper: AuthStateMapper<Pick<AuthState, 'routes' | 'onRedirectTo' | 'signUpState'>> = ({
  routes,
  onRedirectTo,
  signUpState,
}: AuthState) => ({ onRedirectTo, routes, signUpState });

export const SignUp: FC = () => {
  const { routes, onRedirectTo, signUpState } = useAuth(stateMapper);

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
      return <SignUpForm />;
  }
};

export const SignUpPageComponent = authPageWrapper(SignUp);
