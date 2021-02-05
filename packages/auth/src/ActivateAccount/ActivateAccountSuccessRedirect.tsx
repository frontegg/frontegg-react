import React, { FC, useEffect } from 'react';
import { useT, RendererFunctionFC, omitProps, Loader } from '@frontegg/react-core';
import { useAuthActions, useAuthRoutes, useOnRedirectTo } from '../hooks';

export interface ActivateAccountSuccessRedirectProps {
  renderer?: RendererFunctionFC<ActivateAccountSuccessRedirectProps>;
}

export const ActivateAccountSuccessRedirect: FC<ActivateAccountSuccessRedirectProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();
  const onRedirectTo = useOnRedirectTo();
  const routes = useAuthRoutes();
  const { requestAuthorize, resetActivateState } = useAuthActions();

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }
  useEffect(() => {
    setTimeout(() => {
      requestAuthorize(true);
      onRedirectTo(routes.authenticatedUrl);
    }, 1000);
    return resetActivateState as () => void;
  }, [resetActivateState, requestAuthorize, onRedirectTo]);

  return (
    <>
      <div className='fe-center fe-success-message'>{t('auth.activate-account.activation-succeeded')}</div>
      <div className='fe-relative fe-mt-4'>
        <Loader center />
      </div>
    </>
  );
};
