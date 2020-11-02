import { useState } from 'react';

export interface ProxyComponent {
  // internal use
  _history?: any;
  _resolvePortals?: (setPortals: any) => void;
}

export const useProxyComponent = <T extends ProxyComponent>(props: T) => {
  const [rcPortals, setRcPortals] = useState([]);
  props._resolvePortals?.(setRcPortals);
  return rcPortals;
};
