import React from 'react';
import Box from '@mui/material/Box';
import { Entitlement } from '@frontegg/types';

const EntitlementBase = ({
  keyName,
  isEntitled,
  justification,
}: {
  keyName: string;
  isEntitled: Entitlement['isEntitled'];
  justification?: Entitlement['justification'];
}) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      className={`entitlement-item ${isEntitled ? 'entitlement-item-entitled' : 'entitlement-item-not-entitled'}`}
    >
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        dangerouslySetInnerHTML={{ __html: `<div>${keyName}</div>` }}
      ></Box>

      {justification && <i>{justification}</i>}
    </Box>
  );
};

export default EntitlementBase;
