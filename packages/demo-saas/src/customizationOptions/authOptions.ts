import { FronteggAppOptions } from '@frontegg/types';

export const authOptions: { authOptions: FronteggAppOptions['authOptions'] } = {
  authOptions: {
    keepSessionAlive: true,
  },
};

export const hostedLoginAuthOptions: { authOptions: FronteggAppOptions['authOptions'] } = {
  authOptions: {
    keepSessionAlive: true,
    hostedLoginOptions: {
      loadUserOnFirstLoad: true,
    },
  },
};

export const redirectUrlAuthOptions: { authOptions: FronteggAppOptions['authOptions'] } = {
  authOptions: {
    keepSessionAlive: true,
    enforceRedirectToSameSite: true,
    allowedRedirectOrigins: ['https://*.dev.acme.com', 'https://dev.*.acme.com', 'https://dev-*.acme.com'],
  },
};
