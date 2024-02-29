import { FronteggThemeOptions } from '@frontegg/types';

export const singUpSplitModeOptions: FronteggThemeOptions = {
  loginBox: {
    signup: {
      layout: {
        type: 'float-right',
        splitSize: 50,
        splitModeElements: {
          showDivider: true,
          showTitleDivider: true,
          activeElements: {
            titleDescription: false,
            element1: 'values',
            element2: 'logos',
          },
          testimonials: {
            testimonial1: 'https://assets.codepen.io/3/kiwi.svg',
            testimonial2: 'https://assets.codepen.io/3/kiwi.svg',
          },
          logos: {
            logos: {
              logo1: 'https://assets.frontegg.com/public-frontegg-assets/acme-logo.svg',
              logo2: 'https://assets.codepen.io/3/kiwi.svg',
              logo3: 'https://assets.frontegg.com/public-frontegg-assets/acme-logo.svg',
              logo4: 'https://assets.codepen.io/3/kiwi.svg',
              logo5: 'https://assets.frontegg.com/public-frontegg-assets/acme-logo.svg',
              logo6: 'https://assets.codepen.io/3/kiwi.svg',
            },
          },
        },
      },
    },
  },
};

export const loginSplitModeOptions: FronteggThemeOptions = {
  loginBox: {
    login: {
      layout: {
        // sideElement: <RightElement />,
        type: 'float-left',
        splitSize: 50,
        splitModeElements: {
          showDivider: true,
          activeElements: {
            element1: 'testimonials',
            element2: 'values',
          },
          logos: {
            logos: {
              logo1: 'https://assets.frontegg.com/public-frontegg-assets/acme-logo.svg',
              logo2: 'https://assets.codepen.io/3/kiwi.svg',
              logo3: 'https://assets.frontegg.com/public-frontegg-assets/acme-logo.svg',
            },
          },
        },
      },
    },
  },
};
