import { CheckoutState } from './interfaces';
import { SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit';
import { SubscriptionsState } from '../interfaces';

export const checkoutInitialState: CheckoutState = {};

export const checkoutReducer: ValidateSliceCaseReducers<SubscriptionsState, SliceCaseReducers<SubscriptionsState>> = {
};


export const checkoutActions = {
}
