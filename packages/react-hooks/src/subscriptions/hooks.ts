import { subscriptionActions, SubscriptionsActions, SubscriptionsState } from '@frontegg/redux-store/subscriptions';
import { bindActionCreators } from '@frontegg/redux-store/toolkit';
import { useDispatch, useSelector } from '../FronteggStoreContext';
import { shallowEqual } from 'react-redux';
import { useMemo } from 'react';

export const useSubscriptionState = (): SubscriptionsState => {
  return useSelector((state: SubscriptionsState) => state, shallowEqual);
};

export const useSubscriptionActions = (): SubscriptionsActions => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(subscriptionActions, dispatch), [subscriptionActions]);
};
