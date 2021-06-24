import { CheckoutState } from './interfaces';
import { createAction, SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit';
import { subscriptionsStoreName } from '../../constants';
import { SubscriptionsState } from '../interfaces';

export const checkoutInitialState: CheckoutState = {
};

export const checkoutReducer: ValidateSliceCaseReducers<SubscriptionsState, SliceCaseReducers<SubscriptionsState>> = {
};


export const checkoutActions = {
  preCheckout: createAction(`${subscriptionsStoreName}/preCheckout`, (payload: boolean = false) => ({ payload }))
}
