export default {
  translation: {
    common: {
      'click-here': 'Click Here',
      disable: 'Disable',
      enable: 'Enable',
      disabled: 'Disabled',
      enabled: 'Enabled',
      pending: 'Pending',
      pendingApproval: 'Pending Approval',
      step: 'Step {{num}}',
      configured: 'Configured',
      close: 'Close',
      edit: 'Edit',
      done: 'Done',
      copied: 'Copied!',
      domain: 'Domain',
      me: '(Me)',
      proceed: 'Proceed',
      validate: 'Validate',
      validated: 'Validated',
      email: 'Email',
      password: 'Password',
      'not-configured': 'Not Configured',
      country: 'Country',
      'last-updated': 'Last updated',
      'date-of-birth': 'Date of Birth',
      loading: 'Loading',
      'empty-items': 'No Items',
      back: 'Back',
      next: 'Next',
      invite: 'Invite',
      cancel: 'Cancel',
      name: 'Name',
      'enter-name': 'Enter name',
      'enter-email': 'Enter email',
      permissions: 'Permissions',
      roles: 'Roles',
      select: 'Select',
      joinedTeam: 'Joined Team',
      lastLogin: 'Last Login',
      search: 'Search',
      filter: 'Filter',
      clear: 'Clear',
      instruction: 'Instruction',
      'instruction-for': 'Instruction for',
      finish: 'Finish',
      configure: 'Configure',
      automatic: 'Automatic',
      manual: 'Manual',
      verify: 'Verify',
      delete: 'Delete',
      yourself: 'yourself',
    },
    auth: {
      login: {
        login: 'Login',
        continue: 'Continue',
        email: 'Email',
        password: 'Password',
        'enter-your-password': 'Enter Your Password',
        'forgot-password': 'Forgot Password?',
        'authentication-succeeded': 'Authentication Succeeded',
        'recover-multi-factor': 'Recover Multi-Factor',
        'please-enter-the-6-digit-code': 'Please enter the 6 digit code',
        'please-enter-the-recovery-code': 'Please enter the recovery code',
        'disable-mfa': 'Disable MFA',
        'redirect-to-sso-message': 'Being redirected to your SSO provider...',
        'disable-two-factor-title': 'Having trouble?',
        'disable-two-factor-description': 'to disable Multi-Factor with recovery code',
        'back-to-login': 'Back to login',
        'login-with-sso-failed': 'Failed to Login with SSO, try again later.',
      },
      'forgot-password': {
        'email-label': 'Enter your email',
        'remind-me': 'Remind Me',
        'password-has-been-changed': 'Your password has been changed',
        'reset-password-failed-title': 'Reset Password Failed',
        'reset-password-failed-description': 'Please double check your reset url',
        'back-to-login': 'Back to login',
        'reset-email-sent': 'A password reset email has been sent to your registered email address',

        'new-password': 'New password',
        'enter-your-password': 'Enter your password',
        'confirm-new-password': 'Confirm New password',
        'enter-your-password-again': 'Enter your password again',
        'reset-password-button': 'Reset Password',
      },
      'activate-account': {
        'failed-title': 'Activation failed',
        'failed-description': 'Please double check your activation url',
        'back-to-login': 'Back to login',
        'activation-succeeded': 'Activation Succeeded',
        'new-password': 'New password',
        'enter-your-password': 'Enter your password',
        'confirm-new-password': 'Confirm New password',
        'enter-your-password-again': 'Enter your password again',
        'activate-account-button': 'Activate',
      },
      account: {
        'invalid-title': 'Invalid link',
        'invalid-description': 'Please double check your link',
        'failed-title': 'Authorization Failed',
        'failed-description': 'We were unable to authorize you',
        'success-title': 'Authorize successfully!',
        'pending-title': 'Please wait ehile we authorize you...',
      },
      sso: {
        title: 'Single Sign On',
        subtitle: 'Configure single-sign-on with your own Identity Provider',
        overview: {
          'enable-sso-message': 'Enable SSO and configure the settings to quickly use this functionality',
          'claim-domain': 'Claim Domain',
          'configure-your-idp': 'Configure Your IDP',
        },
        'go-to-idp': 'Configure IDP',
        'claim-domain': {
          guide: {
            title: 'Guide',
            description: 'Helpful information explaining the process',
            'steps-0': 'Enter your domain name',
            'steps-1': 'Click proceed',
            'steps-2': 'Copy the TXT value to your DNS',
            'steps-3': 'Click "Validate',
          },
          form: {
            title: 'Claim domain',
            'enter-your-domain': 'Enter your Domain',
            'copy-info-to-txt-record': 'Copy this info into a new TXT record in your DNS file:',
            'record-name': 'Record Name',
            'record-value': 'Record Value',
            'validate-error':
              'Validation did not succeed, please notice that DNS records might take some time to update. Please try again.',
          },
        },
        idp: {
          'error-ask-your-vendor': 'Ask your vendor to configure SSO before!',
          guide: {
            title: 'Guide',
            description: 'Helpful information explaining the process',
            'steps-0': 'Create an entry for the application on the IDP',
            'steps-1': 'Download the IDP federation metadata XML',
            'steps-2': 'Click on next to step 2',
            'steps-3': 'Upload the IDP metadata XML',
            'steps-4': 'Click "Validate & Save"',
            'step-by-step': 'Detailed step by step',
          },
          select: {
            title: 'Select your IDP',
          },
          form: {
            title: 'Configure Your IDP',
            'acs-url': 'ACS URL',
            'entity-id': 'Entity ID',
            'metadata-file': 'Metadata File',
            endpoint: 'SSO Endpoint',
            certificate: 'Public Certificate',
            'endpoint-desc': 'URL from the SSO',
            'certificate-desc': 'Provide Public Certificate',
          },
        },
      },
      dropzone: {
        title: 'Metadata File',
        dnd: 'Drag & Drop',
        description: 'Click or drop an XML file with your configurations',
      },
      profile: {
        title: 'My Profile',
        info: {
          title: 'Basic Info',
          title2: 'Basic Information',
          'upload-photo': 'Upload Photo',
          'upload-photo-note': 'At least 256x256px PNG or JPEG file',
          'invalid-profile-photo': 'Profile Photo must be at least 256x256px',
          'user-title': 'Title',
          'user-name': 'Display Name',
        },
        'password-settings': {
          title: 'Change Password',
          button: 'Change Password',
          'success-message': 'Your password have been changed!',
        },
      },
      mfa: {
        title: 'Multi-factor Authentication',
        'two-factor': 'Two-factor authentication',
        'enable-message': 'Enable two-factor authentication to get an extra layer of security',
        'disable-title': 'Disable two-factor authentication',
        'enroll-button': 'Enroll MFA',
        'disable-button': 'Disable MFA',
        verify: {
          message: 'Enable two-factor to get an extra layer of security.',
          'scan-qr-description-1': `Use your phone to scan the following QR code with `,
          'scan-qr-description-2': ` or other authenticator apps.`,
          'enter-generated-code': 'Enter the generated 6-digit code below.',
        },
        'recovery-code': {
          message: 'Recovery code can be used to disable two-factor authentication in case you lose your phone.',
          'your-code': 'Your recovery code',
          'copy-and-save-code': `Copy and save the code, because we won't show it again. We don't scare you ;)`,
        },
        disable: {
          message: 'Disable two-factor will remove an extra layer of security.',
          'enter-generated-code': 'Enter the generated 6-digit code',
        },
      },
      team: {
        title: 'Team Management',
        subtitle: 'Total of {{totalItems}} team members',
        'invite-user': 'Invite User',
        'search-users': 'Search by any text',
        resendActivation: 'Resend activation email',
        deleteUser: 'Delete user',
        leaveTeam: 'Leave Team',
        'add-dialog': {
          title: 'Invite New Teammate',
        },
        deleteDialog: {
          title: 'Delete team member',
          message: "You are about to remove '{{email}}' from this account. Are you sure?",
        },
      },
      'social-logins': {
        login: {
          'button-text': 'Login with {{providerName}}'
        },
        error: {
          'invalid-callback-url': 'Invalid callback url'
        }
      }
    },
    validation: {
      'must-be-a-valid-email': 'Must be a valid email',
      'must-be-a-valid-domain': 'Must be a valid domain',
      'must-be-a-valid-url': 'Must be a valid URL',
      'passwords-must-match': 'Passwords must match',
      'required-field': 'The {{name}} is required',
      'min-length': '{{name}} must be at least {{limit}} characters',
      'max-length': '{{name}} must be up to {{limit}} characters',
      length: '{{name}} must be {{limit}} characters',
    },
    reports: {
      'list-page': {
        title: 'Reports',
        subtitle: 'Generate insights on your account usage',
      },
    },
  },
};
