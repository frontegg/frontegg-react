import React, { FC } from 'react';
import { SocialLogins, SocialLoginsProps } from './SocialLogins';
import { ISocialLoginCallbackState, SocialLoginsActions } from './types';

export const SocialLoginsWithWrapper: FC<SocialLoginsProps> = (props) => {
  return (
    <>
      <div className={'fe-col fe-center'}>
        <SocialLogins action={props.action} state={props.state} isValid={props.isValid}>
          <div className={'fe-social-login__or-container'}>
            <span>OR</span>
          </div>
          {props.children || (
            <>
              <SocialLogins.Google />
              <SocialLogins.Github />
              <SocialLogins.Microsoft />
              <SocialLogins.Facebook />
            </>
          )}
        </SocialLogins>
      </div>
    </>
  );
};

export interface SocialLoginActionWrapperProps {
  state?: Partial<ISocialLoginCallbackState>;
  isValid?: () => boolean;
}

export const SocialLoginsLoginWithWrapper: FC<SocialLoginActionWrapperProps> = ({ state }) => {
  return <SocialLoginsWithWrapper action={SocialLoginsActions.Login} state={state} />;
};

export const SocialLoginsSignUpWithWrapper: FC<SocialLoginActionWrapperProps> = ({ state, isValid }) => {
  return <SocialLoginsWithWrapper action={SocialLoginsActions.SignUp} state={state} isValid={isValid} />;
};
