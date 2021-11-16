describe('List page', function() {
  it('has a list on page', function() {
    cy.visit('/list');
    cy.contains('Your List');
  });
});
