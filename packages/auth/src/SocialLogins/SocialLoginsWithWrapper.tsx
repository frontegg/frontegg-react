import React, { FC } from 'react';
import { SocialLogins, SocialLoginsProps } from './SocialLogins';

export const SocialLoginsWithWrapper: FC<Omit<SocialLoginsProps, 'children'>> = (props) => {
  return <>
    <div className={'fe-col fe-center'}>

      <SocialLogins action={props.action}>
        <div className={'fe-social-login__or-container'}>
    <span>
      OR
    </span>
        </div>
        <SocialLogins.Google/>
        <SocialLogins.Github/>
      </SocialLogins>
    </div>

  </>;
};
