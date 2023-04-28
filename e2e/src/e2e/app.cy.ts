import { getHeader } from '../support/app.po';

describe('lizards-inc-fe', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getHeader().contains('Home');
  });
});
