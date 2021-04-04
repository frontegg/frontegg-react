import React, { FC } from 'react';
import { Button, Grid, omitProps, RendererFunctionFC, useT } from '@frontegg/react-core';
import { useActivateAccountActions, useAuthRoutes, useOnRedirectTo } from '@frontegg/react-hooks/auth';
import { ActivateAccountStep } from '@frontegg/redux-store';

export interface ActivateAccountFailedRedirectProps {
  renderer?: RendererFunctionFC<ActivateAccountFailedRedirectProps>;
}

export const ActivateAccountFailedRedirect: FC<ActivateAccountFailedRedirectProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();
  const routes = useAuthRoutes();
  const onRedirectTo = useOnRedirectTo();
  const { resetActivateState, setActivateState } = useActivateAccountActions();

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
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          <Button
            data-test-id='activate-btn'
            fullWidth
            onClick={() => {
              setActivateState({ step: ActivateAccountStep.resend });
            }}
          >
            {t('auth.activate-account.ask-for-new-activation-link')}
          </Button>
        </Grid>
        <Grid item xs={12} sm={12}>
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
        </Grid>
      </Grid>
    </>
  );
};
