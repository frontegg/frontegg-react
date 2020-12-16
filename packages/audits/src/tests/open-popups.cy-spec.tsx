import React from 'react';
import { mount } from 'cypress-react-unit-test';
import { AuditsPlugin, Audits } from '../index';
import { mockAuditsApi, TestFronteggWrapper } from '../../../../cypress/helpers';

describe('Open Ip Popup', () => {
  it('Ip popup should opens', () => {
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
    cy.get('.fe-audits__ipCell').first().click();
    cy.get('.fe-audits__ipCell-window').should('be.visible');
  });
  it('Ip popup in expandable row should opens', () => {
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
    cy.get('.fe-audits__expand-content').find('.fe-audits__ipCell').first().click();
    cy.get('.fe-audits__ipCell-window').should('be.visible');
  });
  it('Filter popup should opens', () => {
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
    cy.get('.fe-table__filter-button').first().click();
    cy.get('.fe-audits__filter').should('be.visible');
  });
});
