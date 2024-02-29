import React, { FC } from 'react';
import { ContextHolder } from '@frontegg/rest-api';
import { useAuth } from '@frontegg/react-hooks';

import Box from '@mui/material/Box';
import { EmbeddedBasedHomePage } from './components/EmbeddedHomePage';
import { HostedBasedHomePage } from './components/HostedHomePage';
import { BaseHomePageProps } from './interfaces';
import { NoBaseUrlSection } from './components/NoBaseUrlSection/NoBaseUrlSection';
import { DEFAULT_BASE_URL } from '../consts';

const BaseHomePage: FC<BaseHomePageProps> = (props) => {
  const { hostedLoginBox } = useAuth();
  const { baseUrl } = ContextHolder.getContext();

  if (baseUrl === DEFAULT_BASE_URL) {
    return <NoBaseUrlSection />;
  }

  return (
    <Box display='flex' flexDirection='column' alignItems='center' mt={2} lineHeight='2em'>
      {hostedLoginBox ? <HostedBasedHomePage {...props} /> : <EmbeddedBasedHomePage {...props} />}
    </Box>
  );
};

export default BaseHomePage;

export const wrapWithBaseHomePage = (Component: any, wrapperStyles?: any) => {
  return (props: any) => (
    <BaseHomePage wrapperStyles={wrapperStyles}>
      <Component {...props} />
    </BaseHomePage>
  );
};
