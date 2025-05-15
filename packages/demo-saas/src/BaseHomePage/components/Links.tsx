import React from 'react';

import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const linkStyle = {
  padding: '4px 10px',
  fontSize: '15px',
  textDecoration: 'none',
  background: '#1976d2',
  color: 'white',
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  border: '1px solid #1976d2',
  borderRadius: '4px',
};

export const ROUTE_PATHS = {
  HOME_PAGE: '/',
  ENTITLEMENTS: '/entitlements',
  STEP_UP_HIGH_MAX_AGE: '/step-up-high-max-age',
  STEP_UP_SMALL_MAX_AGE: '/step-up-small-max-age',
  STEP_UP_NO_MAX_AGE: '/step-up-no-max-age',
  STEP_UP_MODALS: '/step-up-modals',
  STEP_UP_HOC: '/step-up-hoc',
  STEP_UP_TRANSFER: '/step-up-transfer',
  UNKNOWN_ROUTE: '/unknown-route',
  TEST: '/test',
  CMC: '/cmc',
};

const links = [
  { route: ROUTE_PATHS.HOME_PAGE, label: 'Home page' },
  { route: ROUTE_PATHS.ENTITLEMENTS, label: 'Entitlements' },
  { route: ROUTE_PATHS.STEP_UP_HIGH_MAX_AGE, label: 'Step up high max age' },
  { route: ROUTE_PATHS.STEP_UP_SMALL_MAX_AGE, label: 'Step up small max age' },
  { route: ROUTE_PATHS.STEP_UP_NO_MAX_AGE, label: 'Step up no nax age' },
  { route: ROUTE_PATHS.STEP_UP_MODALS, label: 'Step up modals' },
  { route: ROUTE_PATHS.STEP_UP_HOC, label: 'Step up HOC' },
  { route: ROUTE_PATHS.STEP_UP_TRANSFER, label: 'Step up transfer' },
  { route: ROUTE_PATHS.UNKNOWN_ROUTE, label: 'Fallback route' },
  { route: ROUTE_PATHS.TEST, label: 'Old test' },
  { route: ROUTE_PATHS.CMC, label: 'CMC' },
];

export const Links = () => (
  <Box mb={2} display='flex' flexWrap='wrap' justifyContent='center'>
    <Box mt={1}>Pages:</Box>
    {links.map(({ route, label }, index) => (
      <Box ml={1} mr={1} mt={1} key={index}>
        <Link to={route} style={linkStyle}>
          {label}
        </Link>
      </Box>
    ))}
  </Box>
);
