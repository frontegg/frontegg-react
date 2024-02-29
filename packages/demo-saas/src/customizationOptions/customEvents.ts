import { FronteggAppOptions } from '@frontegg/types';

export const customEvents: { events: FronteggAppOptions['events'] } = {
  events: {
    signUpComplete: (e) => {
      console.log('signUpComplete, the payload is:', e);
    },
    userVerified: (e) => {
      console.log('userVerified, the payload is:', e);
    },
    inviteMemberClicked: (e) => {
      console.log('inviteMemberClicked, the payload is:', e);
    },
    inviteMemberSubmit: (e) => {
      console.log('inviteMemberSubmit, the payload is:', e);
    },
    adminBoxMenuClicked: (e) => {
      console.log('adminBoxMenuClicked, the payload is:', e);
    },
  },
};
