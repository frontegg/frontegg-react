import React, { FC, createContext, forwardRef, useState } from 'react';
import { AdminPortalRenderer } from '@frontegg/js';

export interface BuilderContextData {
  renderer: AdminPortalRenderer | null;
  setRenderer: (renderer: AdminPortalRenderer | null) => void;
}

const AdminBoxPreviewContext = createContext<BuilderContextData>({
  renderer: null,
  setRenderer: () => ({}),
});

export const AdminBoxPreviewContextProvider: FC<{ children: any }> = ({ children }) => {
  const [renderer, setRenderer] = useState<AdminPortalRenderer | null>(null);

  return (
    <AdminBoxPreviewContext.Provider value={{ renderer, setRenderer }}>{children}</AdminBoxPreviewContext.Provider>
  );
};

export default AdminBoxPreviewContext;
