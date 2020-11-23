import React, { FC } from 'react';
import { SocialLogins, SocialLoginsProps } from './SocialLogins';
import { SocialLoginsActions } from './types';

const SocialLoginsWithWrapper: FC<Omit<SocialLoginsProps, 'children'>> = (props) => {
  return (
    <>
      <div className={'fe-col fe-center'}>
        <SocialLogins action={props.action}>
          <div className={'fe-social-login__or-container'}>
            <span>OR</span>
          </div>
          <SocialLogins.Google />
          <SocialLogins.Github />
        </SocialLogins>
      </div>
    </>
  );
};

export const SocialLoginsLoginWithWrapper: FC = () => {
  return <SocialLoginsWithWrapper action={SocialLoginsActions.Login} />;
};
