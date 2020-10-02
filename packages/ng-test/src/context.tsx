import React from 'react';

export const { Provider, Consumer } = React.createContext<{ counter: number }>({ counter: 0 });
