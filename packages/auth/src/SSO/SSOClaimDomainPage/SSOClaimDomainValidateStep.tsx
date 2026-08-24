import React, { FC, useContext, useRef } from 'react';
import { useT, FFormik, FButton, Input, ErrorMessage, Icon, ButtonProps, RootPathContext } from '@frontegg/react-core';
import { useSSOState, useOnRedirectTo } from '@frontegg/react-hooks/auth';

const { useFormikContext } = FFormik;

const prefixT = 'auth.sso.claim-domain.form';
export const SSOClaimDomainValidateStep: FC = (props) => {
  const { t } = useT();
  const rootPath = useContext(RootPathContext);
  const { saving, error, samlConfiguration } = useSSOState(({ saving, error, samlConfiguration }) => ({
    saving,
    error,
    samlConfiguration,
  }));
  const onRedirectTo = useOnRedirectTo();
  const { values } = useFormikContext<{ domain: string }>();

  const enterValidateStatus = useRef<boolean>(samlConfiguration?.validated ?? false);

  const recordName = `_saml-domain-challenge.${samlConfiguration?.domain}`;
  const recordValue = samlConfiguration?.generatedVerification || '';

  if (!samlConfiguration || values.domain !== samlConfiguration?.domain) {
    return null;
  }

  let submitButtonProps: ButtonProps = {
    children: t('common.validate'),
    variant: 'primary',
    type: 'submit',
  };
  if (samlConfiguration.validated) {
    if (!rootPath || enterValidateStatus.current === samlConfiguration.validated) {
      submitButtonProps = {
        children: t('common.validated'),
        disabled: true,
      };
    } else {
      submitButtonProps = {
        children: (
          <>
            {t('auth.sso.go-to-idp')} <Icon className='fe-ml-1' name='right-arrow' />
          </>
        ),
        variant: 'primary',
        onClick: () => {
          onRedirectTo(`${rootPath}/idp`);
        },
      };
    }
  }

  const children = props.children ?? (
    <>
      <div className='fe-section-title fe-bold fe-mt-1 fe-mb-2'>{t(`${prefixT}.copy-info-to-txt-record`)}</div>
      <Input inForm fullWidth readOnly value={recordName} label={t(`${prefixT}.record-name`)} />
      <Input inForm fullWidth readOnly value={recordValue} label={t(`${prefixT}.record-value`)} />
      <ErrorMessage error={error && t(`${prefixT}.validate-error`)} />
      <div className='fe-flex-spacer' />

      <FButton
        data-test-id='submit-btn'
        loading={saving}
        formikDisableIfNotDirty={false}
        className='fe-self-flex-end fe-mt-2'
        fullWidth={false}
        size='large'
        {...submitButtonProps}
      />
    </>
  );
  return <>{children}</>;
};
