import React from 'react';
import { mount } from '@cypress/react';
import { AuditsPlugin, Audits } from '../index';
import { mockAuditsApi, TestFronteggWrapper } from '../../../../cypress/helpers';

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

  it('Audits rows should be rendered', () => {
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
    cy.get('.fe-table__tr-td').should('be.visible');
  });
});
