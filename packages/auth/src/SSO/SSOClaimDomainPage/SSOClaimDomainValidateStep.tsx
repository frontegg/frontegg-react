import React, { FC, useRef, useState } from 'react';
import { useT, FFormik, FButton, Input, ErrorMessage, Icon, ButtonProps, checkRootPath } from '@frontegg/react-core';
import { useAuth } from '../../hooks';

const { useFormikContext } = FFormik;

const prefixT = 'auth.sso.claim-domain.form';
export const SSOClaimDomainValidateStep: FC = (props) => {
  const { t } = useT();
  const rootPath = checkRootPath('SSOSteps should be rendered inside SSO component');
  const { saving, error, samlConfiguration, onRedirectTo } = useAuth((state) => ({
    ...state.ssoState,
    onRedirectTo: state.onRedirectTo,
  }));
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
    if (enterValidateStatus.current === samlConfiguration.validated) {
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
