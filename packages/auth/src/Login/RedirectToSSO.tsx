import { Loader, omitProps, RendererFunction, useT } from '@frontegg/react-core';
import React, { FC, ReactElement } from 'react';

export interface RedirectToSSOProps {
  renderer?: RendererFunction<RedirectToSSOProps, RedirectToSSOProps, ReactElement>;
}

export const RedirectToSSO: FC<RedirectToSSOProps> = (props: RedirectToSSOProps) => {
  const { t } = useT();

  if (props.renderer) {
    return props.renderer(omitProps(props, ['renderer']));
  }
  return (
    <>
      <div className='fe-center'>{t('auth.login.redirect-to-sso-message')}</div>
      <div className='fe-relative fe-mt-4'>
        <Loader center />
      </div>
    </>
  );
};
