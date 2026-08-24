import React, { FC } from 'react';
import classNames from 'classnames';
import { Button, Icon, Loader, MenuItem, Tag, useT } from '@frontegg/react-core';
import { useAuthUser, useTenantsActions, useTenantsState } from '@frontegg/react-hooks/auth';

type AccountPopupSwitchTenantProps = {
  show: boolean;
  onClose: () => void;
};

type TenantInfo = {
  id: string;
  name: string;
  tenantId: string;
};
export const AccountPopupSwitchTenant: FC<AccountPopupSwitchTenantProps> = (props) => {
  const user = useAuthUser();
  const { tenants: tenantsFromState, loading } = useTenantsState();
  const { switchTenant } = useTenantsActions();
  const { t } = useT();
  const { show } = props;
  const tenants: TenantInfo[] =
    tenantsFromState.length > 0
      ? tenantsFromState
      : (user?.tenantIds ?? []).map((tenantId: string) => ({ id: tenantId, tenantId, name: tenantId }));
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
        {loading && <Loader center={true} />}
        {!loading &&
          tenants.map((tenant) => (
            <MenuItem
              data-test-id={`switch-to-tenant-${tenant.tenantId}`}
              key={tenant.tenantId}
              text={
                <>
                  {tenant.name}
                  {tenant.tenantId === user?.tenantId && (
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
