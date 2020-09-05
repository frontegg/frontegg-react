import React from 'react';
import { mount } from 'cypress-react-unit-test';
import { AuthPlugin } from '../index';
import {
  IDENTITY_SERVICE,
  mockAuthApi,
  mountOptions,
  navigateTo, PASSWORD, submitButtonSelector,
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

describe('Activate Account Tests', () => {

  it('ActivateAccount Page should display error if userId or token not found', () => {
    cy.server();
    mockAuthApi(false, false);
    mount(<TestFronteggWrapper plugins={[AuthPlugin(defaultAuthPlugin)]}>
      Home
    </TestFronteggWrapper>, mountOptions);
    navigateTo(defaultAuthPlugin.routes.activateUrl);

    cy.get('.fe-error-message').contains('Activation failed').should('be.visible');
    cy.contains('Back to login').should('be.visible').click();

    cy.location().should(loc => {
      expect(loc.pathname).to.eq(defaultAuthPlugin.routes.loginUrl);
    });
  });

  it('ActivateAccount Page should display success and redirec to login page', () => {
    cy.server();
    mockAuthApi(false, false);
    cy.route({
      method: 'POST',
      url: `${IDENTITY_SERVICE}/resources/users/v1/activate`,
      status: 200,
      response: {},
      delay: 200,
    }).as('activateAccount');

    mount(<TestFronteggWrapper plugins={[AuthPlugin(defaultAuthPlugin)]}>
      Home
    </TestFronteggWrapper>, mountOptions);

    const userId = '1111-userId-1111';
    const token = '1111-token-1111';
    navigateTo(defaultAuthPlugin.routes.activateUrl + `?userId=${userId}&token=${token}`);

    cy.get('.fe-error-message').should('not.be.exist');

    const passwordSelector = 'input[name="password"]';
    const confirmPasswordSelector = 'input[name="confirmPassword"]';

    cy.get(submitButtonSelector).should('be.disabled');
    cy.get(passwordSelector).focus().clear().type('1111').blur();
    cy.get(passwordSelector).parents('.field').should('have.class', 'error');
    cy.get(passwordSelector).focus().clear().type(PASSWORD).blur();
    cy.get(submitButtonSelector).should('be.disabled');
    cy.get(confirmPasswordSelector).focus().clear().type(PASSWORD + '1').blur();
    cy.get(submitButtonSelector).should('be.disabled');

    cy.get(confirmPasswordSelector).parents('.field').should('have.class', 'error');
    cy.get(confirmPasswordSelector).focus().clear().type(PASSWORD).blur();

    cy.get(passwordSelector).parents('.field').should('not.have.class', 'error');
    cy.get(confirmPasswordSelector).parents('.field').should('not.have.class', 'error');

    cy.get(submitButtonSelector).should('not.be.disabled').click();
    cy.wait('@activateAccount').its('request.body').should('deep.equal', { userId, token, password: PASSWORD });

    cy.location().should(loc => {
      expect(loc.pathname).to.eq(defaultAuthPlugin.routes.loginUrl);
    });
  });
});
