import React from 'react';
import { useStepUp, useIsSteppedUp } from '@frontegg/react-hooks';

import { StepUpButton } from './Buttons';
import { MaxAge } from './MaxAge';
import { SteppedUpMessage } from './SteppedUpMessage';

export const StepUpSimpleButtonScenario = ({ maxAge }: { maxAge?: number }) => {
  const maxAgeOptions = maxAge ? { maxAge } : undefined;
  const stepUp = useStepUp();
  const isSteppedUp = useIsSteppedUp(maxAgeOptions);

  return (
    <>
      <MaxAge maxAge={maxAge} />

      {isSteppedUp ? (
        <SteppedUpMessage />
      ) : (
        <StepUpButton
          data-test-id='step-up'
          onClick={() => {
            stepUp(maxAgeOptions);
          }}
        >
          Step me Up
        </StepUpButton>
      )}
    </>
  );
};
