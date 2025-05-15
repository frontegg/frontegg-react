import { InviteUserDialogContextData, UsersTableContextData } from '@frontegg/types';
import React, { useState } from 'react';
import { createProxy } from '@frontegg/redux-store';
import { AppHolder } from '@frontegg/js';
import { useSnapshot } from '@frontegg/react-hooks';

export const useUsersTable = (id?: string): UsersTableContextData => {
  const app = AppHolder.getInstance('default');
  const [store, setStore] = useState<UsersTableContextData>(createProxy({
    onSearch: () => { },
    searchQuery: '',
    searching: false,
  }));

  React.useLayoutEffect(() => {
    app
      .getUsersTableStore({ id })
      .then((store) => {
        setStore(store as UsersTableContextData);
      })
      .catch((err) => {
        console.error('Error getting users table store', err);
      });
  }, []);

  return useSnapshot(store);
};

export const useInviteUserDialog = (id?: string): InviteUserDialogContextData => {
  const app = AppHolder.getInstance('default');
  const [store, setStore] = useState<InviteUserDialogContextData>(
    createProxy<InviteUserDialogContextData>({
      dialogOpen: false,
      openDialog: () => {},
      closeDialog: () => {},
    })
  );

  React.useLayoutEffect(() => {
    app
      .getInviteUserDialogStore({ id })
      .then((store: InviteUserDialogContextData) => {
        setStore(store);
      })
      .catch((err) => {
        console.error('Error getting invite user dialog store', err);
      });
  }, []);

  return useSnapshot(store);
};