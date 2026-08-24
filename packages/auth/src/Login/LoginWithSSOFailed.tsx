import React, { FC } from 'react';
import { omitProps, useT, RendererFunctionFC } from '@frontegg/react-core';

export interface LoginWithSSOFailedProps {
  renderer?: RendererFunctionFC<LoginWithSSOFailedProps>;
}

export const LoginWithSSOFailed: FC<LoginWithSSOFailedProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }

  return (
    <>
      <div className='fe-error-message'>{t('auth.login.login-with-sso-failed')}</div>
    </>
  );
};
