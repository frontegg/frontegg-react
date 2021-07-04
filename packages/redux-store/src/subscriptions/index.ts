// export store

import { subscriptionsStoreName } from '../constants';
import { actions, initialState, reducer } from './reducer';
import { sagas } from './saga';
import { billingActions } from './Billing';
import { checkoutActions } from './Checkout';

export * from './interfaces';

const collectedActions = {
  ...actions,
  ...billingActions,
  ...checkoutActions
}

export {
  sagas as subscriptionSagas,
  reducer as subscriptionReducers,
  collectedActions as subscriptionActions,
  initialState as subscriptionInitialState,
  subscriptionsStoreName as subscriptionStoreName,
};
