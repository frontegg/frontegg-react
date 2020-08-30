import React from 'react';
import { mount } from 'cypress-react-unit-test';
import { LoginPage, AuthPlugin, LogoutPage, DefaultAuthRoutes } from '../index';
import { IDENTITY_SERVICE, METADATA_SERVICE, TestFronteggWrapper } from '../../../../cypress/helpers';
import { FRONTEGG_AFTER_AUTH_REDIRECT_URL } from '../constants';

const mountOptions = {
  stylesheets: 'https://cdn.jsdelivr.net/npm/@frontegg/react-dev/vendor.min.css',
};
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

const EMAIL_1 = 'test1@frontegg.com';
const EMAIL_2 = 'test1@frontegg.com';
const PASSWORD = 'ValidPassword123!';
const SSO_PATH = '/my-test-sso-login';

/* eslint-env mocha */
describe('Login Tests', () => {
  it('Login, NO SAML', () => {
    cy.server();
    cy.route({ method: 'POST', url: `${IDENTITY_SERVICE}/resources/auth/v1/user/token/refresh`, status: 401, response: 'Unauthorized' });
    cy.route({ method: 'GET', url: `${METADATA_SERVICE}?entityName=saml`, status: 200, response: { 'rows': [] } });
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

    cy.window().then(win => {
      // @ts-ignore
      win.cypressHistory.push('/account/login');
    });
    const emailSelector = '[name="email"]';
    const passwordSelector = '[name="password"]';
    const submitSelector = 'button[type=submit]';

    cy.get(submitSelector).contains('Login').should('be.disabled');
    cy.get(emailSelector).focus().clear().type('invalid email').blur();
    cy.get(emailSelector).parent().should('have.class', 'error');
    cy.get(emailSelector).focus().clear().type(EMAIL_1).blur();
    cy.get(emailSelector).parent().should('not.have.class', 'error');
    cy.get(submitSelector).contains('Login').should('be.disabled');
    cy.get(passwordSelector).focus().clear().type('not').blur();
    cy.get(passwordSelector).parent().should('have.class', 'error');
    cy.get(submitSelector).contains('Login').should('be.disabled');
    cy.get(passwordSelector).focus().clear().type(PASSWORD).blur();
    cy.get(passwordSelector).parent().should('not.have.class', 'error');

    cy.get(submitSelector).contains('Login').should('not.be.disabled');
    cy.get(emailSelector).focus().clear().type('invalid email').blur();
    cy.get(emailSelector).parent().should('have.class', 'error');
    cy.get(submitSelector).contains('Login').should('be.disabled');
    cy.get(emailSelector).focus().clear().type(EMAIL_1).blur();
    cy.get(emailSelector).parent().should('not.have.class', 'error');
    cy.get(submitSelector).contains('Login').should('not.be.disabled');


    cy.get(submitSelector).contains('Login').click();

    cy.window().then(win => win.localStorage.removeItem(FRONTEGG_AFTER_AUTH_REDIRECT_URL));
    cy.get(submitSelector).click();

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
    cy.route({ method: 'POST', url: `${IDENTITY_SERVICE}/resources/auth/v1/user/token/refresh`, status: 401, response: 'Unauthorized' });
    cy.route({ method: 'GET', url: `${METADATA_SERVICE}?entityName=saml`, status: 200, response: { 'rows': [] } });
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

    cy.window().then(win => {
      // @ts-ignore
      win.cypressHistory.push('/account/login');
    });
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

  it('Login, WITH SAML tenant, NO SAML email', () => {
    cy.server();
    cy.route({
      method: 'POST',
      url: `${IDENTITY_SERVICE}/resources/auth/v1/user/token/refresh`,
      status: 401,
      delay: 200,
      response: 'Unauthorized',
    }).as('refreshToken');
    cy.route({
      method: 'GET',
      url: `${METADATA_SERVICE}?entityName=saml`,
      status: 200,
      delay: 200,
      response: { 'rows': [{}] },
    }).as('metadata');
    cy.route({
      method: 'POST',
      url: `${IDENTITY_SERVICE}/resources/auth/v1/user/saml/prelogin`,
      status: 200,
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

    cy.window().then(win => {
      // @ts-ignore
      win.cypressHistory.push('/account/login');
    });
    cy.wait(['@refreshToken', '@metadata']);
    cy.get('.loader').should('not.be.visible');

    const emailSelector = '[name="email"]';
    const passwordSelector = '[name="password"]';
    const submitSelector = 'button[type=submit]';

    cy.get(submitSelector).contains('Continue').should('be.disabled');
    cy.get(emailSelector).focus().clear().type('invalid email').blur();
    cy.get(emailSelector).parent().should('have.class', 'error');
    cy.get(emailSelector).focus().clear().type(EMAIL_2).blur();
    cy.get(emailSelector).parent().should('not.have.class', 'error');
    cy.get(submitSelector).contains('Continue').should('not.be.disabled');
    cy.get(passwordSelector).should('not.exist');

    cy.get(submitSelector).contains('Continue').click();
    cy.get(submitSelector).should('have.class', 'loading');

    cy.get(passwordSelector).should('be.visible');
    cy.get(passwordSelector).focus().clear().type('inv').blur();
    cy.get(passwordSelector).parent().should('have.class', 'error');
    cy.get(submitSelector).contains('Login').should('be.disabled');

    cy.get(passwordSelector).focus().clear().type(PASSWORD).blur();
    cy.get(passwordSelector).parent().should('not.have.class', 'error');
    cy.get(submitSelector).contains('Login').should('not.be.disabled');


    // change email should reset the login back to preLogin
    cy.get(emailSelector).focus().clear().type(EMAIL_2).blur();
    cy.get(passwordSelector).should('not.exist');
    cy.get(submitSelector).contains('Continue').click();

    cy.wait('@preLogin').its('request.body').should('deep.equal', { email: EMAIL_1 });

    cy.get(passwordSelector).should('be.visible');
    cy.get(passwordSelector).focus().clear().type(PASSWORD).blur();
    cy.get(passwordSelector).parent().should('not.have.class', 'error');
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
    cy.route({
      method: 'POST',
      url: `${IDENTITY_SERVICE}/resources/auth/v1/user/token/refresh`,
      status: 401,
      delay: 200,
      response: 'Unauthorized',
    }).as('refreshToken');
    cy.route({
      method: 'GET',
      url: `${METADATA_SERVICE}?entityName=saml`,
      status: 200,
      delay: 200,
      response: { 'rows': [{}] },
    }).as('metadata');
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

    cy.window().then(win => {
      // @ts-ignore
      win.cypressHistory.push(defaultAuthPlugin.routes.loginUrl);
    });
    cy.wait(['@refreshToken', '@metadata']);
    cy.get('.loader').should('not.be.visible');


    const emailSelector = '[name="email"]';
    const passwordSelector = '[name="password"]';
    const submitSelector = 'button[type=submit]';

    cy.get(submitSelector).contains('Continue').should('be.disabled');
    cy.get(emailSelector).focus().clear().type('invalid email').blur();
    cy.get(emailSelector).parent().should('have.class', 'error');
    cy.get(emailSelector).focus().clear().type(EMAIL_1).blur();
    cy.get(emailSelector).parent().should('not.have.class', 'error');
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

  it('Logout Component', () => {
    cy.server();
    cy.route({ method: 'POST', url: `${IDENTITY_SERVICE}/resources/auth/v1/user/token/refresh`, status: 200, response: { accessToken: '' } });
    cy.route({ method: 'GET', url: `${METADATA_SERVICE}?entityName=saml`, status: 200, response: { 'rows': [] } });
    cy.route({ method: 'POST', url: `${IDENTITY_SERVICE}/resources/auth/v1/logout`, status: 200, response: 'LOGOUT' });

    cy.window().then(win => {
      // @ts-ignore
      win.cypressHistory.push(defaultAuthPlugin.routes.logoutUrl);
    });
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
