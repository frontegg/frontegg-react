import React, { FC } from 'react';
import classNames from 'classnames';
import { Button, Icon, Loader, MenuItem, Tag, useT } from '@frontegg/react-core';
import { useAuth } from '../hooks';

type AccountPopupSwitchTenantProps = {
  show: boolean;
  onClose: () => void;
};

export const AccountPopupSwitchTenant: FC<AccountPopupSwitchTenantProps> = (props) => {
  const { tenantsLoading, user, tenants: tenantsFromState, switchTenant } = useAuth(({ loginState, user }) => ({
    ...loginState,
    user,
  }));
  const { t } = useT();
  const { show } = props;
  const tenants =
    tenantsFromState.length > 0
      ? tenantsFromState
      : (user?.tenantIds ?? []).map((tenantId) => ({ id: tenantId, tenantId, name: tenantId }));
  return (
    <div
      className={classNames('fe-account-switch-tenant', {
        ['fe-account-switch-tenant__visible']: show,
      })}
    >
      <div className='fe-account-switch-tenant__header'>
        <Button iconButton size={'small'} onClick={props.onClose} data-test-id='close-btn'>
          <Icon name='back' />
        </Button>
        <span>{t('common.switchTenant')}</span>
      </div>
      <div className='fe-account-switch-tenant__body'>
        {tenantsLoading && <Loader center={true} />}
        {!tenantsLoading &&
          tenants.map((tenant) => (
            <MenuItem
              key={tenant.id}
              text={
                <>
                  {tenant.name}
                  {tenant.id === user?.tenantId && (
                    <Tag size={'small'} variant={'primary'} className='fe-active-tenant-tag'>
                      Active
                    </Tag>
                  )}
                </>
              }
              onClick={() => switchTenant({ tenantId: tenant.tenantId })}
            />
          ))}
      </div>
    </div>
  );
};
