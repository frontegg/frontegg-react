import React, { FC, useCallback, useState } from 'react';
import { Button, Dialog, Input, Grid, useT, Icon } from '@frontegg/react-core';
import copy from 'clipboard-copy';
import { prefixCls } from '../constants';
import { useApiTokensActions, useApiTokensState } from '../hooks';

export type copyType = 'secret' | 'clientId';

export const ApiTokensSucceessDialog: FC = () => {
  const { t } = useT();
  const { setApiTokensState } = useApiTokensActions();
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [copiedClientId, setCopiedClientId] = useState(false);
  const { open, secret, clientId } = useApiTokensState(({ successDialog }) => ({ ...successDialog }));

  const copySecret = (type: copyType) => {
    copy(type === 'secret' ? secret ?? '' : clientId ?? '').then(() => displayCopied(type));
  };

  const displayCopied = (type: copyType) => {
    type === 'secret' ? setCopiedSecret(true) : setCopiedClientId(true);
    setTimeout(() => {
      type === 'secret' ? setCopiedSecret(false) : setCopiedClientId(false);
    }, 2000);
  };

  const resetModalState = useCallback(() => {
    setApiTokensState({ successDialog: { open: false, clientId, secret } });
  }, [setApiTokensState]);

  return (
    <Dialog
      className={`${prefixCls}__dialog-success`}
      open={open}
      size={'small'}
      onClose={resetModalState}
      header={t('auth.apiTokens.modal.title')}
    >
      <div className={`${prefixCls}__dialog-description`}>{t('auth.apiTokens.modal.successDescription')}</div>
      <div className={`${prefixCls}__dialog-success-tip`}>
        <Icon name='warning' />
        <span>{t('auth.apiTokens.modal.tip')}</span>
      </div>
      <Input
        data-test-id="clientID-btn"
        className={`${prefixCls}__dialog-success-input`}
        fullWidth
        size='large'
        value={clientId}
        label={t('common.clientId')}
        suffixIcon={
          !copiedClientId ? (
            <Icon className={`${prefixCls}__copy-icon`} name='copy' onClick={() => copySecret('clientId')} data-test-id="copyID-btn"/>
          ) : (
            <Icon name='checkmark' />
          )
        }
      />
      <div className={`${prefixCls}__dialog-spacer`} />
      <Input
        data-test-id="secretKey-btn"
        className={`${prefixCls}__dialog-success-input`}
        fullWidth
        size='large'
        value={secret}
        label={t('common.secretKey')}
        suffixIcon={
          !copiedSecret ? (
            <Icon className={`${prefixCls}__copy-icon`} name='copy' onClick={() => copySecret('secret')} />
          ) : (
            <Icon name='checkmark' />
          )
        }
      />

      <div className='fe-dialog__footer'>
        <Grid container>
          <Grid xs item className='fe-text-align-end'>
            <Button isCancel size='large' fullWidth={false} onClick={resetModalState} data-test-id="close-btn">
              {t('common.close')}
            </Button>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );
};
