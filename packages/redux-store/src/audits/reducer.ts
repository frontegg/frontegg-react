import { auditsStoreName } from '../constants';
import { initialState } from './initialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuditsState } from './interfaces';
import { AuditLogsActions, auditLogsActions, auditLogsReducers } from './AuditLogsState';
import { AuditsMetadataActions, auditsMetadataActions, auditsMetadataReducers } from './AuditsMetadataState';

const { reducer, actions: sliceActions } = createSlice({
  name: auditsStoreName,
  initialState,
  reducers: {
    resetState: (state: AuditsState) => ({ ...state, ...initialState }),
    setState: (state: AuditsState, { payload }: PayloadAction<Partial<AuditsState>>) => ({ ...state, ...payload }),
    ...auditLogsReducers,
    ...auditsMetadataReducers,
  },
});

const actions = {
  ...sliceActions,
  ...auditLogsActions,
  ...auditsMetadataActions,
};

export type RootActions = {
  setState: (state: Partial<AuditsState>) => void;
  resetState: () => void;
};

export type AuditsActions = RootActions & AuditLogsActions & AuditsMetadataActions;

export { reducer, actions };
