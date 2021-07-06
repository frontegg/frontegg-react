// export store

import { subscriptionsStoreName } from '../constants';
import { actions, initialState, reducer } from './reducer';
import { sagas } from './saga';
import { billingActions } from './Billing';
import { checkoutActions } from './Checkout';
import { stripeActions } from './Stripe';

export * from './interfaces';

const collectedActions = {
  ...actions,
  ...billingActions,
  ...checkoutActions,
  ...stripeActions
}

export {
  sagas as subscriptionSagas,
  reducer as subscriptionReducers,
  collectedActions as subscriptionActions,
  initialState as subscriptionInitialState,
  subscriptionsStoreName as subscriptionStoreName,
};
