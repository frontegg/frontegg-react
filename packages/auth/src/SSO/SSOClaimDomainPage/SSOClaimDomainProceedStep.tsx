import React, { FC, useEffect, useMemo } from 'react';
import { useT, FFormik, FButton, ErrorMessage } from '@frontegg/react-core';
import { useAuth } from '../../hooks';

const { useFormikContext } = FFormik;

const prefixT = 'auth.sso.claim-domain.form';
export const SSOClaimDomainProceedStep: FC = (props) => {
  const { t } = useT();
  const { saving, error, samlConfiguration, setSSOState } = useAuth((state) => state.ssoState);
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
