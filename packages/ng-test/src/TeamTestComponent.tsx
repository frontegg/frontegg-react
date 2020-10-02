import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

export const TeamTestComponent = () => {
  const routeMatch = useRouteMatch();
  return (
    <div>
      <span style={{ color: 'blue' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React</span> Team Test Component
      Use React-Router hooks: {JSON.stringify(routeMatch)}
    </div>
  );
};
