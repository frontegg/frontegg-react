import React, { FC } from 'react';
import { useT, RendererFunctionFC, omitProps, Loader } from '@frontegg/react-core';

export interface PendingProps {
  renderer?: RendererFunctionFC<PendingProps>;
}

export const Pending: FC<PendingProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }
  return (
    <>
      <div className='fe-center fe-success-message'>{t('auth.account.pending-title')}</div>
      <div className='fe-relative fe-mt-4'>
        <Loader center />
      </div>
    </>
  );
};
