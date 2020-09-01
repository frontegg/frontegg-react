import { omitProps, RendererFunction, useT } from '@frontegg/react-core';
import React, { FC, ReactElement } from 'react';
import { Loader } from 'semantic-ui-react';


export interface RedirectToSSOProps {
  renderer?: RendererFunction<RedirectToSSOProps, RedirectToSSOProps, ReactElement>
}

export const RedirectToSSO: FC<RedirectToSSOProps> = (props: RedirectToSSOProps) => {
  if (props.renderer) {
    return props.renderer(omitProps(props, ['renderer', 'components']));
  }
  const { t } = useT();
  return <div className='fe-login-sso-redirect'>
    {t('auth.login.redirect-to-sso-message')}
    <Loader active={true} inline={true}/>
  </div>;
};
