import React from 'react';
import { mount } from 'cypress-react-unit-test';
import { AuditsPlugin, Audits } from '../index';
import {
  IDENTITY_SERVICE,
  mockAuditsApi,
  mountOptions,
  navigateTo,
  PASSWORD,
  submitButtonSelector,
  TestFronteggWrapper,
} from '../../../../cypress/helpers';

describe('Load audits page', () => {
  it('Audits page should be rendered', () => {
    cy.server();
    mockAuditsApi();
    mount(
      <TestFronteggWrapper plugins={[AuditsPlugin()]}>
        <Audits.Page />
      </TestFronteggWrapper>
    );
    cy.wait('@auditsData');
    cy.wait('@auditsMetadata');
    cy.wait('@auditsStats');
    cy.get('.fe-page-header').should('be.visible');
    cy.get('.fe-audits__subHeader').should('be.visible');
    cy.get('.fe-table').should('be.visible');
  });
});
