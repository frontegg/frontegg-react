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

const links = [
  { route: '/', label: 'Home page' },
  { route: '/entitlements', label: 'Entitlements' },
  { route: '/step-up-high-max-age', label: 'Step up high max age' },
  { route: '/step-up-small-max-age', label: 'Step up small max age' },
  { route: '/step-up-no-max-age', label: 'Step up no nax age' },
  { route: '/step-up-modals', label: 'Step up modals' },
  { route: '/step-up-hoc', label: 'Step up HOC' },
  { route: '/step-up-transfer', label: 'Step up transfer' },
  { route: '/unknown-route', label: 'Fallback route' },
  { route: '/test', label: 'Old test' },
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
