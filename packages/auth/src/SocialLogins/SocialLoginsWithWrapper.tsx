import React, { FC } from 'react';
import { SocialLogins, SocialLoginsProps } from './SocialLogins';
import { SocialLoginsActions } from './types';

export const SocialLoginsWithWrapper: FC<SocialLoginsProps> = (props) => {
  return (
    <>
      <div className={'fe-col fe-center'}>
        <SocialLogins action={props.action}>
          <div className={'fe-social-login__or-container'}>
            <span>OR</span>
          </div>
          {props.children || (
            <>
              <SocialLogins.Google />
              <SocialLogins.Github />
              <SocialLogins.Microsoft />
            </>
          )}
        </SocialLogins>
      </div>
    </>
  );
};

export const SocialLoginsLoginWithWrapper: FC = () => {
  return <SocialLoginsWithWrapper action={SocialLoginsActions.Login} />;
};

export const SocialLoginsSignUpWithWrapper: FC = () => {
  return <SocialLoginsWithWrapper action={SocialLoginsActions.SignUp} />;
};
