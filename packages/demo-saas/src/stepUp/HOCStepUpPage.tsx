import React, { FC } from 'react';
import { wrapWithBaseHomePage } from '../BaseHomePage/BaseHomePage';
import { MaxAge } from './components/MaxAge';
import { SteppedUpMessage } from './components/SteppedUpMessage';
import { SteppedUpContent } from '@frontegg/react';

const MAX_AGE = 5000;

const HomePage: FC = () => {
  return (
    <>
      <MaxAge maxAge={MAX_AGE} />

      <SteppedUpContent>
        <SteppedUpMessage />
      </SteppedUpContent>
    </>
  );
};

export default wrapWithBaseHomePage(HomePage);
