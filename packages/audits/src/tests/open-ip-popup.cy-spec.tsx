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

describe('Open Ip Popup', () => {
  it('Ip popup should opens', () => {
    cy.server();
    mockAuditsApi();
    mount(
      <TestFronteggWrapper plugins={[AuditsPlugin()]}>
        <Audits.Page />
      </TestFronteggWrapper>,
      mountOptions
    );
    cy.wait('@data');
    cy.get('fe-table').should('be.anabled');

    // navigateTo('/audits')
  });
});
