import React, { FC, useEffect } from 'react';
import { useT, RendererFunctionFC, omitProps, Loader } from '@frontegg/react-core';
import { useAuth } from '../hooks';

export interface ActivateAccountSuccessRedirectProps {
  renderer?: RendererFunctionFC<ActivateAccountSuccessRedirectProps>
}

export const ActivateAccountSuccessRedirect: FC<ActivateAccountSuccessRedirectProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();
  const { routes: { loginUrl }, onRedirectTo, resetActivateState } = useAuth(({ routes, onRedirectTo }) => ({ routes, onRedirectTo }));

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }
  useEffect(() => {
    setTimeout(() => {
      resetActivateState();
      onRedirectTo(loginUrl);
    }, 1000);
  }, []);
  return <>
    <div className='fe-center fe-success-message'>
      {t('auth.activate-account.activation-succeeded')}
    </div>
    <Loader center/>
  </>;
};
