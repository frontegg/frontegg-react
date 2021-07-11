import {
  BillingActions,
  BillingState,
  CheckoutActions,
  CheckoutState,
  PlansActions,
  PlansState,
  subscriptionActions,
  subscriptionsStoreName,
} from '@frontegg/redux-store/subscriptions';
import { bindActionCreators } from '@frontegg/redux-store/toolkit';
import { useDispatch, useSelector } from '../FronteggStoreContext';
import { shallowEqual } from 'react-redux';
import { useMemo } from 'react';

export const usePlans = (): PlansState => {
  return useSelector((state: any) => state[subscriptionsStoreName]['plans'], shallowEqual);
};

export const usePlansActions = (): PlansActions => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(subscriptionActions.plans, dispatch), [subscriptionActions.plans]);
};

export const useCheckout = (): CheckoutState => {
  return useSelector((state: any) => state[subscriptionsStoreName]['checkout'], shallowEqual);
};

export const useCheckoutActions = (): CheckoutActions => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(subscriptionActions.checkout, dispatch), [subscriptionActions.checkout]);
};

const useBilling = <T extends keyof BillingState>(billingKey: T): BillingState[T] => {
  return useSelector((state: any) => state[subscriptionsStoreName]['billing'][billingKey], shallowEqual);
};

const useBillingActions = <T extends keyof BillingActions>(billingKey: T): BillingActions[T] => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(subscriptionActions.billing[billingKey], dispatch), [
    subscriptionActions.billing[billingKey],
  ]);
};

export const useBillingInformation = () => useBilling('information');
export const useBillingInformationActions = () => useBillingActions('information');
