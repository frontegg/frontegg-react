import { createContext } from 'react';

const defaultContext = {
    expanded: false,
    toggleExpanded: () => { }
}

export const FeAccordionContext = createContext(defaultContext);