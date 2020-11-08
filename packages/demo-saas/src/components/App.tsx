import React, { FC } from 'react';
import { AppHeader } from './AppHeader/AppHeader';
import { AppSidebar } from './AppSidebar/AppSidebar';
import { AppContent } from './AppContent/AppContent';

export const App = () => {
  return (
    <div className='app-container'>
      <AppHeader />
      <AppSidebar />
      <AppContent />
    </div>
  );
};
