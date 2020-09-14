import React, { FC } from 'react';
import { ErrorMessage } from '@frontegg/react-core';
import { useAuth } from '../../hooks';

export const MFADisableDialogErrorMessage: FC = (props) => {
  const { error } = useAuth((state) => state.mfaState);
  const children = props.children ?? (
    <>
      <ErrorMessage error={error} />
    </>
  );

  return <>{children}</>;
};
