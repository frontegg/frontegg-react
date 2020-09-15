import React, { FC } from 'react';
import { FInput, useT } from '@frontegg/react-core';
import { useAuth } from '../../hooks';

export const MFADisableDialogForm: FC = (props) => {
  const { t } = useT();
  const { loading } = useAuth((state) => state.mfaState);

  const children = props.children ?? (
    <>
      <FInput
        name='token'
        label={t('auth.mfa.disable.enter-generated-code')}
        disabled={loading}
        placeholder='Ex. 1 2 3 4 5 6'
      />
    </>
  );

  return <>{children}</>;
};
