import React, { FC, useCallback } from 'react';
import { ComponentsTypesWithProps, useDynamicComponents } from '@frontegg/react-core';
import { useAuthRoutes, useOnRedirectTo, useSignUpState } from '@frontegg/react-hooks/auth';
import { SignUpStage } from '@frontegg/redux-store/auth';
import { SignUpForm } from './SignUpForm';
import { authPageWrapper } from '../components';
import { SignUpSuccess } from './SignUpSuccess';
import { SocialLoginsSignUpWithWrapper } from '../SocialLogins';

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

export const SignUp: FC<SignUpProps> = (props) => {
  const signUpState = useSignUpState();
  const routes = useAuthRoutes();
  const onRedirectTo = useOnRedirectTo();

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
