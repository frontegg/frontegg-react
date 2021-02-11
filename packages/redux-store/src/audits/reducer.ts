import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { AuditsState, AuditsErrorKeys, LoadAuditsPayload, AuditsFilter } from './interfaces';
import { ActionDispatchMatcher } from '../interfaces';
import { auditsStoreName } from '../constants';

const reducers = {
  setAuditsState: (state: AuditsState, { payload }: PayloadAction<Partial<AuditsState>>) => ({ ...state, ...payload }),
  resetAuditsState: (state: AuditsState) => ({ ...state, ...initialState }),
  setAuditsError: (state: AuditsState, { payload }: PayloadAction<Partial<AuditsErrorKeys>>) => {
    state.error = {
      ...state.error,
      ...payload,
    };
  },
  setAuditsFilters: (state: AuditsState, { payload }: PayloadAction<AuditsFilter[]>) => ({
    ...state,
    filters: payload,
    currentPage: 0,
    offset: 0,
    isLoading: false,
  }),
};

const { name: storeName, actions: sliceActions, reducer } = createSlice({
  name: auditsStoreName,
  initialState,
  reducers,
});

const actions = {
  ...sliceActions,
  initAudits: createAction(`${storeName}/initAuditsData`),
  loadAudits: createAction(`${storeName}/loadAudits`, (payload: LoadAuditsPayload) => ({ payload })),

  exportAuditsCSV: createAction(`${storeName}/exportCSV`),
  exportAuditsPDF: createAction(`${storeName}/exportPDF`),
};

/**
 *  To be used for actions types after dispatch, and should contains
 *  the reducers and actions as standalone function
 */
type DispatchedActions = {
  setAuditsState: (state: Partial<AuditsState>) => void;
  resetAuditsState: () => void;
  setAuditsError: (payload: Partial<AuditsErrorKeys>) => void;
  setAuditsFilters: (payload: AuditsFilter[]) => void;
  initAudits: () => void;
  loadAudits: (payload: LoadAuditsPayload) => void;
  exportAuditsCSV: () => void;
  exportAuditsPDF: () => void;
};

// noinspection JSUnusedLocalSymbols
/**
 *  if you see error in matcher that's mean the DispatchAction does not
 *  contains the same functions in reducers and actions
 */
const Matcher: ActionDispatchMatcher<typeof reducers, typeof actions, DispatchedActions> = {};

export type AuditsActions = DispatchedActions;

export { initialState as auditsState, reducers as auditsReducers, actions as auditsActions, reducer };
