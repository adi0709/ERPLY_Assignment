/// <reference types= "cypress" />
const exampleData = require("../../fixtures/example.json");
class ProductSearch {
  validatePlatformOpen() {
    cy.visit("/");
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.title().should("eq", "ERPLY Login");
    cy.url().should("eq", "https://epos.erply.com/");
  }
  enterCredentials() {
    cy.get('[data-testid="clientCode"]')
      .should("exist")
      .and("be.visible")
      .and("be.enabled")
      .type(exampleData.client_code);
    cy.get('[data-testid="username"]')
      .should("exist")
      .and("be.visible")
      .and("be.enabled")
      .type(exampleData.username);
    cy.get('[data-testid="password"]')
      .should("exist")
      .and("be.visible")
      .and("be.enabled")
      .type(exampleData.password);
    cy.get('[data-testid="login-clockin-title"]')
      .should("exist")
      .and("be.visible")
      .click();
  }
  validateSignIn() {
    cy.contains("Signing in...").should("be.visible");
    cy.get('[data-testid="pos-select-container"]', { timeout: 25000 }).within(
      ($modal) => {
        cy.get('[data-testid="pos-item"]')
          .should("exist")
          .and("be.visible")
          .click();
      }
    );
  }
  loginPageVisibility() {
    cy.title().should("eq", "Location #1 - Default POS - Test User");
    cy.get("#signed-in-employee")
      .should("be.visible")
      .and("contains.text", "Test User");
  }

  clickSearchBar() {
    cy.get('[data-testid="product-search-input"]').click();
  }
  validateClickSearch() {
    cy.get('[data-testid="product-search-input"]').should(
      "have.css",
      "width",
      "415px"
    );
    cy.get('[data-testid="search-result-product"', { timeout: 25000 })
      .should("exist")
      .and("be.visible")
      .and("have.length", 3);
  }
  searchProduct($search) {
    cy.get('[data-testid="product-search-input"] > .MuiInputBase-input').type(
      $search
    );
  }
  productSearchBarVisibility() {
    cy.get('[data-testid="product-search-input"]')
      .should("have.css", "width", "203.5px")
      .click();
    cy.get('[data-testid="product-search-input"]').should(
      "have.css",
      "width",
      "415px"
    );
  }
  validateSearchByName($search) {
    cy.get('[data-testid="search-result-product"]').within(() => {
      cy.get('[data-testid="search-result-name"]', { timeout: 25000 }).should(
        "contain.text",
        $search
      );
    });
  }
  validateSearchById($search) {
    cy.get('[data-testid="search-result-product"]', { timeout: 20000 }).within(
      () => {
        cy.get('[data-testid="search-result-code"]').should(
          "contain.text",
          $search
        );
      }
    );
  }
  validateEmptySearchList() {
    cy.get('[data-testid="product-results-body"]').within(() => {
      cy.get(".MuiTableCell-root").should("contain.text", "No results found.");
    });
  }
  clickCloseButton() {
    cy.get(".MuiIconButton-label").click();
  }
  validateCloseButton() {
    cy.get('[data-testid="product-search-input"] > .MuiInputBase-input')
      .should("exist")
      .and("be.visible")
      .and("have.css", "width", "175.5px")
      .click();
  }
  clickSearchIcon() {
    cy.get('[data-test-key="2"] > .MuiTableCell-alignRight').click();
  }
  validateProductDetails() {
    cy.get(".modal-header").within(() => {
      cy.get(".modal-title")
        .should("exist")
        .and("be.visible")
        .and("contain.text", "Product details");
      cy.get(".save-button-view")
        .should("exist")
        .and("be.visible")
        .and("be.enabled")
        .and("contain.text", "Add");
      cy.get('[data-testid="custom-close-button"]')
        .should("exist")
        .and("be.visible");
    });
    cy.get(".product-view > :nth-child(2) > tbody").within(() => {
      cy.get(":nth-child(1) > :nth-child(1)")
        .should("exist")
        .and("be.visible")
        .and("contain.text", "Product name");
      cy.get(":nth-child(1) > :nth-child(2)")
        .should("exist")
        .and("be.visible")
        .and("contain.text", exampleData.productName);
      cy.get(":nth-child(2) > :nth-child(1)")
        .should("exist")
        .and("be.visible")
        .and("contain.text", "Code");
      cy.get(":nth-child(2) > :nth-child(2)")
        .should("exist")
        .and("be.visible")
        .and("contain.text", exampleData.productCode);
    });
  }
  clickProduct() {
    cy.get('[data-testid="search-result-product"]', { timeout: 20000 })
      .first()
      .click();
  }
  validateClickProduct() {
    cy.get('[data-testid="customer-badge-container"]')
      .should("exist")
      .and("be.visible");
    cy.get(".bill-container").within(() => {
      cy.get("thead > tr > :nth-child(1)")
        .should("exist")
        .and("be.visible")
        .and("contain.text", "Name");
      cy.get('[data-testid="product-name-cell"]')
        .should("exist")
        .and("be.visible")
        .and("contain.text", exampleData.productName);
      cy.get("thead > tr > :nth-child(2)")
        .should("exist")
        .and("be.visible")
        .and("contain.text", "Code");
      cy.get('[data-testid="product-code-cell"]')
        .should("exist")
        .and("be.visible")
        .and("contain.text", exampleData.productCode);
    });
  }
}

module.exports = new ProductSearch();
