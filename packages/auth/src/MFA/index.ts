import { MFAEnrollDialog } from './MFAEnrollDialog';
import {
  MFAVerifyStep,
  MFAVerifyStepMessage,
  MFAVerifyStepForm,
  MFAVerifyStepErrorMessage,
  MFAVerifyStepFooter,
} from './MFAVerifyStep';

import {
  MFADisableDialog,
  MFADisableDialogMessage,
  MFADisableDialogForm,
  MFADisableDialogFooter,
} from './MFADisableDialog';
import {
  MFARecoveryCodeStep,
  MFARecoveryCodeStepMessage,
  MFARecoveryCodeStepForm,
  MFARecoveryCodeStepFooter,
} from './MFARecoveryCodeStep';

export const MFA = {
  EnrollDialog: MFAEnrollDialog,

  EnrollDialogVerifyStep: MFAVerifyStep,
  EnrollDialogVerifyStepMessage: MFAVerifyStepMessage,
  EnrollDialogVerifyStepForm: MFAVerifyStepForm,
  EnrollDialogVerifyStepErrorMessage: MFAVerifyStepErrorMessage,
  EnrollDialogVerifyStepFooter: MFAVerifyStepFooter,

  EnrollDialogRecoveryCodeStep: MFARecoveryCodeStep,
  EnrollDialogRecoveryCodeStepMessage: MFARecoveryCodeStepMessage,
  EnrollDialogRecoveryCodeStepForm: MFARecoveryCodeStepForm,
  EnrollDialogRecoveryCodeStepFooter: MFARecoveryCodeStepFooter,

  DisableDialog: MFADisableDialog,
  DisableDialogMessage: MFADisableDialogMessage,
  DisableDialogForm: MFADisableDialogForm,
  DisableDialogFooter: MFADisableDialogFooter,
};
