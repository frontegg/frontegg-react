import React, { FC, useState } from 'react';
import { useAuth, useAuthUserOrNull } from '../hooks';
import { Icon } from '@frontegg/react-core';
import { AccountPopupSection, AccountPopupSectionProps } from './AccountPopupSection';
import { AccountPopupSwitchTenant } from './AccountPopupSwitchTenant';
import classNames from 'classnames';

export type AccountPopupProps = {
  getSections?: (defaultSections: AccountPopupSectionProps[], closePopup: () => void) => AccountPopupSectionProps[];
  closePopup: () => void;
};
export const AccountPopup: FC<AccountPopupProps> = (props) => {
  const [showSwitchTenant, setShowSwitchTenant] = useState(false);
  const user = useAuthUserOrNull();
  const { onRedirectTo, routes } = useAuth(({ routes, onRedirectTo }) => ({ routes, onRedirectTo }));
  if (!user) {
    return null;
  }

  const defaultSections = [
    {
      items: [
        {
          icon: <Icon name='profile' />,
          title: 'Profile',
          onClick: () => {
            onRedirectTo('/profile');
            props.closePopup();
          },
        },
      ],
    },
    {
      items: [
        ...(user.tenantIds.length > 1
          ? [
              {
                icon: <Icon name='swap' />,
                title: 'Switch Tenant',
                onClick: () => {
                  setShowSwitchTenant(true);
                },
              },
            ]
          : []),
        {
          icon: <Icon name='exit' />,
          title: 'Logout',
          onClick: () => {
            onRedirectTo(routes.logoutUrl);
            props.closePopup();
          },
        },
      ],
    },
  ];

  const sections: AccountPopupSectionProps[] =
    props.getSections?.(defaultSections, props.closePopup) ?? defaultSections;

  return (
    <div className={classNames('fe-account-popup', { ['fe-account-popup__switch-tenant-active']: showSwitchTenant })}>
      <div className='fe-account-popup__header'>
        <img src={user?.profilePictureUrl} alt='profilePictureUrl' />
        <div className='fe-account-popup__header-details'>
          {user.name}
          <br />
          <span>{user.email}</span>
        </div>
      </div>
      <div className='fe-account-popup__body'>
        {sections.map((section, index) => (
          <AccountPopupSection key={index} title={section.title} items={section.items} />
        ))}
      </div>

      <AccountPopupSwitchTenant show={showSwitchTenant} onClose={() => setShowSwitchTenant(false)} />
    </div>
  );
};
