import React, { FC, useState } from 'react';
import { Icon } from '@frontegg/react-core';
import classNames from 'classnames';
import { useAuth, useAuthUserOrNull } from '@frontegg/react-hooks/auth';
import { AccountPopupSection, AccountPopupSectionProps } from './AccountPopupSection';
import { AccountPopupSwitchTenant } from './AccountPopupSwitchTenant';

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
          dataTestId: 'profile-btn',
          onClick: () => {
            onRedirectTo('/profile');
            props.closePopup();
          },
        },
      ],
    },
    {
      items: [
        ...((user?.tenantIds?.length ?? 0) > 1
          ? [
              {
                icon: <Icon name='swap' />,
                title: 'Switch Tenant',
                dataTestId: 'switch-tenant-btn',
                onClick: () => {
                  setShowSwitchTenant(true);
                },
              },
            ]
          : []),
        {
          icon: <Icon name='exit' />,
          title: 'Logout',
          dataTestId: 'logout-btn',
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
