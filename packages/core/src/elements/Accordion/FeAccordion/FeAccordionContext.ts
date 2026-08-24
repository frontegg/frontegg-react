import { createContext } from 'react';

const defaultContext = {
  expanded: false,
  setExpanded: (expanded: boolean) => {},
};

export const FeAccordionContext = createContext(defaultContext);
