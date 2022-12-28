import React from 'react';
import { AdminPortal } from '@frontegg/react';

function App() {
  const openAdminBox = () => AdminPortal.show();
  return (
    <div>
      <h1>Frontegg - React</h1>
      <button onClick={openAdminBox}>Open admin box</button>
    </div>
  );
}

export default App;
