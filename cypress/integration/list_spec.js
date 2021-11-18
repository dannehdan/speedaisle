describe("List page", () => {
  it("has a header on the page", () => {
    cy.visit("/list");
    cy.get(".test-header").should("contain", "Your List");
  });

  it("has a form to add an item", () => {
    cy.visit("/list");
    cy.get(".test-add-item-form").should("exist");
  });

  it("form can be submitted", () => {
    cy.visit("/list");
    cy.get(".test-add-item-form")
      .find(".test-item-input")
      .type("frozen pineapples");
    cy.get(".test-select-dropdown").select("Frozen");

    cy.get(".test-add-item-btn").click();
    cy.contains("frozen pineapples");
  });

  it("user can't submit a form without typing item first", () => {
    cy.visit("/list");
    cy.get(".test-add-item-btn").click();

    cy.get("input:invalid").should("have.length", 1);

    cy.get(".test-item-input").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill in this field.");
    });
  });
});
