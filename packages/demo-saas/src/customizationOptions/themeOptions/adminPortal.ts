import { FronteggThemeOptions } from '@frontegg/types';

export const adminPortalStylingCustomization: FronteggThemeOptions = {
  adminPortal: {
    pages: {
      header: {
        backgroundColor: '#F5F4F9',
      },
      content: {
        backgroundColor: '#F5F4F9',
      },
    },
  },
};

export const adminPortalInviteUserCustomization: FronteggThemeOptions = {
  adminPortal: {
    pages: {
      users: {
        hideInviteWithEmail: true,
      },
    },
  },
};
