describe('List page', function() {
  it('has a list on page', function() {
    cy.visit('/list');
    cy.get('.test-header').should('contain', 'Your List');
  });
});
