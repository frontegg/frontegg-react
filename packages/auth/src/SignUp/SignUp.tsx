import React, { FC, useCallback } from 'react';
import { SignUpForm } from './SignUpForm';
import { authPageWrapper } from '../components';
import { AuthState } from '../Api';
import { AuthStateMapper, useAuth } from '../hooks';
import { SignUpStage } from '../Api/SignUp/interfaces';
import { SignUpSuccess } from './SignUpSuccess';
import { SocialLoginsSignUpWithWrapper } from '../SocialLogins';
import { ComponentsTypesWithProps, useDynamicComponents } from '@frontegg/react-core';

interface Components {
  SignUpForm: {};
  SocialLogins: {};
}

export interface SignUpCheckbox {
  required: boolean;
  content: () => JSX.Element;
}

export interface SignUpProps {
  components?: ComponentsTypesWithProps<Components>;
  withCompanyName?: boolean;
  signUpConsent?: SignUpCheckbox;
  marketingMaterialConsent?: SignUpCheckbox;
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
          <Dynamic.SignUpForm
            withCompanyName={props.withCompanyName}
            signUpConsent={props.signUpConsent}
            marketingMaterialConsent={props.marketingMaterialConsent}
          />
          <Dynamic.SocialLogins />
        </>
      );
  }
};

export const SignUpPageComponent = authPageWrapper(SignUp);
