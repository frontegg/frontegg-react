import React, { FC } from 'react';
import { Consumer } from './context';
import { useLocation, useHistory, useRouteMatch, useParams, Link } from 'react-router-dom';

export const LoginComponent: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const routeMatch = useRouteMatch();
  const params = useParams();

  return (
    <div className='fe-login-page'>
      <span style={{ color: 'blue' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React</span> Login Component{' '}
      <Link to={'/team'}>Go To Team (from React)</Link>
    </div>
  );
};
