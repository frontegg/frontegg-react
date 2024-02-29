import { AuthStrategyEnum, FronteggState, SignUpStage, ActivateAccountStep } from '@frontegg/redux-store';
import { MachineToMachineAuthStrategy } from '@frontegg/rest-api';

export const initialStore: Partial<FronteggState['auth']> = {
  isLoading: false,
  isAuthenticated: false,
  activateState: {
    loading: false,
    step: ActivateAccountStep.activatingForm,
    activationStrategy: {
      loading: false,
    },
    resentEmail: false,
  },
  securityPolicyState: {
    publicAuthStrategyPolicy: {
      loading: false,
      policy: {
        secondaryAuthStrategies: [],
        mainAuthStrategies: [],
      },
    },
    publicPolicy: {
      loading: false,
      error: null,
      policy: {
        allowSignups: true,
        authStrategy: AuthStrategyEnum.EmailAndPassword,
        allowNotVerifiedUsersLogin: true,
        apiTokensEnabled: true,
        machineToMachineAuthStrategy: MachineToMachineAuthStrategy.ClientCredentials,
        forcePermissions: true,
      },
    },
    captchaPolicy: {
      loading: false,
      error: null,
      policy: {
        id: '1',
        createdAt: new Date(),
        siteKey: '',
        updatedAt: new Date(),
        enabled: false,
      },
    },
    passwordPolicy: {
      loading: false,
      error: null,
      policy: {
        allowPassphrases: true,
        maxLength: 128,
        minLength: 6,
        minOptionalTestsToPass: 1,
        minPhraseLength: 6,
      },
    },
    globalPolicy: {
      loading: false,
    },
    mfaPolicy: {
      loading: false,
      policy: {
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        enforceMFAType: 'DontForce',
      },
    },
    vendorMfaPolicy: {
      loading: false,
      policy: {
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        enforceMFAType: 'DontForce',
      },
    },
    lockoutPolicy: {
      loading: false,
      policy: {
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        enabled: false,
        maxAttempts: 4,
      },
    },
    vendorLockoutPolicy: {
      loading: false,
      policy: {
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        enabled: false,
        maxAttempts: 4,
      },
    },
    passwordHistoryPolicy: {
      loading: false,
      policy: {
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        enabled: false,
        historySize: 4,
      },
    },
    vendorPasswordHistoryPolicy: {
      loading: false,
      policy: {
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        enabled: false,
        historySize: 4,
      },
    },
  },
  socialLoginState: {
    loading: false,
    firstLoad: false,
    // socialLoginsConfigV2: Object.keys(state.socialLogin ?? {}).map((type) => ({
    //   type: type as SocialLoginProviders,
    //   clientId: 'clientId',
    //   redirectUrl: 'redirectUrl',
    //   redirectUrlPattern: '{{APP_URL}}',
    //   active: state.socialLogin?.[type]?.active ?? false,
    //   authorizationUrl: 'authorizationUrl',
    //   customised: false,
    // })),
  },
  signUpState: {
    loading: false,
    allowSignUps: true,
    allowNotVerifiedUsersLogin: false,
    firstLoad: false,
    stage: SignUpStage.SignUp,
  },
};
