import React, { FC } from 'react';
import { useT, RendererFunctionFC, Button, omitProps } from '@frontegg/react-core';
import { useAuthRoutes, useOnRedirectTo, useActivateAccountActions } from '@frontegg/react-hooks/auth';

export interface ActivateAccountFailedRedirectProps {
  renderer?: RendererFunctionFC<ActivateAccountFailedRedirectProps>;
}

export const ActivateAccountFailedRedirect: FC<ActivateAccountFailedRedirectProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();
  const routes = useAuthRoutes();
  const onRedirectTo = useOnRedirectTo();
  const { resetActivateState } = useActivateAccountActions();

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }
  return (
    <>
      <div className='fe-center fe-error-message'>
        {t('auth.activate-account.failed-title')}
        <br />
        {t('auth.activate-account.failed-description')}
      </div>
      <Button
        data-test-id='activate-btn'
        fullWidth
        onClick={() => {
          resetActivateState();
          onRedirectTo(routes.loginUrl);
        }}
      >
        {t('auth.activate-account.back-to-login')}
      </Button>
    </>
  );
};
