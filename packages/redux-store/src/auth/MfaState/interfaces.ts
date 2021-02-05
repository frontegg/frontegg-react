export enum MFAStep {
  'verify' = 'verify',
  'recoveryCode' = 'recoveryCode',
}

export interface MFAState {
  step: MFAStep;
  loading: boolean;
  error?: any;
  recoveryCode?: string;
  qrCode?: string | null; // qr code image base64
  mfaToken?: string;
}
