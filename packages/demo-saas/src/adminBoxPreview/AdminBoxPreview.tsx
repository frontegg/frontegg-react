import React, { FC } from 'react';
import { AdminBoxIframeRenderer } from './AdminBoxIframe';
import { AdminBoxPreviewContextProvider } from './AdminBoxPreviewContext';
const AdminBoxPreview: FC = () => {
  return (
    <AdminBoxPreviewContextProvider>
      <AdminBoxIframeRenderer />
    </AdminBoxPreviewContextProvider>
  );
};

export default AdminBoxPreview;
