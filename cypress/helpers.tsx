/* istanbul ignore file */

import React, { FC } from 'react';
import { FronteggProvider, PluginConfig, ContextOptions } from '@frontegg/react-core';
import { uiLibrary } from '@frontegg/react-elements-semantic';

export const METADATA_SERVICE = 'http://localhost:8080/frontegg/metadata';
export const IDENTITY_SERVICE = 'http://localhost:8080/frontegg/identity';


const contextOptions: ContextOptions = {
  baseUrl: `http://localhost:8080`,
  tokenResolver: () => 'my-authentication-token',
  requestCredentials: 'include',
};

export type TestFronteggWrapperProps = {
  plugins: PluginConfig[]
}
export const TestFronteggWrapper: FC<TestFronteggWrapperProps> = (props) => {
  return <FronteggProvider
    withRouter={true}
    context={contextOptions}
    plugins={props.plugins}
    uiLibrary={uiLibrary}>
    {props.children}
  </FronteggProvider>;
};

export const mountOptions = {
  stylesheets: 'https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css',
};


declare global {
  interface Window {
    cypressHistory: any;
  }
}

export const navigateTo = (path: string) => {
  cy.window().then(win => {
    win.cypressHistory.push(path);
  });
};


export const mockAuthApi = (authenticated: boolean, saml: boolean) => {
  if (authenticated) {
    cy.route({
      method: 'POST', url: `${IDENTITY_SERVICE}/resources/auth/v1/user/token/refresh`, status: 200,
      response: { accessToken: '', refreshToken: '' },
    }).as('refreshToken');

  } else {
    cy.route({ method: 'POST', url: `${IDENTITY_SERVICE}/resources/auth/v1/user/token/refresh`, status: 401, response: 'Unauthorized' })
      .as('refreshToken');
  }
  if (saml) {
    cy.route({ method: 'GET', url: `${METADATA_SERVICE}?entityName=saml`, status: 200, delay: 200, response: { 'rows': [{}] } })
      .as('metadata');
  } else {
    cy.route({ method: 'GET', url: `${METADATA_SERVICE}?entityName=saml`, status: 200, response: { 'rows': [] } })
      .as('metadata');
  }
};


export const EMAIL_1 = 'test1@frontegg.com';
export const PASSWORD = 'ValidPassword123!';
export const checkEmailValidation = (emailSelector: string = '[name="email"]') => {
  cy.get(emailSelector).focus().clear().type('invalid email').blur();
  cy.contains('Must be a valid email').should('be.visible');
  cy.get(emailSelector).focus().clear().blur();
  cy.contains('The email is required').should('be.visible');
  cy.get(emailSelector).focus().clear().type(EMAIL_1).blur();
  cy.get(emailSelector).parents('.field').should('not.have.class', 'error');
};

export const submitButtonSelector = 'button[type="submit"]';
export const emailInputSelector = 'input[name="email"]';
