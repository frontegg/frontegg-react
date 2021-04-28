import React from 'react';
import { createSelectorHook, createDispatchHook, createStoreHook, ReactReduxContextValue } from 'react-redux';


export const FronteggStoreContext = React.createContext<ReactReduxContextValue>(null as any);

// @ts-ignore
if (process.env.NODE_ENV !== 'production') {
  FronteggStoreContext.displayName = 'FronteggStoreContext';
}

export const useSelector = createSelectorHook(FronteggStoreContext);
export const useDispatch = createDispatchHook(FronteggStoreContext);
export const useStore = createStoreHook(FronteggStoreContext);

export { shallowEqual, connectAdvanced, Provider } from 'react-redux';
export default FronteggStoreContext;
