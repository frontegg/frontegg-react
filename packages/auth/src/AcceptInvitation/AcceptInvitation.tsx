import React, { FC } from 'react';
import { ActivateStep } from '../Api';
import { AcceptInvitationSuccessRedirect, AcceptInvitationSuccessRedirectProps } from './AcceptInvitationSuccessRedirect';
import { AcceptInvitationFailedRedirect, AcceptInvitationFailedRedirectProps } from './AcceptInvitationFailedRedirect';
import { AcceptInvitationForm, AcceptInvitationFormProps } from './AcceptInvitationForm';
import { ComponentsTypesWithProps, useDynamicComponents } from '@frontegg/react-core';
import { authPageWrapper } from '../components';
import { useAuth } from '../hooks';

type Components = {
  InvitationAcceptForm: AcceptInvitationFormProps;
  InvitationAcceptSuccessRedirect: AcceptInvitationSuccessRedirectProps;
  InvitationAcceptFailedRedirect: AcceptInvitationFailedRedirectProps;
};
const defaultComponents = { InvitationAcceptSuccessRedirect: AcceptInvitationSuccessRedirect, InvitationAcceptFailedRedirect: AcceptInvitationFailedRedirect, InvitationAcceptForm: AcceptInvitationForm };

export interface AcceptInvitationProps {
  components?: ComponentsTypesWithProps<Components>;
}

export const AcceptInvitation: FC<AcceptInvitationProps> = (props) => {
  const { step } = useAuth((state) => state.activateState);
  const Dynamic = useDynamicComponents(defaultComponents, props);

  const url = new URL(window?.location.href);
  const userId = url.searchParams.get('userId') || '';
  const token = url.searchParams.get('token') || '';

  let components: any;
  if (!userId || !token) {
    components = <Dynamic.InvitationAcceptFailedRedirect />;
  } else if (step === ActivateStep.success) {
    components = <Dynamic.InvitationAcceptSuccessRedirect />;
  } else {
    components = <Dynamic.InvitationAcceptForm userId={userId} token={token} />;
  }
  return <div className='fe-invitation-accept-component'>{components}</div>;
};

export const AcceptInvitationPage = authPageWrapper(AcceptInvitation);
