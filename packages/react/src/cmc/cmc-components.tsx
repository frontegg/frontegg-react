import { ChangePasswordFormProps, InviteUserDialogProps, ProfilePageProps, SsoGuideDialogProps, UsersTableProps } from '@frontegg/types';
import React, { FC } from 'react';
import { CMCComponent, FronteggCMCComponentProps, RenderableFronteggComponent } from './cmc-base';

export const UsersTable: FC<FronteggCMCComponentProps<UsersTableProps>> = (props) => {
  return <CMCComponent renderComponent='renderUsersTable' {...props} />;
};

export const InviteUserDialog: FC<FronteggCMCComponentProps<InviteUserDialogProps>> = (props) => {
  return <CMCComponent renderComponent='renderInviteUserDialog' {...props} />;
};

export const ChangePasswordForm: FC<FronteggCMCComponentProps<ChangePasswordFormProps>> = (props) => {
  return <CMCComponent renderComponent='renderChangePasswordForm' {...props} />;
};

export const ProfilePage: FC<FronteggCMCComponentProps<ProfilePageProps>> = (props) => {
  return <CMCComponent renderComponent='renderProfilePage' {...props} />;
};

export const SsoGuideDialog: FC<FronteggCMCComponentProps<SsoGuideDialogProps>> = (props) => {
  return <CMCComponent renderComponent='renderSsoGuideDialog' {...props} />;
};