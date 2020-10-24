import React, { FC, useEffect, useMemo } from 'react';
import { useT, FFormik, FButton, ErrorMessage } from '@frontegg/react-core';
import { useAuthSSOActions, useAuthSSOState } from '../hooks';

const { useFormikContext } = FFormik;

export const SSOClaimDomainProceedStep: FC = (props) => {
  const { t } = useT();
  const { samlConfiguration, saving, error } = useAuthSSOState(({ samlConfiguration, saving, error }) => ({
    samlConfiguration,
    saving,
    error,
  }));
  const { setSSOState } = useAuthSSOActions();
  const { values } = useFormikContext<{ domain: string }>();

  useEffect(() => {
    setSSOState({ error: null });
  }, [values.domain]);

  if ((samlConfiguration && values.domain === samlConfiguration?.domain) || !samlConfiguration) {
    return null;
  }
  const children = props.children ?? (
    <>
      <div className='fe-flex-spacer' />
      <ErrorMessage error={error} />
      <FButton className='fe-self-flex-end' variant='primary' loading={saving} fullWidth={false} type='submit'>
        {t('common.proceed')}
      </FButton>
    </>
  );
  return <>{children}</>;
};
