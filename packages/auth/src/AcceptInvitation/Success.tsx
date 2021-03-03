import React, { FC, useEffect } from 'react';
import { useT, RendererFunctionFC, omitProps } from '@frontegg/react-core';
import { useAuthRoutes, useOnRedirectTo, useAcceptInvitationActions } from '@frontegg/react-hooks/auth';

export interface SuccessProps {
  renderer?: RendererFunctionFC<SuccessProps>;
}

export const Success: FC<SuccessProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();
  const onRedirectTo = useOnRedirectTo();
  const { loginUrl } = useAuthRoutes();
  const { resetAcceptInvitationState } = useAcceptInvitationActions();

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }
  useEffect(() => {
    setTimeout(() => {
      resetAcceptInvitationState();
      onRedirectTo(loginUrl);
    }, 1000);
  }, []);
  return (
    <>
      <div className='fe-center fe-success-message'>{t('auth.account.success-title')}</div>
    </>
  );
};
