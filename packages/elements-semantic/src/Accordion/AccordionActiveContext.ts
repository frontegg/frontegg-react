import { createContext } from 'react';

const defaultActiveContext = {
  active: false,
  toggleActive: () => {},
};

export const ActiveContext = createContext(defaultActiveContext);
