import React, { FC, ReactNode } from 'react';

import Box from '@mui/material/Box';

export const ChildrenRenderer: FC<{ children: ReactNode; wrapperStyles?: any }> = ({ wrapperStyles, children }) => (
  <Box display='flex' alignItems='center' justifyContent='center' mt={2}>
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      border='2px dotted #1665c0'
      p={2}
      ml={4}
      mr={4}
      {...wrapperStyles}
    >
      {children}
    </Box>
  </Box>
);
