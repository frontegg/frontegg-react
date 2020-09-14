import React, { FC } from 'react';
import { checkRootPath, PageHeader, PageHeaderProps, useT } from '@frontegg/react-core';
import { HideOption } from '../interfaces';

export const ProfileHeader: FC<PageHeaderProps & HideOption> = (props) => {
  checkRootPath('Profile.Header must be rendered inside a Profile.Page component');
  const { t } = useT();
  if (props.hide) {
    return null;
  }
  return <PageHeader title={t('auth.profile.title')} {...props} />;
};
