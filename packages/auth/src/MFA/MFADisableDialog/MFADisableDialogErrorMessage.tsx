import React, { FC } from 'react';
import { ErrorMessage } from '@frontegg/react-core';
import { useMfaState } from '@frontegg/react-hooks/auth';

export const MFADisableDialogErrorMessage: FC = (props) => {
  const { error } = useMfaState(({ error }) => ({ error }));
  const children = props.children ?? (
    <>
      <ErrorMessage error={error} />
    </>
  );

  return <>{children}</>;
};
