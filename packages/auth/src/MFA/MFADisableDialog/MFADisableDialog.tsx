import React, { FC, useEffect } from 'react';
import {
  Dialog,
  DialogContext,
  DialogProps,
  FFormik,
  Form,
  omitProps,
  useT,
  validateSchema,
  validateTwoFactorCode,
} from '@frontegg/react-core';
import { useAuth } from '../../hooks';
import { MFADisableDialogMessage } from './MFADisableDialogMessage';
import { MFADisableDialogFooter } from './MFADisableDialogFooter';
import { MFADisableDialogForm } from './MFADisableDialogForm';
import { MFADisableDialogErrorMessage } from './MFADisableDialogErrorMessage';

const { Formik } = FFormik;

export type MFADialogProps = DialogProps;
export const MFADisableDialog: FC<MFADialogProps> = (props) => {
  const { t } = useT();
  const { resetMfaState, disableMfa } = useAuth();
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
          onSubmit={async ({ token }) => disableMfa({ token })}
        >
          <Form>{children}</Form>
        </Formik>
      </Dialog>
    </DialogContext.Provider>
  );
};
