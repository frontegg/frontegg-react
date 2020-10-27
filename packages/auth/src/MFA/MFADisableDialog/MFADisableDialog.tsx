import React, { FC, useEffect } from 'react';
import {
  Dialog,
  DialogContext,
  DialogProps,
  FFormik,
  FForm,
  omitProps,
  useT,
  validateSchema,
  validateTwoFactorCode,
} from '@frontegg/react-core';
import { MFADisableDialogMessage } from './MFADisableDialogMessage';
import { MFADisableDialogFooter } from './MFADisableDialogFooter';
import { MFADisableDialogForm } from './MFADisableDialogForm';
import { MFADisableDialogErrorMessage } from './MFADisableDialogErrorMessage';
import { useAuthMfaActions } from '../hooks';

const { Formik } = FFormik;

export type MFADialogProps = DialogProps;
export const MFADisableDialog: FC<MFADialogProps> = (props) => {
  const { t } = useT();
  const { resetMfaState, disableMfa } = useAuthMfaActions();
  const dialogProps = omitProps(props, ['children']);
  useEffect(() => {
    props.open && resetMfaState();
  }, [props.open]);

  const children = props.children ?? (
    <>
      <MFADisableDialogMessage />
      <MFADisableDialogForm />
      <MFADisableDialogErrorMessage />
      <MFADisableDialogFooter />
    </>
  );
  return (
    <DialogContext.Provider value={{ onClose: props.onClose }}>
      <Dialog size='tiny' className='fe-mfa-dialog' header={t('auth.mfa.disable-title')} {...dialogProps}>
        <Formik
          validationSchema={validateSchema({
            token: validateTwoFactorCode(t),
          })}
          initialValues={{ token: '' }}
          onSubmit={async ({ token }) => {
            disableMfa({ token }, props.onClose);
          }}
        >
          <FForm>{children}</FForm>
        </Formik>
      </Dialog>
    </DialogContext.Provider>
  );
};
