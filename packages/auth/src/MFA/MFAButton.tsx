import React, { FC, MouseEventHandler, ReactElement, useContext, useState } from 'react';
import { Button, checkValidChildren } from '@frontegg/react-core';
import { MFAEnrollDialog } from './MFAEnrollDialog';
import { MFADisableDialog } from './MFADisableDialog';
import { useAuth } from '../hooks';

const MFAButtonContext = React.createContext({
  openEnrollDialog: () => {},
  openDisableDialog: () => {},
});

type MFAButtonProps = {
  children?: ReactElement<{ onClick: MouseEventHandler<HTMLButtonElement> }>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const EnrollButton = (props: MFAButtonProps) => {
  const { user } = useAuth(({ user }) => ({ user }));
  const { openEnrollDialog } = useContext(MFAButtonContext);
  if (user?.mfaEnrolled) {
    return null;
  }
  const children = props.children ?? <Button type='submit'>Enroll Mfa</Button>;
  return React.cloneElement(children as any, { onClick: openEnrollDialog });
};
const DisableButton = (props: MFAButtonProps) => {
  const { user } = useAuth(({ user }) => ({ user }));
  if (!user?.mfaEnrolled) {
    return null;
  }
  const { openDisableDialog } = useContext(MFAButtonContext);
  const children = props.children ?? (
    <Button type='submit' variant='danger'>
      Disable Mfa
    </Button>
  );
  return React.cloneElement(children as any, { onClick: openDisableDialog });
};

type SubComponents = {
  EnrollButton: typeof EnrollButton;
  DisableButton: typeof EnrollButton;
};
export const MFAButton: FC & SubComponents = (props) => {
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [disableOpen, setDisableOpen] = useState(false);

  const openEnrollDialog = () => setEnrollOpen(true);
  const openDisableDialog = () => setDisableOpen(true);

  checkValidChildren('MFAButton', 'MFAButton', props.children, { EnrollButton, DisableButton });
  const children = props.children ?? (
    <>
      <EnrollButton />
      <DisableButton />
    </>
  );

  return (
    <MFAButtonContext.Provider
      value={{
        openEnrollDialog,
        openDisableDialog,
      }}
    >
      {children}
      <MFAEnrollDialog open={enrollOpen} onClose={() => setEnrollOpen(false)} />
      <MFADisableDialog open={disableOpen} onClose={() => setDisableOpen(false)} />
    </MFAButtonContext.Provider>
  );
};

MFAButton.EnrollButton = EnrollButton;
MFAButton.DisableButton = DisableButton;
