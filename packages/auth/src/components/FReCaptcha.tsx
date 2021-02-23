import React, { FC, useEffect } from 'react';
import { loadReCaptcha, ReCaptcha as Captcha } from 'react-recaptcha-v3';
import { useField } from 'formik';
import { AuthState } from '../Api';
import { useAuth } from '../hooks';
import { useCallback } from 'react';

interface IReCaptchaProps {
  action: string;
}

const stateMapper = ({ captchaState }: AuthState) => captchaState;

export const FReCaptcha: FC<IReCaptchaProps> = ({ action }) => {
  const { siteKey, enabled } = useAuth(stateMapper);
  const [, , { setValue }] = useField('recaptchaToken');

  useEffect(() => {
    if (enabled) loadReCaptcha(siteKey || '');
  }, [siteKey, enabled]);

  if (!enabled || !siteKey) return null;

  const handleCallback = useCallback((token: string) => setValue(token), [setValue]);

  return <Captcha sitekey={siteKey} verifyCallback={handleCallback} action={action} />;
};
