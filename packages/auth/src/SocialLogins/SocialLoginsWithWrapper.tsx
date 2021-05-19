import React, { FC } from 'react';
import { SocialLogins, SocialLoginsProps } from './SocialLogins';
import { ISocialLoginCallbackState, SocialLoginsActions } from './types';

export const SocialLoginsWithWrapper: FC<SocialLoginsProps> = (props) => {
  return (
    <>
      <div className={'fe-col fe-center'}>
        <SocialLogins action={props.action} disabled={props.disabled} state={props.state}>
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
  disabled?: boolean;
  state?: Partial<ISocialLoginCallbackState>;
}

export const SocialLoginsLoginWithWrapper: FC<SocialLoginActionWrapperProps> = ({ disabled, state }) => {
  return <SocialLoginsWithWrapper action={SocialLoginsActions.Login} disabled={disabled} state={state} />;
};

export const SocialLoginsSignUpWithWrapper: FC<SocialLoginActionWrapperProps> = ({ disabled, state }) => {
  return <SocialLoginsWithWrapper action={SocialLoginsActions.SignUp} disabled={disabled} state={state} />;
};
