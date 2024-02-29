import { FronteggThemeOptions } from '@frontegg/types';

export const termsAndConditionOptionsWithNoCheckbox: FronteggThemeOptions = {
  loginBox: {
    signup: {
      disclaimer: {
        hasCheckbox: false,
        textStyle: {},
        terms: {
          enabled: true,
          linkStyle: {},
        },
        privacy: {
          enabled: true,
          linkStyle: {},
        },
      },
    },
  },
};

export const termsAndConditionOptionsWithCheckbox: FronteggThemeOptions = {
  loginBox: {
    signup: {
      disclaimer: {
        hasCheckbox: true,
        textStyle: {},
        checkBoxStyle: {
          checked: {
            base: {},
            hover: {},
          },
          unchecked: {
            hover: {},
            base: {},
          },
        },
        terms: {
          enabled: true,
          linkStyle: {},
        },
        privacy: {
          enabled: true,
          linkStyle: {},
        },
      },
    },
  },
};
