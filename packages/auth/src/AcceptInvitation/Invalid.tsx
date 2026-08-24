import React, { FC } from 'react';
import { useT, RendererFunctionFC, omitProps } from '@frontegg/react-core';

export interface InvalidProps {
  renderer?: RendererFunctionFC<InvalidProps>;
}

export const Invalid: FC<InvalidProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }
  return (
    <div className='fe-center fe-error-message'>
      {t('auth.account.invalid-title')}
      <br />
      {t('auth.account.invalid-description')}
    </div>
  );
};
