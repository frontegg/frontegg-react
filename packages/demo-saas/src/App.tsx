import React, { FC } from 'react';
import { AppHeader } from './components/AppHeader';
import { AppSidebar } from './components/AppSidebar';
import { AppContent } from './components/AppContent';

export const App = () => {
  console.log('App');
  return (
    <div className='app-container'>
      <AppHeader />
      <AppSidebar />
      <AppContent />
    </div>
  );
};
