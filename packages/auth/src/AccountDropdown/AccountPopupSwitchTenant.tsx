import React, { FC } from 'react';
import classNames from 'classnames';
import { Button, Icon, MenuItem, useT } from '@frontegg/react-core';

type AccountPopupSwitchTenantProps = {
  show: boolean;
  onClose: () => void;
};

export const AccountPopupSwitchTenant: FC<AccountPopupSwitchTenantProps> = (props) => {
  const { t } = useT();
  const { show } = props;
  return (
    <div
      className={classNames('fe-account-switch-tenant', {
        ['fe-account-switch-tenant__visible']: show,
      })}
    >
      <div className='fe-account-switch-tenant__header'>
        <Button iconButton size={'small'} onClick={props.onClose}>
          <Icon name='back' />
        </Button>
        <span>{t('common.switchTenant')}</span>
      </div>
      <div className='fe-account-switch-tenant__body'>
        <MenuItem text={'Tenant 1'} />
        <MenuItem text={'Tenant 2'} />
        <MenuItem text={'Tenant 3'} />
      </div>
    </div>
  );
};
