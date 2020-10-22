import React from 'react';
import { mount } from 'cypress-react-unit-test';
import { AuthPlugin } from '../index';
import {
  checkEmailValidation,
  EMAIL_1,
  emailInputSelector,
  IDENTITY_SERVICE,
  METADATA_SERVICE,
  mockAuthApi,
  mountOptions,
  navigateTo,
  PASSWORD,
  submitButtonSelector,
  TestFronteggWrapper,
} from '../../../../cypress/helpers';

const defaultAuthPlugin = {
  routes: {
    authenticatedUrl: '/',
    loginUrl: '/account/login',
    logoutUrl: '/account/logout',
    activateUrl: '/account/activate',
    acceptInvitationUrl: '/account/invitation/accept',
    forgetPasswordUrl: '/account/forget-password',
    resetPasswordUrl: '/account/reset-password',
  },
};

describe('Forgot Password Tests', () => {
  it('NO SAML, should display forget password if click on forget password button', () => {
    cy.server();
    mockAuthApi(false, false);
    mount(<TestFronteggWrapper plugins={[AuthPlugin(defaultAuthPlugin)]}>Home</TestFronteggWrapper>, mountOptions);
    navigateTo(defaultAuthPlugin.routes.loginUrl);

    cy.wait(['@refreshToken', '@metadata']);
    cy.get('.loader').should('not.be.visible');

    cy.get(emailInputSelector).focus().clear().type(EMAIL_1).blur();
    cy.get('[test-id="forgot-password-button"]').click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(defaultAuthPlugin.routes.forgetPasswordUrl);
    });

    cy.get(submitButtonSelector).should('not.be.disabled');
    cy.get(emailInputSelector).should('have.value', EMAIL_1);
  });

  it('WITH SAML, should display forget password if click on forget password button', () => {
    cy.server();
    mockAuthApi(false, true);
    cy.route({
      method: 'POST',
      url: `${IDENTITY_SERVICE}/resources/auth/v1/user/saml/prelogin`,
      status: 400,
      response: { address: null },
      delay: 200,
    }).as('preLogin');

    mount(<TestFronteggWrapper plugins={[AuthPlugin(defaultAuthPlugin)]}>Home</TestFronteggWrapper>, mountOptions);
    navigateTo(defaultAuthPlugin.routes.loginUrl);

    cy.wait(['@refreshToken', '@metadata']);
    cy.get('.loader').should('not.be.visible');

    const emailSelector = '[name="email"]';
    cy.get(emailSelector).focus().clear().type(EMAIL_1).blur();
    cy.get('button[type="submit"]').click();

    cy.wait(['@preLogin']);
    cy.get('button[type="submit"]').should('not.be.disabled');

    cy.get('[test-id="forgot-password-button"]').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(defaultAuthPlugin.routes.forgetPasswordUrl);
    });

    cy.get(submitButtonSelector).should('not.be.disabled');
    cy.get(emailInputSelector).should('have.value', EMAIL_1);
  });

  it('should display error message if api request failed', () => {
    cy.server();
    mockAuthApi(false, false);

    mount(<TestFronteggWrapper plugins={[AuthPlugin(defaultAuthPlugin)]}>Home</TestFronteggWrapper>, mountOptions);
    navigateTo(defaultAuthPlugin.routes.forgetPasswordUrl);

    cy.get(submitButtonSelector).should('be.disabled');
    checkEmailValidation();
    cy.get(submitButtonSelector).should('not.be.disabled').click();

    cy.get('.fe-error-message').contains('Unknown error occurred').should('be.visible');
  });

  it('should display success message if api request succeeded', () => {
    cy.server();
    mockAuthApi(false, false);
    cy.route({
      method: 'POST',
      url: `${IDENTITY_SERVICE}/resources/users/v1/passwords/reset`,
      status: 200,
      response: {},
      delay: 200,
    }).as('forgotPassword');

    mount(<TestFronteggWrapper plugins={[AuthPlugin(defaultAuthPlugin)]}>Home</TestFronteggWrapper>, mountOptions);
    navigateTo(defaultAuthPlugin.routes.forgetPasswordUrl);

    cy.get(submitButtonSelector).should('be.disabled');
    checkEmailValidation();
    cy.get(submitButtonSelector).should('not.be.disabled').click();
    cy.wait('@forgotPassword').its('request.body').should('deep.equal', { email: EMAIL_1 });

    cy.contains('A password reset email has been sent to your registered email address').should('be.visible');
    cy.contains('Back to login').should('be.visible').click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(defaultAuthPlugin.routes.loginUrl);
    });
  });

  it('ResetPassword Page should display error if userId or token not found', () => {
    cy.server();
    mockAuthApi(false, false);
    mount(<TestFronteggWrapper plugins={[AuthPlugin(defaultAuthPlugin)]}>Home</TestFronteggWrapper>, mountOptions);
    navigateTo(defaultAuthPlugin.routes.resetPasswordUrl);

    cy.get('.fe-error-message').contains('Reset Password Failed').should('be.visible');
    cy.contains('Back to login').should('be.visible').click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(defaultAuthPlugin.routes.loginUrl);
    });
  });

  it('ResetPassword Page should display success and redirect to login page', () => {
    cy.server();
    mockAuthApi(false, false);
    cy.route({
      method: 'POST',
      url: `${IDENTITY_SERVICE}/resources/users/v1/passwords/reset/verify`,
      status: 200,
      response: {},
      delay: 200,
    }).as('resetPassword');

    mount(<TestFronteggWrapper plugins={[AuthPlugin(defaultAuthPlugin)]}>Home</TestFronteggWrapper>, mountOptions);

    const userId = '1111-userId-1111';
    const token = '1111-token-1111';
    navigateTo(defaultAuthPlugin.routes.resetPasswordUrl + `?userId=${userId}&token=${token}`);

    cy.get('.fe-error-message').should('not.be.exist');

    const passwordSelector = 'input[name="password"]';
    const confirmPasswordSelector = 'input[name="confirmPassword"]';

    cy.get(submitButtonSelector).should('be.disabled');
    cy.get(passwordSelector).focus().clear().type('1111').blur();
    cy.get(passwordSelector).parents('.field').should('have.class', 'error');
    cy.get(passwordSelector).focus().clear().type(PASSWORD).blur();
    cy.get(submitButtonSelector).should('be.disabled');
    cy.get(confirmPasswordSelector)
      .focus()
      .clear()
      .type(PASSWORD + '1')
      .blur();
    cy.get(submitButtonSelector).should('be.disabled');

    cy.get(confirmPasswordSelector).parents('.field').should('have.class', 'error');
    cy.get(confirmPasswordSelector).focus().clear().type(PASSWORD).blur();

    cy.get(passwordSelector).parents('.field').should('not.have.class', 'error');
    cy.get(confirmPasswordSelector).parents('.field').should('not.have.class', 'error');

    cy.get(submitButtonSelector).should('not.be.disabled').click();
    cy.wait('@resetPassword').its('request.body').should('deep.equal', { userId, token, password: PASSWORD });

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(defaultAuthPlugin.routes.loginUrl);
    });
  });
});
