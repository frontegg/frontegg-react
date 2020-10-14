import React, { FC } from 'react';
import { useT, RendererFunctionFC, Button, omitProps } from '@frontegg/react-core';

export interface FailedProps {
  renderer?: RendererFunctionFC<FailedProps>;
}

export const Failed: FC<FailedProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }
  return (
    <>
      <div className='fe-center fe-error-message'>
        {t('auth.account.failed-title')}
        <br />
        {t('auth.account.failed-description')}
      </div>
    </>
  );
};
