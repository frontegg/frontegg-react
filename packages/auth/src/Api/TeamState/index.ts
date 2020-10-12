import { createAction } from '@reduxjs/toolkit';
import { ILoadUsers } from '@frontegg/react-core';
import { TeamState } from './interfaces';
import { storeName } from '../utils';

export * from './interfaces';

export const teamState: TeamState = {
  loading: true,
  users: [],
};

export const teamStateReducers = {};

export const teamActions = {
  loadUsers: createAction(`${storeName}/loadUsers`, (payload: ILoadUsers) => ({ payload })),
};
