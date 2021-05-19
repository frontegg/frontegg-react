import React, { FC } from 'react';
import { fronteggElements as FE, useT } from '@frontegg/react-core';
import { SocialLoginProviders } from '@frontegg/rest-api';
import { SocialLoginsActions } from './types';
import classNames from 'classnames';

export interface SocialLoginButtonProps {
  name: SocialLoginProviders;
  action: SocialLoginsActions;
  disabled?: boolean;
}

export const SocialLoginButton: FC<SocialLoginButtonProps> = (props) => {
  const { t } = useT();
  const { name, children, action } = props;

  const providerName: string = name.charAt(0).toUpperCase() + name.slice(1);
  const disabled = props.disabled ?? false;

  return (
    <FE.Button
      disabled={disabled}
      className={classNames('fe-social-login__button', {
        [`fe-social-login__button__${name.toLowerCase()}`]: !disabled,
        ['fe-social-login__button__enabled']: !disabled,
      })}
      data-test-id={`${name.toLowerCase()}SocialLogin-btn`}
      fullWidth={true}
    >
      <div className={'fe-row fe-center'}>
        <div>{children}</div>
        <div>{t(`auth.social-logins.${action.toLowerCase()}.button-text`, { providerName })}</div>
      </div>
    </FE.Button>
  );
};
