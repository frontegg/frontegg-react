// export store

import { subscriptionsStoreName as storeName } from '../constants';
import { actions, initialState, reducer } from './reducer';
import { sagas } from './saga';

export * from './interfaces';

export {
  sagas as subscriptionSagas,
  reducer as subscriptionReducers,
  actions as subscriptionActions,
  initialState as subscriptionInitialState,
  storeName as subscriptionStoreName,
};

// export store
export default {
  sagas,
  reducer,
  actions,
  initialState,
  storeName,
};
