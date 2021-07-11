import { createModuleCaseReducers } from '../../utils';
import { createAction, createSlice } from '@reduxjs/toolkit';
import { subscriptionsStoreName } from '../../../constants';
import { InvoicesState } from './interfaces';

const initialInvoices: InvoicesState = {
  loading: false,
  error: null,
};

const reducers = {
  ...createModuleCaseReducers<InvoicesState>(),
};

const { reducer, actions: invoicesActions } = createSlice({
  name: 'invoices',
  initialState: initialInvoices,
  reducers,
});

const actions = {
  loadInvoices: createAction(`${subscriptionsStoreName}/billing/invoices/loadInvoices`),
  ...invoicesActions,
};

export { reducer as invoicesReducer, actions as invoicesActions };
