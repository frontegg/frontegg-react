import { reducer, actions, initialState } from './reducer';
import { sagas } from './saga';
import { connectivityStoreName as storeName } from '../constants';

// export types
export * from './interfaces';

export * from './ConnectivityState';

export {
  sagas as connectivitySagas,
  reducer as connectivityReducers,
  actions as connectivityActions,
  initialState as connectivityInitialState,
  storeName as connectivityStoreName,
};

// export store
export default {
  sagas,
  storeName,
  initialState,
  reducer,
  actions,
};
