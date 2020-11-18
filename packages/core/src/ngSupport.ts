import { useState } from 'react';

export interface ProxyComponent {
  // internal use
  _history?: any;
  _resolvePortals?: (setPortals: any) => void;
  _resolveActions?: (storeName: string, actions: any) => void;
}

export const useProxyComponent = <T extends ProxyComponent>(props: T) => {
  const [rcPortals, setRcPortals] = useState([]);
  props._resolvePortals?.(setRcPortals);
  return rcPortals;
};
