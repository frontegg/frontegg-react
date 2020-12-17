import React from 'react';
import { mount } from 'cypress-react-unit-test';
import { AuditsPlugin, Audits } from '../index';
import { mockAuditsApi, TestFronteggWrapper } from '../../../../cypress/helpers';

describe('Expandable Rows', () => {
  it('Rows should expand', () => {
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
    cy.get('.fe-table').should('be.visible');
    cy.get('.fe-table__expand-button').first().click();
    cy.get('.fe-table__tr-expanded-content').first().should('have.class', 'is-expanded');
    cy.get('.fe-audits__expand-content').first().should('be.visible');
  });
});
