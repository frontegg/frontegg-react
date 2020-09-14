import React, { useState } from 'react';
import { Button, useT } from '@frontegg/react-core';
import { ProfilePage } from '../interfaces';
import { MFA } from '../../MFA';

export const ProfileMfaPage: ProfilePage = (props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpen2, setDialogOpen2] = useState(false);

  return (
    <div>
      <Button onClick={() => setDialogOpen(true)}>Enroll MFA</Button>
      <Button onClick={() => setDialogOpen2(true)}>Disable MFA</Button>
      <MFA.EnrollDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
      <MFA.DisableDialog open={dialogOpen2} onClose={() => setDialogOpen2(false)} />
    </div>
  );
};

ProfileMfaPage.Title = () => useT().t('auth.mfa.title');
ProfileMfaPage.route = '/mfa';
