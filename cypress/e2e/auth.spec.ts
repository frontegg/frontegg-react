import { IDENTITY_SERVICE, METADATA_SERVICE } from './constants';

describe('Auth Test', () => {
  // it('[login page], no saml, test input validation', () => {
  //   cy.server();
  //   cy.route({ method: 'POST', url: `${IDENTITY_SERVICE}/resources/auth/v1/user/token/refresh`, status: 401, response: 'Unauthorized' });
  //   cy.route({ method: 'GET', url: `${METADATA_SERVICE}?entityName=saml`, status: 200, response: { 'rows': [] } });
  //   cy.visit('/account/login');
  //
  //   const emailSelector = '[name="email"]';
  //   const passwordSelector = '[name="password"]';
  //   const submitSelector = 'button[type=submit]';
  //
  //   cy.get(submitSelector).contains('Login').should('be.disabled');
  //   cy.get(emailSelector).focus().clear().type('invalid email').blur();
  //   cy.get(emailSelector).parent().should('have.class', 'error');
  //   cy.get(emailSelector).focus().clear().type('test1@frontegg.com').blur();
  //   cy.get(emailSelector).parent().should('not.have.class', 'error');
  //   cy.get(submitSelector).contains('Login').should('be.disabled');
  //   cy.get(passwordSelector).focus().clear().type('not').blur();
  //   cy.get(passwordSelector).parent().should('have.class', 'error');
  //   cy.get(submitSelector).contains('Login').should('be.disabled');
  //   cy.get(passwordSelector).focus().clear().type('valid_password').blur();
  //   cy.get(passwordSelector).parent().should('not.have.class', 'error');
  //   cy.get(submitSelector).contains('Login').should('not.be.disabled');
  //   cy.get(emailSelector).focus().clear().type('invalid email').blur();
  //   cy.get(emailSelector).parent().should('have.class', 'error');
  //   cy.get(submitSelector).contains('Login').should('be.disabled');
  //   cy.get(emailSelector).focus().clear().type('test1@frontegg.com').blur();
  //   cy.get(emailSelector).parent().should('not.have.class', 'error');
  //   cy.get(submitSelector).contains('Login').should('not.be.disabled');
  // });

  it('[login page], with saml, test input validation', () => {
    cy.server();
    cy.route({
      method: 'POST',
      url: `${IDENTITY_SERVICE}/resources/auth/v1/user/token/refresh`,
      status: 401,
      response: 'Unauthorized',
    });
    cy.route({ method: 'GET', url: `${METADATA_SERVICE}?entityName=saml`, status: 200, response: { rows: [{}] } });
    cy.visit('/account/login');

    const emailSelector = '[name="email"]';
    const passwordSelector = '[name="password"]';
    const submitSelector = 'button[type=submit]';

    cy.get(submitSelector).contains('Continue').should('be.disabled');
    cy.get(emailSelector).focus().clear().type('invalid email').blur();
    cy.get(emailSelector).parent().should('have.class', 'error');
    cy.get(emailSelector).focus().clear().type('test1@frontegg.com').blur();
    cy.get(emailSelector).parent().should('not.have.class', 'error');
    cy.get(submitSelector).contains('Continue').should('not.be.disabled');

    cy.get(submitSelector).contains('Continue').click();

    // cy.get(passwordSelector).focus().clear().type('not').blur();
    // cy.get(passwordSelector).parent().should('have.class', 'error');
    // cy.get(submitSelector).contains('Login').should('be.disabled');
    // cy.get(passwordSelector).focus().clear().type('valid_password').blur();
    // cy.get(passwordSelector).parent().should('not.have.class', 'error');
    // cy.get(submitSelector).contains('Login').should('not.be.disabled');
    // cy.get(emailSelector).focus().clear().type('invalid email').blur();
    // cy.get(emailSelector).parent().should('have.class', 'error');
    // cy.get(submitSelector).contains('Login').should('be.disabled');
    // cy.get(emailSelector).focus().clear().type('test1@frontegg.com').blur();
    // cy.get(emailSelector).parent().should('not.have.class', 'error');
    // cy.get(submitSelector).contains('Login').should('not.be.disabled');
  });
});

export {};
