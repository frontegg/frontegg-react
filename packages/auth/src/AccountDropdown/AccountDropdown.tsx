import { Button, Icon, Popup, useT } from '@frontegg/react-core';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useAuth, useAuthRoutes, useAuthUserOrNull, useOnRedirectTo } from '../hooks';
import './style.scss';
import { AccountPopup } from './AccountPopup';
import { AccountPopupSectionProps } from './AccountPopupSection';

type AccountDropdownProps = {
  getSections?: (defaultSections: AccountPopupSectionProps[], closePopup: () => void) => AccountPopupSectionProps[];
};
export const AccountDropdown: FC<AccountDropdownProps> = (props) => {
  const { t } = useT();
  const onRedirectTo = useOnRedirectTo();
  const routes = useAuthRoutes();
  const user = useAuthUserOrNull();
  const [popupOpen, setPopupOpen] = useState<boolean | undefined>(undefined);
  const handleClose = useCallback(() => {
    setPopupOpen(false);
  }, []);

  useEffect(() => {
    setPopupOpen(undefined);
  }, [popupOpen]);

  if (!user) {
    return (
      <Button size='large' variant='primary' onClick={() => onRedirectTo(routes.loginUrl)}>
        {t('login')}
      </Button>
    );
  }

  const trigger = (
    <Button transparent className='fe-account-dropdown' data-test-id='dropDown-btn'>
      <img className='fe-account-dropdown__img' src={user.profilePictureUrl} alt='profilePictureUrl' />
      <span className='fe-account-dropdown__name'>{user.name}</span>
      <Icon className='fe-account-dropdown__trigger' name='down-arrow' />
    </Button>
  );

  return (
    <>
      <Popup
        data-test-id='popUp-btn'
        className={'fe-account-popup__container'}
        action='click'
        open={popupOpen}
        position={{ vertical: 'bottom', horizontal: 'right' }}
        trigger={trigger}
        content={<AccountPopup closePopup={handleClose} getSections={props.getSections} />}
      />
    </>
  );
};
