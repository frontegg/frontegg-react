import React, { FC, useEffect } from 'react';
import { useT, RendererFunctionFC, omitProps } from '@frontegg/react-core';
import { useAuth, useAuthRoutes, useOnRedirectTo } from '../hooks';
import { useActivateAccountActions } from '../ActivateAccount';

export interface SuccessProps {
  renderer?: RendererFunctionFC<SuccessProps>;
}

export const Success: FC<SuccessProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();
  const onRedirectTo = useOnRedirectTo();
  const { loginUrl } = useAuthRoutes();
  const { resetActivateState } = useActivateAccountActions();

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }
  useEffect(() => {
    setTimeout(() => {
      resetActivateState();
      onRedirectTo(loginUrl);
    }, 1000);
  }, []);
  return (
    <>
      <div className='fe-center fe-success-message'>{t('auth.account.success-title')}</div>
    </>
  );
};
