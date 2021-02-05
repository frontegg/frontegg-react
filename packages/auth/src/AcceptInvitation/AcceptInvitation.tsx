import React, { FC, useEffect } from 'react';
import { ComponentsTypesWithProps, useDynamicComponents } from '@frontegg/react-core';
import { AcceptInvitationStep } from '@frontegg/redux-store/auth';
import { Success, SuccessProps } from './Success';
import { Failed, FailedProps } from './Failed';
import { authPageWrapper } from '../components';
import { InvalidProps, Invalid } from './Invalid';
import { Pending, PendingProps } from './Pending';
import { useAcceptInvitationActions, useAcceptInvitationState } from './hooks';

type Components = {
  Success: SuccessProps;
  Failed: FailedProps;
  Invalid: InvalidProps;
  Pending: PendingProps;
};
const defaultComponents = { Success, Failed, Invalid, Pending };

export interface AcceptInvitationProps {
  components?: ComponentsTypesWithProps<Components>;
}

const AcceptInvitationComponent: FC<AcceptInvitationProps> = (props) => {
  const { acceptInvitation } = useAcceptInvitationActions();
  const { step } = useAcceptInvitationState();
  const Dynamic = useDynamicComponents(defaultComponents, props);

  const url = new URL(window?.location.href);
  const userId = url.searchParams.get('userId') || '';
  const token = url.searchParams.get('token') || '';

  useEffect(() => {
    acceptInvitation({ token, userId });
  }, [token, userId]);

  switch (step) {
    case AcceptInvitationStep.invalid:
      return <Dynamic.Invalid />;
    case AcceptInvitationStep.pending:
      return <Dynamic.Pending />;
    case AcceptInvitationStep.success:
      return <Dynamic.Success />;
    case AcceptInvitationStep.failed:
      return <Dynamic.Failed />;
    default:
      return null;
  }
};

export const AcceptInvitation: FC<AcceptInvitationProps> = (props) => {
  return (
    <div className='fe-accept-invitation-component'>
      <AcceptInvitationComponent {...props} />
    </div>
  );
};

export const AcceptInvitationPage = authPageWrapper(AcceptInvitation);
