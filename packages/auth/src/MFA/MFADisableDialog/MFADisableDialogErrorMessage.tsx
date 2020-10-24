import React, { FC } from 'react';
import { ErrorMessage } from '@frontegg/react-core';
import { useAuthMfaState } from '../hooks';

export const MFADisableDialogErrorMessage: FC = (props) => {
  const { error } = useAuthMfaState(({ error }) => ({ error }));
  const children = props.children ?? (
    <>
      <ErrorMessage error={error} />
    </>
  );

  return <>{children}</>;
};
