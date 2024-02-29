import React from 'react';
import Box from '@mui/material/Box';

export const User = ({ user }: any) => (
  <Box mt={2}>
    {user?.email ? (
      <>
        Authenticated as <b>{user?.email}</b>
      </>
    ) : (
      'Not Authenticated'
    )}
  </Box>
);
