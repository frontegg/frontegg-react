import React, { useContext } from 'react';

type DialogContextState = {
  onClose?: () => void;
};
export const DialogContext = React.createContext<DialogContextState>({ onClose: () => {} });

export const useDialog = () => useContext(DialogContext);
