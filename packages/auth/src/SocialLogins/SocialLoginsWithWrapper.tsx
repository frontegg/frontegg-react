import React, { FC } from 'react';
import { SocialLogins, SocialLoginsProps } from './SocialLogins';
import { SocialLoginsActions } from './types';

export const SocialLoginsWithWrapper: FC<SocialLoginsProps> = (props) => {
  return (
    <>
      <div className={'fe-col fe-center'}>
        <SocialLogins action={props.action} redirectUri={props.redirectUri}>
          <div className={'fe-social-login__or-container'}>
            <span>OR</span>
          </div>
          {props.children || (
            <>
              <SocialLogins.Google />
              <SocialLogins.Github />
            </>
          )}
        </SocialLogins>
      </div>
    </>
  );
};

export type SocialLoginsWithWrapperProps = Omit<SocialLoginsProps, 'action'>;

export const SocialLoginsLoginWithWrapper: FC<SocialLoginsWithWrapperProps> = (props) => {
  return <SocialLoginsWithWrapper action={SocialLoginsActions.Login} redirectUri={props.redirectUri} />;
};

export const SocialLoginsSignUpWithWrapper: FC<SocialLoginsWithWrapperProps> = (props) => {
  return <SocialLoginsWithWrapper action={SocialLoginsActions.SignUp} redirectUri={props.redirectUri} />;
};
