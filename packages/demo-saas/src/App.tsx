import React from 'react';
import { useAuth, useLoginWithRedirect, ContextHolder, AdminPortal } from '@frontegg/react';
import { AppHeader } from './components/AppHeader';
import { AppSidebar } from './components/AppSidebar';
import { AppContent } from './components/AppContent';

import './App.css';

export const App = () => {
  const { user, isAuthenticated } = useAuth();
  // const tmp = useAuthActions();
  // tmp.addUsersBulk()
  const loginWithRedirect = useLoginWithRedirect();

  // Uncomment this to redirect to login automatically
  // useEffect(() => {
  //   if (!isAuthenticated) {
  // loginWithRedirect();
  //   }
  // }, [isAuthenticated, loginWithRedirect]);

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  const handleClick = () => {
    AdminPortal.show();
  };

  return (
    <div className='App'>
      {isAuthenticated ? (
        <div>
          <div>
            <button onClick={handleClick}>Settings</button>
          </div>
          <div>
            <img src={user?.profilePictureUrl || ''} alt={user?.name} />
          </div>
          <div>
            <span>Logged in as: {user?.name}</span>
          </div>
          <div>
            <button onClick={() => alert(user?.accessToken)}>What is my access token?</button>
          </div>
          <div>
            <button onClick={() => logout()}>Click to logout</button>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => loginWithRedirect()}>Click me to login</button>
        </div>
      )}

      <div className='app-container'>
        <AppHeader />
        <AppSidebar />
        <AppContent />
      </div>
    </div>
  );
};
