import React, { FC, ReactElement } from 'react';
import { useT, RendererFunction, omitProps } from '@frontegg/react-core';

export interface SSOOverviewEnablePlaceholderProps {
  renderer?: RendererFunction<SSOOverviewEnablePlaceholderProps, SSOOverviewEnablePlaceholderProps, ReactElement>
}

export const SSOOverviewEnablePlaceholder: FC<SSOOverviewEnablePlaceholderProps> = (props) => {
  if (props.renderer) {
    return props.renderer(omitProps(props, ['renderer']));
  }
  const { t } = useT();
  return <div className='fe-placeholder-box'>
    <div className='fe-placeholder-box__inner'>
      <span>{t('auth.sso.enable-sso-message')}</span>
    </div>
  </div>;
};
