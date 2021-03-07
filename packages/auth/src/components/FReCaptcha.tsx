import React, { FC, useEffect } from 'react';
import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-v3';
import { useField } from 'formik';
import { useCallback } from 'react';
import { useSecurityPolicyState } from '@frontegg/react-hooks/auth';

interface IReCaptchaProps {
  action: string;
  fieldName?: string;
}

export const FReCaptcha: FC<IReCaptchaProps> = ({ action, fieldName = 'recaptchaToken' }) => {
  const { policy } = useSecurityPolicyState((state) => state.captchaPolicy);
  const [, , { setValue }] = useField(fieldName);

  useEffect(() => {
    if (policy?.enabled) loadReCaptcha(policy?.siteKey || '');
  }, [policy?.enabled, policy?.siteKey]);

  const handleCallback = useCallback(
    (token: string) => {
      setValue(token, false);
    },
    [setValue]
  );

  if (!policy || !policy.enabled) return null;

  return <ReCaptcha sitekey={policy.siteKey} verifyCallback={handleCallback} action={action} />;
};
