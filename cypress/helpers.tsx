/* istanbul ignore file */

import React, { FC } from 'react';
import { FronteggProvider, PluginConfig, ContextOptions } from '@frontegg/react-core';
import { uiLibrary } from '@frontegg/react-elements-semantic';

export const METADATA_SERVICE = 'http://localhost:8080/frontegg/metadata';
export const IDENTITY_SERVICE = 'http://localhost:8080/frontegg/identity';

const contextOptions: ContextOptions = {
  baseUrl: `http://localhost:8080`,
  requestCredentials: 'include',
};

export type TestFronteggWrapperProps = {
  plugins: PluginConfig[];
};
export const TestFronteggWrapper: FC<TestFronteggWrapperProps> = (props) => (
  <FronteggProvider context={contextOptions} plugins={props.plugins} uiLibrary={uiLibrary}>
    {props.children}
  </FronteggProvider>
);

export const mountOptions = {
  stylesheets: 'https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css',
};

declare global {
  interface Window {
    cypressHistory: any;
  }
}

export const navigateTo = (path: string) => {
  cy.window().then((win) => {
    win.cypressHistory.push(path);
  });
};

export const mockAuthMe = () => {
  cy.route({
    method: 'GET',
    url: `${IDENTITY_SERVICE}/resources/users/v2/me`,
    status: 200,
    response: {
      activatedForTenant: true,
      email: EMAIL_1,
      id: USER_ID_1,
      metadata: null,
      mfaEnrolled: false,
      name: 'Test Test',
      permissions: [],
      phoneNumber: null,
      profilePictureUrl: null,
      provider: 'local',
      roles: [],
      tenantId: 'my-tenant-id',
      tenantIds: ['my-tenant-id'],
      verified: true,
    },
  }).as('me');
};

export const mockAuthApi = (authenticated: boolean, saml: boolean) => {
  if (authenticated) {
    cy.route({
      method: 'POST',
      url: `${IDENTITY_SERVICE}/resources/auth/v1/user/token/refresh`,
      status: 200,
      response: {
        accessToken: '',
        refreshToken: '',
      },
    }).as('refreshToken');
  } else {
    cy.route({
      method: 'POST',
      url: `${IDENTITY_SERVICE}/resources/auth/v1/user/token/refresh`,
      status: 401,
      response: 'Unauthorized',
    }).as('refreshToken');
  }
  if (saml) {
    cy.route({
      method: 'GET',
      url: `${METADATA_SERVICE}?entityName=saml`,
      status: 200,
      delay: 200,
      response: {
        rows: [{}],
      },
    }).as('metadata');
  } else {
    cy.route({
      method: 'GET',
      url: `${METADATA_SERVICE}?entityName=saml`,
      status: 200,
      response: {
        rows: [],
      },
    }).as('metadata');
  }
};

export const EMAIL_1 = 'test1@frontegg.com';
export const USER_ID_1 = '3065bce5-a3ff-42bd-a519-97bbace20e8b';
export const PASSWORD = 'ValidPassword123!';
export const ACCESS_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4YTIyYjQyNy01MjA0LTQ2NzYtOWNhMC03ZTVjMWJkMDhiZjYiLCJuYW1lIjoiRGF2aWQiLCJlbWFpbCI6ImRhdmlkQGZyb250ZWdnLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJyb2xlcyI6WyJ3cml0ZSJdLCJwZXJtaXNzaW9ucyI6WyJjb25maWd1cmUtc3NvIiwiYWRkLXNsYWNrIiwiYWRkLXdlYmhvb2tzIl0sInRlbmFudElkIjoibXktdGVuYW50LWlkIiwidGVuYW50SWRzIjpbIm15LXRlbmFudC1pZCJdLCJpYXQiOjE1OTk2MTUyOTMsImV4cCI6MTU5OTYxNTU5MywiaXNzIjoiZnJvbnRlZ2cifQ.CdNSM-0I6cU9cEpBE5dj7jZyRfgBK3ozZ0hNxFFhM_jv9NdQp2BBkUkHTdKpvwFdub4LCUwd1h2kdvdTuGHaQDNVVoetCpzJsXMUejBdCPu6MiShNLstBdzAjnypCuwy3Mfv7tIEB3njuKeNDWJZY32EDXawdepnugRjsDIqQsQ';
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
