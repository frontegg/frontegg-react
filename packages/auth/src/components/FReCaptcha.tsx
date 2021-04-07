import React, { FC, useEffect } from 'react';
import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-v3';
import { useCallback } from 'react';
import { FFormik } from '@frontegg/react-core';
import { useSecurityPolicyState } from '@frontegg/react-hooks/auth';

const { useField } = FFormik;

interface IReCaptchaProps {
  action: string;
  fieldName?: string;
}

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

export const FReCaptcha: FC<IReCaptchaProps> = ({ action, fieldName = 'recaptchaToken' }) => {
  const { policy } = useSecurityPolicyState((state) => state.captchaPolicy);
  const [, , { setValue }] = useField(fieldName);

  useEffect(() => {
    if (policy?.enabled) loadReCaptcha(policy?.siteKey || '');

    return () => unload(policy?.siteKey);
  }, [policy?.enabled, policy?.siteKey]);

  if (!policy?.enabled || !policy?.siteKey) {
    return null;
  }

  const handleCallback = useCallback(
    (token: string) => {
      setValue(token, false);
    },
    [setValue]
  );

  if (!policy || !policy.enabled) return null;

  return <ReCaptcha sitekey={policy?.siteKey} verifyCallback={handleCallback} action={action} />;
};
