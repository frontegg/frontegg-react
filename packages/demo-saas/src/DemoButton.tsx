import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export const DemoButton = (props: any) => (
  <Box m={1} display='inline-block'>
    <Button variant='contained' size='small' {...props} />
  </Box>
);
