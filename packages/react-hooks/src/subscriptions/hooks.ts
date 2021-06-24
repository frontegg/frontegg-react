import { SubscriptionActions, subscriptionActions, SubscriptionState } from '@frontegg/redux-store/subscriptions';
import { bindActionCreators } from '@frontegg/redux-store/toolkit';
import { useDispatch, useSelector } from '../FronteggStoreContext';
import { shallowEqual } from 'react-redux';
import { useMemo } from 'react';

export const useSubscriptionState = (): SubscriptionState => {
  return useSelector((state: SubscriptionState) => state, shallowEqual);
};

export const useSubscriptionActions = (): SubscriptionActions => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(subscriptionActions, dispatch), [subscriptionActions]);
};
