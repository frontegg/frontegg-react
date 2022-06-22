import React from 'react';
import { mount } from '@cypress/react';
import { AuditsPlugin, Audits } from '../index';
import { mockAuditsApi, TestFronteggWrapper } from '../../../../cypress/helpers';

describe('Audits page table sorting', () => {
  it('Sort by name Z-A', () => {
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
    cy.get('.fe-table__thead-tr-th').eq(1).click().should('have.class', 'fe-table__thead-sortable-asc');
    cy.wait('@auditsDataNameDesc');
    cy.get('.fe-table__tr').first().contains('Wendi Burghardt').should('be.visible');
  });
});
