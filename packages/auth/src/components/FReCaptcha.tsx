import React, { FC, useEffect } from 'react';
import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-v3';
import { AuthState } from '../Api';
import { useAuth } from '../hooks';
import { useCallback } from 'react';
import { FFormik } from '@frontegg/react-core';
interface IReCaptchaProps {
  action: string;
}

const { useField } = FFormik;

const stateMapper = ({ captchaState }: AuthState) => captchaState;

const unload = (recaptchaSiteKey?: string) => {
  if (!recaptchaSiteKey) {
    return;
  }
  const nodeBadge = document.querySelector('.grecaptcha-badge');
  if (nodeBadge && nodeBadge.parentNode) {
    document.body.removeChild(nodeBadge.parentNode);
  }
  const scriptSelector = "script[src='https://www.google.com/recaptcha/api.js?render=" + recaptchaSiteKey + "']";
  const script = document.querySelector(scriptSelector);
  if (script) {
    script.remove();
  }
};

export const FReCaptcha: FC<IReCaptchaProps> = ({ action }) => {
  const { siteKey, enabled } = useAuth(stateMapper);
  const [, , { setValue }] = useField('recaptchaToken');

  useEffect(() => {
    if (enabled) {
      loadReCaptcha(siteKey || '');
    }
    return () => unload(siteKey);
  }, [siteKey, enabled]);

  if (!enabled || !siteKey) {
    return null;
  }

  const handleCallback = useCallback(
    (token: string) => {
      setValue(token);
    },
    [setValue]
  );

  return <ReCaptcha sitekey={siteKey} verifyCallback={handleCallback} action={action} />;
};
