import React, { ReactNode, useEffect, useRef } from 'react';

import { useStepUp, useIsSteppedUp, useIsAuthenticated } from '@frontegg/react-hooks';

export interface SteppedUpProps {
  maxAge?: number;
  render?: (isSteppedUp: boolean) => React.ReactNode | null;
  children?: ReactNode;
}

/**
 * Stepped up content component that shows the wrapped content only when the user is stepped up
 * The component triggers the step up flow if the user is not stepped up
 * @param props.maxAge maximum time in second that the login is valid
 * @param props.render render function to be called when user is stepped up
 * @param props.children to be shown when user is stepped up (only if render not provided)
 */
export const SteppedUpContent: React.FC<SteppedUpProps> = (props) => {
  const isAuthenticated = useIsAuthenticated();
  if (!isAuthenticated) return null;

  return <SteppedUpContentInternal {...props} />;
};

const SteppedUpContentInternal: React.FC<SteppedUpProps> = ({ maxAge, render, children }) => {
  const isSteppedUp = useIsSteppedUp({ maxAge });
  const stepUp = useStepUp();
  const isStepUpCalled = useRef(false);

  useEffect(() => {
    if (isSteppedUp) {
      isStepUpCalled.current = false;
      return;
    }

    if (isStepUpCalled.current) return;

    stepUp({ maxAge });
    isStepUpCalled.current = true;
  }, [isSteppedUp, maxAge, stepUp]);

  if (typeof render === 'function') {
    return <>{render(isSteppedUp)}</>;
  }

  return isSteppedUp ? <>{children}</> : null;
};
