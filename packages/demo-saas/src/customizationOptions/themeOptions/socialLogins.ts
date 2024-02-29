import { FronteggThemeOptions } from '@frontegg/types';

export const socialLoginsLayoutOptions: FronteggThemeOptions = {
  loginBox: {
    socialLogins: {
      socialLoginsLayout: {
        placement: 'top',
        mode: 'stack',
        mainButton: 'google',
      },
    },
    activateAccount: {
      socialLogins: {
        socialLoginsLayout: {
          placement: 'bottom',
          mode: 'eventually',
        },
      },
    },
  },
};
