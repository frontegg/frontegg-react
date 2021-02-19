import React, { FC, useEffect } from 'react';
import { loadReCaptcha, ReCaptcha as Captcha } from 'react-recaptcha-v3';
import { AuthState } from '../Api';
import { useAuth } from '../hooks';

interface IReCaptchaProps {
  callback(token: string): void;
  action: string;
}

const stateMapper = ({ captchaState }: AuthState) => captchaState;

export const ReCaptcha: FC<IReCaptchaProps> = ({ callback, action }) => {
  const state = useAuth(stateMapper);

  useEffect(() => {
    const { siteKey, enabled } = state;
    if (enabled) loadReCaptcha(siteKey || '');
  }, [state]);

  if (!state.enabled || !state.siteKey) return null;

  return <Captcha sitekey={state.siteKey} verifyCallback={callback} action={action} />;
};
