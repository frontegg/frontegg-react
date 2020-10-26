import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './consts';
import { TForms, TFormsData } from './types';

export const { reducer, actions: integrationsActions, name: storeName } = createSlice({
  name: 'integrations',
  initialState,
  reducers: {
    loadDataAction: (state) => ({ ...state, isLoading: true }),
    loadDataSuccess: (state, { payload }) => ({ ...state, isLoading: false }),
    loadFormAction: {
      prepare: (payload: TForms) => ({ payload }),
      reducer: (state) => ({ ...state, forms: { isLoading: true, savedSuccess: false } }),
    },
    loadFormSuccess: (state, { payload }) => ({
      ...state,
      forms: { isLoading: false, savedSuccess: false, data: payload },
    }),
    postFormAction: {
      prepare: (type: TForms, data: TFormsData) => ({ payload: { type, data } }),
      reducer: (state) => state,
    },
    postFormSuccess: (state) => ({ ...state, form: { ...state.forms, savedSuccess: true } }),
    cleanFormsData: (state) => ({ ...state, forms: { isLoading: false, savedSuccess: false } }),
  },
});
