import React from 'react';
import { mount } from 'cypress-react-unit-test';
import { AuthPlugin, DefaultAuthRoutes, LoginStep } from '../index';
import { FRONTEGG_AFTER_AUTH_REDIRECT_URL } from '../constants';
import {
  checkEmailValidation, EMAIL_1,
  IDENTITY_SERVICE,
  METADATA_SERVICE,
  mockAuthApi,
  mountOptions,
  navigateTo,
  TestFronteggWrapper,
} from '../../../../cypress/helpers';

const defaultAuthPlugin = {
  routes: {
    authenticatedUrl: '/',
    loginUrl: '/account/login',
    logoutUrl: '/account/logout',
    activateUrl: '/account/activate',
    forgetPasswordUrl: '/account/forget-password',
    resetPasswordUrl: '/account/reset-password',
  },
};

const EMAIL_2 = 'test2@frontegg.com';
const PASSWORD = 'ValidPassword123!';
const SSO_PATH = '/my-test-sso-login';
const MFA_TOKEN = 'mfaToken';
const RECOVERY_CODE = '123412341234';

const checkPasswordValidation = () => {
  const passwordSelector = '[name="password"]';
  cy.get(passwordSelector).focus().clear().type('not').blur();
  cy.contains('Password must be at least 6 characters').should('be.visible');
  cy.get(passwordSelector).focus().clear().type(PASSWORD).blur();
  cy.contains('Password must be at least 6 characters').should('not.be.exist');
};
/* eslint-env mocha */
describe('Login Tests', () => {
  it('Login, NO SAML', () => {
    cy.server();
    mockAuthApi(false, false);

    mount(<TestFronteggWrapper plugins={[AuthPlugin(defaultAuthPlugin)]}>
      <DefaultAuthRoutes>
        Home
      </DefaultAuthRoutes>
    </TestFronteggWrapper>, mountOptions);

    navigateTo(defaultAuthPlugin.routes.loginUrl);
    cy.wait(['@refreshToken', '@metadata']);
    cy.get('.loader').should('not.be.visible');

    const submitSelector = 'button[type=submit]';

    cy.get(submitSelector).contains('Login').should('be.disabled');
    checkEmailValidation();
    cy.get(submitSelector).contains('Login').should('be.disabled');

    checkPasswordValidation();
    cy.get(submitSelector).contains('Login').should('not.be.disabled');

    cy.route({
      method: 'POST',
      url: `${IDENTITY_SERVICE}/resources/auth/v1/user`,
      status: 401,
      response: { errors: ['invalid auth'] },
      delay: 200,
    }).as('login');

    cy.get(submitSelector).contains('Login').click();

    cy.wait('@login').its('request.body').should('deep.equal', { email: EMAIL_1, password: PASSWORD });
    cy.contains('invalid auth').should('be.visible');

    cy.route({
      method: 'POST',
      url: `${IDENTITY_SERVICE}/resources/auth/v1/user`,
      status: 200,
      response: { accessToken: 'token', refreshToken: 'refreshToken' },
      delay: 200,
    }).as('login');

    cy.window().then(win => win.localStorage.removeItem(FRONTEGG_AFTER_AUTH_REDIRECT_URL));
    cy.get(submitSelector).contains('Login').click();

    cy.wait('@login').its('request.body').should('deep.equal', { email: EMAIL_1, password: PASSWORD });

    cy.contains('Authentication Succeeded').should('be.visible');
    cy.contains('Home').should('be.visible');
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/');
    });

    // should be redirected to home if authenticated
    cy.wait(1000);
    cy.window().then(win => {
      // @ts-ignore
      win.cypressHistory.push('/account/login');
    });

    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/');
    });
  });

  it('Login, check after login url', () => {
    cy.server();
    mockAuthApi(false, false);
    cy.route({
      method: 'POST',
      url: `${IDENTITY_SERVICE}/resources/auth/v1/user`,
      status: 200,
      response: { accessToken: 'token', refreshToken: 'refreshToken' },
      delay: 200,
    }).as('login');
    mount(<TestFronteggWrapper plugins={[AuthPlugin(defaultAuthPlugin)]}>
      <DefaultAuthRoutes>
        Home
      </DefaultAuthRoutes>
    </TestFronteggWrapper>, mountOptions);

    navigateTo(defaultAuthPlugin.routes.loginUrl);
    cy.wait(['@refreshToken', '@metadata']);
    cy.get('.loader').should('not.be.visible');

    const emailSelector = '[name="email"]';
    const passwordSelector = '[name="password"]';
    const submitSelector = 'button[type=submit]';

    cy.get(emailSelector).focus().clear().type(EMAIL_1).blur();
    cy.get(passwordSelector).focus().clear().type(PASSWORD).blur();
    cy.get(submitSelector).contains('Login').should('not.be.disabled');

    cy.window().then(win => win.localStorage.setItem(FRONTEGG_AFTER_AUTH_REDIRECT_URL, '/after-login-redirect'));
    cy.get(submitSelector).click();

    cy.wait('@login').its('request.body').should('deep.equal', { email: EMAIL_1, password: PASSWORD });

    cy.contains('Authentication Succeeded').should('be.visible');
    cy.contains('Home').should('be.visible');
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/after-login-redirect');
    });

  });

  it('Login, WITH SAML tenant, NO SAML email', () => {
    cy.server();
    mockAuthApi(false, true);
    cy.route({
      method: 'POST',
      url: `${IDENTITY_SERVICE}/resources/auth/v1/user/saml/prelogin`,
      status: 400,
      response: { address: null },
      delay: 200,
    }).as('preLogin');
    cy.route({
      method: 'POST',
      url: `${IDENTITY_SERVICE}/resources/auth/v1/user`,
      status: 200,
      response: { accessToken: 'token', refreshToken: 'refreshToken' },
      delay: 200,
    }).as('login');
    mount(<TestFronteggWrapper plugins={[AuthPlugin(defaultAuthPlugin)]}>
      <DefaultAuthRoutes>
        Home
      </DefaultAuthRoutes>
    </TestFronteggWrapper>, { ...mountOptions, alias: 'providerComponent' });

    navigateTo(defaultAuthPlugin.routes.loginUrl);
    cy.wait(['@refreshToken', '@metadata']);
    cy.get('.loader').should('not.be.visible');

    const emailSelector = '[name="email"]';
    const passwordSelector = '[name="password"]';
    const submitSelector = 'button[type=submit]';

    cy.get(submitSelector).contains('Continue').should('be.disabled');
    checkEmailValidation();
    cy.get(submitSelector).contains('Continue').should('not.be.disabled');
    cy.get(passwordSelector).should('not.exist');

    cy.get(submitSelector).contains('Continue').click();
    cy.get(submitSelector).should('not.have.class', 'loading');

    cy.get(passwordSelector).should('be.visible');
    checkPasswordValidation();
    cy.get(submitSelector).contains('Login').should('not.be.disabled');


    // change email should reset the login back to preLogin
    cy.get(emailSelector).focus().clear().type(EMAIL_1).blur();
    cy.get(passwordSelector).should('not.exist');
    cy.get(submitSelector).contains('Continue').click();

    cy.wait('@preLogin').its('request.body').should('deep.equal', { email: EMAIL_1 });

    cy.get(passwordSelector).should('be.visible');
    cy.get(passwordSelector).focus().clear().type(PASSWORD).blur();
    cy.get(submitSelector).contains('Login').should('not.be.disabled');

    cy.window().then(win => win.localStorage.removeItem(FRONTEGG_AFTER_AUTH_REDIRECT_URL));
    cy.get(submitSelector).click();

    cy.wait('@login').its('request.body').should('deep.equal', { email: EMAIL_1, password: PASSWORD });

    cy.contains('Authentication Succeeded').should('be.visible');
    cy.contains('Home').should('be.visible');
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/');
    });
  });

  it('Login, WITH SAML tenant, WITH email', () => {
    cy.server();
    mockAuthApi(false, true);
    cy.route({
      method: 'POST',
      url: `${IDENTITY_SERVICE}/resources/auth/v1/user/saml/prelogin`,
      status: 200,
      response: { address: SSO_PATH },
      delay: 200,
    }).as('preLogin');

    mount(<TestFronteggWrapper plugins={[AuthPlugin(defaultAuthPlugin)]}>
      <DefaultAuthRoutes>
        Home
      </DefaultAuthRoutes>
    </TestFronteggWrapper>, { ...mountOptions, alias: 'providerComponent' });

    navigateTo(defaultAuthPlugin.routes.loginUrl);
    cy.wait(['@refreshToken', '@metadata']);
    cy.get('.loader').should('not.be.visible');

    const emailSelector = '[name="email"]';
    const passwordSelector = '[name="password"]';
    const submitSelector = 'button[type=submit]';

    cy.get(submitSelector).contains('Continue').should('be.disabled');
    checkEmailValidation();
    cy.get(submitSelector).contains('Continue').should('not.be.disabled');

    cy.get(passwordSelector).should('not.exist');
    cy.get(submitSelector).contains('Continue').click();
    cy.get(submitSelector).should('have.class', 'loading');

    cy.get(passwordSelector).should('not.exist');

    cy.wait('@preLogin').its('request.body').should('deep.equal', { email: EMAIL_1 });

    cy.location().should(loc => {
      expect(loc.pathname).to.eq(SSO_PATH);
    });
  });

  it('Login, NO SAML, Two-Factor', () => {
    cy.server();
    mockAuthApi(false, false);
    cy.route({
      method: 'POST',
      url: `${IDENTITY_SERVICE}/resources/auth/v1/user`,
      status: 200,
      response: { mfaToken: MFA_TOKEN },
      delay: 200,
    }).as('login');


    mount(<TestFronteggWrapper plugins={[AuthPlugin(defaultAuthPlugin)]}>
      <DefaultAuthRoutes>
        Home
      </DefaultAuthRoutes>
    </TestFronteggWrapper>, mountOptions);

    navigateTo(defaultAuthPlugin.routes.loginUrl);
    cy.wait(['@refreshToken', '@metadata']);
    cy.get('.loader').should('not.be.visible');

    const submitSelector = 'button[type=submit]';
    const codeSelector = '[name="code"]';

    cy.get(submitSelector).contains('Login').should('be.disabled');
    checkEmailValidation();
    cy.get(submitSelector).contains('Login').should('be.disabled');

    checkPasswordValidation();
    cy.get(submitSelector).contains('Login').should('not.be.disabled');


    cy.window().then(win => win.localStorage.removeItem(FRONTEGG_AFTER_AUTH_REDIRECT_URL));
    cy.get(submitSelector).contains('Login').click();

    cy.wait('@login').its('request.body').should('deep.equal', { email: EMAIL_1, password: PASSWORD });

    cy.contains('Please enter the 6 digit code').should('be.visible');

    const validCode = '123123';
    cy.get(codeSelector).focus().type('111').blur();
    cy.get(codeSelector).parents('.field').should('have.class', 'error');
    cy.get(submitSelector).contains('Login').should('be.disabled');
    cy.get(codeSelector).focus().clear().type(validCode).blur();
    cy.get(codeSelector).parents('.field').should('not.have.class', 'error');
    cy.get(submitSelector).contains('Login').should('not.be.disabled');

    cy.route({
      method: 'POST',
      url: `${IDENTITY_SERVICE}/resources/auth/v1/user/mfa/verify`,
      status: 400,
      response: { errors: ['invalid code'] },
      delay: 200,
    }).as('verifyMfa');
    cy.get(submitSelector).contains('Login').click();
    cy.wait('@verifyMfa').its('request.body').should('deep.equal', { mfaToken: MFA_TOKEN, value: validCode });
    cy.contains('invalid code').should('be.visible');

    cy.route({
      method: 'POST',
      url: `${IDENTITY_SERVICE}/resources/auth/v1/user/mfa/verify`,
      status: 200,
      response: { accessToken: 'token', refreshToken: 'refreshToken' },
      delay: 200,
    }).as('verifyMfa');
    cy.get(submitSelector).contains('Login').click();
    cy.wait('@verifyMfa').its('request.body').should('deep.equal', { mfaToken: MFA_TOKEN, value: validCode });

    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/');
    });
  });

  it('Login, NO SAML, Recover Two-Factor', () => {
    cy.server();
    mockAuthApi(false, false);
    cy.route({
      method: 'POST',
      url: `${IDENTITY_SERVICE}/resources/auth/v1/user`,
      status: 200,
      response: { mfaToken: MFA_TOKEN },
      delay: 200,
    }).as('login');

    mount(<TestFronteggWrapper plugins={[AuthPlugin(defaultAuthPlugin)]}>
      <DefaultAuthRoutes>
        Home
      </DefaultAuthRoutes>
    </TestFronteggWrapper>, mountOptions);

    navigateTo(defaultAuthPlugin.routes.loginUrl);
    cy.wait(['@refreshToken', '@metadata']);
    cy.get('.loader').should('not.be.visible');

    const submitSelector = 'button[type=submit]';
    const codeSelector = '[name="code"]';

    cy.get(submitSelector).contains('Login').should('be.disabled');
    checkEmailValidation();
    cy.get(submitSelector).contains('Login').should('be.disabled');
    checkPasswordValidation();
    cy.get(submitSelector).contains('Login').should('not.be.disabled');

    cy.get(submitSelector).contains('Login').click();
    cy.wait('@login').its('request.body').should('deep.equal', { email: EMAIL_1, password: PASSWORD });

    cy.contains('Please enter the 6 digit code').should('be.visible');
    cy.get('[test-id="recover-two-factor-button"]').click();

    cy.contains('Please enter the recovery code').should('be.visible');

    cy.get(codeSelector).focus().clear().type(RECOVERY_CODE).blur();

    cy.route({
      method: 'POST',
      url: `${IDENTITY_SERVICE}/resources/auth/v1/user/mfa/recover`,
      status: 400,
      response: { errors: ['invalid recovery code'] },
      delay: 200,
    }).as('recoverMfa');

    cy.get(submitSelector).contains('Disable MFA').click();
    cy.wait('@recoverMfa').its('request.body').should('deep.equal', { recoveryCode: RECOVERY_CODE, email: EMAIL_1 });
    cy.contains('invalid recovery code').should('be.visible');


    cy.route({
      method: 'POST',
      url: `${IDENTITY_SERVICE}/resources/auth/v1/user/mfa/recover`,
      status: 200,
      response: {},
      delay: 200,
    }).as('recoverMfa');
    cy.get(submitSelector).contains('Disable MFA').click();
    cy.wait('@recoverMfa').its('request.body').should('deep.equal', { recoveryCode: RECOVERY_CODE, email: EMAIL_1 });

    cy.window().then(win => {
      // @ts-ignore
      expect(win.cypressStore.getState().auth.loginState.step).to.be.eq(LoginStep.preLogin);
    });
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/account/login');
    });
  });

  it('Logout Component', () => {
    cy.server();
    cy.route({ method: 'POST', url: `${IDENTITY_SERVICE}/resources/auth/v1/user/token/refresh`, status: 200, response: { accessToken: '' } });
    cy.route({ method: 'GET', url: `${METADATA_SERVICE}?entityName=saml`, status: 200, response: { 'rows': [] } });
    cy.route({ method: 'POST', url: `${IDENTITY_SERVICE}/resources/auth/v1/logout`, status: 200, response: 'LOGOUT' });

    navigateTo(defaultAuthPlugin.routes.logoutUrl);
    mount(<TestFronteggWrapper plugins={[AuthPlugin(defaultAuthPlugin)]}>
      <DefaultAuthRoutes>
        Home
      </DefaultAuthRoutes>
    </TestFronteggWrapper>, { ...mountOptions, alias: 'providerComponent' });

    cy.location().should(loc => {
      expect(loc.pathname).to.eq(defaultAuthPlugin.routes.loginUrl);
    });

  });
});
