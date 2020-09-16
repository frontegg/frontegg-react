import React, { FC } from 'react';
import { useT, FFormik, FButton, Input, ErrorMessage } from '@frontegg/react-core';
import { useAuth } from '../../hooks';

const { useFormikContext } = FFormik;

const prefixT = 'auth.sso.claim-domain.form';
export const SSOClaimDomainValidateStep: FC = (props) => {
  const { t } = useT();
  const { saving, error, samlConfiguration } = useAuth((state) => state.ssoState);
  const { values } = useFormikContext<{ domain: string }>();

  const recordName = `_saml-domain-challenge.${samlConfiguration?.domain}`;
  const recordValue = samlConfiguration?.generatedVerification || '';

  if (!samlConfiguration || values.domain !== samlConfiguration?.domain) {
    return null;
  }
  const children = props.children ?? (
    <>
      <div className='fe-section-title fe-bold fe-mt-1 fe-mb-2'>{t(`${prefixT}.copy-info-to-txt-record`)}</div>
      <Input inForm fullWidth readOnly value={recordName} label={t(`${prefixT}.record-name`)} />
      <Input inForm fullWidth readOnly value={recordValue} label={t(`${prefixT}.record-value`)} />
      <ErrorMessage error={error && t(`${prefixT}.validate-error`)} />
      <div className='fe-flex-spacer' />
      <FButton
        loading={saving}
        formikDisableIfNotDirty={false}
        className='fe-self-flex-end fe-mt-2'
        variant='primary'
        fullWidth={false}
        type='submit'
      >
        {t('common.validate')}
      </FButton>
    </>
  );
  return <>{children}</>;
};
